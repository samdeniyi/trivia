import { MyShopFooter } from "../views/actions/my-shop/components/MyshopFooter";
import React from "react";

export const addShopFooter = arr => {
    return arr.map(route => ({...route, main:()=> <><MyShopFooter/>{route.main()}</>}));
}