import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom"
import { useSelector } from "react-redux";
import {ReactComponent as Inventory} from "../assets/limited_stock.svg"
import {ReactComponent as Sales} from "../assets/cart.svg";
import {ReactComponent as Order} from "../assets/order_3.svg"
import {ReactComponent as BlueSales} from "../assets/cart-blue.svg"
import {ReactComponent as Shop} from "../assets/shop.svg"
import {ReactComponent as BlueShop} from "../assets/blue-shop.svg"
import {ReactComponent as BlueOrder} from "../assets/blue-order.svg"
import {ReactComponent as BlueInventory} from "../assets/blue_limited_stock.svg"
// import {ReactComponent as GreyHomeIcon} from "../../assets/home-grey.svg"

const FooterContainer = styled.div`
    background: #ffffff;
    width: 100%;
    min-width: 250px;
    padding: 9px 26px;
    height: 50px;
    position:fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    z-index:30;
`;

const SpanContainer = styled.div`
    cursor: pointer;
    flex:1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FooterText = styled.span`
    font-size: 12px;
    color:${({color}) => color || "#abbbc8"} ;
`;

export const MyShopFooter = () => {
    const shops     = useSelector(state => state.applications.myShop.shops || []);
    const [chosenOption, setChosenOption] = useState("");
    const history = useHistory();

    useEffect(() => {
        let {location: {pathname}} = history || {};

        if (pathname.lastIndexOf("/") + 1 === pathname.length) {
            pathname = pathname.slice(0, pathname.length - 1)
        }
        let chosenPage = pathname.slice(pathname.lastIndexOf("/") + 1);
        if (chosenPage.indexOf("/")) {
            chosenPage.slice(chosenPage.indexOf("/"))
        }
        setChosenOption(chosenPage)
    }, [history]);

    return <FooterContainer>
        <SpanContainer onClick={() => {
            setChosenOption("shop")
            history.push("/actions/shop")
        }}>
            {chosenOption === "shop" ? <BlueShop/> : <Shop/>}
            <FooterText color={chosenOption === "shop"? "#579fd7": ""}>My Shop</FooterText>
        </SpanContainer>
        <SpanContainer onClick={() => {
            if (shops[0] && Object.keys(shops[0]).includes('branchId')){
                setChosenOption("shop_inventory")
                history.push("/actions/shop_inventory")
            }
        }}>
            {chosenOption === "shop_inventory" ? <BlueInventory/> : <Inventory/>}
            <FooterText color={chosenOption === "shop_inventory"? "#579fd7": ""}>Inventory</FooterText>
        </SpanContainer>
        <SpanContainer onClick={() => {
            if (shops[0] && Object.keys(shops[0]).includes('branchId')){
                setChosenOption("shop_sales")
                history.push("/actions/shop_sales")
            }
        }}>
            {chosenOption === "shop_sales" ? <BlueSales/> : <Sales/>}
            <FooterText color={chosenOption === "shop_sales"? "#579fd7": ""}>Sales</FooterText>
        </SpanContainer>
        <SpanContainer onClick={() => {
            if (shops[0] && Object.keys(shops[0]).includes('branchId')){
                setChosenOption("shop_orders")
                history.push("/actions/shop_orders")
            }
        }}>
            {chosenOption === "shop_orders" ? <BlueOrder/> : <Order/>}
            <FooterText color={chosenOption === "shop_orders"? "#579fd7": ""}>Orders</FooterText>
        </SpanContainer>
    </FooterContainer>
}
