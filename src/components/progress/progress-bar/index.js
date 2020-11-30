import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';
import { number } from 'prop-types';

const ProgressComponent = styled.div`
    width: 100%;

    span {
        display: block;
    }
`;

const Bar = styled.div`
    border-radius: 8px;
    background: ${colors.background.progressBar};
`;

const Progress = styled.span`
    border-radius: inherit;
    background: linear-gradient(${colors.orange}, ${colors.orangeGradient});
    height: 4px;
    width: ${props => parseFloat(props.step / props.amount * 100)}%;
    transition: width .2s ease-in;
`;

export const ProgressBar = ({ 
    step, 
    amount
}) => {
    return (
        <ProgressComponent>
             <Bar>
                 <Progress step={step} amount={amount}/>
             </Bar>
        </ProgressComponent>
    );
};

ProgressBar.propTypes = {
    step: number,
    amount: number
};