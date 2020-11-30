import React, { Fragment } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';
import { ReactComponent as CheckmarkIcon } from './assets/checkmark.svg';
import { string } from 'prop-types';

const ApprovedBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
    align-items: center;
    position: relative;
    margin-top: 64px;
    width: ${({ width }) => width || '100%'};
    height: 48px;
    background-color: ${colors.border.default};
    border: 1px solid ${colors.white};
    border-radius: 8px;
    transition: all .1s linear;
`;

const ApprovedText = styled.p`
    margin: 0;
`; 

export const ApprovedField = ({ text }) => {
    return (
        <Fragment>
            <ApprovedBlock>
                <ApprovedText>{text}</ApprovedText>
                <CheckmarkIcon />
            </ApprovedBlock>
        </Fragment>
    );
};

ApprovedField.propTypes = {
    text: string
};