import React from "react";
import { useSelector } from "react-redux";
import { CartIcon, NoOfItemsOnCart } from "../../styles";
import {  RippleLink } from '../../../../../components';

export const Cart = () => {
    const carts = useSelector(state => state.applications.merchbuy.shopCart);

    return (
        <RippleLink to={"/actions/merchbuy/cart"}>
            <CartIcon/>
            <NoOfItemsOnCart>{carts && carts.length}</NoOfItemsOnCart>
        </RippleLink>
    );
};

