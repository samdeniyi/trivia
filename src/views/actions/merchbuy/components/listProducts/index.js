import React from "react";
import { any, string } from "prop-types";
import { Product } from "../productItem";
import { AddGridBox } from "../../styles";

export const ListProducts = ({ data, size, justifyContent, left }) => {
    return (
        <AddGridBox width={size.width}>
            {data && data.map((item, index) => (
                <Product key={index} data={item} size={size} left={left}></Product>
            ))}
        </AddGridBox>
    );
};

ListProducts.propTypes = {
    data: any,
    size: any,
    justifyContent: string
};