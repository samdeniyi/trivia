import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";
import { colors } from "../../../../../styles";
import { countAmount } from "../../../../../utils/currency/countAmount";
import { parseTextCountRender, grammarSpellCheck } from "../../../../../utils/inputs/parseTextCountRender";
import { getInventory,deleteShop, updateBankAccountDetails, togglePaymentOptions, getShopInfoFromMerchapp } from "../../../../../redux/ducks/applications/my-shop/actions/shop";
import { getSales } from "../../../../../redux/ducks/applications/my-shop/actions/sales";
import { getOrders } from "../../../../../redux/ducks/applications/my-shop/actions/orders";
import { unparseBalance } from "../../../../../utils/currency/parseBalance";
import { toggleListingOptionsVisibility } from "../../../../../redux/ducks/applications/my-shop/actions/shop";

import {
    TopHeader,
    PageLogo,
    RippleButton,
    RippleLink,
    OptionsPopupDialog,
    ConfirmPopupDialog,
    CheckPopupDialog,
    StorefrontLinksPopup,
    StorefrontAddBankAccount,
    Loader
} from "../../../../../components";
import { Title, Message } from "../../../../../containers/MessageContainer";
import { ScreenContainer, FlexCenteredBlock } from "../../../../../containers/ScreenContainer";
import { Overlay } from "../../../../../containers/OverlayContainer";
import SaleIcon from "../../../../../assets/sale.svg";

import {
    List,
    ListLeftBlock,
    ListItem,
    ListHeading,
    ListSubHeading
} from "../../../../../containers/ListContainer";

import {
    SaleBadge,
    SaleBadges,
    SoldToBlock,
    SaleInfo,
    SaleByText,
    SelectSaleBadge
} from "../../containers/SaleBadgesContainer";

import {
    ShopContainer,
    ShopHeader,
    ShopBasicInfo,
    ShopContent,
    ShopContentItem,
    ShopContentData,
    ShopContentHeading,
    ShopContentAmount,
    ShopWarning,
    WarningTitleText,
    WarningCountBadge,
    ShopContentHeader,
    ShopStatsContainer,
    ShopTitleText,
    NoSalesContainer,
    OverlayOptions,
    OverlayRow,
    OverlayRowText
} from "./styles";
import InventoryIcon from "./assets/limited_stock.svg";
import SalesIcon from "./assets/cart.svg";
import OwedIcon from "./assets/list.svg";
import OrdersIcon from "./assets/order.svg";
import ShoppingIcon from "./assets/shopper.svg";
import { Settings } from "../../../../../containers/HeaderContainer";
//import { ReactComponent as SwitchShopIcon } from "./assets/switch_stores.svg";
//import { ReactComponent as AddOptionIcon } from "./assets/add.svg";
import { ReactComponent as AddShopIcon } from "./assets/add_shop.svg";
import { ReactComponent as AddOption } from "./assets/add.svg";
import { ReactComponent as CloseOverlayIcon } from "./assets/close_overlay.svg";
import { ReactComponent as CloseWarningIcon } from "./assets/close.svg";
import { ReactComponent as MarketplaceIcon } from './assets/marketplace.svg';
import { ReactComponent as PaymentIcon } from './assets/payment.svg';
import { ReactComponent as MerchIcon } from '../../../../../assets/merch_icon.svg';
import { ReactComponent as BankIcon } from '../../../../../assets/bank.svg';
import { ReactComponent as WalletIcon } from '../../../../../assets/wallet.svg';
import { ReactComponent as ShareIcon } from '../../../../../assets/share.svg';
import { ReactComponent as EditIcon } from "../../../../../assets/edit.svg";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import {
    SHOP_START_CREATE_PRODUCT,
    SHOP_START_CREATE_SALE
} from '../../../../../utils/mix-panel/constants';

// const SwitchShop = styled(SwitchShopIcon)`
//     cursor: pointer;
//     width: 32px;
//     height: 32px;
// `;

const AddOptionWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    position: fixed;
    bottom: 64px;
    right: 16px;
