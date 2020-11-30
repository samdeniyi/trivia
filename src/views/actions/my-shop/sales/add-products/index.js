import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { bool, func, array } from "prop-types";
import { parseTextCountRender } from "../../../../../utils/inputs/parseTextCountRender";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";

import {
    SearchHeader,
    RippleButton,
    PageLogo,
    AddProductOnTheFly
} from "../../../../../components";
import { Close } from "../../../../../containers/HeaderContainer";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { SlidingOverlay } from "../../../../../containers/OverlayContainer";
import {
    List,
    ListCheckedRow,
    ListHeading,
    ListSubHeading,
    ListItem,
    ListLeftBlock
} from "../../../../../containers/ListContainer";
import { SecondaryText } from "../../../../../containers/MessageContainer";
import { ReactComponent as AddProductInventoryIcon } from "../../../../../assets/add.svg";
import { ProductStockBadge } from "../../containers/SaleBadgesContainer";
import SupermarketIcon from '../../assets/supermarket.svg';
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { 
    SHOP_START_CREATE_PRODUCT
 } from '../../../../../utils/mix-panel/constants';

const ProductOnTheFly = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 32px;
    margin-bottom: 16px;
    & > svg {
        margin-right: 16px;
    }
    & > p {
        margin: 0;
    }
`;

const ListAdditionalInfo = styled.div`
    display: flex;
    flex-direction: row;
`;

const AddProductsButton = styled(RippleButton)`
    position: fixed;
    bottom: 24px;
    width: calc(100% - 48px);
`;

export const AddProductsForSale = ({
    addProductOnTheFly,
    shopId,
    open,
    setOpen,
    setProducts,
    setFieldValue,
    inventory,
    selectedProducts,
    searchProductsOnMasterList
}) => {
    const [openAddProductOnTheFly, setOpenAddProductOnTheFly] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const searchedInventory = inventory.filter(data =>
        data.productName.toLowerCase().includes(searchValue.toLowerCase())
    );

    const manageSelectedProducts = (arr, obj) => {
        if (!arr.some(item => item.inventoryProductId === obj.inventoryProductId)) {
            const newProduct = {
                inventoryProductId: obj.inventoryProductId,
                id: selectedProducts.length + 1,
                hasInventory: true,
                inStock: true,
                quantity: obj.status === "ON_THE_FLY" ? obj.quantity : 1,
                name: obj.productName,
                itemPrice: Number(obj.retailUnitPrice),
                costPrice: Number(obj.costPrice),
                base64ProductImageString: obj.base64ProductImageString
            };

            setProducts(oldArray => [...oldArray, newProduct]);
        };

        if (arr.some(item => item.inventoryProductId === obj.inventoryProductId)) {
            setProducts(
                selectedProducts.filter(item => item.inventoryProductId !== obj.inventoryProductId)
            );
        };
    };

    useEffect(() => {
        setSearchValue("");
    }, [openAddProductOnTheFly]);

    return (
        open && (
            <SlidingOverlay>
                <SearchHeader
                    title={"Add Product(s)"}
                    noArrow={true}
                    right={"16px"}
                    placeholder={"Search..."}
                    handleSearch={setSearchValue}
                    withSpacesHeader
                >
                    <Close left={"16px"} onClick={() => setOpen(!open)} />
                </SearchHeader>
                <ScreenContainer top={"78px"}>
                    <ProductOnTheFly onClick={() => {
                        setOpenAddProductOnTheFly(!openAddProductOnTheFly)
                        mixPanel.track(SHOP_START_CREATE_PRODUCT, 
                            { 
                                "Entry Point": "Sales"
                            }
                        )
                    }}>
                        <AddProductInventoryIcon />
                        <SecondaryText>Add a new product to shop inventory</SecondaryText>
                    </ProductOnTheFly>
                    <List fullScreen>
                        {searchedInventory.map((item, index) => (
                            <ListItem key={index} bottom={"8px"}>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconWidth={"24px"}
                                    iconHeight={"24px"}
                                    Icon={
                                        (item.images && item.images.baseImageUrl) ||
                                        item.base64ProductImageString ||
                                        SupermarketIcon
                                    }
                                />
                                <ListCheckedRow
                                    bottom={"16px"}
                                    value={item}
                                    onClick={() => manageSelectedProducts(selectedProducts, item)}
                                    className={
                                        selectedProducts.some(
                                            data =>
                                            data.inventoryProductId === item.inventoryProductId
                                        ) ? "active" : ""
                                    }
                                >
                                    <ListLeftBlock left={"0"}>
                                        <ListHeading>{item.productName}</ListHeading>
                                        <ListAdditionalInfo>
                                            <ListSubHeading>{formatPrice(item.costPrice)}</ListSubHeading>
                                            <ProductStockBadge quantity={item.quantity} />
                                        </ListAdditionalInfo>
                                    </ListLeftBlock>
                                </ListCheckedRow>
                            </ListItem>
                        ))}
                    </List>
                    <AddProductsButton
                        type="submit"
                        disabled={selectedProducts.length === 0}
                        onClick={() => {
                            setOpen(!open);
                            setFieldValue("salesItemDetails", selectedProducts);
                            setProducts(selectedProducts);
                        }}
                    >
                        {`Add `+ parseTextCountRender(selectedProducts.length, "Product")}
                    </AddProductsButton>
                </ScreenContainer>
                {openAddProductOnTheFly && (
                    <AddProductOnTheFly
                        open={openAddProductOnTheFly}
                        setOpen={setOpenAddProductOnTheFly}
                        addProduct={addProductOnTheFly}
                        manageSelectedProducts={manageSelectedProducts}
                        selectedProducts={selectedProducts}
                        searchProductsOnMasterList={searchProductsOnMasterList}
                        shopId={shopId}
                    />
                )}
            </SlidingOverlay>
        )
    );
};

AddProductsForSale.propTypes = {
    open: bool,
    setOpen: func,
    setProducts: func,
    inventory: array,
    addProductOnTheFly: func,
    searchProductsOnMasterList: func
};