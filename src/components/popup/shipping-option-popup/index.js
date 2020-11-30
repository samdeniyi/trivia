import React, { useState, Fragment} from "react";
import styled from 'styled-components';
import { bool, number, func, string, arrayOf, shape } from 'prop-types';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { 
    PopUp, 
    PopUpContent, 
    PopUpHeader, 
    CancelButton, 
    ConfirmButton, 
    OptionList, 
    Item, 
    Radio 
} from '../common';
import {
    ListHeading,
    ListPopUp,
    ListSubHeading
} from "../../../containers/ListContainer";

import NoIcon from "../../../assets/address.svg";
import { formatPrice } from "../../../utils/currency/formatPriceWithComma";

const ListItemChild = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 0 5px;
    align-items: center;
`;

const BoldText = styled.span`
    font-size: 10px;
    font-weight: 500;
    color: "#29394f";
`;

const ShippingDetail = styled(ListSubHeading)`
    font-weight: 300;
    color: "#56636d";
    display: flex;
`;

const Container = styled.div``;

const Avatar = styled.img`
    width: ${({ width }) => width || '32px'};
    height: ${({ height }) => height || '32px'};
    margin-top: ${({ top }) => top || 0};
    object-fit: ${({ objectFit }) => objectFit || 'initial'};
    //background: "#000000";
`;

export const ShippingOptionsPopup = ({
    open,
    setOpen,
    items,
    confirm
}) => {
   
    const [clicked, setClicked] = useState(-1);
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
   
  return (
    <Fragment>
        {open && (
          <Overlay
              bgc={"rgba(0, 0, 0, 0.4)"}
              zIndex={"99999"} 
              onClick={() => { setOpen(!open) }}
              nonSliding={true}
          />
         )}
         <PopUp open={open} zIndex={"100000"}>
             <PopUpContent>
                <PopUpHeader align={"left"}>Shipping options</PopUpHeader> 
                <OptionList>
                    {items.map(
                    (
                        { 
                        Icon, 
                        partner,
                        deliveryFee,
                        deliveryOption,
                        productName,
                        pickupDate,
                        deliveryDate,
                        //processingTime,
                        //deliveryDays,
                        },
                        index
                    ) => (
                        <Item key={index} onClick={() => setClicked(index)}>
                            <ListItemChild>
                                <Avatar 
                                    src={Icon || NoIcon} 
                                    alt="shipping avatar"
                                    borderRadius={"16px"}
                                />
                                <ListPopUp>
                                    {deliveryOption && deliveryOption === 2 ? (
                                        <Container>
                                            <ListHeading noHeadingWrap>{"Shipping fee: Free"}</ListHeading>
                                            <ShippingDetail>{partner}</ShippingDetail>
                                        </Container>
                                    ) : (
                                        <Container>                        
                                            <ListHeading noHeadingWrap>{deliveryFee ? "Shipping fee: " + formatPrice(deliveryFee) : "Shipping fee: Free"}</ListHeading>
                                            {partner && (
                                                <ShippingDetail>{"With "}<BoldText>{partner}</BoldText>{" "}<BoldText>{productName && productName}</BoldText></ShippingDetail>
                                            )}
                                            {pickupDate && (
                                                <ShippingDetail>{"Pickup on: "}<BoldText>{days[new Date(pickupDate).getDay()]}</BoldText></ShippingDetail>
                                            )}
                                            {deliveryDate && (
                                                <ShippingDetail>{"Estimated Delivery: "}<BoldText>{days[new Date(deliveryDate).getDay()]}</BoldText></ShippingDetail>
                                            )}


                                            {/* {partner && (
                                                <ShippingDetail>{"To "}<BoldText>{location}</BoldText>{" with "}<BoldText>{partner}</BoldText></ShippingDetail>
                                            )}
                                            {processingTime && (
                                                <ShippingDetail>{"Processing Time: Ships out within "}<BoldText>{processingTime}</BoldText></ShippingDetail>
                                            )}
                                            {deliveryDays && (
                                                <ShippingDetail>{"Estimated Delivery: "}<BoldText>{deliveryDays}</BoldText></ShippingDetail>
                                            )} */}
                                        </Container>
                                     )}
                                </ListPopUp>
                                <Radio 
                                    name={"filter"} 
                                    type={"radio"}
                                    checked={clicked === index}
                                    defaultChecked={false}
                                /> 
                            </ListItemChild> 
                        </Item>
                    ))} 
                </OptionList>
                <ActionBlock direction={"row"} top={"24px"}>
                    <CancelButton 
                        type={"button"} 
                        onClick={() => { 
                            setClicked(-1)
                            setOpen(!open) 
                        }}
                    > Cancel </CancelButton>
                    <ConfirmButton 
                        type="button" 
                        disabled={clicked === -1} 
                        onClick={() => {
                            confirm(items[clicked], clicked)
                            setClicked(-1)
                            setOpen(!open)
                        }}
                    > Confirm </ConfirmButton>
                </ActionBlock>
            </PopUpContent>
         </PopUp>
    </Fragment>  
  );
};
                
ShippingOptionsPopup.propTypes = {
    open: bool,
    setOpen: func,
    confirm: func,
    items: arrayOf(
        shape({
            avatar: string,
            deliveryFee: number,
            productName: string,
            pickupDate: string,
            deliveryDate: string,
            partner: string,
            //processingTime: string,
            //deliveryDays: string,
        })
    )
};