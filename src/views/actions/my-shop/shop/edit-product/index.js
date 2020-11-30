import React, { useState, useEffect, Fragment } from "react";
import styled from 'styled-components';
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { object, string, bool, func } from "prop-types";
import { updateProduct, searchProductsOnMasterList, getProductCategories } from "../../../../../redux/ducks/applications/my-shop/actions/shop";
import { productUnits } from "../../../../../data/products/units";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";
import { colors } from "../../../../../styles";

import { SlidingOverlay } from "../../../../../containers/OverlayContainer";
import { EditProductValidationSchema } from "./EditProductValidationSchema";
import {
    TopHeader,
    UploadPicture,
    InputWithLabel,
    InputWithOnchange,
    TextareaWithLabel,
    SelectBox,
    YesNoBlock,
    RippleButton,
    BulkPriceInput
} from "../../../../../components";
import { InputBlock } from "../../../../../containers/InputContainer";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { Close } from "../../../../../containers/HeaderContainer";
import SupermarketIcon from "../../assets/supermarket.svg";
import { ImageCropper, toDataURL } from "../../../../../components/popup/image-cropper";
import { toast } from "react-toastify";

const EditProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 64px;
`;

const BulkPriceWrapper = styled.div`
    margin-top: 16px;
`;

const ErrorBox = styled.div`
    color: red;
    font-size: 13px;
    font-style: italic;
