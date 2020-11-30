import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import { connect, useSelector } from 'react-redux';
import { deleteCustomer } from '../../../../../redux/ducks/applications/my-shop/actions/customers';
import { formatCreationDate } from '../../../../../utils/date/formatCreationDate';
import { countAmount } from '../../../../../utils/currency/countAmount';

import { ActivityBlock } from '../../../../home/performance/performance-page/styles';
import { TopHeader, UserAvatar, PageLogo, OptionsPopupDialog, ConfirmPopupDialog } from '../../../../../components';
import { Close, Options } from '../../../../../containers/HeaderContainer';
import { ScreenContainer, FlexCenteredBlock } from '../../../../../containers/ScreenContainer';
import { SlidingOverlay } from '../../../../../containers/OverlayContainer';
import { ListHeading, ListItem } from '../../../../../containers/ListContainer';
import {
    DetailsName,
    DetailsDate,
    DetailsContactOption,
    DetailsContactText,
    DetailsContactBlock,
    DetailsContactLink,
    DetailsBusinessDescription,
    DetailsBusinessDescriptionHeading,
    DetailsBadgeHeading,
    DetailsCommissionLink,
    DetailsBadgeCommisionsAmount
} from '../../../../../containers/DetailsContainer';
import { Badge } from '../../../../../containers/BadgeContainer';
import { SecondaryText, PageCount, CategoryRow, CategoryTitle, Message } from '../../../../../containers/MessageContainer';
import { ReactComponent as EditIcon } from '../../../../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/delete.svg';
import { ReactComponent as CurrencyIcon } from '../../../../../assets/currency.svg';
import { ReactComponent as ForwardArrowIcon } from '../../../../../assets/arrow.svg';
import PhoneIcon           from '../../../../../assets/phone.svg';
import SMSIcon             from '../../../../../assets/sms.svg';
import WhatsAppIcon        from '../../../../../assets/whatsapp.svg';
import InfoIcon            from '../../../../../assets/info.svg';

const DetailItem = styled(ListItem)`
    display: flex;
    flex-direction: column;
    margin-top: 4px;
    padding: 16px;
`;

const DetailValue = styled(SecondaryText)`
    color: ${colors.themeTextColor1};
    margin: 0;
`;

const ActivitiesBlock = styled.div`
    position: relative;
`;

