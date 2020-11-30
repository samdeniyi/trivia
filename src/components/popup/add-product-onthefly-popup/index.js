import React, { Fragment } from "react";
import { Formik } from "formik";
import { bool, func, string } from "prop-types";
import { useSelector } from "react-redux";
import { AddProductOnTheFlyValidationSchema } from "./AddProductOnTheFlyValidationSchema";

import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    InfoMessage,
    CancelButton,
    ConfirmButton,
    InputPopup
} from "../common";
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import { Error } from "../../../containers/MessageContainer";
import { toast } from "react-toastify";

export const AddProductOnTheFly = ({
    setOpen,
    open,
    shopId,
    addProduct,
    manageSelectedProducts,
    selectedProducts,
    searchProductsOnMasterList
}) => {
    const isLoading          = useSelector(state => state.applications.myShop.isLoading);
    const shops              = useSelector(state => state.applications.myShop.shops);
    const productsMasterList = useSelector(state => state.applications.myShop.productsMasterList);
    const isOffline          = useSelector(state => state.offline.isOffline);
    const branchId           = shops.find(shop => shop.id === shopId).branchId

    return (
        <Fragment>
            <Overlay
                onClick={() => setOpen(!open)}
                bgc={"rgba(0, 0, 0, 0.4)"}
                zIndex={"99999"}
            />
            <PopUp open={open} zIndex={"100000"}>
                <PopUpContent>
                    <PopUpHeader align={"left"}>Create a product</PopUpHeader>
                    <InfoMessage>
                        Please provide the following information to create a
                        product.
                    </InfoMessage>
                    <Formik
                        initialValues={{
                            productName: "",
                            productUnit: "",
                            quantity: "",
                            images: {
                                baseImageUrl: "",
                                others: []
                            }
                        }}
                        validationSchema={AddProductOnTheFlyValidationSchema}
                    >
                        {({ errors, values, setFieldValue }) => (
                            <Fragment>
                                <InputPopup
                                    nobottom={"true"}
                                    type={"text"}
                                    placeholder={"Product name"}
                                    name="productName"
                                    value={values.productName}
                                    list={"ProductList"}
                                    onChange={e => {
                                        setFieldValue("productName", e.target.value);
                                        
                                    }}
                                    onKeyUp={e => {
                                        if (isOffline === false) {
                                            searchProductsOnMasterList(branchId, e.target.value);
                                            
                                            const productInMasterList = 
                                                productsMasterList && 
                                                productsMasterList.find(
                                                    product => 
                                                    product.itemName === values.productName
                                                );

                                            if (productInMasterList && productInMasterList.masterListImageUrl) {
                                                setFieldValue(
                                                    "images.baseImageUrl", 
                                                    productInMasterList.masterListImageUrl
                                                );
                                            };
                                        };
                                    }}
                                />
                                {errors.productName && (
                                    <Error
                                        bottom={"8px"}
                                        top={"8px"}
                                        left={"16px"}
                                    >
                                        {errors.productName}
                                    </Error>
                                )}
                                <InputPopup
                                    nobottom={"true"}
                                    type={"text"}
                                    placeholder={"Unit price"}
                                    name="productUnit"
                                    inputMode={"decimal"}
                                />
                                {errors.productUnit && (
                                    <Error
                                        bottom={"8px"}
                                        top={"8px"}
                                        left={"16px"}
                                    >
                                        {errors.productUnit}
                                    </Error>
                                )}
                                <InputPopup
                                    nobottom={"true"}
                                    type={"text"}
                                    placeholder={"Quantity to sell"}
                                    name="quantity"
                                    inputMode={"decimal"}
                                />
                                {errors.quantity && (
                                    <Error
                                        bottom={"8px"}
                                        top={"8px"}
                                        left={"16px"}
                                    >
                                        {errors.quantity}
                                    </Error>
                                )}
                                <ActionBlock direction={"row"} top={"16px"}>
                                    <CancelButton
                                        type="button"
                                        onClick={() => setOpen(!open)}
                                    >
                                        Cancel
                                    </CancelButton>
                                    <ConfirmButton
                                        type="submit"
                                        disabled={
                                            errors.productName ||
                                            errors.productUnit ||
                                            errors.quantity || 
                                            isLoading
                                        }
                                        onClick={async () => {
                                            const response = await addProduct(shopId, values);

                                            if (response.status) {
                                                manageSelectedProducts(
                                                    selectedProducts, 
                                                    { ...response.product, status: "ON_THE_FLY" }
                                                );
                                     
                                                setOpen(!open);
                                            } else toast.error("There is an error with adding a product");
                                        }}
                                    >
                                        Add product
                                    </ConfirmButton>
                                </ActionBlock>
                            </Fragment>
                        )}
                    </Formik>
                    <datalist id="ProductList">
                    {productsMasterList && productsMasterList.map((product, index) => (
                        <option key={index}>{product.itemName}</option>
                    ))}
                    </datalist>
                </PopUpContent>
            </PopUp>
        </Fragment>
    );
};

AddProductOnTheFly.propTypes = {
    open: bool,
    setOpen: func,
    addProduct: func,
    shopId: string
};
