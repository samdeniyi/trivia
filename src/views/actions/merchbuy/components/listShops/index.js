import React from "react";
import { any } from "prop-types";
import { ShopItem } from "../shopItem";
import { AddFlexBox } from "../../styles";

export const ListShops = ({ data, size }) => {
    return (
        <AddFlexBox justifyContent={'center'}>
            {data && data.map((item, index) => (
                <ShopItem key={index} data={item} size={size}></ShopItem>
            ))}
        </AddFlexBox>
    );
};

ListShops.propTypes = {
    data: any,
    size: any
};