const CustomerDetails = ({
    open,
    setOpen,
    customer,
    deleteCustomer
}) => {
    const { name, createdDate, id, phoneNumber } = customer;
    const [openOptions, setOpenOptions] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const sales = useSelector(state => state.applications.myShop.sales);
    const customerSales = sales
        .filter(sale => sale.salesInfo.customer && sale.salesInfo.customer.id === id)
        .map(sale => sale.salesInfo);

    return open && (
        <SlidingOverlay>
            <TopHeader title={"Customer’s Details"} withSpacesHeader noArrow>
                <Close left={"16px"} onClick={() => setOpen(!open)} />
                <Options right={"16px"} onClick={() => setOpenOptions(!openOptions)} />
            </TopHeader>
            <ScreenContainer>
                <FlexCenteredBlock top={"110px"}>
                    <UserAvatar
                        width={"72px"}
                        height={"72px"}
                        avatar={""}
                    />
                    <DetailsName>{name}</DetailsName>
                    <DetailsDate>Added: {formatCreationDate(createdDate)}</DetailsDate>
                    <DetailsContactBlock>
                        <DetailsContactOption>
                            <DetailsContactLink href={`tel:${phoneNumber}`}>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconHeight={"16px"}
                                    iconWidth={"16px"}
                                    Icon={PhoneIcon}
                                    top={"-12px"}
                                />
                                <DetailsContactText>Call Customer</DetailsContactText>
                            </DetailsContactLink>
                        </DetailsContactOption>
                        <DetailsContactOption>
                            <DetailsContactLink href={`sms:${phoneNumber}`}>
                                <PageLogo
                                    background={"#fbb97c33"}
                                    width={"32px"}
                                    height={"32px"}
                                    iconHeight={"16px"}
                                    iconWidth={"16px"}
                                    Icon={SMSIcon}
                                />
                                <DetailsContactText>Send An SMS</DetailsContactText>
                            </DetailsContactLink>
                        </DetailsContactOption>
                        <DetailsContactOption>
                            <DetailsContactLink href={`whatsapp://send?phone=${phoneNumber}`}>
                                <PageLogo
                                    background={"#64b16133"}
                                    width={"32px"}
                                    height={"32px"}
                                    iconHeight={"16px"}
                                    iconWidth={"16px"}
                                    Icon={WhatsAppIcon}
                                />
                                <DetailsContactText>Whatsapp Message</DetailsContactText>
                            </DetailsContactLink>
                        </DetailsContactOption>
                    </DetailsContactBlock>
                </FlexCenteredBlock>
                <DetailsBusinessDescription top={"24px"} noBottomPadding={true}>
                    <DetailsBusinessDescriptionHeading bottom={"16px"}>
                        <PageLogo
                            width={"32px"}
                            height={"32px"}
                            iconHeight={"16px"}
                            iconWidth={"16px"}
                            Icon={InfoIcon}
                        />
                        <ListHeading>User Information</ListHeading>
                    </DetailsBusinessDescriptionHeading>
                    {phoneNumber && (
                        <DetailItem>
                            <PageCount bottom={"4px"}>Phone number</PageCount>
                            <DetailValue top={"4px"}>{phoneNumber}</DetailValue>
                        </DetailItem>
                    )}
                    {customer.email && (
                        <DetailItem>
                            <PageCount bottom={"4px"}>Email</PageCount>
                            <DetailValue top={"4px"}>{customer.email}</DetailValue>
                        </DetailItem>
                    )}
                    {customer.homeAddress && Object.values(customer.homeAddress).every(value => value !== "") && (
                        <DetailItem>
                            <PageCount bottom={"4px"}>Home Address</PageCount>
                            <DetailValue top={"4px"}>{customer.homeAddress.address}</DetailValue>
                            <DetailValue top={"4px"}>{customer.homeAddress.lga} L.G.A.</DetailValue>
                            <DetailValue top={"4px"}>{customer.homeAddress.state} State.</DetailValue>
                        </DetailItem>
                    )}
                    {customer.officeAddress && Object.values(customer.officeAddress).every(value => value !== "") && (
                        <DetailItem>
                            <PageCount bottom={"4px"}>Office Address</PageCount>
                            <DetailValue top={"4px"}>{customer.officeAddress.address}</DetailValue>
                            <DetailValue top={"4px"}>{customer.officeAddress.lga} L.G.A.</DetailValue>
                            <DetailValue top={"4px"}>{customer.officeAddress.state} State.</DetailValue>
                        </DetailItem>
                    )}
                    {customer.bank && Object.values(customer.bank).every(value => value !== "") && (
                        <DetailItem>
                            <PageCount bottom={"4px"}>Bank Account</PageCount>
                            <DetailValue top={"4px"}>{customer.bank.name}</DetailValue>
                            <DetailValue top={"4px"}>{customer.bank.accountNumber}</DetailValue>
                        </DetailItem>
                    )}
                </DetailsBusinessDescription>
                <ActivitiesBlock>
                    <CategoryRow bottom={"16px"}>
                        <CategoryTitle noTransform>Activities</CategoryTitle>
                    </CategoryRow>
                    {(customerSales.length === 0) ? (
                        <ActivityBlock direction={"column"} style={{ alignItems: "center" }}>
                            <CurrencyIcon />
                            <Message align={"center"}>You have not carried out any activity. When you carry out an activity, the summary will be displayed here.</Message>
                        </ActivityBlock>
                    ) : (
                        <Badge
                            top={"24px"}
                            height={"69px"}
                            background={colors.themeColor5}
                        >
                            <DetailsBadgeHeading top={"0"}>Total Sales Received</DetailsBadgeHeading>
                            <DetailsBadgeCommisionsAmount>
                                {countAmount(customerSales, 'totalAmount')}
                            </DetailsBadgeCommisionsAmount>
                            <DetailsCommissionLink
                                to={{
                                    pathname: '/actions/shop_customers_sales',
                                    state: customerSales
                                }}
                            >
                                <ForwardArrowIcon />
                            </DetailsCommissionLink>
                        </Badge>
                    )}
                </ActivitiesBlock>
            </ScreenContainer>
            <OptionsPopupDialog
                open={openOptions}
                cancel={() => setOpenOptions(!openOptions)}
                title={"Options"}
                items={[
                    {
                        Icon: EditIcon,
                        title: "Edit Details",
                        link: "/actions/shop_customers_edit",
                        linkProp: customer
                    },
                    {
                        Icon: DeleteIcon,
                        title: "Delete Customer",
                        click: () => {
                            setOpenOptions(!openOptions);
                            setOpenConfirmDelete(!openConfirmDelete);
                        }
                    }
                ]}
            />
            <ConfirmPopupDialog
                open={openConfirmDelete}
                confirmationText={"Deleting a team doesn’t remove agents from your list."}
                title={"Are you sure you want to delete this customer?"}
                answers={[
                    {
                        variant: "No",
                        action: () => setOpenConfirmDelete(!openConfirmDelete)
                    },
                    {
                        variant: "Yes",
                        action: () => {
                            setOpenConfirmDelete(!openConfirmDelete);
                            setOpen(!open);
                            deleteCustomer(id);
                        }
                    }
                ]}
            />
        </SlidingOverlay>
    );
};

export default connect(
    null,
    { deleteCustomer }
)(CustomerDetails);