`;

const EditProduct = ({
    isLoading,
    product,
    shopId,
    open,
    setOpen,
    noClose,
}) => {
    const dispatch = useDispatch();
    const [cost, setCost]     = useState(undefined);
    const [retail, setRetail] = useState(undefined);
    const [showCropper, setShowCropper] = useState(false);
    const [picture, setPicture] = useState();

    const shops               = useSelector(state => state.applications.myShop.shops);
    const categories          = useSelector(state => state.applications.myShop.productCategories);
    const productsMasterList  = useSelector(state => state.applications.myShop.productsMasterList);
    const isOffline           = useSelector(state => state.offline.isOffline);
    const shop = shops[0];

    useEffect(() => {
        !isOffline && dispatch(getProductCategories());
    }, [dispatch, isOffline]);

    const onCropperCancel = () => {
        setShowCropper(false);
        setPicture('');
    }

    const onCropperSave = async url => {
        if(url)
        {
            const image = await toDataURL(url);
            setShowCropper(false);
            setPicture(image);
        } else {
            toast.error("Image is still processing, wait for a sec...")
        }
    }

    const pAction = (_, image) => {
        setShowCropper(true);
        setPicture(image);
    }

    return open && (
        <SlidingOverlay>
            <TopHeader title={(product.quantity === 0) ? "Setup product" : "Edit product details"} noArrow withSpacesHeader>
            {!noClose && (
                <Close left={"true"} onClick={() => setOpen(!open)} />
            )}
            </TopHeader>
            <ScreenContainer top={"40px"}>
                <Formik
                    initialValues={{
                        productName: product.productName,
                        productDescription: product.productDescription,
                        productCategory: product.productCategory,
                        productUnit: product.productUnit,
                        costPrice: product.costPrice,
                        quantity: product.quantity,
                        availableAtRetailPrice: product.availableAtRetailPrice,
                        retailUnitPrice: product.retailUnitPrice,
                        availableAtWholesalePrice: product.availableAtWholesalePrice,
                        wholesaleUnitPrice: product.wholesaleUnitPrice,
                        moq: product.moq,
                        base64ProductImageString: product.base64ProductImageString || "",
                        bulkPrices: product.bulkPrices || [],
                        images: {
                            baseImageUrl: product.images && product.images.baseImageUrl,
                            others: []
                        }
                    }}
                    validationSchema={EditProductValidationSchema}
                    onSubmit={async values => {
                        const selectedCategoryItem =
                            categories.find(
                                ctg =>
                                ctg.id === values.productCategory || ctg.name === values.productCategory
                            );
                        values.cost = values.costPrice;
                        values.productCategory = selectedCategoryItem.id;
                        values.base64ProductImageString = picture || product.base64ProductImageString;

                        const updateResponse = await dispatch(updateProduct(shopId, product.id, values));
                        if (updateResponse) setOpen(!open);
                    }}
                >
                    {({
                        errors,
                        touched,
                        values,
                        setFieldValue,
                        handleChange,
                        initialValues
                    }) => (
                        <EditProductContainer>
                            {showCropper && <ImageCropper avatar={picture} onCancel={onCropperCancel} onSave={onCropperSave} /> }
                            <UploadPicture
                                text={"Tap to add a product image"}
                                pictureAction={pAction}
                                defaultPicture={SupermarketIcon}
                                width={"18px"}
                                height={"24px"}
                                picture={picture || (values.base64ProductImageString || values.images.baseImageUrl)}
                                formName={"base64ProductImageString"}
                            />
                            <Form>
                                <InputBlock>
                                    <InputWithOnchange
                                        label={"Product name"}
                                        type={"text"}
                                        value={values.productName}
                                        placeholder={"Product name"}
                                        name="productName"
                                        list={"ProductList"}
                                        valid={`${!touched.productName && !errors.productName}`}
                                        errors={
                                            touched && touched.productName &&
                                            errors && errors.productName
                                        }
                                        onChange={e => setFieldValue("productName", e.target.value)}
                                        onKeyUp={e => {
                                            if (!isOffline) {
                                                dispatch(searchProductsOnMasterList(shop.branchId, e.target.value));

                                                const masterListProduct =
                                                    productsMasterList &&
                                                    productsMasterList.find(
                                                        product =>
                                                        product.itemName === values.productName
                                                    );

                                                if (masterListProduct && masterListProduct.masterListImageUrl) {
                                                    values.images.baseImageUrl = masterListProduct.masterListImageUrl;
                                                    setFieldValue("masterListImageUrl", masterListProduct.masterListImageUrl);
                                                    setFieldValue("base64ProductImageString", masterListProduct.masterListImageUrl);
                                                };
                                            };
                                        }}
                                        noClearButton={true}
                                        initialValues={initialValues}
                                    />
                                    <SelectBox
                                        name={"productCategory"}
                                        placeholder={"Select a product category"}
                                        value={
                                            values.productCategory ?
                                            categories.find(ctg =>
                                                ctg.id ===
                                                values.productCategory || ctg.name === values.productCategory
                                            ).name : ""
                                        }
                                        options={categories && categories.map(ctg => ({ label: ctg.name, value: ctg.id }))}
                                        handleChange={handleChange}
                                        valid={`${!touched.productCategory && !errors.productCategory}`}
                                        error={
                                            touched && touched.productCategory &&
                                            errors && errors.productCategory
                                        }
                                    />
                                    <SelectBox
                                        name={"productUnit"}
                                        placeholder={"What unit is the product sold in?"}
                                        value={
                                            values.productUnit ?
                                            (productUnits.map(unit => unit.label).includes(values.productUnit) &&
                                            productUnits.find(unit => unit.label === values.productUnit).label) : ""
                                        }
                                        options={productUnits}
                                        handleChange={handleChange}
                                        valid={`${!touched.productUnit && !errors.productUnit}`}
                                        error={
                                            touched && touched.productUnit &&
                                            errors && errors.productUnit
                                        }
                                    />
                                    <InputWithLabel
                                        label={"Cost price"}
                                        type={"text"}
                                        value={cost ? formatPrice(cost) : values.costPrice}
                                        onBlur={e => setCost(e.target.value)}
                                        onFocus = {e => {
                                            if (cost) e.target.value = values.costPrice;
                                            setCost(undefined);
                                        }}
                                        placeholder={"Cost price"}
                                        name="costPrice"
                                        inputMode={"numeric"}
                                        valid={`${!touched.costPrice && !errors.costPrice}`}
                                        errors={
                                            touched && touched.costPrice &&
                                            errors && errors.costPrice
                                        }
                                        noClearButton={true}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                    <InputWithLabel
                                        label={"Quantity in stock"}
                                        type={"text"}
                                        value={values && values.quantity}
                                        placeholder={"Quantity in stock"}
                                        name="quantity"
                                        inputMode={"numeric"}
                                        disabled={isLoading}
                                        valid={`${!touched.quantity && !errors.quantity}`}
                                        errors={
                                            touched && touched.quantity &&
                                            errors && errors.quantity
                                        }
                                        noClearButton={true}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                    <TextareaWithLabel
                                        name={"productDescription"}
                                        value={values.productDescription}
                                        placeholder={"Enter the description of this product"}
                                        height={"96px"}
                                        valid={`${!touched.productDescription && !errors.productDescription}`}
                                        errors={
                                            touched && touched.productDescription &&
                                            errors && errors.productDescription
                                        }
                                    />
                                    <InputWithLabel
                                        label={"Retail unit price"}
                                        type={"text"}
                                        value={retail ? formatPrice(retail) : values.retailUnitPrice}
                                        onBlur={e =>  setRetail(e.target.value)}
                                        onFocus = {e => {
                                            if (retail) e.target.value = values.retailUnitPrice;
                                            setRetail(undefined);
                                        }}
                                        placeholder={"Retail unit price"}
                                        name="retailUnitPrice"
                                        inputMode={"numeric"}
                                        valid={`${!touched.retailUnitPrice && !errors.retailUnitPrice}`}
                                        errors={
                                            touched && touched.retailUnitPrice &&
                                            errors && errors.retailUnitPrice
                                        }
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                        bottom={"0"}
                                    />
                                    <YesNoBlock
                                        title={"Would you like to make this product available for sale on Merchlist?"}
                                        setAnswer={setFieldValue}
                                        answer={values.availableAtRetailPrice}
                                        name={"availableAtRetailPrice"}
                                    />
                                    <YesNoBlock
                                        title={"Would you like to make this product available for sale at wholesale price?"}
                                        setAnswer={setFieldValue}
                                        answer={values.availableAtWholesalePrice}
                                        name={"availableAtWholesalePrice"}
                                    />
                                    {values.availableAtWholesalePrice && (
                                        <BulkPriceWrapper>
                                            <FieldArray name="bulkPrices">
                                            {({ push, remove }) => (
                                                <Fragment>
                                                    {values.bulkPrices.map((bulkPrice, index) => (
                                                        <BulkPriceInput
                                                            key={index}
                                                            id={index}
                                                            data={bulkPrice}
                                                            remove={remove}
                                                            handleChange={handleChange}
                                                        />
                                                    ))}
                                                    <RippleButton
                                                        type={"button"}
                                                        onClick={() => push({ price: "", moq: "" })}
                                                        style={{
                                                            backgroundColor: colors.blue,
                                                            color: colors.black,
                                                            paddingLeft: 20,
                                                            paddingRight: 20,
                                                            opacity: `40%`,
                                                            border: `1px solid ${colors.blue}`,
                                                            marginTop: '0',
                                                        }}
                                                    >
                                                        Add New Rule
                                                    </RippleButton>
                                                </Fragment>
                                            )}
                                            </FieldArray>
                                        </BulkPriceWrapper>
                                    )}
                                    <ErrorMessage name="productCategory">
                                        {msg => <ErrorBox>{msg}</ErrorBox>}
                                    </ErrorMessage>
                                    <ErrorMessage name="productName">
                                        {msg => <ErrorBox>{msg}</ErrorBox>}
                                    </ErrorMessage>
                                    <RippleButton type="submit" top={"24px"}>
                                        Save
                                    </RippleButton>
                                </InputBlock>
                            </Form>
                        </EditProductContainer>
                    )}
                </Formik>
            </ScreenContainer>
            <datalist id="ProductList">
            {productsMasterList && productsMasterList.map((product, index) => (
                <option key={index}>{product.itemName}</option>
            ))}
            </datalist>
        </SlidingOverlay>
    );
};

EditProduct.propTypes = {
    product: object,
    shopId: string,
    open: bool,
    isLoading: bool,
    setOpen: func,
    updateProduct: func,
    searchProductsOnMasterList: func
};

export default EditProduct;
