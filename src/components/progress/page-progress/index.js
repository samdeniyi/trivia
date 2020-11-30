import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../../styles';
import { number } from 'prop-types';

const ProgressComponent = styled.section`
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 100px;
    right: 0;
`;

const ProgressBar = styled.div`
    width: 135px;

    span {
        display: block;
    }
`;

const Bar = styled.span`
    background: ${colors.background.component};
`;

const Progress = styled.span`
    border-radius: 10px;
    background: ${colors.blue};
    height: 8px;
    width: ${props => parseFloat(props.step / props.amount * 100)}%;
`;

const ProgressLabel = styled.p`
    font-size: 12px;
    font-family: ${fonts.main};
    line-height: 10px;
    margin: 0 1em 0 .5em;
`;

export const PageProgress = ({ 
    step, 
    amount
}) => {
    return (
        <ProgressComponent>
            <ProgressBar>
                <Bar>
                    <Progress step={step} amount={amount}></Progress>
                </Bar>
            </ProgressBar>
            <ProgressLabel>{`${step} of ${amount}`}</ProgressLabel>
        </ProgressComponent>
    );
};

PageProgress.propTypes = {
    step: number,
    amount: number
};