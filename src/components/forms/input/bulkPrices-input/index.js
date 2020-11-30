import React from "react";
import { number, func, any } from "prop-types";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";
import { InputWithLabel } from "../text";
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

import styled from "styled-components";

const BulkPriceBlock = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    & div {
        &:first-of-type {
            margin-right: 8px;
        }
        &:last-of-type {
            margin-left: 8px;
        }
    }
`;

const Input = styled(InputWithLabel)`
    flex: 42%;
    
`;

export const BulkPriceInput = ({ id, data, handleChange, remove }) => {
    return (
        <Swipeout
            right={[
                {
                    text: 'Remove',
                    onPress:() => remove(id),
                    style: { backgroundColor: '#e02020', color: 'white', marginBottom: '16px' },
                    className: 'custom-class-2'
                }
            ]}
        >
            <BulkPriceBlock>
                <Input
                    label={"Minimum order quantity"}
                    inputMode={"decimal"}
                    value={data.moq}
                    placeholder={"MOQ"}
                    name={`bulkPrices[${id}].moq`}
                    noClearButton={true}
                    bottom={"0"}
                    onKeyPress={e => {
                        if (e.charCode === 46) e.preventDefault()}
                    }
                />
                <Input
                    label={"Price"}
                    inputMode={"decimal"}
                    value={data.price}
                    placeholder={"Wholesale price"}
                    name={`bulkPrices[${id}].price`}
                    onBlur={e => e.target.value = formatPrice(data.price)}
                    onFocus={e => e.target.value = data.price}
                    onChange={handleChange}
                    noClearButton={true}
                    bottom={"0"}
                    onKeyPress={e => {
                        if (e.charCode === 46) e.preventDefault()}
                    }
                />
            </BulkPriceBlock>
        </Swipeout>
    );
};

BulkPriceInput.propTypes = {
    id: number,
    data: any,
    handleChange: func,
    remove: func
};