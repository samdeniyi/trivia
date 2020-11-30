import React, { Fragment, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { formatCreationDate } from '../../../../../utils/date/formatCreationDate';
import { deleteSale, updateSale } from '../../../../../redux/ducks/applications/my-shop/actions/sales';
import { formatPrice } from '../../../../../utils/currency/formatPriceWithComma';
import { insertCountryCode } from '../../../../../utils/inputs/formatPhoneNumber';
import { formatDateWithDash } from '../../../../../utils/date/formatDateWithDash';
import { countriesMap } from '../../../../../data/countries';

import CustomerDetails from '../../customers/customer-details';
import { TopHeader, PageLogo, AmountDue, RippleButton, UpdateIncompletePayment, ConfirmPopupDialog, OptionsPopupDialog } from '../../../../../components';
import { Options } from '../../../../../containers/HeaderContainer';
import { ScreenContainer, FlexCenteredBlock } from '../../../../../containers/ScreenContainer';
import { SubTitle, TransactionAmount, TransactionStatus } from '../../../../../containers/MessageContainer';
import { List, ListItem, ListSubHeading, ListHighlight, TransactionDetail } from '../../../../../containers/ListContainer';
import { SubListContainer, SubList, SubListHeading, SubListValue } from '../../../../../containers/CheckoutContainer';
import { colors } from '../../../../../styles';
import CartIcon from '../../../../../assets/sale.svg';
import { ReactComponent as DeleteIcon }         from '../../../../../assets/delete.svg';
import { ReactComponent as RequestPaymentIcon } from '../../../../../assets/add.svg';
import { ReactComponent as SmsIcon }            from '../../../../../assets/sms.svg';
import { ReactComponent as WhatsappIcon }       from '../../../../../assets/whatsapp.svg';

const ProfitValue = styled(SubListValue)`
    color: ${({ textColor }) => textColor || colors.myShop.profit.profit};
`;

 const SaleDetails = ({
    location,
    deleteSale,
    updateSale
}) => {
    const [openUpdatePayment, setOpenUpdatePayment] = useState(false);
    const [confirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
    const [openRequestPayment, setOpenRequestPayment] = useState(false);

    const sale   = location.state.sale;
    const shopId = location.state.shopId;
    const id = sale.salesInfo ? sale.salesInfo.id : sale.id;

    const saleStatus = sale.salesInfo ? sale.salesInfo.paymentCompleteStatus : sale.paymentCompleteStatus;
    const saleCompleteStatus = saleStatus ? "PAID" : "PENDING";
    const customerName = (sale.salesInfo && sale.salesInfo.customer) ? sale.salesInfo.customer.name : (sale.customer && sale.customer.name);
    const customerPhoneNumber = (sale.salesInfo && sale.salesInfo.customer) ? sale.salesInfo.customer.phoneNumber : (sale.customer && sale.customer.phoneNumber);
    const salesPersonName = sale.salesInfo ? sale.salesInfo.salesPersonName : sale.salesPersonName;
    const totalProfit = sale.profit ? sale.profit : 0;
    const totalAmount = sale.salesInfo ? sale.salesInfo.totalAmount : sale.totalAmount;
    const discount = sale.salesInfo ? sale.salesInfo.discount : sale.discount;
    const saleItemDetails = sale.salesInfo ? sale.salesInfo.salesItemDetails : sale.salesItemDetails;
    const salesDate = sale.salesInfo ? sale.salesInfo.localSalesDate : sale.localSalesDate;
    const amountOutstanding = sale.salesInfo ? sale.salesInfo.amountOutstanding : sale.amountOutstanding;
    const customerByPhoneNumber = useSelector(state => state.applications.myShop.customers)
        .find(customer => customer.phoneNumber === customerPhoneNumber);
    const shopName = useSelector(state => state.applications.myShop.shops)
        .find(shop => shop.id === shopId).shopName;
    const country = useSelector(state => state.user.country);
    const requestPaymentMessage = `Hello, your payment of ${formatPrice(amountOutstanding)} is  still pending on the purchase made from ${shopName} on ${formatDateWithDash(salesDate)}.\n Please endeavour to make payment as soon as possible.\n Thank you.`
    const whatsAppRequestPaymentLink = `https://wa.me/${encodeURIComponent(insertCountryCode(customerPhoneNumber, countriesMap.get(country).code))}?text=${encodeURIComponent(requestPaymentMessage)} `;

    const SaleOptions = (saleCompleteStatus === "PENDING" && customerName) ?
    [
        {
            Icon: RequestPaymentIcon,
            title: "Request Payment",
            click: () => {
                setOpenOptions(!openOptions)
                setOpenRequestPayment(!openRequestPayment)
            }
        },
        {
            Icon: DeleteIcon,
            title: "Delete Sale",
            click: () => setConfirmDeletionOpen(!confirmDeletionOpen)
        }
    ] : [
        {
            Icon: DeleteIcon,
            title: "Delete Sale",
            click: () => setConfirmDeletionOpen(!confirmDeletionOpen)
        }
    ];

    return (
        <Fragment>
            {!openCustomerDetails && (
                <TopHeader title={"Sale details"} withSpacesHeader>
                    <Options right={"16px"} onClick={() => setOpenOptions(!openOptions)} />
                </TopHeader>
            )}
            <ScreenContainer paddingBottom={"65px"} top={"60px"}>
                <FlexCenteredBlock>
                    <PageLogo
                        top={"8px"}
                        background={"transparent"}
                        width={"48px"}
                        height={"48px"}
                        iconWidth={"48px"}
                        iconHeight={"48px"}
                        Icon={CartIcon}
                    />
                    <SubTitle top={"8px"}>Sale No. {id}</SubTitle>
                    <TransactionAmount type={saleCompleteStatus}>{formatPrice(totalAmount)}</TransactionAmount>
                </FlexCenteredBlock>
                <List fullScreen>
                    <ListItem height={"48px"} top={"16px"}>
                        <ListSubHeading top={"0"}>Status</ListSubHeading>
                        <ListHighlight>
                            <TransactionStatus type={saleCompleteStatus}>
                                {saleCompleteStatus === "PAID" ? "Complete Sale" : "Incomplete Sale"}
                            </TransactionStatus>
                        </ListHighlight>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <ListSubHeading top={"0"}>Time stamp</ListSubHeading>
                        <TransactionDetail>{formatCreationDate(salesDate)}</TransactionDetail>
                    </ListItem>
                    <ListItem height={"96px"} top={"16px"}>
                        <SubListContainer>
                            {saleItemDetails && (
                                <SubList>
                                    <SubListHeading>Sale information</SubListHeading>
                                        <SubList direction={"column"}>
                                        {saleItemDetails.map((item, index) => (
                                            <SubList key={index} direction={"column"}>
                                                <SubListValue>{item.quantity}x {item.name}</SubListValue>
                                                <SubListHeading>{formatPrice(item.itemPrice)}</SubListHeading>
                                            </SubList>
                                        ))}
                                        </SubList>
                                </SubList>
                            )}
                            <SubList>
                                <SubListHeading>SubTotal</SubListHeading>
                                <SubListValue>{formatPrice(totalAmount + discount)}</SubListValue>
                            </SubList>
                            <SubList>
                                <SubListHeading>Discount</SubListHeading>
                                <SubListValue>{formatPrice(-discount)}</SubListValue>
                            </SubList>
                            {/* <SubList>
                                <SubListHeading>V.A.T. (5%)</SubListHeading>
                                <SubListValue>{formatPrice(totalAmount * 0.05)}</SubListValue>
                            </SubList> */}
                            <SubList>
                                <SubListHeading>TOTAL</SubListHeading>
                                <SubListValue>{formatPrice(totalAmount)}</SubListValue>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <ListSubHeading top={"0"}>Profit on sale</ListSubHeading>
                                <SubList direction={"column"}>
                                    <ProfitValue textColor={Math.sign(totalProfit) === -1 ? colors.myShop.profit.loss : colors.myShop.profit.profit }>
                                       {formatPrice(totalProfit)}
                                    </ProfitValue>
                                </SubList>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                    {customerName && (
                        <ListItem height={"48px"} top={"16px"} onClick={() => setOpenCustomerDetails(!openCustomerDetails)}>
                            <SubListContainer>
                                <SubList>
                                    <ListSubHeading top={"0"}>Customer</ListSubHeading>
                                    <SubList direction={"column"}>
                                        <SubListValue>{customerName}</SubListValue>
                                        <SubListHeading>{customerPhoneNumber}</SubListHeading>
                                    </SubList>
                                </SubList>
                            </SubListContainer>
                        </ListItem>
                    )}
                    <ListItem height={"48px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <ListSubHeading top={"0"}>Sale by</ListSubHeading>
                                <SubList direction={"column"}>
                                    <SubListValue>{salesPersonName}</SubListValue>
                                </SubList>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                </List>
                <SubTitle top={"16px"}>Amount due</SubTitle>
                <AmountDue amount={amountOutstanding} />
                {(saleCompleteStatus === "PENDING") && (
                    <RippleButton
                        type={"button"}
                        onClick={() => setOpenUpdatePayment(!openUpdatePayment)}
                    >
                        Update payment
                    </RippleButton>
                )}
                {openUpdatePayment && (
                    <UpdateIncompletePayment
                        open={openUpdatePayment}
                        setOpen={setOpenUpdatePayment}
                        updatePayment={updateSale}
                        salesInfo={sale.salesInfo || sale}
                    />
                )}
                {openCustomerDetails && (
                    <CustomerDetails
                        customer={customerByPhoneNumber}
                        open={openCustomerDetails}
                        setOpen={setOpenCustomerDetails}
                    />
                )}
                {openOptions && (
                    <OptionsPopupDialog
                        open={openOptions}
                        cancel={() => setOpenOptions(!openOptions)}
                        title={"Options"}
                        items={SaleOptions}
                    />
                )}
                {openRequestPayment && (
                    <OptionsPopupDialog
                        open={openRequestPayment}
                        cancel={() => setOpenRequestPayment(!openRequestPayment)}
                        title={"Request Payment"}
                        items={[
                            {
                                Icon: SmsIcon,
                                title: "via Message",
                                outsideLink: `sms:${customerPhoneNumber};?&body=${requestPaymentMessage}`
                            },
                            {
                                Icon: WhatsappIcon,
                                title: "via Whatsapp",
                                outsideLink: whatsAppRequestPaymentLink
                            },
                            {
                                Icon: WhatsappIcon,
                                title: "via image on Whatsapp",
                                link: "/actions/shop_sale_request_payment",
                                linkProp: { sale, shopId, whatsAppRequestPaymentLink }
                            }
                        ]}
                    />
                )}
                <ConfirmPopupDialog
                    open={confirmDeletionOpen}
                    title={"Are you sure you want to delete this sale?"}
                    confirmationText={"Deleting a sale will remove it from the list of sales."}
                    answers={[
                        {
                            variant: "No",
                            action: () => setConfirmDeletionOpen(!confirmDeletionOpen)
                        },
                        {
                            variant: "Yes",
                            action: () => {
                                setConfirmDeletionOpen(!confirmDeletionOpen);
                                setOpenOptions(!openOptions);
                                deleteSale(id);
                            }
                        }
                    ]}
                />
            </ScreenContainer>
        </Fragment>
    );
};

export default connect(
    null,
    {
        deleteSale,
        updateSale
    }
)(withRouter(SaleDetails));