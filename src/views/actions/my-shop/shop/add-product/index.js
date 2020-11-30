import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { AddProductValidationSchema } from "./AddProductValidationSchema";
import { connect, useSelector } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { func } from "prop-types";
import { addProduct, searchProductsOnMasterList, getProductCategories } from "../../../../../redux/ducks/applications/my-shop/actions/shop";
import { productUnits } from "../../../../../data/products/units";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";
import { colors } from "../../../../../styles";

import {
    TopHeader,
    InputWithLabel,
    InputWithOnchange,
    UploadPicture,
    RippleButton,
    TextareaWithLabel,
    SelectBox,
    YesNoBlock,
    BulkPriceInput,
    Loader
} from "../../../../../components";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { InputBlock } from "../../../../../containers/InputContainer";
import { Close } from "../../../../../containers/HeaderContainer";
import SupermarketIcon from "../../assets/supermarket.svg";
import { ImageCropper, toDataURL } from "../../../../../components/popup/image-cropper";
import { toast } from "react-toastify";

const AddProductContainer = styled.div`
    margin-top: 64px;
`;

const ErrorBox = styled.div`
    color: red;
    font-size: 13px;
    font-style: italic;
`;

const BulkPriceWrapper = styled.div`
    margin-top: 16px;
`;

