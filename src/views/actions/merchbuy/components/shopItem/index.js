import React from "react";
import { any } from "prop-types";
import styled from "styled-components";

import {
    ShopBlock,
    ShopImage,
    ShopInfo,
    ShopName,
    ShopCategory,
    ShopLocation
} from "../../styles";
import { RippleLink } from "../../../../../components";
import FallbackShopImage from "../../assets/shopImage.svg";
import { is_url } from "../../../../../utils/urls/isUrl";

 const Link = styled(RippleLink)`
  width: 100%;

    &:hover{
    background: #F2F5FA;
    };
`;

export const ShopItem = ({ data, size }) => {
    return (
        <Link to={`/actions/merchbuy/shop/${data.id}`}>
            <ShopBlock>
                <ShopImage
                    src={
                        is_url(data.imageUrl)
                            ? data.imageUrl
                            : FallbackShopImage
                    }
                    alt="product image"
                    width={size.width}
                    height={size.height}
                    onError={(e)=> {
                        e.target.src = FallbackShopImage
                    }}
                />
                <ShopInfo>
                    <ShopName>{data.name}</ShopName>
                    <ShopCategory>
                        {data.businessCategoryNames !== null
                            ? data.businessCategoryNames.join(", ")
                            : ""}
                    </ShopCategory>
                    <ShopLocation>
                        {data.location.state ? ` ${data.location.state} ,` : ""}{" "}
                        Nigeria
                    </ShopLocation>
                </ShopInfo>
            </ShopBlock>
        </Link>
    );
};

ShopItem.propTypes = {
    data: any,
    size: any
};
