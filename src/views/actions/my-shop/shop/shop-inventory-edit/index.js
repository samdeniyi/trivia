import React, {Fragment, useState, useEffect} from "react";
import styled from "styled-components";
import {colors} from "../../../../../styles";
import {useSelector, connect} from "react-redux";
import {withRouter, useHistory} from "react-router-dom";
import {parseTextCountRender} from "../../../../../utils/inputs/parseTextCountRender";
//import {findCatgoryInList} from "../../../../../utils/inventory/pendingItems";
import {
    getProductCategories,
    bulkProductPriceUpdate
} from "../../../../../redux/ducks/applications/my-shop/actions/shop";
import {formatPrice} from '../../../../../utils/currency/formatPriceWithComma';

import {
    Message,
    Title,
    SecondaryText
} from "../../../../../containers/MessageContainer";
import {
    FlexSpaceBetweenBlock,
    ScreenContainer,
    FilterAndSortSection,
    SortFilterCell
} from "../../../../../containers/ScreenContainer";
import {
    PageLogo,
    TopHeader,
    RippleLink,
    SearchHeader,
    OptionsPopupDialog,
    RippleButton,
    BulkPriceUpdate
} from "../../../../../components";
import {
    List,
    ListItem,
    ListHeading,
    //ListLeftBlock,
    ListSubHeading,
    //ListHighlight
} from "../../../../../containers/ListContainer";
import {Close} from '../../../../../containers/HeaderContainer';
import InventoryIcon from "./assets/inventory.svg";
//import { Options } from "../../../../../containers/HeaderContainer";
import SupermarketIcon from "../../assets/supermarket.svg";
import {ReactComponent as Filter} from '../../../../../assets/header_filter.svg';
import {ReactComponent as Sort} from '../../../../../assets/sort.svg';
import {ReactComponent as Group4} from "../../../../../assets/group_4.svg";
import {ReactComponent as Group5} from "../../../../../assets/group_5.svg";
import {ReactComponent as MostRecent} from "../../../../../assets/most_recent.svg";
import {ReactComponent as Oldest} from "../../../../../assets/oldest.svg";
import {ReactComponent as Ascending} from "../../../../../assets/ascending.svg";
import {ReactComponent as Descending} from "../../../../../assets/descending.svg";
import {ReactComponent as Caution} from '../../../../../assets/caution.svg';
import {ReactComponent as AllProductsIcon} from "../../../../../assets/all_products.svg";

const FoundItems = styled(SecondaryText)`
    margin: 24px 0 16px 0;
`;

const EditPrice = styled(ListSubHeading)`
    cursor: pointer;
    font-weight: 300;
    color: #579fd7;
    display: flex;
`;

const ListLeftImageBlock = styled.div`
    min-width: 32px;
`;

// const ListLeftBlock = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     //background: #000000;
//     margin-left: 16px;
//     margin-right: 16px;
// `;

// const ListRightBlock = styled.div`
//     display: flex;
//     flex-direction: column;
//     min-width: 60px;
//     align-items: end;
//     padding: 4px;
//     align-content: end;
//     //background-color: #00ff00;
//     justify-content: center;
// `;

const ListLeftBlock = styled.div`
    display: flex;
    flex-direction: column;
    //width: 70%;
    min-width: 65%;
    max-width: 65%;
    //background: #000000;
    margin-left: 16px;
    margin-right: 16px;
`;

const ListRightBlock = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 8px;
    //min-width: 60px;
    align-items: end;
    padding: 4px;
    align-content: end;
    //margin-left: 16px;
    //background-color: #00ff00;
    justify-content: center;
`;

const StockWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 4px;
    align-items: center;
`;

const QuantityWrapper = styled.span`
    background-color: ${({backgroundColor}) => backgroundColor || "#4e97001c"};
    color: ${({color}) => color || "#4e9700"};
    border-radius: 4px;
    padding: 4px 4px;
    font-size: 10px;
    font-weight: 500;
    display: inline-block;
`;