const AddProduct = ({
    addProduct,
    searchProductsOnMasterList,
    getProductCategories
}) => {
    const history = useHistory();
    const [cost, setCost] = useState(undefined);
    const [retail, setRetail] = useState(undefined);
    const [showCropper, setShowCropper] = useState(false);
    const [picture, setPicture] = useState();

    const isLoading          = useSelector(state => state.applications.myShop.isLoading);
    const shops              = useSelector(state => state.applications.myShop.shops);
    const categories         = useSelector(state => state.applications.myShop.productCategories);
    const productsMasterList = useSelector(state => state.applications.myShop.productsMasterList);
    const isOffline          = useSelector(state => state.offline.isOffline);

    const currentShop = shops[0];

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

    const pAction = (formName, image) => {
        setShowCropper(true);
        setPicture(image)
    }

    useEffect(() => {
        !isOffline && getProductCategories();
    }, [getProductCategories, isOffline]);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Add A Product"} withSpacesHeader noArrow>
                <Close left={"true"} onClick={() => history.goBack()} />
            </TopHeader>
            <ScreenContainer paddingBottom={"65px"}>
                <Formik
                    initialValues={{
                        productName: "",
                        productDescription: "",
                        productCategory: "",
                        productUnit: "",
                        costPrice: "",
                        quantity: "",
                        localCreatedDate: Date.now(),
                        retailUnitPrice: "",
                        availableAtRetailPrice: false,
                        availableAtWholesalePrice: false,
                        bulkPrices: [{ price: "", moq: "" }],
                        base64ProductImageString: "",
                        images: {
                            baseImageUrl: "",
                            others: []
                        }
                    }}
                    validationSchema={AddProductValidationSchema}
                    onSubmit={(values, { setErrors }) => {
                        values.base64ProductImageString = picture;
                        const selectedCategoryItem = categories.find(ctg => ctg.name === values.productCategory);
                        values.cost = values.costPrice;
                        values.productCategory = selectedCategoryItem.id;
                        console.log(values);
                        addProduct(currentShop.id, values, setErrors);
                    }}
                >
                    {({
                        errors,
                        touched,
                        values,
                        setFieldValue,
                        handleChange,
                        initialValues
                    }) => { 
                        const setPictureUrl = () => {
                            if(picture) return picture;

                            else return values.base64ProductImageString || values.images.baseImageUrl;
                        }
                    return (
                        <AddProductContainer>
                        {showCropper && <ImageCropper avatar={picture} onCancel={onCropperCancel} onSave={onCropperSave} /> }
                            <UploadPicture
                                text={"Tap to add a product image"}
                                pictureAction={pAction}
                                defaultPicture={SupermarketIcon}
                                width={"36px"}
                                height={"36px"}
                                picture={setPictureUrl()}
                                formName={"base64ProductImageString"}
                            />
                            <Form>
                                <InputBlock>
                                    <InputWithOnchange
                                        label={"Product name"}
                                        type={"text"}
                                        placeholder={"Product name"}
                                        autoComplete={'off'}
                                        name="productName"
                                        value={values.productName}
                                        valid={`${!touched.productName && !errors.productName}`}
                                        errors={touched && touched.productName && errors && errors.productName}
                                        onChange={e => setFieldValue("productName", e.target.value)}
                                        onKeyUp={e => {
                                            if (isOffline === false) {
                                                searchProductsOnMasterList(currentShop.branchId, e.target.value);

                                                const masterListProduct =
                                                    productsMasterList &&
                                                    productsMasterList.find(
                                                        product =>
                                                        product.itemName === values.productName
                                                    );

                                                if (masterListProduct && masterListProduct.masterListImageUrl) {
                                                    values.images.baseImageUrl = masterListProduct.masterListImageUrl;
                                                    console.log(masterListProduct);
                                                    setFieldValue("masterListImageUrl", masterListProduct.masterListImageUrl);
                                                    setFieldValue("base64ProductImageString", "");
                                                };
                                            };
                                        }}
                                        noClearButton={true}
                                        initialValues={initialValues}
                                        list={"ProductList"}
                                    />
                                    <SelectBox
                                        name={"productCategory"}
                                        placeholder={"Select a product category"}
                                        value={values.productCategory}
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
                                        value={values.productUnit}
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
                                        autoComplete={'off'}
                                        value={cost ? formatPrice(cost) : values.costPrice}
                                        onBlur={e => setCost(e.target.value)}
                                        onFocus={e => {
                                            if (cost) e.target.value = values.costPrice;
                                            setCost(undefined);
                                        }}
                                        inputMode={"numeric"}
                                        placeholder={"Cost price"}
                                        name="costPrice"
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
                                        type={"number"}
                                        autoComplete={'off'}
                                        value={values && values.quantity}
                                        placeholder={"Quantity in stock"}
                                        name="quantity"
                                        inputMode={"numeric"}
                                        valid={`${!touched.quantity && !errors.quantity}`}
                                        errors={
                                            touched && touched.quantity &&
                                            errors && errors.quantity
                                        }
                                        noClearButton={true}
                                        setFieldValue={e => setFieldValue("quantity", parseInt(e.target.value))}
                                        initialValues={initialValues}
                                        onKeyPress={e => (e.charCode === 46) && e.preventDefault()}
                                    />
                                    <TextareaWithLabel
                                        name={"productDescription"}
                                        value={values.productDescription}
                                        placeholder={"Enter the description of this product"}
                                        height={"96px"}
                                        valid={`${!touched.productDescription &&!errors.productDescription}`}
                                        errors={
                                            touched && touched.productDescription &&
                                            errors && errors.productDescription
                                        }
                                    />
                                    <InputWithLabel
                                        label={"Retail unit price"}
                                        type={"text"}
                                        autoComplete={'off'}
                                        value={retail ? formatPrice(retail) : values.retailUnitPrice}
                                        onBlur={e => setRetail(e.target.value)}
                                        onFocus={e => {
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
                                                    {values.bulkPrices.map(
                                                        (bulkPrice, index) => (
                                                            <BulkPriceInput
                                                                key={index}
                                                                id={index}
                                                                data={bulkPrice}
                                                                remove={remove}
                                                                handleChange={handleChange}
                                                            />
                                                        )
                                                    )}
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
                                                            marginTop: "0"
                                                        }}
                                                    >
                                                        Add New Rule
                                                    </RippleButton>
                                                </Fragment>
                                            )}
                                            </FieldArray>
                                        </BulkPriceWrapper>
                                    )}
                                    <ErrorMessage name="base64ProductImageString">
                                        {msg => <ErrorBox>{msg}</ErrorBox>}
                                    </ErrorMessage>
                                    <RippleButton
                                        type="submit"
                                        disabled={isLoading}
                                        top={"24px"}
                                    >
                                        Save
                                    </RippleButton>
                                </InputBlock>
                            </Form>
                        </AddProductContainer>
                    )}}
                </Formik>
            </ScreenContainer>
            <datalist id="ProductList">
            {productsMasterList && productsMasterList.map((product, index) => (
                <option key={index}>{product.itemName}</option>
            ))}
            </datalist>

        </Fragment>
    );
};

AddProduct.propTypes = {
    addProduct: func,
    searchProductsOnMasterList: func,
    getProductCategories: func
};

export default connect(
    null,
    {
        addProduct,
        searchProductsOnMasterList,
        getProductCategories
    }
)(withRouter(AddProduct));