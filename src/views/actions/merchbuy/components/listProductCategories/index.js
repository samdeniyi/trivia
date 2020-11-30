import React from "react";
import { any } from "prop-types";
import { ProductCategoryItem } from "../ProductCategoryItem";
import { AddFlexBox } from "../../styles";

export const ListProductCategories = ({ data }) => {
    return (
        <AddFlexBox justifyContent={'center'}>
            {data && data.map((item, index) => (
                <ProductCategoryItem key={index} data={item}></ProductCategoryItem>
            ))}
        </AddFlexBox>
    );
};

ListProductCategories.propTypes = {
    data: any
};