import React, { Fragment, useRef, memo, useState } from "react";
import { connect, useSelector } from "react-redux";
import { func, shape, object } from "prop-types";
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     // geocodeByPlaceId,
//     getLatLng
// } from "react-places-autocomplete";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { states } from "../../../../../data/countries/nigeria/states";
import { localAreas } from "../../../../../data/countries/nigeria/localAreas";
import { selectAreasByState } from "../../../../../utils/inputs/selectAreasByState";
import { editShop } from "../../../../../redux/ducks/applications/my-shop/actions/shop";
import { verifyShopName } from "../../../../../redux/ducks/auth/signup/merchant/actions";
// import { businessCategories } from '../../../../../data/business/categories';
import { insertZero } from "../../../../../utils/inputs/formatPhoneNumber";
import {
    TopHeader,
    Loader,
    InputWithLabel,
    SelectBox,
    MultipleLabelsSelect,
    RippleButton,
    UploadPicture,
    InfoPopupDialog
} from "../../../../../components";
import { Container } from "../../../../../containers/ScreenContainer";
import { EditShopValidationSchema } from "./EditShopValidationSchema";
import { InputBlock } from "../../../../../containers/InputContainer";
import { Close } from "../../../../../containers/HeaderContainer";
import SupermarketIcon from "../../assets/supermarket.svg";

import {
    Space,
    Text,
    MapBox
    //  InputField
} from "./styles";
import { ImageCropper, toDataURL } from "../../../../../components/popup/image-cropper";
import { toast } from "react-toastify";

