import React, { useState, Fragment } from "react";
import styled from 'styled-components';
import { bool, func, string, arrayOf, shape, any, number } from 'prop-types';
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
    ListLeftBlock,
    ListSubHeading
} from "../../../containers/ListContainer";

import { ReactComponent as NoIcon } from "../../../assets/wallet.svg";
import { formatPrice } from "../../../utils/currency/formatPriceWithComma";

const ListItemChild = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 0 5px;
    align-items: center;
`;

const BalanceDetail = styled(ListSubHeading)`
    font-weight: 300;
    color: "#56636d";
`;

export const PaymentMethodPopup = ({
    open,
    setOpen,
    items,
    selected,
    confirm
}) => {

    const [clicked, setClicked] = useState(-1);
    
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
                <PopUpHeader align={"left"}>Payment method</PopUpHeader>      
                <OptionList>
                 {items.map(
                    (
                        { 
                         Icon, 
                         name,
                         amount, 
                        },
                        index
                    ) => (
                        <Item key={index} onClick={() => { setClicked(index) }}>
                            <ListItemChild>
                                {Icon ? <Icon /> : <NoIcon />}
                                <ListLeftBlock>
                                    <ListHeading noHeadingWrap={true}>{name}</ListHeading>
                                    {(amount !== undefined) && (
                                        <BalanceDetail>{"Balance: " + formatPrice(amount)}</BalanceDetail>
                                    )}
                                </ListLeftBlock>
                                <Radio 
                                    name={"filter"} 
                                    type={"radio"}
                                    checked={
                                        clicked === -1 ? 
                                        (selected && selected.index === index) :
                                        (clicked === index)
                                    }
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

PaymentMethodPopup.propTypes = {
    open: bool,
    setOpen: func,
    confirm: func,
    items: arrayOf(
        shape({
            Icon: any,
            name: string,
            amount: number
        })
    )
};