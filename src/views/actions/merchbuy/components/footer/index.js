import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom"
import {ReactComponent as Cart} from "../../assets/shoppingCartGrey.svg";
import {ReactComponent as OrderIcon} from "../../assets/orders.svg";
import {ReactComponent as BlueOrderIcon} from "../../assets/order-blue.svg"
import {ReactComponent as BlueHomeICon} from "../../assets/home-blue.svg";
import {ReactComponent as GreyHomeIcon} from "../../assets/home-grey.svg"

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
    z-index:50;
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
    color: #abbbc8;
`;

export const MerchbuyFooter = () => {
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
            setChosenOption("merchbuy")
            history.push("/actions/merchbuy")
        }}>
            {chosenOption === "merchbuy" ? <BlueHomeICon/> : <GreyHomeIcon/>}
            <FooterText>Home</FooterText>
        </SpanContainer>
        <SpanContainer onClick={() => {
            setChosenOption("cart")
            history.push("/actions/merchbuy/cart")
        }}>
            <Cart fill={chosenOption === "cart" ? "#579fd7" : "#B8BFC5"}/>
            <FooterText>Cart</FooterText>
        </SpanContainer>
        <SpanContainer onClick={() => {
            setChosenOption("orders")
            history.push("/actions/merchbuy/order-history")
        }}>
            {chosenOption === "order-history" ?
                <BlueOrderIcon/> :
                <OrderIcon/>}
            <FooterText>My orders</FooterText>
        </SpanContainer>
    </FooterContainer>
}