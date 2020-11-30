import React, { Fragment } from "react";

import styled from "styled-components";

import { ReactComponent as ProductCategories } from "../../assets/productCategories.svg";
import  {ShopsIcon}  from "../../styles";
import { ReactComponent as RecommendedProducts } from "../../assets/recommendedProducts.svg";
import { ReactComponent as PopularProducts } from "../../assets/popularProducts.svg";
import { RippleLink } from "../../../../../components";

const list = [
    {
        icons: <ProductCategories />,
        title: "Product categories",
        link:"/actions/merchbuy/product-categories"
    },
    {
        icons: <ShopsIcon />,
        title: "Shops",
        link:"/actions/merchbuy/shops"
    },
    {
        icons: <RecommendedProducts />,
        title: "Recommended products",
        link:"/actions/merchbuy/recommended-products"
    },
    {
        icons: <PopularProducts />,
        title: "Popular products",
        link:"/actions/merchbuy/popular-products"
    }
];

const IconsMenuSection = styled.div`
    position: relative;
    padding: 16px;
    display: flex;
    justify-content: space-around;
`;

const IconsMenuItem = styled.div`
    flex: 1;
`;
const IconBox = styled.div`
    width: 100%;
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
`;
const Title = styled.p`
    color: #29394f;
    font-size: 10px;
    word-spacing: 100vw;
    line-height:1.5;
    text-align: center;
`;

export const TopNavIconsMenu = () => {
    return (
        <Fragment>
            <IconsMenuSection>
                {list.map((item, index) => (
                    <IconsMenuItem key={index}>
                        <RippleLink to={item.link}>

                        <IconBox>{item.icons}</IconBox>
                        <Title>{item.title}</Title>
                        </RippleLink>
                    </IconsMenuItem>
                ))}
            </IconsMenuSection>
        </Fragment>
    );
};