`;

const CloseOverlayWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    animation: floatButtons 0.2s ease forwards;
    @keyframes floatButtons {
        0% {
            opacity: 0;
            transform: scale(0) rotateZ(0deg);
        }

        20% {
            opacity: 0;
            transform: scale(1.1) rotateZ(-3deg) translateY(46px);
        }

        50% {
            transform: scale(0.8) rotateZ(5deg) translateY(-5px);
        }

        70% {
            transform: scale(1.1) rotateZ(-3deg) translateY(2px);
        }

        100% {
            opasity: 1;
            transform: scale(1) rotateZ(0deg) translateY(0px);
        }
    }
`;

const CloseOverlay = styled(CloseOverlayIcon)`
    cursor: pointer;
`;

const CloseWarning = styled(CloseWarningIcon)`
    position: absolute;
    top: -16px;
    right: 0;
    cursor: pointer;
`;

const MyShop = ({
    getSales,
    deleteShop,
    togglePaymentOptions,
    updateBankAccountDetails,
    toggleListingOptionsVisibility
}) => {
    const shops     = useSelector(state => state.applications.myShop.shops);
    const sales     = useSelector(state => state.applications.myShop.sales);
    const orders    = useSelector(state => state.applications.myShop.orders);
    const userId    = useSelector(state => state.user.userId);
    const isLoading = useSelector(state => state.applications.myShop.isLoading);
    const loadingOrders = useSelector(state => state.applications.myShop.loadingShopOrder);
    const [resolveLoading, setResolveloading] = useState(true);
    const dispatch = useDispatch();
    const [currentSales, setCurrentSales] = useState([]);
    const [shop, setShop] = useState(shops[0]);
    const [openOptions, setOpenOptions] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [switchShopOpen, setSwitchShopOpen] = useState(false);
    const [openOptionsOverlay, setOpenOptionsOverlay] = useState(false);
    const [openMarketplaceOptions, setOpenMarketplaceOptions] = useState(false);
    const [openSelectPaymentMethod, setOpenSelectPaymentMethod] = useState(false);
    const [openAddBankAccount, setOpenAddBankAccount] = useState(false);
    const [openShareLinks, setOpenShareLinks] = useState(false);

    const [merchlistVisible, setMerchlistVisible] = useState({
        oldState: (shop && shop?.listingOptions?.isOnMerchList) || false,
        newState: (shop && shop?.listingOptions?.isOnMerchList) || false
    });

    const [merchbuyVisible, setMerchbuyVisible] = useState({
        oldState: (shop && shop?.listingOptions?.isOnMerchBuy) || false,
        newState: (shop && shop?.listingOptions?.isOnMerchBuy) || false
    });

    const selectedPaymentMethod = (shop && shop?.paymentOption) || "";
    const userHasBank = (shop && shop.accountDetails &&
         Object.values(shop.accountDetails).some(value => value && value.length !== 0)) || false;

    const amountOwed =
        (shop && sales.length > 0) ?
        unparseBalance(countAmount(sales.map(sale => sale.salesInfo), "amountOutstanding")) : 0;

    //console.log(amountOwed)

    const amountSold =
        shop && sales.length > 0 ?
        unparseBalance(countAmount(sales.map(sale => sale.salesInfo), "totalAmount")) : 0;

    const itemsOutOfStock =
        shop && shop.inventory ?
        shop.inventory.filter(product => product.quantity === 0) : [];

    const [openWarning, setOpenWarning] = useState(shop && itemsOutOfStock.length > 0);
    const switchShopOptions =
    shops.length > 0 &&
        shops
            .map((thisShop, index) => ({
                title: thisShop.shopName,
                defaultChecked: index === 0,
                click: () => setShop(shops[index])
            }))
            .concat({
                Icon: AddShopIcon,
                title: "Add new shop",
                link: "/actions/shop_setup"
            })
            .reverse();

    useEffect(() => {
        if(shop && Object.keys(shop).includes('branchId')){
            dispatch(
                getShopInfoFromMerchapp(
                    shop.id,
                    shop.branchId
                )
            );
        }
    }, [shop, dispatch]);

    // useEffect(() => {
    //     setShop(shops[0]);
    // }, [shops]);

    useEffect(() => {
        const shop = shops[0];
        setMerchlistVisible({
            oldState: (shop && shop?.listingOptions?.isOnMerchList) || false,
            newState: (shop && shop?.listingOptions?.isOnMerchList) || false
        })
        setMerchbuyVisible({
             oldState: (shop && shop?.listingOptions?.isOnMerchBuy) || false,
             newState: (shop && shop?.listingOptions?.isOnMerchBuy) || false
        })
    }, [shops, setMerchlistVisible, setMerchbuyVisible]);

    useEffect(() => {
        shop && shop.branchId && getSales(shop.branchId);
    }, [shop, getSales]);

    useEffect(() => {
        dispatch(getInventory(shop && shop.id));
    }, [shop, dispatch]);

    useEffect(() => {
        shop && shop.branchId && dispatch(getOrders(shop));
    }, [shop, dispatch]);

    useEffect(() => {
        setCurrentSales(sales);
    }, [sales, setCurrentSales]);

    useEffect(() => {
        setTimeout(() => {
            (!isLoading && !loadingOrders) && setResolveloading(false)
             }, 2000);
      }, [isLoading, loadingOrders]);


    if (resolveLoading) {
        return <Loader />;
    } else

    return (
        <Fragment>
            {shops[0] && Object.keys(shops[0]).includes('branchId') ? (
                <Fragment>
                {(!openOptionsOverlay || !openAddBankAccount) && (
                    <TopHeader title={"My Shop"} backLink={"/"} withSpacesHeader>
                        <Settings right={"true"} onClick={() => setOpenOptions(!openOptions)} />
                    </TopHeader>
                )}
                <ScreenContainer paddingBottom={"65px"}>
                    <ShopContainer>
                        <ShopHeader>
                            <ShopBasicInfo>
                                <ShopTitleText>
                                    {shop && shop.shopName}
                                </ShopTitleText>
                            </ShopBasicInfo>
                            {/* <SwitchShop
                                onClick={() =>
                                    setSwitchShopOpen(!switchShopOpen)
                                }
                            /> */}
                        </ShopHeader>
                        {(shop && openWarning) && (
                            <ShopWarning>
                                <CloseWarning onClick={() => setOpenWarning(!openWarning)} />
                                <WarningTitleText bottom={"3px"}>
                                    <strong>
                                    {parseTextCountRender(itemsOutOfStock.length, "product")}
                                    </strong>
                                    {" "}
                                    {grammarSpellCheck(itemsOutOfStock.length)} out of stock
                                </WarningTitleText>
                            </ShopWarning>
                        )}
                        <ShopContent>
                            <RippleLink
                                to={{
                                    pathname: "/actions/shop_sales",
                                    state: shop && {
                                        branchId:   shop.branchId,
                                        merchantId: shop.merchantId,
                                        sales:      shop.sales
                                    }
                                }}
                            >
                                <ShopContentItem bg={colors.myShop.totalSales.bg}>
                                    <ShopContentHeader>
                                        <PageLogo
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"18px"}
                                            iconHeight={"20px"}
                                            Icon={SalesIcon}
                                            background={colors.white}
                                        />
                                    </ShopContentHeader>
                                    <ShopContentData>
                                        <ShopContentHeading color={colors.myShop.totalSales.text}>
                                            Total Sales
                                        </ShopContentHeading>
                                        <ShopContentAmount
                                            color={colors.myShop.totalSales.text}
                                        >
                                            {formatPrice(amountSold)}
                                        </ShopContentAmount>
                                    </ShopContentData>
                                </ShopContentItem>
                            </RippleLink>
                            <RippleLink
                                to={{
                                    pathname: "/actions/shop_sales",
                                    state: shop && {
                                        branchId:   shop.branchId,
                                        merchantId: shop.merchantId,
                                        sales:      shop.sales,
                                        filterType: "Incomplete Payment"
                                    }
                                }}
                            >
                            <ShopContentItem bg={colors.myShop.totalOwed.bg}>
                                <ShopContentHeader>
                                    <PageLogo
                                        width={"32px"}
                                        height={"32px"}
                                        iconWidth={"18px"}
                                        iconHeight={"20px"}
                                        Icon={OwedIcon}
                                        background={colors.white}
                                    />
                                </ShopContentHeader>
                                <ShopContentData>
                                    <ShopContentHeading color={colors.myShop.totalOwed.text}>
                                        Total Owed
                                    </ShopContentHeading>
                                    <ShopContentAmount
                                        color={colors.myShop.totalOwed.text}
                                    >
                                        {formatPrice(amountOwed)}
                                    </ShopContentAmount>
                                </ShopContentData>
                            </ShopContentItem>
                            </RippleLink>
                            <RippleLink
                                to={{
                                    pathname: "/actions/shop_inventory",
                                    state: shop && shop.id
                                }}
                            >
                                <ShopContentItem bg={colors.myShop.inventory.bg}>
                                    <ShopContentHeader>
                                        <PageLogo
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"18px"}
                                            iconHeight={"20px"}
                                            Icon={InventoryIcon}
                                            background={colors.white}
                                        />
                                        {itemsOutOfStock.length > 0 && (
                                            <WarningCountBadge>
                                                {itemsOutOfStock.length}
                                            </WarningCountBadge>
                                        )}
                                    </ShopContentHeader>
                                    <ShopContentData>
                                        <ShopContentHeading color={colors.myShop.inventory.text}>
                                            Inventory
                                        </ShopContentHeading>
                                        <ShopContentAmount color={colors.myShop.inventory.text}>
                                            {`${shop ? shop.inventory.length : 0} Products`}
                                        </ShopContentAmount>
                                    </ShopContentData>
                                </ShopContentItem>
                            </RippleLink>
                            <RippleLink to={"/actions/shop_orders"}>
                                <ShopContentItem bg={colors.myShop.orders.bg}>
                                    <ShopContentHeader>
                                        <PageLogo
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"18px"}
                                            iconHeight={"20px"}
                                            Icon={OrdersIcon}
                                            background={colors.white}
                                        />
                                    </ShopContentHeader>
                                    <ShopContentData>
                                        <ShopContentHeading color={colors.myShop.orders.text}>
                                            Orders
                                        </ShopContentHeading>
                                        <ShopContentAmount color={colors.myShop.orders.text}>
                                            {`${(shop && orders) ? orders.length : 0} Orders` }
                                        </ShopContentAmount>
                                    </ShopContentData>
                                </ShopContentItem>
                            </RippleLink>
                        </ShopContent>
                    </ShopContainer>
                    <ShopStatsContainer>
                    {sales.length > 0 ? (
                        <Fragment>
                            <ShopTitleText bottom={"16px"}>
                                Recent Sales
                            </ShopTitleText>
                            <List childLink fullScreen borderTop={"none"}>
                                {currentSales && currentSales
                                    .sort((a, b) =>
                                        new Date(b.salesInfo.localSalesDate).getTime() -
                                        new Date(a.salesInfo.localSalesDate).getTime()
                                    )
                                    .slice(0, 3)
                                    .map((sale, index) => (
                                        <RippleLink
                                            key={index}
                                            top={"16px"}
                                            bottom={"16px"}
                                            to={{
                                                pathname: "/actions/shop_sale_details",
                                                state: { sale: sales[index], shopId: shop && shop.id }
                                            }}
                                        >
                                            <ListItem
                                                pressedUpList
                                                key={index}
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
                                                        Sales No. {sale.salesInfo.id}
                                                    </ListHeading>
                                                    <SaleBadges>
                                                        <ListSubHeading>
                                                        {formatPrice(sale.salesInfo.totalAmount)}
                                                        </ListSubHeading>
                                                        <SelectSaleBadge
                                                            type={sale.salesInfo.paymentCompleteStatus}
                                                        />
                                                        {(sale.amount > 1) && (
                                                            <SaleBadge bg={colors.blueish} color={colors.blue}>
                                                                {sale.amount} Products
                                                            </SaleBadge>
                                                        )}
                                                    </SaleBadges>
                                                    <SoldToBlock>
                                                        {sale.salesInfo.salesPersonName && (
                                                            <SaleInfo>
                                                                <SaleByText>
                                                                    Sale by:
                                                                </SaleByText>
                                                                <SaleBadge>
                                                                {sale.salesInfo.salesPersonName}
                                                                </SaleBadge>
                                                            </SaleInfo>
                                                        )}
                                                        {sale.salesInfo.customerName && (
                                                            <SaleInfo>
                                                                <SaleByText>
                                                                    Customer:
                                                                </SaleByText>
                                                                <SaleBadge>
                                                                {sale.salesInfo.customerName}
                                                                </SaleBadge>
                                                            </SaleInfo>
                                                        )}
                                                    </SoldToBlock>
                                                </ListLeftBlock>
                                            </ListItem>
                                        </RippleLink>
                                    ))}
                            </List>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <ShopTitleText bottom={"16px"}>
                                Recent Sales
                            </ShopTitleText>
                            <NoSalesContainer>
                                <FlexCenteredBlock>
                                    <PageLogo
                                        Icon={ShoppingIcon}
                                            width={"95px"}
                                            height={"80px"}
                                            iconHeight={"auto"}
                                            iconWidth={"auto"}
                                            margin={"24px auto"}
                                        background={"inherit"}
                                    />
                                    <Message
                                        bottom={"24px"}
                                        top={"0"}
                                        align={"center"}
                                        padding={"0 1em"}
                                    >
                                        You’ve not recorded any sales.
                                        Your most recent sales will
                                        appear here.
                                    </Message>
                                </FlexCenteredBlock>
                            </NoSalesContainer>
                        </Fragment>
                    )}
                    </ShopStatsContainer>
                </ScreenContainer>               
                {openOptions && (
                    <OptionsPopupDialog
                        open={openOptions}
                        title={"Options"}
                        cancel={() => setOpenOptions(!openOptions)}
                        items={[
                            {
                                title: "Marketplace Visibility",
                                Icon: MarketplaceIcon,
                                more: true,
                                click: () => {
                                    setOpenOptions(!openOptions);
                                     setOpenMarketplaceOptions(!openMarketplaceOptions);
                                }
                            },
                            {
                                title: "Payment Method",
                                Icon: PaymentIcon,
                                more: true,
                                click: () => {
                                    setOpenOptions(!openOptions);
                                    setOpenSelectPaymentMethod(!openSelectPaymentMethod);
                                }
                            },
                            {
                                title: "Share Marketplace Links",
                                Icon: ShareIcon,
                                more: true,
                                click: () => {
                                    setOpenOptions(!openOptions);
                                    setOpenShareLinks(!openShareLinks);
                                }
                            },
                            {
                                title: "Edit Shop Details ",
                                Icon: EditIcon,
                                link: "/actions/shop_edit",
                                // click: () => {
                                //     setOpenOptions(!openOptions);
                                //     setOpenShareLinks(!openShareLinks);
                                // }
                            }
                        ]}
                    />
                )}
                {openMarketplaceOptions && (
                    <OptionsPopupDialog
                        open={openMarketplaceOptions}
                        title={"Marketplace Visibility"}
                        cancel={() => setOpenMarketplaceOptions(!openMarketplaceOptions)}
                        confirm={() => {
                            const isOnMerchBuy = merchbuyVisible.newState;
                            const isOnMerchList = merchlistVisible.newState;
                            //Apply it
                            setOpenMarketplaceOptions(!openMarketplaceOptions)
                            setMerchlistVisible({...merchlistVisible, newState: merchlistVisible.oldState})
                            setMerchbuyVisible({...merchbuyVisible, newState: merchbuyVisible.oldState})
                            toggleListingOptionsVisibility(shop && shop.id, isOnMerchBuy, isOnMerchList)
                        }}
                        selectedStatus={true}
                        items={[
                            {
                                title: "Merchlist",
                                Icon: MerchIcon,
                                checkStatus: merchlistVisible.newState,
                                switchStatus: () => {
                                    setMerchlistVisible({
                                        ...merchlistVisible,
                                        newState: !merchlistVisible.newState
                                    })
                                }
                            },
                            {
                                title: "MerchBuy",
                                Icon: MerchIcon,
                                checkStatus: merchbuyVisible.newState,
                                switchStatus: () => {
                                    setMerchbuyVisible({
                                        ...merchbuyVisible,
                                        newState: !merchbuyVisible.newState
                                    })
                                }
                            }
                        ]}
                    />
                )}
                {openShareLinks && (
                    <StorefrontLinksPopup
                        open={openShareLinks}
                        cancel={() => setOpenShareLinks(!openShareLinks)}
                        merchbuyLink={shops[0].listingOptions.isOnMerchBuy? "https://merchbuy.co/": ""}
                        merchlistLink={shops[0].listingOptions.isOnMerchList? "https://merchlist.co/"+ shops[0].slug: ""}
                    />
                )}
                {openSelectPaymentMethod && (
                    <CheckPopupDialog
                        open={openSelectPaymentMethod}
                        title={"Where do you want payment from an order to go?"}
                        cancel={() => setOpenSelectPaymentMethod(!openSelectPaymentMethod)}
                        items={[
                            {
                                title: "Spaces Wallet",
                                Icon: WalletIcon,
                                defaultChecked: selectedPaymentMethod === "WALLET",
                                click: () => {
                                    if (selectedPaymentMethod !== "WALLET") {
                                        togglePaymentOptions(shop && shop.id, "WALLET");
                                    };
                                    setOpenSelectPaymentMethod(!openSelectPaymentMethod);
                                }
                            },
                            {
                                title: "Bank Account",
                                Icon: BankIcon,
                                defaultChecked: (selectedPaymentMethod === "BANK" && userHasBank),
                                subTitle: userHasBank ? Object.values(shop.accountDetails).join(" | ") : '',
                                click: () => {
                                    if(userHasBank){
                                        if (selectedPaymentMethod !== "BANK") {
                                            togglePaymentOptions(shop && shop.id, "BANK");
                                        };
                                    } else {
                                        setOpenAddBankAccount(!openAddBankAccount);
                                    }

                                    setOpenSelectPaymentMethod(!openSelectPaymentMethod);
                                }
                            }
                        ]}
                    />
                )}
                {openAddBankAccount && (
                    <StorefrontAddBankAccount
                        open={openAddBankAccount}
                        cancel={() => setOpenAddBankAccount(!openAddBankAccount)}
                        accountDetails={shop && shop.accountDetails}
                        addBankAccount={(bankAccount) => {
                            setOpenAddBankAccount(!openAddBankAccount);
                            updateBankAccountDetails(shop && shop.id, bankAccount);
                        }}
                    />
                )}
                <ConfirmPopupDialog
                    open={confirmDelete}
                    title={"Are you sure you want to delete this shop?"}
                    confirmationText={
                        "Deleting a shop will remove it from your list of shops and marketplace listings."
                        }
                    answers={[
                        {
                            variant: "No",
                            action: () => setConfirmDelete(!confirmDelete)
                        },
                        {
                            variant: "Yes",
                            action: () => {
                                setConfirmDelete(!confirmDelete);
                                deleteShop(shop.id);
                            }
                        }
                    ]}
                />
                <CheckPopupDialog
                    open={switchShopOpen}
                    title={"Switch Shops"}
                    cancel={() => setSwitchShopOpen(!switchShopOpen)}
                    items={switchShopOptions}
                />
                {!openOptionsOverlay && (
                    <AddOptionWrapper>
                        <AddOption onClick={() => setOpenOptionsOverlay(!openOptionsOverlay)} />
                    </AddOptionWrapper>
                )}
                {openOptionsOverlay && (
                    <Overlay bgc={"rgba(0, 0, 0, 0.45)"} onClick={() => setOpenOptionsOverlay(!openOptionsOverlay)}>
                        <OverlayOptions>
                            <Link
                                to={{
                                    pathname: "/actions/shop_products_add",
                                    state: { shopId: shop && shop.id }
                                }}
                                onClick={()=>{
                                    mixPanel.track(SHOP_START_CREATE_PRODUCT,
                                        {
                                            "Entry Point": "MyShop Home"
                                        }
                                    )
                                }}
                            >
                                <OverlayRow className="animated_btn1">
                                    <OverlayRowText color={colors.white}>New Product</OverlayRowText>
                                    <PageLogo
                                        width={"32px"}
                                        height={"32px"}
                                        iconWidth={"18px"}
                                        iconHeight={"15px"}
                                        Icon={InventoryIcon}
                                        background={colors.white}
                                        className={"icon"}
                                    />
                                </OverlayRow>
                            </Link>
                            <Link
                                to={{
                                    pathname: "/actions/shop_sales_add",
                                    state: {
                                        merchantId: shop && shop.merchantId,
                                        branchId:   shop && shop.branchId
                                    }
                                }}
                                onClick={()=>{
                                    mixPanel.track(SHOP_START_CREATE_SALE,
                                        {
                                            "Entry Point": "MyShop Home",
                                            "Time": (new Date()).toLocaleDateString(),
                                            "User ID": userId,
                                            "shop ID": shop && shop.id
                                        }
                                    )
                                }}
                            >
                                <OverlayRow className="animated_btn2">
                                    <OverlayRowText color={colors.white}>New Sale</OverlayRowText>
                                    <PageLogo
                                        width={"32px"}
                                        height={"32px"}
                                        iconWidth={"18px"}
                                        iconHeight={"15px"}
                                        Icon={SalesIcon}
                                        background={colors.white}
                                        className={"icon"}
                                    />
                                </OverlayRow>
                            </Link>
                            <OverlayRow className="close_btn">
                                <OverlayRowText color={colors.white}>Close</OverlayRowText>
                                <CloseOverlayWrapper>
                                    <CloseOverlay onClick={() => setOpenOptionsOverlay(!openOptionsOverlay)} />
                                </CloseOverlayWrapper>
                            </OverlayRow>
                        </OverlayOptions>
                    </Overlay>
                )}
            </Fragment>
        ) : (
            <Fragment>
                <TopHeader withSpacesHeader title={"My Shop"}  backLink={"/"}/>
                <ScreenContainer>
                    <FlexCenteredBlock top={"64px"}>
                        <PageLogo
                            Icon={ShoppingIcon}
                            width={"184px"}
                            height={"184px"}
                            iconHeight={"auto"}
                            iconWidth={"auto"}
                            margin={"24px auto"}
                        />
                        <Title>No shop setup</Title>
                        <Message
                            bottom={"24px"}
                            top={"8px"}
                            align={"center"}
                            padding={"0 1em"}
                        >
                            You’ve not setup any shop. Setup a shop to
                            manage your inventory, track your sales and
                            manage your orders.
                        </Message>
                        <RippleLink
                            to="/actions/shop_setup"
                            style={{ 
                                width: "calc(100% - 32px)",
                                marginBottom: "50px" 
                            }}
                        >
                            <RippleButton top={"101px"}>
                                Setup a shop
                            </RippleButton>
                        </RippleLink>
                    </FlexCenteredBlock>
                </ScreenContainer>
            </Fragment>
        )}
        </Fragment>
    );
};

export default connect(
    null,
    {
        getSales,
        deleteShop,
        toggleListingOptionsVisibility,
        togglePaymentOptions,
        updateBankAccountDetails
    }
)(MyShop);