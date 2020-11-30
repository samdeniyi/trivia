import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { InputLabelBlock } from '../../../../containers/InputContainer';
import { TransactionStatus } from '../../../../containers/MessageContainer';
import { formatPrice } from '../../../../utils/currency/formatPriceWithComma';

const OutstandingAmount = styled(TransactionStatus)`
    margin-left: 16px;
`;

export const AmountDue = ({
    amount
}) => {
    return (
        <InputLabelBlock textCenter={true} top={"16px"}>
            <OutstandingAmount type={(amount === 0) ? "PAID" : "PENDING"}>
                {formatPrice(amount)}
            </OutstandingAmount>
        </InputLabelBlock>
    );
};

AmountDue.propTypes = {
    amount: number
};