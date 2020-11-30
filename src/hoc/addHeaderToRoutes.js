import {SpacesHeader} from "../components/spaces-header";
import {MerchbuyFooter} from "../views/actions/merchbuy/components/footer";
import React from "react";

export const addHeaderToRoutes = arr => {
    return arr.map(route => ({...route, main:()=> <><SpacesHeader/>{route.main()}</>}));
}
export const addFooterToRoutes = arr => {
    return arr.map(route => ({...route, main:()=> <>{route.main()}<MerchbuyFooter/></>}));
}