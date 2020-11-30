import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import History from "../../../../../utils/History";

import { toast } from "react-toastify";
import styled from "styled-components";
import {
    TopHeader,
    Loader,
    RippleButton,
    PageLogo,
    RippleLink,
    ConfirmPopupDialog,
    CouponCodePopup,
    PaymentMethodPopup,
    usePaystackPayment
} from "../../../../../components";
import { UpdateDeliveryDetails, ShippingCompany } from "../../components/";
import {
    FlexCenteredBlock,
    ScreenContainer
} from "../../../../../containers/ScreenContainer";
import {
    Title,
    SecondaryText
} from "../../../../../containers/MessageContainer";
import { merchbuyActions } from "../../../../../redux/ducks/applications/merchbuy/actions";

import {
    List,
    ListItemNoDivider,
    ListHeading,
    ListLeftBlock,
    ListSubHeading
} from "../../../../../containers/ListContainer";

import {
    SubList,
    SubListHeading,
    SubListValue
} from "../../../../../containers/CheckoutContainer";

import { DetailsBusinessDescription } from "../../../../../containers/DetailsContainer";

import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";
import {
    sortCartItems
} from "../../utils/sortCartItems";

import { ReactComponent as CartbasketIcon } from "../../assets/shopping-cart-basket.svg";
// import CheckedSVG from "../../assets/checkmark.svg";
//import { colors } from "../../../../../styles/variables";

import {
    Space,
    Container,
    Divider,
    PageSubSectionsTop,
    PageSubSectionsTopLeft,
    PageSubSectionsTopLeftTitle,
    TrashIcon
} from "../../styles";
import { SetAvailableQuantity } from "./set-available-quantity";
import SupermarketIcon from "../../assets/supermarket.svg";
import { ReactComponent as Wallet } from "../assets/wallet.svg"
import { ReactComponent as Paystack } from "../assets/paystack.svg";
//import { ReactComponent as Bus } from "../assets/delivery_bus.svg";
import { ReactComponent as ArrowForward } from "../assets/arrow.svg";

const ListItemChild = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding-top: 8px;
    opacity: ${({ grayOut }) => grayOut || null};
`;

const ModifiedListItem = styled(ListItemNoDivider)``;

const ModifiedDetailsBusinessDescription = styled(DetailsBusinessDescription)`
    padding: 16px 12px;
`

const ModifiedContainer = styled(Container)`
    width: 100%;
`;

const SectionBlock = styled.section`
    position: relative;
    font-size: 10px;
    margin-top: 36px;
`;

const TotalAmount = styled(ListSubHeading)`
    font-weight: 700;
    color: #212c3d;
    font-size: 12px;
`;

const Text = styled.span`
    font-size: 12px;
    line-height: 1.5;
    padding: 0 10px;
    display: block;
`;

const SmallText = styled.p`
    font-size: 10px;
    color: #77858f;
    padding 0;
    margin: 0
`;

const ShopBlock = styled.section`
    margin: 0 16px;
`;

const ShopName = styled.p`
    font-size: 12px;
    color: #29394f;
    margin: 8px 0;
`;

const TitleText = styled.p`
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 4px;
`;

const BoldText = styled.span`
    font-size: 14px;
    font-weight: 700;
    display: block;
    padding: 4px 10px;
`;

const PaymentMethodText = styled(Text)`
    font-size: 12px;
    font-weight: 500;
    padding: 0;
    color: #56636d;
`;

const PaymentMethodBalanceText = styled(Text)`
    font-size: 10px;
    font-weight: 400;
    color: #56636d;
    padding: 0;
`;

const paystackKey = process.env.REACT_APP_PAYSTACK_KEY;

const ChangeDeliveryText = styled(Text)`
    color: #579fd7;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
