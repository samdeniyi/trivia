import React, { Fragment, useState, useEffect } from "react";
import { func, array } from 'prop-types';
import styled from "styled-components";
import {
    ShippingOptionsPopup,
} from "../../../../../components";

import {
    ListSubHeading
} from "../../../../../containers/ListContainer";

import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";

import {
    HorizontalSubSectionsTopLeft,
    Sections,
} from "../../styles";

const ShippingText = styled(ListSubHeading)`
    font-size: 10px;
    color: #6c7984;
    line-height: 10px;
    display: flex;
`;

const ChangeShippingText = styled(ShippingText)`
    color: #579fd7;
    cursor: pointer;
    font-size: 10px;
    font-weight: 500;
`;

const Container = styled.div``;

export const ShippingCompany = ({
    availableShippingOptions,
    currentShippingOption,
    selectedShippingOption
}) => {

    const [shippingDetails, setShippingDetails] = useState(currentShippingOption);
    const [shippingOptionsPopup, setShippingOptionsPopup] = useState(false);

    useEffect(() => {
        setShippingDetails(currentShippingOption)
    }, [currentShippingOption]);

    return (availableShippingOptions && availableShippingOptions.length > 0) ? 
        <Fragment>
            <Fragment >
                {Object.entries(shippingDetails).length === 0 ? (
                    <ChangeShippingText
                        onClick={()=>{
                            setShippingOptionsPopup(true) 
                        }}
                    >
                        Choose Shipping company
                    </ChangeShippingText>
                ) : (
                    <Sections>
                        <HorizontalSubSectionsTopLeft>
                        {shippingDetails.deliveryOption === 2 ? (
                            <Container>
                                <ShippingText>{shippingDetails.partner}</ShippingText>
                            </Container>                   
                        ) : (
                            <Container>
                                <ShippingText>{shippingDetails.partner && "Delivery Company: " + shippingDetails.partner}</ShippingText>
                                <ShippingText>{shippingDetails.productName && shippingDetails.productName}</ShippingText>
                                <ShippingText>{shippingDetails.deliveryFee ? "Delivery fee: " + formatPrice(shippingDetails.deliveryFee) : "Delivery fee: Free"}</ShippingText>
                            </Container>
                        )}
                         </HorizontalSubSectionsTopLeft>
                        <ChangeShippingText
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onClick={()=>{
                                setShippingOptionsPopup(true) 
                            }}
                        >
                        Change
                        </ChangeShippingText>
                    </Sections>
                )}
            </Fragment>    
            <ShippingOptionsPopup
                open={shippingOptionsPopup}
                setOpen={setShippingOptionsPopup}
                items={
                    availableShippingOptions.length > 0 && availableShippingOptions
                    .map((thisShip, index) => ({
                        Icon: thisShip.Icon,
                        partner: thisShip.partner,
                        deliveryFee: thisShip.deliveryFee,
                        deliveryOption: thisShip.deliveryOption,
                        productName: thisShip.productName,
                        pickupDate: thisShip.pickupDate,
                        deliveryDate: thisShip.deliveryDate
                    }))
                }
                confirm={(value, index) => { 
                    setShippingDetails(value)
                    selectedShippingOption(value)
                }}
            />
        </Fragment>
        :
        <ShippingText>{"No available shipping option"}</ShippingText> 
};

ShippingCompany.propTypes = {
    availableShippingOptions: array,
    selectedShippingOption: func
};