const EditShopDetails = ({ editShop, verifyShopName }) => {
    const selectedShop = useSelector(
        state => state.applications.myShop.shops
    )[0];
    const categories = useSelector(
        state => state.applications.myShop.businessCategories
    );
    const selectedLabels = useRef(
        categories
            .filter(category =>
                (selectedShop.businessCategories || []).includes(category.id)
            )
            .map(category => category.name)
    );
    const loading = useSelector(state => state.applications.myShop.isLoading)
    const isLoading = useSelector(state => state.auth.signup.merchant.isLoading);
    const [showCurrentLocation, setShowCurrentLocation] = useState(false);
    const [showMAP, setShowMAP] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [picture, setPicture] = useState();

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
        setPicture(image);
    }

    // const [address, setAddress] = useState("");
    // const [coordinates, setCoordinates] = useState({
    //     lng: null,
    //     lat: null
    // });

    // const handleSelect = async value => {
    //     const results = await geocodeByAddress(value);
    //     const latLng = await getLatLng(results[0]);
    //     setAddress(value);
    //     setCoordinates(latLng);
    // };

    // const handleAddressChange = value => {
    //    if(!showMAP) {
    //        setShowMAP(true)
    //        setShowCurrentLocation(true)
    //     }
    //     setAddress(value);
    // }

    if (loading) {
        return <Loader />;
    } else
        return (
            <Fragment>
                {showCropper && <ImageCropper avatar={picture} onCancel={onCropperCancel} onSave={onCropperSave} /> }
                <TopHeader
                    title={showMAP ? "Location" : "Edit shop details"}
                    noArrow={showMAP}
                >
                    {showMAP && (
                        <Close
                            left={"true"}
                            onClick={() => setShowMAP(false)}
                        />
                    )}
                </TopHeader>
                <Space val={"50px"} />
                <Formik 
                    initialValues={{
                        shopName: selectedShop.shopName,
                        base64BranchImageString: selectedShop.imageUrl,
                        businessCategories: selectedLabels.current,
                        address: selectedShop.location
                            ? selectedShop.location.address
                            : "",
                        localGovt: selectedShop.location
                            ? selectedShop.location.localGovt
                            : "",
                        state: selectedShop.location
                            ? selectedShop.location.state
                            : "",
                        businessLocation: "",
                        phoneNumber: selectedShop.details
                            ? insertZero(selectedShop.details.phoneNumber)
                            : "",
                        email: selectedShop.details
                            ? selectedShop.details.email
                            : ""
                    }}
                    validationSchema={EditShopValidationSchema}
                    onSubmit={(values, { setErrors }) => {
                        values.base64BranchImageString = picture;
                        const categoriesObjects = categories
                            .filter(category =>
                                values.businessCategories.includes(
                                    category.name
                                )
                            )
                            .map(item => item.id);
                        const params = {
                            businessCategories: categoriesObjects,
                            details: {
                                email: values.email,
                                phoneNumber: values.phoneNumber
                            },
                            id: selectedShop.id,
                            branchId: selectedShop.branchId, 
                            businessId: selectedShop.businessId,
                            location: {
                                address: values.address,
                                latitude: "",
                                localGovt: values.localGovt,
                                longitude: "",
                                state: values.state
                            },
                            name: values.shopName,
                            base64BranchImageString: (values.base64BranchImageString === selectedShop.imageUrl)? "": 
                                values.base64BranchImageString,
                            actionSrc: "from edit shop"
                        };

                        if (selectedShop.shopName === values.shopName) {
                            editShop(params);
                        } else {
                            verifyShopName(
                                values.shopName,
                                setErrors,
                                "shopName"
                            ).then(status => {
                                if (status === true) {
                                    editShop(params);
                                }
                            });
                        }
                    }}
                >
                    {({
                        handleChange,
                        errors,
                        values,
                        touched,
                        setFieldValue,
                        initialValues
                    }) =>{ 
                        return (
                        <>
                            {!showMAP && (
                                <UploadPicture
                                    text={"Tap to change profile picture"}
                                    pictureAction={pAction}
                                    defaultPicture={SupermarketIcon}
                                    width={"18px"}
                                    height={"24px"}
                                    picture={picture || values.base64BranchImageString}
                                    formName={"base64BranchImageString"}
                                />
                            )}
                            <Form style={{paddingBottom: '65px'}}>
                                <InputBlock>
                                    {showMAP ? (
                                        <MapBox>hello</MapBox>
                                    ) : (
                                        <Container>
                                            <InputWithLabel
                                                label="Shop name"
                                                placeholder="Shop name"
                                                value={
                                                    values && values.shopName
                                                }
                                                name="shopName"
                                                type="text"
                                                errors={
                                                    touched &&
                                                    touched.shopName &&
                                                    errors &&
                                                    errors.shopName
                                                }
                                                valid={`${
                                                    touched.shopName &&
                                                    !errors.shopName
                                                }`}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <InputWithLabel
                                                label="Street address"
                                                placeholder="Street address"
                                                value={values && values.address}
                                                name="address"
                                                type="text"
                                                errors={
                                                    touched &&
                                                    touched.address &&
                                                    errors &&
                                                    errors.address
                                                }
                                                valid={`${
                                                    touched.address &&
                                                    !errors.address
                                                }`}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <SelectBox
                                                name={"state"}
                                                placeholder={"State"}
                                                value={values && values.state}
                                                options={states}
                                                handleChange={handleChange}
                                                valid={`${
                                                    !touched.state &&
                                                    !errors.state
                                                }`}
                                                error={
                                                    touched &&
                                                    touched.state &&
                                                    errors &&
                                                    errors.state
                                                }
                                            />
                                            <SelectBox
                                                name={"localGovt"}
                                                placeholder={
                                                    "Local Government Area"
                                                }
                                                value={
                                                    values && values.localGovt
                                                }
                                                options={
                                                    values.state
                                                        ? selectAreasByState(
                                                              values.state,
                                                              localAreas
                                                          )
                                                        : []
                                                }
                                                handleChange={handleChange}
                                                valid={`${
                                                    !touched.localGovt &&
                                                    !errors.localGovt
                                                }`}
                                                error={
                                                    touched &&
                                                    touched.localGovt &&
                                                    errors &&
                                                    errors.localGovt
                                                }
                                            />
                                            <InputWithLabel
                                                label="Phone number"
                                                placeholder="Phone number"
                                                value={
                                                    values && values.phoneNumber
                                                }
                                                name="phoneNumber"
                                                type="number"
                                                inputMode={"numeric"}
                                                onKeyUp={e =>
                                                    (e.target.value = e.target.value.replace(
                                                        /\s/g,
                                                        ""
                                                    ))
                                                }
                                                errors={
                                                    touched &&
                                                    touched.phoneNumber &&
                                                    errors &&
                                                    errors.phoneNumber
                                                }
                                                valid={`${
                                                    touched.phoneNumber &&
                                                    !errors.phoneNumber
                                                }`}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <InputWithLabel
                                                label="email"
                                                placeholder="email"
                                                value={values && values.email}
                                                name="email"
                                                type="email"
                                                errors={
                                                    touched &&
                                                    touched.email &&
                                                    errors &&
                                                    errors.email
                                                }
                                                valid={`${
                                                    touched.email &&
                                                    !errors.email
                                                }`}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <Text>
                                                Select business categories that
                                                best fit this your shop
                                            </Text>
                                            <MultipleLabelsSelect
                                                title={"Business categories"}
                                                selectedLabels={selectedLabels}
                                                setValue={setFieldValue}
                                                name={"businessCategories"}
                                                sortedList={categories.map(
                                                    i => i.name
                                                )}
                                                errors={
                                                    touched &&
                                                    touched.businessCategories &&
                                                    errors &&
                                                    errors.businessCategories
                                                }
                                            />
                                        </Container>
                                    )}
                                    <Container>
                                        
                                        {/* <Text>
                                            
                                            {showMAP ? "Please " : ""}confirm
                                            your business location
                                        </Text> */}
                                        {/* <InputWithOnchange
                                label="Business location"
                                placeholder="Business location" 
                                value={values && values.businessLocation}
                                name="businessLocation" 
                                type="text"                        
                                errors={(touched && touched.businessLocation) && (errors && errors.businessLocation)}
                                valid={`${(touched.businessLocation && !errors.businessLocation)}`}
                                setFieldValue={setFieldValue}
                                onChange={e => {
                                    setShowMAP(true)
                                    setFieldValue("businessLocation", e.target.value)
                                }}

                                initialValues={initialValues}
                            /> */}
                                        {/* <PlacesAutocomplete
                                            value={address}
                                            onChange={handleAddressChange}
                                            onSelect={handleSelect}
                                        >
                                            {({
                                                getInputProps,
                                                suggestions,
                                                getSuggestionItemProps,
                                                loading
                                            }) => (
                                                <div>
                                                    <InputField
                                                        {...getInputProps({
                                                            placeholder:
                                                                "Business location",
                                                            className:
                                                                "location-search-input"
                                                        })}
                                                    />
                                                    <div className="autocomplete-dropdown-container">
                                                        {loading && (
                                                            <div>
                                                                Loading...
                                                            </div>
                                                        )}
                                                        {suggestions.map(
                                                            suggestion => {
                                                                const className = suggestion.active
                                                                    ? "suggestion-item--active"
                                                                    : "suggestion-item";
                                                                const style = suggestion.active
                                                                    ? {
                                                                          backgroundColor:
                                                                              "#fafafa",
                                                                          cursor:
                                                                              "pointer"
                                                                      }
                                                                    : {
                                                                          backgroundColor:
                                                                              "#ffffff",
                                                                          cursor:
                                                                              "pointer"
                                                                      };
                                                                return (
                                                                    <div
                                                                        {...getSuggestionItemProps(
                                                                            suggestion,
                                                                            {
                                                                                className,
                                                                                style
                                                                            }
                                                                        )}
                                                                    >
                                                                    {suggestion.description}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete> */}
                                    </Container>
                                </InputBlock>
                                <Container>
                                    {showMAP && (
                                        <RippleButton
                                        type="button"
                                        top={"24px"}
                                        onClick={() => setShowMAP(false)}
                                        >
                                            Confirm
                                        </RippleButton>
                                    )}
                                    {(!showMAP && !showCropper) && (
                                        <RippleButton
                                        type="submit"
                                        top={"24px"}
                                        disabled={isLoading || loading}
                                        >
                                            Save
                                        </RippleButton>
                                    )}
                                </Container>
                            </Form>
                        </>
                    )}}
                </Formik>
                <InfoPopupDialog
                    open={showCurrentLocation}
                    cancel={() => setShowCurrentLocation(!showCurrentLocation)}
                    confirm={() => {
                        setShowCurrentLocation(!showCurrentLocation);
                        setShowMAP(false);
                    }}
                    title={"Select location"}
                    withConfirmation={true}
                    message={
                        "Select your current location as your business location"
                    }
                />
            </Fragment>
        );
};

EditShopDetails.propTypes = {
    updateShop: func,
    verifyShopName: func,
    location: shape({ state: shape({ product: object }) })
};

export default connect(null, { editShop, verifyShopName })(
    withRouter(memo(EditShopDetails))
);
