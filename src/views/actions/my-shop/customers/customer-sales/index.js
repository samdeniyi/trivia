import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parseTransactionsByDate } from '../../../../../utils/date/parseTransactionsByDate';
import { colors } from '../../../../../styles';
import { formatCreationDate } from '../../../../../utils/date/formatCreationDate';
import { formatPrice } from '../../../../../utils/currency/formatPriceWithComma';

import { TopHeader, DropdownList, PageLogo, RippleLink } from '../../../../../components';
import { ScreenContainer, ViewContainer } from '../../../../../containers/ScreenContainer';
import { List, ListLeftBlock, ListHeading, ListSubHeading, ListItem } from '../../../../../containers/ListContainer';
import { SaleBadges, SaleBadge, SoldToBlock, SaleInfo, SelectSaleBadge, SaleByText, SaleDate } from '../../containers/SaleBadgesContainer';
import { Message } from '../../../../../containers/MessageContainer';
import SaleIcon from "../../../../../assets/sale.svg";

const CustomerSales = ({
    location
}) => {
    const salesList = parseTransactionsByDate(location.state, "localSalesDate");
    const shops     = useSelector(state => state.applications.myShop.shops);

    return (
        <Fragment>
            <TopHeader title={"Sales"} />
            <ScreenContainer>
                <ViewContainer top={"0"}>
                    <Message top={"80px"} padding={"0 16px"} align={"left"}>
                        Showing all sales:
                    </Message>
                    {salesList && salesList.map((sales, index) => (
                        <DropdownList
                            key={index}
                            customList={true}
                            transactionList={sales.transactions}
                            title={sales.date}
                        >
                            <List fullScreen childLink>
                            {sales && sales.transactions.map((sale, index) => (
                                <RippleLink
                                    key={index}
                                    to={{
                                        pathname: "/actions/shop_sale_details",
                                        state: {
                                            sale,
                                            shopId: shops.find(shop => shop.branchId === sale.branchId).id
                                        }
                                    }}
                                >
                                    <ListItem
                                        key={index}
                                        pressedUpList
                                        top={"16px"}
                                        bottom={"16px"}
                                    >
                                        <PageLogo
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"32px"}
                                            iconHeight={"32px"}
                                            Icon={SaleIcon}
                                        />
                                        <ListLeftBlock>
                                            <ListHeading>
                                                Sales No. {sale.id}
                                            </ListHeading>
                                            <SaleBadges>
                                                <ListSubHeading>
                                                    {formatPrice(sale.totalAmount)}
                                                </ListSubHeading>
                                                <SelectSaleBadge type={sale.paymentCompleteStatus} />
                                                {sale.salesItemDetails && sale.salesItemDetails.length > 0 && (
                                                    <SaleBadge
                                                        bg={colors.blueish}
                                                        color={colors.blue}
                                                    >
                                                        {sale.salesItemDetails.length} Products
                                                    </SaleBadge>
                                                )}
                                            </SaleBadges>
                                            <SoldToBlock>
                                                {sale.salesPersonName && (
                                                    <SaleInfo>
                                                        <SaleByText>
                                                            Sale by:
                                                        </SaleByText>
                                                        <SaleBadge>{sale.salesPersonName}</SaleBadge>
                                                    </SaleInfo>
                                                )}
                                                {sale.customer && (
                                                    <SaleInfo>
                                                        <SaleByText>
                                                            Customer: {" "}
                                                        </SaleByText>
                                                        <SaleBadge>{sale.customer.name}</SaleBadge>
                                                    </SaleInfo>
                                                )}
                                            </SoldToBlock>
                                        </ListLeftBlock>
                                        <SaleDate>{formatCreationDate(sale.localSalesDate)}</SaleDate>
                                    </ListItem>
                                </RippleLink>
                            ))}
                            </List>
                        </DropdownList>
                    ))}
                    </ViewContainer>
            </ScreenContainer>
        </Fragment>
    );
};

export default withRouter(CustomerSales);