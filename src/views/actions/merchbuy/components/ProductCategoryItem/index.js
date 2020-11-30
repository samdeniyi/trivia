import React from "react";
import { any } from "prop-types";
import { ProductCategoryName, ItemFlex } from "../../styles";
import { RippleLink } from "../../../../../components/";

export const ProductCategoryItem = ({ data }) => {
    return (
        <RippleLink to={`/actions/merchbuy/products/${data.name}/${data.id}`}>
            <ItemFlex>
                <ProductCategoryName>{data.name}</ProductCategoryName>
            </ItemFlex>
        </RippleLink>
    );
};

ProductCategoryItem.propTypes = {
    data: any
};
