import React from "react";
import { useDispatch } from "react-redux";
import { any } from "prop-types";
import { merchbuyActions } from "../../../../../redux/ducks/applications/merchbuy/actions";

import {
    GridItem,
    ProductImage,
    ProductInfo,
    ProductInfoDesc,
    ProductInfoPrice,
    ProductInfoBulkInfo,
    ProductInfoOuter
} from "../../styles";

import FallbackProductImage from "../../assets/productImage.svg";
import { RippleLink } from "../../../../../components";


export const Product = ({ data, size, left }) => {
    const dispatch = useDispatch();
    return (
        <RippleLink  to={`/actions/merchbuy/product/${data.id}`} onClick={()=> dispatch(merchbuyActions.setInitProductDetials(data)) }>
            <GridItem>
                <ProductImage
                    src={
                       data.images
                            ? data.images.baseImageUrl
                            : FallbackProductImage
                    }
                    alt="product image"
                    width={size.width}
                    height={size.height}
                    left={left}
                    onError={(e)=> {
                        e.target.src = FallbackProductImage
                    }}
                />
                <ProductInfo width={size.width}>
                   <ProductInfoOuter>
                   <ProductInfoDesc>{data && data.name.toLowerCase()}</ProductInfoDesc>
                   </ProductInfoOuter>
                    <ProductInfoPrice>
                       {(data.minPrice ===data.maxPrice)?`₦${data.minPrice}`: `₦${data.minPrice} - ₦${data.maxPrice} `} 
                    </ProductInfoPrice>
                    <ProductInfoBulkInfo>
                        MOQ {data.moq} (pieces)
                    </ProductInfoBulkInfo>
                </ProductInfo>
            </GridItem>
        </RippleLink>
    );
};

Product.propTypes = {
    data: any,
    size: any
};