const ShopInventoryEdit = ({
                               location,
                               getProductCategories,
                               bulkProductPriceUpdate
                           }) => {
    const history = useHistory();
    const shops = useSelector(state => state.applications.myShop.shops);
    const shopId = location.state ? location.state : shops[0].id;
    const [searchValue, setSearchValue] = useState("");
    const [sortType, setSortType] = useState("Most Recent");
    const [filterType, setFilterType] = useState("All products");
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    const inventory = useSelector(state => state.applications.myShop.shops)
        .find(shop => shop.id === shopId).inventory;
    const [inventoriesOnPage, setInventoriesOnPage] = useState(inventory);
    const [allInventories, setAllInventory] = useState([]);
    const [editClicked, setEditClicked] = useState(false);
    const [productInView, setProductInView] = useState("");
    const [allInventoriesUpdated, setAllInventoryUpdated] = useState([]);

    useEffect(() => {
        setAllInventory(inventoriesOnPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getProductCategories();
    }, [getProductCategories]);

    useEffect(() => {
        setAllInventory(inventoriesOnPage.filter(
            data => data.productName.toLowerCase().includes(searchValue.toLowerCase())
        ));
    }, [searchValue, inventoriesOnPage]);

    useEffect(() => {
        if (filterType === "All products") {
            setAllInventory(inventoriesOnPage);
            setOpenFilterOptions(filterOpen => filterOpen === true && !filterOpen);
        } else if (filterType === "In Stock") {
            setAllInventory(inventoriesOnPage.filter(data => data.quantity > 0));
            setOpenFilterOptions(filterOpen => filterOpen === true && !filterOpen);
        } else if (filterType === "Out Of Stock") {
            setAllInventory(inventoriesOnPage.filter(data => data.quantity === 0));
            setOpenFilterOptions(filterOpen => filterOpen === true && !filterOpen);
        }
    }, [filterType, setAllInventory, inventoriesOnPage]);

    useEffect(() => {
        if (sortType === "Most Recent") {
            setAllInventory(inventoriesOnPage.sort((a, b) =>
                new Date(b.localCreatedDate).getTime() -
                new Date(a.localCreatedDate).getTime()
            ))
            setSortOptionsOpen(sortOpen => sortOpen === true && !sortOpen);
        } else if (sortType === "Oldest") {
            setAllInventory(
                inventoriesOnPage.sort((a, b) =>
                    new Date(a.localCreatedDate).getTime() -
                    new Date(b.localCreatedDate).getTime()
                )
            );
            setSortOptionsOpen(sortOpen => sortOpen === true && !sortOpen);
        } else if (sortType === "A-Z") {
            setAllInventory(inventoriesOnPage.sort((a, b) => a.productName.localeCompare(b.productName)));
            setSortOptionsOpen(sortOpen => sortOpen === true && !sortOpen);
        } else if (sortType === "Z-A") {
            setAllInventory(inventoriesOnPage.sort((a, b) => b.productName.localeCompare(a.productName)))
            setSortOptionsOpen(sortOpen => sortOpen === true && !sortOpen);
        }
        ;
    }, [sortType, inventoriesOnPage, setAllInventory]);

    useEffect(() => {
        setAllInventory(inventoriesOnPage);
    }, [setAllInventory, inventoriesOnPage]);

    const updateProduct = (updatedProduct) => {
        const pageInventories = [...inventoriesOnPage]
        const idx = pageInventories.findIndex(
            x => x.id === updatedProduct.id
        );
        pageInventories.splice(idx, 1, updatedProduct);
        setInventoriesOnPage(pageInventories)

        const updatedProducts = [...allInventoriesUpdated]
        const idy = updatedProducts.findIndex(
            y => y.productId === updatedProduct.inventoryProductId
        );
        if (idy === -1) {
            updatedProducts.push({
                direction: "INCREASE",
                productId: updatedProduct.inventoryProductId,
                retailPrice: updatedProduct.retailUnitPrice,
                retailQuantity: 0
            })
        } else {
            updatedProducts.splice(idy, 1, {
                direction: "INCREASE",
                productId: updatedProduct.inventoryProductId,
                retailPrice: updatedProduct.retailUnitPrice,
                retailQuantity: 0
            });
        }
        setAllInventoryUpdated(updatedProducts);
    }

    return (
        <Fragment>
            {!inventoriesOnPage.length ? (
                <Fragment>
                    <TopHeader title={"Inventory"} backLink={"/actions/shop"}/>
                    <ScreenContainer paddingBottom={"65px"} >
                        <FlexSpaceBetweenBlock top={"64px"}>
                            <div>
                                <PageLogo
                                    Icon={InventoryIcon}
                                    width={"184px"}
                                    height={"184px"}
                                    iconHeight={"auto"}
                                    iconWidth={"auto"}
                                    margin={"24px auto"}
                                />
                                <Title>No products in your inventory</Title>
                                <Message
                                    bottom={"24px"}
                                    top={"0"}
                                    align={"center"}
                                    padding={"0 1em"}
                                >
                                    You’ve not added products to your inventory. Add
                                    products to easily make sales and track your
                                    stock.
                                </Message>
                            </div>
                            <RippleLink
                                style={{width: '100%'}}
                                to={{
                                    pathname: "/actions/shop_products_add",
                                    state: {shopId}
                                }}
                            >
                                <RippleButton type={"button"}>
                                    Add a product
                                </RippleButton>
                            </RippleLink>
                        </FlexSpaceBetweenBlock>
                    </ScreenContainer>
                </Fragment>
            ) : (
                <Fragment>
                    <SearchHeader
                        withSpacesHeader
                        title={"Inventory"}
                        customStyles={{
                            backgroundColor: colors.themeColor3,
                            padding: '14px 16px',
                            borderRadius: '8px'
                        }}
                        noArrow
                        placeholder={"Search for a product"}
                        handleSearch={setSearchValue}
                        backLink={"/actions/shop"}
                    >
                        <Close
                            left={"16px"}
                            onClick={() => history.goBack()}
                        />
                    </SearchHeader>
                    <ScreenContainer paddingBottom={"65px"} >
                        <FilterAndSortSection top={"64px"}>
                            <SortFilterCell onClick={() => setSortOptionsOpen(!sortOptionsOpen)}>
                                <Sort height={"16px"}/>
                                {sortType}
                            </SortFilterCell>
                            <SortFilterCell onClick={() => setOpenFilterOptions(!openFilterOptions)}>
                                <Filter height={"12px"}/>
                                {filterType}
                            </SortFilterCell>
                        </FilterAndSortSection>
                        <FoundItems>
                            Found: {" "}
                            {parseTextCountRender(allInventories.length, "Product")}
                        </FoundItems>
                        <List fullScreen>
                            {allInventories.map((product, index) => (
                                <ListItem
                                    key={index}
                                    style={{
                                        minHeight: '35px',
                                        paddingTop: '6px',
                                        paddingBottom: '6px'
                                    }}
                                >
                                    <ListLeftImageBlock>
                                        <PageLogo
                                            Icon={
                                                (product.images && product.images.baseImageUrl) ||
                                                product.base64ProductImageString
                                            }
                                            fallback={SupermarketIcon}
                                            width={"32px"}
                                            height={"32px"}
                                            iconHeight={"32px"}
                                            iconWidth={"32px"}
                                            background={"transparent"}
                                        />
                                    </ListLeftImageBlock>

                                    <ListLeftBlock>
                                        <ListHeading>{product.productName}</ListHeading>
                                        {/* {(Number(product.quantity) !== 0) ?  */}
                                        {!product.productCategory ?
                                            <ListSubHeading style={{color: '#579fd7'}}>
                                                {"Setup product"}
                                            </ListSubHeading>
                                            :
                                            <StockWrapper>
                                                <QuantityWrapper
                                                    backgroundColor={(product.quantity <= 5) ? "#e020201c" : "#4e97001c"}
                                                    color={(product.quantity <= 5) ? "#e02020" : "#4e9700"}
                                                >{product.quantity}</QuantityWrapper>
                                                <ListSubHeading style={{marginLeft: '4px'}}>
                                                    {"in stock"}
                                                </ListSubHeading>
                                            </StockWrapper>
                                        }
                                    </ListLeftBlock>

                                    <ListRightBlock>
                                        {/* {(Number(product.quantity) === 0) ?  */}
                                        {!product.productCategory ?
                                            <Caution/> :
                                            <div>
                                                <ListSubHeading>
                                                    {formatPrice(product.retailUnitPrice || 0)}
                                                </ListSubHeading>
                                                <EditPrice
                                                    onClick={() => {
                                                        setProductInView(product)
                                                        setEditClicked(!editClicked)
                                                    }}
                                                >
                                                    {"Edit price"}
                                                </EditPrice>
                                            </div>
                                        }
                                    </ListRightBlock>
                                </ListItem>
                            ))}
                        </List>
                        {((allInventoriesUpdated && allInventoriesUpdated.length > 0) ? (
                            <RippleButton
                                type={"button"}
                                onClick={() => {
                                    bulkProductPriceUpdate(shopId, allInventoriesUpdated)
                                }}
                            >
                                Save
                            </RippleButton>
                        ) : (
                            <RippleButton
                                type={"button"}
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </RippleButton>
                        ))}
                    </ScreenContainer>
                </Fragment>
            )}
            <OptionsPopupDialog
                open={sortOptionsOpen}
                title={"Sort"}
                cancel={() => {
                    setSortType("Most Recent");
                    setSortOptionsOpen(!sortOptionsOpen);
                }}
                items={[
                    {
                        Icon: MostRecent,
                        title: "Most Recent",
                        click: () => sortType !== "Most Recent" && setSortType("Most Recent")
                    },
                    {
                        Icon: Oldest,
                        title: "Oldest",
                        click: () => sortType !== "Oldest" && setSortType("Oldest")
                    },
                    {
                        Icon: Ascending,
                        title: "A - Z",
                        click: () => sortType !== "A-Z" && setSortType("A-Z")
                    },
                    {
                        Icon: Descending,
                        title: "Z - A",
                        click: () => sortType !== "Z-A" && setSortType("Z-A")
                    }
                ]}
            />
            <OptionsPopupDialog
                open={openFilterOptions}
                title={"Filter"}
                cancel={() => {
                    setFilterType("All products");
                    setOpenFilterOptions(!openFilterOptions);
                }}
                items={[
                    {
                        Icon: AllProductsIcon,
                        title: "All products",
                        click: () => filterType !== "All products" && setFilterType("All products")

                    },
                    {
                        Icon: Group4,
                        title: "In Stock",
                        click: () => filterType !== "In Stock" && setFilterType("In Stock")
                    },
                    {
                        Icon: Group5,
                        title: "Out of Stock",
                        click: () => filterType !== "Out Of Stock" && setFilterType("Out Of Stock")
                    }
                ]}
            />
            <BulkPriceUpdate
                open={editClicked}
                setOpen={setEditClicked}
                productInfo={productInView}
                updateProduct={(productInfo, amount) => {
                    const product = {
                        ...productInfo,
                        retailUnitPrice: amount
                    };
                    updateProduct(product)
                }}
            />
        </Fragment>
    );
};

export default connect(
    null,
    {getProductCategories, bulkProductPriceUpdate}
)(withRouter(ShopInventoryEdit));