`;

const CartItems = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.applications.merchbuy.shopCart);
    const walletBalance = useSelector(state => state.account.wallet.balance || 0);
    const shippingOptions = useSelector(state => state.applications.merchbuy.shippingOptions || []);
    const deliveryLocation = useSelector(state => state.applications.merchbuy.deliveryLocation);
    const isLoading = useSelector(state => state.applications.merchbuy.processingOrder);
    const user = useSelector(state => state.user);
    const shopInfo = useSelector(state => state.applications.myShop.shops[0]);
    const [deliveryStateLga] = useState(JSON.parse(localStorage.getItem("deliveryLocation")));
    const [deliveryDetails, setDeliveryDetails] = useState(
        deliveryLocation && Object.entries(deliveryLocation).length !== 0 ?
        deliveryLocation :
        {
            receiverName: user && user.firstName + " " + user.lastName,
            shopName: shopInfo && shopInfo.shopName,
            streetAddress: shopInfo && shopInfo.streetAddress,
            lga: deliveryStateLga && deliveryStateLga.lga,
            state: deliveryStateLga && deliveryStateLga.state,
            msisdn: shopInfo && shopInfo.businessPhoneNumber,
            instruction: ""
        }
    );
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deliveryDetailsPopup, setDeliveryDetailsPopup] = useState(false);
    const [couponCodePopup, setCouponCodePopup] = useState(false);
    const [paymentMethodPopup, setPaymentMethodPopup] = useState(false);
    const [subTotal, setSubTotal] = useState(
        cartItems.reduce(
            (accum, current) =>
                Number(accum) +
                Number(current.product.maxPrice) * Number(current.quantity),
            0
        )
    );
    const [totalQuantity, setTotalQuantity] = useState(
        cartItems.reduce(
            (accum, current) =>
                Number(accum) + Number(current.quantity),
            0
        )
    );
    const [deliveryFee, setDeliveryFee] = useState(0);
    //const [serviceCharge, setServiceCharge] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [carts, setCarts] = useState([...cartItems]);
    const [productInView, setProductInView] = useState("");
    const [selectedShippingOption, setSelectedShippingOption] = useState({});
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({})

    //const buttonIsLoading = useSelector(state => state.applications.merchbuy.isLoading);
    // const serviceChargePercentage = useSelector(
    //     state => state.applications.merchbuy.serviceChargePercentage / 100
    // );

    useEffect(() => {
        setCarts([...cartItems]);
    }, [cartItems, setCarts]);

    useEffect(() => {
        //const sc = subTotal * serviceChargePercentage;
        //setServiceCharge(sc);
        //setTotalPrice(subTotal + sc + deliveryFee);
        setTotalPrice(subTotal + deliveryFee);
    }, [
        subTotal,
        setTotalPrice,
        deliveryFee,
        //setServiceCharge,
        //serviceChargePercentage
    ]);

    useEffect(() => {
        getShippingPrice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(!(deliveryLocation && Object.entries(deliveryLocation).length !== 0)){
            dispatch(merchbuyActions.updateDeliveryLocation(deliveryDetails));
        }
    }, [deliveryLocation, dispatch, deliveryDetails]);

    const paymentMethods = [
        {
            Icon: Wallet,
            name: "Spaces Wallet",
            amount: walletBalance
        },
        {
            Icon: Paystack,
            name: "Payment Gateway"
        }
        // {
        //     Icon: Bus,
        //     name: "Payment on Delivery"
        // }
    ];

    const payload = {
        location: {
            destination: {
                address: deliveryDetails.streetAddress,
                city: deliveryDetails.state,
                country: "NG",
                email: "",
                name: deliveryDetails.receiverName,
                phone: deliveryDetails.msisdn,
                state: deliveryDetails.state
            },
            origin: {
                address: "",
                city: "Lagos",
                country: "NG",
                email: "",
                name: "",
                phone: "",
                state: "Lagos"
            }
        },
        shipmentInfo: [
            {
                quantity: totalQuantity,
                weight: 1
            }
        ]
    };
    
    const updateCart = data => {
        const newSubTotal = data.reduce(
            (accum, current) =>
                Number(accum) + Number(current.product.maxPrice) * Number(current.quantity), 0
        );
        const newTotalQuantity = data.reduce(
            (accum, current) => Number(accum) + Number(current.quantity), 0
        );
        setSubTotal(newSubTotal);
        setTotalQuantity(newTotalQuantity);
        setSelectedShippingOption({})
        setSelectedPaymentMethod({})
        dispatch(merchbuyActions.updateCartLocally(data));
        getShippingPrice();
    };

    const deleteItems = () => {
        dispatch(merchbuyActions.deleteItemFromCart(productInView)).then((deleted) => {
            if(deleted){
                const idx = cartItems.findIndex(
                    x => x.product.id === productInView
                );
                cartItems.splice(idx, 1);
                const newSubTotal = [...cartItems].reduce(
                    (accum, current) =>
                        Number(accum) + Number(current.product.maxPrice) * Number(current.quantity), 0
                );
                const newTotalQuantity = [...cartItems].reduce(
                    (accum, current) => Number(accum) + Number(current.quantity), 0
                );
                setSubTotal(newSubTotal);
                setTotalQuantity(newTotalQuantity);
                setSelectedShippingOption({})
                setSelectedPaymentMethod({})
                getShippingPrice();
            }
        });
    };

    const getShippingPrice = () => {
        if (totalQuantity > 0) {
            dispatch(merchbuyActions.getWareNextShippingPrices(payload));
        } else {
            dispatch(merchbuyActions.updateShippingLocally([]));
        }
    }

    const openPaymentOption = () => {
        return (
            deliveryDetails && 
            Object.entries(deliveryDetails).length !== 0 && 
            selectedShippingOption && 
            Object.entries(selectedShippingOption).length !== 0
        )
    }

    const isValid = (input) => {
       return input && Object.entries(input).length;
    }

    const canUserPayWithWallet = () => {
        return walletBalance >= totalPrice
    }

    const switchShippingOptions = shippingOptions
        .map(data => ({
            Icon: "",
            deliveryFee: data.totalAmount,
            partner: data.partner,
            deliveryOption: 1,
            productName: data.productName,
            pickupDate: data.pickupDate,
            deliveryDate: data.deliveryDate
        }))
        .concat({
            Icon: "",
            deliveryFee: 0,
            partner: "Pickup from location",
            deliveryOption: 2
        });

   const PlaceOrderHook = () => {
        const dispatch = useDispatch();
        const initializePayment = usePaystackPayment();

        const placeOrder = async () => {
            let products = [];
            const items = [...carts];
            for (let i = 0; i < items.length; i++) {
                const data = {
                    itemId: items[i].product.id,
                    quantity: items[i].quantity
                };
                products.push(data);
            }

            const order = {
                products: products,
                orderDelivery: {
                    firstName: deliveryDetails.receiverName,
                    lastName: "",//deliveryDetails.receiverName,
                    phoneNumber: deliveryDetails.msisdn,
                    address: deliveryDetails.streetAddress,
                    state: deliveryDetails.state,
                    lga: deliveryDetails.lga,
                    deliveryOption: selectedShippingOption.deliveryOption,
                    deliveryCharge: selectedShippingOption.deliveryFee,
                    deliveryCompany: selectedShippingOption.partner,
                    subTotal: subTotal,
                    serviceCharge: 0, //serviceCharge,
                    total: totalPrice
                }
            };
 
            if(!isValid(selectedShippingOption)){
                return {
                    status: false,
                    message: "Please select a shipping option",
                };
            }
            else if(!isValid(selectedPaymentMethod)) {
                return {
                    status: false,
                    message: "Please select a payment option",
                };
            }
            else return dispatch(
                merchbuyActions.placeOrder(
                    order,
                    selectedPaymentMethod.value.name
                )
            );
        };

        return (
            <div>
                <RippleButton
                    top={"1px"}
                    disabled={
                        !carts.length || 
                        !isValid(selectedShippingOption)
                    }
                    onClick={async () => {
                        const response = await placeOrder();
                        if (response.status) {
                            if(response.paymentType === "Payment Gateway") {
                                const config = {
                                    email: response.order.email,
                                    amount: response.order.totalPrice * 100,
                                    publicKey: paystackKey,
                                    firstname: response.order.firstname,
                                    lastname: response.order.lastname
                                }
                                initializePayment(
                                    config,
                                    (reference) => {
                                        const paymentDetail = {
                                            orderId: response.order.id,
                                            partnerCode: "",
                                            payment: {
                                                deliveryCharge: response.order.deliveryFee,
                                                email: response.order.email,
                                                message: "",
                                                paymentMethod: 2,
                                                redirecturl: "",
                                                reference: reference.reference,
                                                response: "",
                                                responseString: "",
                                                serviceCharge: 0, //serviceCharge,
                                                status: "",
                                                subTotal: response.order.subTotal,
                                                total: response.order.totalPrice,
                                                transactionId: reference.trans,
                                                transactionReference: reference.trxref
                                            },
                                            referralCode: ""
                                        };
                                        //Save transaction reference
                                        dispatch(
                                            merchbuyActions.sendPaymentDetails(
                                                paymentDetail//, response.order.deliveryOption, payload
                                            )
                                        );
                                    },
                                    () => {
                                        console.log("closed");
                                    }
                                );
                            } else {
                                dispatch(
                                    merchbuyActions.payWithWallet(
                                        response
                                    )
                                );
                            }
                        } else toast.error(response.message);
                    }}
                >
                    Place Order
                </RippleButton>
            </div>
        );
    };


    if (isLoading) {
        return <Loader />;
    } else
        return (
            <Fragment>
                {carts && carts.length === 0 ? (
                    <Fragment>
                        <TopHeader title={`Cart (${carts && carts.length})`} withSpacesHeader />
                        <ScreenContainer>
                            <FlexCenteredBlock top={"30px"}>
                                <Space height={"80px"} />
                                <CartbasketIcon />
                                <Space height={"32px"} />

                                <Title>Your shopping cart is empty</Title>

                                <RippleButton
                                    top={"110px"}
                                    onClick={() =>
                                        History.push("/actions/merchbuy")
                                    }
                                >
                                    Continue shopping
                                </RippleButton>
                            </FlexCenteredBlock>
                        </ScreenContainer>
                    </Fragment>
                ) : (
                    <Fragment>
                        <TopHeader title={`Cart (${carts && carts.length})`} withSpacesHeader backLink={"/actions/merchbuy/"}/>
                        <ScreenContainer padding={"1em 1em 55px"}>
                            {/* <TopHeader
                                title={`Cart (${carts && carts.length})`}
                            >
                                {confirmedItems.length > 0 && (
                                    <TrashIcon
                                        onClick={() => setConfirmDelete(true)}
                                    />
                                )}
                            </TopHeader> */}
                            <ModifiedContainer>
                                <Space height={"50px"} />
                                <PageSubSectionsTop padding={"8px 0"}>
                                    <PageSubSectionsTopLeft>
                                        <PageSubSectionsTopLeftTitle left={"0"}>
                                            Delivery Details
                                        </PageSubSectionsTopLeftTitle>
                                    </PageSubSectionsTopLeft>
                                    <ChangeDeliveryText
                                        onClick={() => {
                                            setDeliveryDetailsPopup(true);
                                        }}
                                    >
                                        Change
                                    </ChangeDeliveryText>
                                </PageSubSectionsTop>
                                <ModifiedDetailsBusinessDescription top={"8px"}>
                                    <SecondaryText style={{ margin: "0" }}>
                                        <BoldText>
                                            {deliveryDetails.receiverName}
                                        </BoldText>
                                        <Text>
                                            {deliveryDetails.shopName +
                                                ", " +
                                                deliveryDetails.streetAddress}
                                         </Text>
                                        <Text>
                                            {deliveryDetails.lga + " L.G.A"}
                                        </Text>
                                        <Text>
                                            {deliveryDetails.state + " State"}
                                        </Text>
                                        <Text>
                                            {deliveryDetails.msisdn}
                                        </Text>
                                    </SecondaryText>
                                </ModifiedDetailsBusinessDescription>

                                <TitleText>Order Details</TitleText>
                                <SmallText>
                                    {carts && `${carts.length} Item(s)`}
                                </SmallText>
                                <Divider
                                    top={"8px"}
                                    bottom={"8px"}
                                />
                                <List
                                    noBorderBottom={true}
                                    fullScreen
                                >
                                    {sortCartItems(carts).map((shop, i) => (
                                        <ShopBlock key={i}>
                                            <ShopName>{shop.shopName}</ShopName>
                                            {shop.items.map(
                                                (product, index) => (
                                                    <ModifiedListItem
                                                        key={index}
                                                        top={"4px"}
                                                        bottom={"4px"}
                                                        direction={"column"}
                                                    >
                                                        <ListItemChild>
                                                            {/* <Radio
                                                                name={"filter"}
                                                                type={
                                                                    "checkbox"
                                                                }
                                                                onClick={() => {
                                                                    SelectFromCart(
                                                                        product
                                                                    );
                                                                }}
                                                                defaultChecked={confirmedItems.find(
                                                                    x =>
                                                                        x.product.id ===
                                                                        product.product.id
                                                                )}
                                                            /> */}
                                                            <PageLogo
                                                                width={"32px"}
                                                                height={"32px"}
                                                                iconWidth={
                                                                    "32px"
                                                                }
                                                                iconHeight={
                                                                    "32px"
                                                                }
                                                                Icon={
                                                                    product
                                                                        .product
                                                                        .image
                                                                }
                                                                fallback={
                                                                    SupermarketIcon
                                                                }
                                                            />
                                                            <ListLeftBlock>
                                                                <ListHeading maxWidth={'70px'}>
                                                                    {
                                                                       product.product && product
                                                                            .product
                                                                            .name.toLowerCase()
                                                                    }
                                                                </ListHeading>
                                                                <ListSubHeading>
                                                                    {product
                                                                        .product
                                                                        .maxPrice &&
                                                                        formatPrice(
                                                                            product
                                                                                .product
                                                                                .maxPrice
                                                                        ) +
                                                                            "/" +
                                                                            product
                                                                                .product
                                                                                .unitValue}
                                                                </ListSubHeading>
                                                            </ListLeftBlock>
                                                            <SetAvailableQuantity
                                                                productQuantity={
                                                                    product.quantity
                                                                }
                                                                updateCart={
                                                                    updateCart
                                                                }
                                                                productId={
                                                                    product
                                                                        .product
                                                                        .id
                                                                }
                                                                carts={carts}
                                                                moq={
                                                                    product
                                                                        .product
                                                                        .moq
                                                                }
                                                                // confirmedStatus={confirmedItems.find(
                                                                //     x =>
                                                                //         x.product.id ===
                                                                //         product.product.id
                                                                // )}
                                                            />
                                                            <TrashIcon
                                                                onClick={() => {
                                                                    setProductInView(
                                                                        product
                                                                            .product
                                                                            .id
                                                                    );
                                                                    setConfirmDelete(
                                                                        true
                                                                    );
                                                                }}
                                                            />
                                                        </ListItemChild>
                                                    </ModifiedListItem>
                                                )
                                            )}
                                        </ShopBlock>
                                    ))}
                                </List>

                                <Divider top={"16px"} bottom={"16px"} />

                                <SectionBlock>
                                    <SubList>
                                        <SubListHeading>
                                            SubTotal
                                        </SubListHeading>
                                        <SubListValue weight={"300"}>
                                            {formatPrice(subTotal)}
                                        </SubListValue>
                                    </SubList>
                                    <SubList>
                                        <SubListHeading>
                                            Delivery fee
                                        </SubListHeading>
                                        <SubListValue weight={"300"}>
                                            {formatPrice(deliveryFee)}
                                        </SubListValue>
                                    </SubList>
                                    {/* <SubList>
                                        <SubListHeading>
                                            {"Service Charge (" +
                                                serviceChargePercentage * 100 +
                                                "%)"}
                                        </SubListHeading>
                                        <SubListValue weight={"300"}>
                                            {formatPrice(serviceCharge)}
                                        </SubListValue>
                                    </SubList> */}
                                    <SubList>
                                        <TotalAmount>TOTAL TO PAY</TotalAmount>
                                        <SubListValue>
                                            {formatPrice(totalPrice)}
                                        </SubListValue>
                                    </SubList>
                                </SectionBlock>
                                <Divider top={"16px"} bottom={"8px"} />
                                <ShippingCompany
                                    availableShippingOptions={switchShippingOptions}
                                    currentShippingOption={selectedShippingOption}
                                    selectedShippingOption={value => {
                                        setSelectedShippingOption(value);
                                        setDeliveryFee(value.deliveryFee);
                                    }}
                                />
                                {/* <Divider top={"16px"} bottom={"24px"} />
                                <RippleButton
                                    top={"1px"}
                                    style={{
                                        color: colors.myShop.orders.text,
                                        backgroundColor: colors.myShop.orders.bg
                                    }}
                                    onClick={() => {
                                        setCouponCodePopup(true);
                                    }}
                                >
                                    Apply Coupon Code
                                </RippleButton> */}
                                <Divider top={"11px"} bottom={"0px"} />
                                <RippleLink
                                    to={() => {}}
                                    onClick={() => {
                                        if(openPaymentOption()){
                                            setPaymentMethodPopup(true);
                                        }
                                    }}
                                >
                                    <PageSubSectionsTop padding={"16px 0"}>
                                        <PageSubSectionsTopLeft>
                                            <PageSubSectionsTopLeftTitle  left={"0"}>
                                                Payment method
                                            </PageSubSectionsTopLeftTitle>
                                        </PageSubSectionsTopLeft>
                                       <ArrowForward />
                                    </PageSubSectionsTop>
                                </RippleLink>
                                <PaymentMethodText> 
                                    {selectedPaymentMethod &&
                                        selectedPaymentMethod.value &&
                                        selectedPaymentMethod.value.name}
                                </PaymentMethodText>
                                {(selectedPaymentMethod &&
                                    selectedPaymentMethod.value &&
                                        selectedPaymentMethod.value.amount 
                                        !== undefined) && (
                                     <PaymentMethodBalanceText>
                                     {selectedPaymentMethod &&
                                         selectedPaymentMethod.value &&
                                         selectedPaymentMethod.value.amount &&
                                         "Balance: " +
                                             formatPrice(
                                                 selectedPaymentMethod.value
                                                     .amount
                                             )}
                                    </PaymentMethodBalanceText>
                                )}
                                <Divider top={"8px"} bottom={"8px"} />
                                <PlaceOrderHook/>
                            </ModifiedContainer>
                        </ScreenContainer>
                        <ConfirmPopupDialog
                            open={confirmDelete}
                            title={"Are you sure you want to remove this product?"}
                            confirmationText={
                                "Removing a product will remove it from the cart."
                            }
                            answers={[
                                {
                                   variant: "No",
                                    action: () => {
                                        setConfirmDelete(false);
                                    }
                                },
                                {
                                    variant: "Yes",
                                    action: () => {
                                        deleteItems();
                                        setConfirmDelete(false);
                                    }
                                }
                            ]}
                        />
                        <UpdateDeliveryDetails
                            open={deliveryDetailsPopup}
                            cancel={() =>
                                setDeliveryDetailsPopup(!deliveryDetailsPopup)
                            }
                            receiverName={deliveryDetails.receiverName}
                            shopName={deliveryDetails.shopName}
                            streetAddress={deliveryDetails.streetAddress}
                            lga={deliveryDetails.lga}
                            state={deliveryDetails.state}
                            msisdn={deliveryDetails.msisdn}
                            instruction={deliveryDetails.instruction}
                            getDeliveryDetails={values => {
                                setDeliveryDetails(values);
                                setDeliveryDetailsPopup(!deliveryDetailsPopup);
                            }}
                        />
                        <CouponCodePopup
                            open={couponCodePopup}
                            cancel={() => setCouponCodePopup(!couponCodePopup)}
                            setCouponCode={code => {
                                setCouponCodePopup(!couponCodePopup);
                            }}
                        />

                        <PaymentMethodPopup
                            open={paymentMethodPopup}
                            setOpen={setPaymentMethodPopup}
                            items={paymentMethods}
                            selected={selectedPaymentMethod}
                            confirm={(value, index) => {
                                if(index !== 0) {
                                    setSelectedPaymentMethod({
                                        value: value,
                                        index: index
                                    });
                                } else {
                                    if(canUserPayWithWallet()){
                                        setSelectedPaymentMethod({
                                            value: value,
                                            index: index
                                        });
                                    } else {
                                        toast.error("Insufficent Wallet Balance");
                                    }
                                }
                            }}
                        />

                    </Fragment>
                )}
            </Fragment>
        );
};

export default CartItems;
