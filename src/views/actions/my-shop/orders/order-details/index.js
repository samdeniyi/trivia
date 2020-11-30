import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSale } from "../../../../../redux/ducks/applications/my-shop/actions/sales";
import { processOrder } from "../../../../../redux/ducks/applications/my-shop/actions/orders";

import { getOrderTypeName } from "../../../../../utils/orders/getOrderNameFromID";
import { useDispatch } from "react-redux";
import { string, bool, func, any } from "prop-types";
import {
    TopHeader,
    ConfirmPopupDialog,
    OptionsPopupDialog,
    RippleButton
} from "../../../../../components";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { Close } from "../../../../../containers/HeaderContainer";
import { SlidingOverlay } from "../../../../../containers/OverlayContainer";
import { PendingOrderDisplay, AttendedOrderDisplay } from "../../components";
import { InputBlock } from "../../../../../containers/InputContainer";
import { ReactComponent as ErrorIcon } from "../../../../../assets/error.svg";
import { ReactComponent as OutOfStockIcon } from "../../../../../assets/out_of_stock.svg";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { 
    SHOP_COMPLETE_SELF_FULFILMENT
} from '../../../../../utils/mix-panel/constants';

const OrderDetials = ({
    open,
    setOpen,
    orderItem,
    setOrderItem,
    fetchOrderDetails,
    inventory,
    merchantId
}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const [acceptButton, setAcceptButton] = useState(false);
    const [acceptOrderPopup, setAcceptOrderPopup] = useState(false);
    const [rejectOrderPopup, setRejectOrderPopup] = useState(false);
    const [rejectReasonPopup, setRejectReasonPopup] = useState(false);
    const [reduceItemPopup, setReduceItemPopup] = useState(false);
    const [confirmItemStatus, setConfirmItemStatus] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [productIndex, setProductIndex] = useState([]);
    const [orderCancellationReason, setOrderCancellationReason] = useState("");
    const [
        orderCancellationReasonArray,
        setOrderCancellationReasonArray
    ] = useState([]);


    useEffect(() => {
        !reduceItemPopup && setProductIndex("");
    }, [reduceItemPopup]);

    const startProcess = () => {
        const products = [...orderItem.orderItems];

        const acceptedProducts = [];
        const rejectedProducts = [];
        const salesItemDetails = [];
        for (let i = 0; i < products.length; i++) {
            if (confirmItemStatus[i]) {
                const newQuantity =
                    products[i].newQuantity || products[i].quantity;
                const salesItem = {
                    hasInventory: true,
                    id: i,
                    inStock: true,
                    inventoryProductId:
                        inventory.find(
                            x => x.productName === products[i].productName
                        ).id || "",
                    itemPrice: products[i].totalPrice,
                    name: products[i].productName,
                    quantity: newQuantity
                };
                salesItemDetails.push(salesItem);
                //console.log(products[i], "produd")

                for (let j = 0; j < products[i].itemIDs.length; j++) {
                    const item = {
                        orderCancelledReason: 0,
                        orderItemId: products[i].itemIDs[j],
                        orderItemStatus: 4,
                        quantity: (products[i].itemIDs.length === 1)? products[i].newQuantity : 1
                    };

                    acceptedProducts.push(item);
                }
                if(products[i].newQuantity < products[i].quantity) {
                    if(products[i].itemIDs.length === 1){
                        const item = {
                            orderCancelledReason: orderCancellationReasonArray[i],
                            orderItemId: products[i].itemIDs[0],
                            orderItemStatus: 5,
                            quantity: products[i].quantity - products[i].newQuantity

                        };
                        rejectedProducts.push(item);

                    }
                    else {
                        for (let j = products[i].newQuantity; j < products[i].quantity; j++) {
                            const item = {
                                orderCancelledReason: orderCancellationReasonArray[i],
                                orderItemId: products[i].itemIDs[j],
                                orderItemStatus: 5,
                                quantity: (products[i].itemIDs.length === 1)? products[i].quantity : 1

                            };
                            rejectedProducts.push(item);

                        }
                    }

                }
            } else {
                for (let j = 0; j < products[i].itemIDs.length; j++) {
                    const item = {
                        orderCancelledReason: orderCancellationReasonArray[i],
                        orderItemId: products[i].itemIDs[j],
                        orderItemStatus: 5,
                        quantity: (products[i].itemIDs.length === 1)? products[i].quantity : 1
                    };
                    rejectedProducts.push(item);
                }
            }
        }
        const combinedArr = [...rejectedProducts, ...acceptedProducts]

        if (combinedArr.length) {
            mixPanel.track(SHOP_COMPLETE_SELF_FULFILMENT, 
                { 
                    "Order ID": orderItem.id,
                    "Time": (new Date()).toLocaleDateString(),
                    "Non fulfilment reason": orderCancellationReasonArray,
                    "User ID": userId
                }
            )

            dispatch(processOrder(orderItem.id, combinedArr)).then((params)=> {
                if (acceptedProducts.length && params) {
                    const salesInfo = {
                        paymentAmount: totalPrice,
                        branchId: orderItem.branchId,
                        customerName: orderItem.userName,
                        customerPhoneNumber: String(orderItem.phoneNumber).slice(-10),
                        discount: 0,
                        saleAmount: totalPrice,
                        salesItemDetails: salesItemDetails,
                        salesRecordTxnReference: orderItem.orderNumber
                    };
                    dispatch(
                        createSale(
                            merchantId,
                            orderItem.branchId,
                            salesInfo,
                            "ORDER"
                        )
                    );
                }
            });
        }
    };

    const rejectAllProducts = () => {
        const products = [...orderItem.orderItems];
        const rejectedProductIDs = [];
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < products[i].itemIDs.length; j++) {
                const item = {
                    orderCancelledReason: orderCancellationReason,
                    orderItemId: products[i].itemIDs[j],
                    orderItemStatus: 5,
                    quantity: (products[i].itemIDs.length === 1)? products[i].quantity : 1
                };
                rejectedProductIDs.push(item);
            }
        }

        dispatch(processOrder(orderItem.id, rejectedProductIDs));
    };

    return (
        open && (
            <SlidingOverlay>
                <TopHeader title={getOrderTypeName(orderItem)+ " Order"} noArrow withSpacesHeader>
                    <Close
                        left={"true"}
                        onClick={() => {
                            setOpen(!open);
                            setOrderItem({});
                        }}
                    />
                </TopHeader>

                <ScreenContainer paddingBottom={"65px"} top={"65px"}>
                    {getOrderTypeName(orderItem) === "Pending" ? (
                        <InputBlock>
                            <PendingOrderDisplay
                                order={orderItem}
                                fetchOrderDetails={fetchOrderDetails}
                                setAcceptButton={setAcceptButton}
                                confirmItemStatus={confirmItemStatus}
                                setConfirmItemStatus={setConfirmItemStatus}
                                totalPrice={totalPrice}
                                setTotalPrice={setTotalPrice}
                                subTotal={subTotal}
                                setSubTotal={setSubTotal}
                                vat={vat}
                                setVat={setVat}
                                reduceItemPopup={reduceItemPopup}
                                setReduceItemPopup={setReduceItemPopup}
                                setProductIndex={setProductIndex}
                            />
                            <RippleButton
                                top={"45px"}
                                style={{
                                    backgroundColor: `rgba(87,159,215,.4)`,
                                    color: `rgb(59, 120, 220)`,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    opacity: `40%`
                                }}
                                onClick={() =>
                                    setRejectOrderPopup(!rejectOrderPopup)
                                }
                            >
                                Reject order
                            </RippleButton>
                            <RippleButton
                                top={"10px"}
                                onClick={() =>
                                    setAcceptOrderPopup(!acceptOrderPopup)
                                }
                                disabled={!acceptButton}
                            >
                                Accept order
                            </RippleButton>
                        </InputBlock>
                    ) : (
                        <Fragment>
                            <InputBlock>
                                <AttendedOrderDisplay order={orderItem} />
                            </InputBlock>
                        </Fragment>
                    )}
                </ScreenContainer>
                <ConfirmPopupDialog
                    open={acceptOrderPopup}
                    cancel={() => setAcceptOrderPopup(!acceptOrderPopup)}
                    title={"Are you sure you want to accept this order?"}
                    confirmationText={
                        "Accepting this order will mark it as “Packed/Ready to be shipped”. You can’t undo this action."
                    }
                    answers={[
                        {
                            variant: "No",
                            action: () => setAcceptOrderPopup(!acceptOrderPopup)
                        },
                        {
                            variant: "Yes",
                            action: () => {
                                setAcceptOrderPopup(!acceptOrderPopup);
                                startProcess();
                            }
                        }
                    ]}
                />

                <ConfirmPopupDialog
                    open={rejectOrderPopup}
                    cancel={() => setRejectOrderPopup(!rejectOrderPopup)}
                    title={"Are you sure you want to reject this order?"}
                    confirmationText={
                        "Rejecting this order will mark it as “Rejected”. You can’t undo this action."
                    }
                    answers={[
                        {
                            variant: "No",
                            action: () => setRejectOrderPopup(!rejectOrderPopup)
                        },
                        {
                            variant: "Yes",
                            action: () => {
                                setRejectOrderPopup(!rejectOrderPopup);
                                setRejectReasonPopup(!rejectReasonPopup);
                            }
                        }
                    ]}
                />

                <OptionsPopupDialog
                    open={rejectReasonPopup}
                    title="Please provide a reason why you can’t fulfil this order"
                    cancel={() => setRejectReasonPopup(!rejectReasonPopup)}
                    confirm={() => rejectAllProducts()}
                    selectedStatus={orderCancellationReason !== undefined? true : false}
                    items={[
                        {
                            Icon: OutOfStockIcon,
                            title: "Out of stock",
                            selected:
                                orderCancellationReason === 5 ? true : false,
                            click: () => setOrderCancellationReason(5)
                        },
                        {
                            Icon: ErrorIcon,
                            title: "Content error",
                            selected:
                                orderCancellationReason === 6 ? true : false,
                            click: () => setOrderCancellationReason(6)
                        },
                        {
                            Icon: ErrorIcon,
                            title: "Wrong price",
                            selected:
                                orderCancellationReason === 8 ? true : false,
                            click: () => setOrderCancellationReason(8)
                        }
                    ]}
                />

                <OptionsPopupDialog
                    open={reduceItemPopup}
                    title="Please provide a reason why you reducing or removing this item"
                    confirm={() => setReduceItemPopup(!reduceItemPopup)}
                    selectedStatus={orderCancellationReasonArray[productIndex]? true : false}
                    items={[
                        {
                            Icon: OutOfStockIcon,
                            title: "Out of stock",
                            selected:
                            orderCancellationReasonArray[productIndex] === 5 ? true : false,
                            click: () => {
                                const arr = [...orderCancellationReasonArray];
                                arr[productIndex] = 5;
                                setOrderCancellationReasonArray(arr);
                            }
                        },
                        {
                            Icon: ErrorIcon,
                            title: "Content error",
                            selected:
                            orderCancellationReasonArray[productIndex] === 6 ? true : false,
                            click: () => {
                                const arr = [...orderCancellationReasonArray];
                                arr[productIndex] = 6;
                                setOrderCancellationReasonArray(arr);
                            }
                        },
                        {
                            Icon: ErrorIcon,
                            title: "Wrong price",
                            selected:
                            orderCancellationReasonArray[productIndex] === 8 ? true : false,
                            click: () => {
                                const arr = [...orderCancellationReasonArray];
                                arr[productIndex] = 8;
                                setOrderCancellationReasonArray(arr);
                            }
                        }
                    ]}
                />
            </SlidingOverlay>
        )
    );
};

OrderDetials.propTypes = {
    merchantId: string,
    inventory: any,
    businessId: string,
    open: bool,
    setOpen: func,
    fetchOrderDetails: any,
    createSale: func,
    processOrder: func
};

export default OrderDetials;
