import React, { memo, Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { func } from 'prop-types';
import { useSelector, connect } from 'react-redux';
import { colors } from '../../../../../styles';
import { createSale } from '../../../../../redux/ducks/applications/my-shop/actions/sales';
import { formatPrice } from '../../../../../utils/currency/formatPriceWithComma';
import { addProductOnTheFly } from '../../../../../redux/ducks/applications/my-shop/actions/shop';
import { withRouter, useHistory } from 'react-router-dom';

import { RippleButton, TopHeader, IntroductionPopup, ChooseTab, PageLogo, RippleInlineButton, ConfirmPopupDialog } from '../../../../../components';
import { ScreenContainer, FlexCenteredBlock } from '../../../../../containers/ScreenContainer';
import { Close } from '../../../../../containers/HeaderContainer';
import { SaleForm, SetSaleQuantity } from '../../components';
import { List, ListItem, ListLeftBlock, ListHeading, ListSubHeading } from '../../../../../containers/ListContainer';
import { Message, SecondaryText } from '../../../../../containers/MessageContainer';
import { ReactComponent as SimpleSaleLogo } from './assets/simple_sale.svg';
import { ReactComponent as AdvancedSaleLogo } from './assets/advanced_sale.svg';
import CartIcon from '../../../../../assets/cart.svg';
import SupermarketIcon from '../../assets/supermarket.svg';

const SaleInformationBlock = styled.div`
    position: relative;
    margin-top: 24px;
`;

const CountLabel = styled.h6`
    font-size: 10px;
    font-weight: 500;
    line-height: 13px;
    color: ${colors.themeColor6};
`;

const DetailsSection = styled.div`
    padding: ${({ padding }) => padding || null};
    margin: 16px 0;
    border-radius: 13px;
    border: 1px solid ${colors.gray3};
    min-height: 97px;
`;

const NameLabel = styled(SecondaryText)`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.themeTextColor1};
    margin: 24px 0 4px 0;
`;

const AddProductsInlineLink = styled(RippleInlineButton)`
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 500;
    font-size: 12px;
`;

const ProductNameHeading = styled(ListHeading)`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 120px;
`;

const AddSale = ({
    location,
    createSale,
    addProductOnTheFly
}) => {
    const history = useHistory();
    const { merchantId, branchId } = useSelector(state => state.applications.myShop.shops)[0];
    const currentShop = useSelector(state => state.applications.myShop.shops).filter(shop => shop.branchId === branchId)[0];
    const sales       = useSelector(state => state.applications.myShop.sales);
    const lastSaleType = (sales.length === 0 || !sales[0].salesInfo.salesItemDetails) ? "Simple Sale" : "Advanced Sale";
    const [selectedProducts, setSelectedProducts]            = useState([]);
    const [saleType, setSaleType]                            = useState(lastSaleType);
    const [openProductsList, setOpenProductsList]            = useState(false);
    const [confirmDeletionOpen, setOpenConfirmDeletionPopup] = useState(false);
    const [productIdToDelete, setProductIdToDelete]          = useState(null);
    const [simpleIntroduction, setSimpleIntroduction]        = useState(sales.length === 0);
    const [advancedIntroduction, setAdvancedIntroduction]    = useState(sales.length === 0);
    const [openSelectCustomer, setOpenSelectCustomer]        = useState(false);
    const [startTime, setStartTime]        = useState('');

    useEffect(() => {
        setStartTime(new Date())
    },[])

    return (
        <Fragment>
            {(!openProductsList && !openSelectCustomer) && (
                <TopHeader title={"Add a Sale"} withSpacesHeader noArrow>
                    <Close
                        left={"16px"}
                        onClick={() => history.goBack()}
                    />
                </TopHeader>
            )}
            {confirmDeletionOpen &&
                <ConfirmPopupDialog
                    open={confirmDeletionOpen}
                    title={"Are you sure you want to remove this product?"}
                    confirmationText={"Removing a product will remove it from the sale."}
                    answers={[
                        {
                            variant: "No",
                            action: () => setOpenConfirmDeletionPopup(!confirmDeletionOpen)
                        },
                        {
                            variant: "Yes",
                            action: () => {
                                setSelectedProducts(
                                    selectedProducts.filter(item => item.id !== productIdToDelete)
                                );

                                setOpenConfirmDeletionPopup(!confirmDeletionOpen)
                            }
                        }
                    ]}
                />
            }
            <ScreenContainer>
                <ChooseTab
                    top={"72px"}
                    defaultVariant={saleType === "Simple Sale" ? "left" : "right"}
                    variants={[
                        {
                            title: "Simple Sale",
                            callback: () => (saleType !== "Simple Sale") && setSaleType("Simple Sale")
                        },
                        {
                            title: "Advanced Sale",
                            callback: () => (saleType !== "Advanced Sale") && setSaleType("Advanced Sale")
                        }
                    ]}
                />
                {(saleType === "Simple Sale") ? (
                    <Fragment>
                        <SaleForm
                            openSelectCustomer={openSelectCustomer}
                            setOpenSelectCustomer={setOpenSelectCustomer}
                            type={saleType}
                            submit={values => {
                                createSale(merchantId, branchId, values, startTime)
                            }}
                        />
                        <IntroductionPopup
                            open={simpleIntroduction}
                            cancel={() => setSimpleIntroduction(!simpleIntroduction)}
                            title={"Simple sale"}
                            Logo={SimpleSaleLogo}
                            logoSpacing={"48px 24px 0 0"}
                            message={"Simple sale allows you to record just the amount collected for a sale. It also allows you save the details of a customer. "}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <SaleInformationBlock>
                            <NameLabel>Sale Information</NameLabel>
                            <CountLabel>{selectedProducts.length} Product(s)</CountLabel>
                            {(selectedProducts.length > 0) && (
                                <Fragment>
                                    <AddProductsInlineLink onClick={() => setOpenProductsList(!openProductsList)}>
                                        Add product(s)
                                    </AddProductsInlineLink>
                                    <List top={"16px !important"} fullScreen>
                                    {selectedProducts.map((product, index) => (
                                        <Swipeout
                                            key={index}
                                            right={[
                                            {
                                                text: 'Remove',
                                                onPress:() => {
                                                    setOpenConfirmDeletionPopup(!confirmDeletionOpen);
                                                    setProductIdToDelete(product.id);
                                                },
                                                style: { backgroundColor: '#e02020', color: 'white' },
                                                className: 'custom-class-2'
                                            }
                                            ]}
                                        >
                                            <ListItem top={"24px"} bottom={"24px"}>
                                                <PageLogo
                                                    width={"32px"}
                                                    height={"32px"}
                                                    iconWidth={"32px"}
                                                    iconHeight={"32px"}
                                                    Icon={product.base64ProductImageString}
                                                    fallback={SupermarketIcon}
                                                />
                                                <ListLeftBlock>
                                                    <ProductNameHeading>{product.name}</ProductNameHeading>
                                                    <ListSubHeading>{formatPrice(product.itemPrice)}</ListSubHeading>
                                                </ListLeftBlock>
                                                <SetSaleQuantity
                                                    selectedProducts={selectedProducts}
                                                    itemsInInventory={currentShop.inventory.find(item => item.inventoryProductId === product.inventoryProductId).quantity}
                                                    setProducts={setSelectedProducts}
                                                    inventoryProductId={product.inventoryProductId}
                                                />
                                            </ListItem>
                                        </Swipeout>
                                    ))}
                                    </List>

                                </Fragment>
                            )}
                        </SaleInformationBlock>
                        {selectedProducts.length === 0 && (
                            <DetailsSection padding={"32px 16px"}>
                                <FlexCenteredBlock>
                                    <PageLogo
                                        width={"88px"}
                                        height={"74px"}
                                        iconWidth={"88px"}
                                        iconHeight={"74px"}
                                        Icon={CartIcon}
                                        background={'none'}
                                    />
                                    <Message align={"center"}>Add a product to this sale by searching for the product or scanning the product’s barcode.</Message>
                                    <RippleButton
                                        type={"button"}
                                        onClick={() => setOpenProductsList(!openProductsList)}
                                    >
                                        Add product(s)
                                    </RippleButton>
                                </FlexCenteredBlock>
                            </DetailsSection>
                        )}
                        <SaleForm
                            type={saleType}
                            shopId={currentShop.id}
                            addProductOnTheFly={addProductOnTheFly}
                            inventory={currentShop.inventory}
                            openProductsList={openProductsList}
                            openSelectCustomer={openSelectCustomer}
                            setOpenSelectCustomer={setOpenSelectCustomer}
                            setOpenProductsList={setOpenProductsList}
                            selectedProducts={selectedProducts}
                            setSelectedProducts={setSelectedProducts}
                            submit={values => { 
                                createSale(merchantId, branchId, values, startTime)
                            }}
                        />
                        {(saleType === "Advanced Sale") && (
                            <IntroductionPopup
                                open={advancedIntroduction}
                                cancel={() => setAdvancedIntroduction(!advancedIntroduction)}
                                title={"Advanced sale"}
                                Logo={AdvancedSaleLogo}
                                logoSpacing={"48px 24px 0 0"}
                                message={"With advanced sale, you can record a sale by adding products from your inventory. It also allows you apply a discount to the sale."}
                            />
                        )}

                    </Fragment>
                )}
            </ScreenContainer>
        </Fragment>
    );
};

AddSale.propTypes = {
    createSale:         func,
    addProductOnTheFly: func
};

export default connect(
    null,
    {
        createSale,
        addProductOnTheFly
    }
)(memo(withRouter(AddSale)));
