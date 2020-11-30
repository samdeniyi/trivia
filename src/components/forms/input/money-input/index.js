import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../styles';
import { string, func } from 'prop-types';
import { countriesMap } from '../../../../data/countries';
import { unparseBalance } from '../../../../utils/currency/parseBalance';
import { formatPrice } from '../../../../utils/currency/formatPriceWithComma';

const Amount = styled.input`
    font-size: 20px;
    font-weight: 500;
    width: inherit;
    background: transparent;
    border: none;
    text-align: center;
    color: ${colors.blue};
    outline: none;
`;

export const MoneyInput = ({
    country,
    amount,
    setAmount,
    balance
}) => {
    const currency = countriesMap.get(country).currency.sign;

    return (
        <Amount 
            inputMode={"numeric"}  
            value={`${currency} ${amount}`}
            onChange={event => {
                if (balance >= 0) {
                    setAmount(
                        unparseBalance(event.target.value).trim() <= balance ? 
                        event.target.value.split(currency)[1].trim() : 
                        formatPrice(balance).trim().split(currency)[1].trim()
                    ); 
                } else {
                    setAmount(event.target.value.split(currency)[1].trim());
                }
            }}  
        />
    );
};

MoneyInput.propTypes = {
    amount:    string,
    setAmount: func
}; 