import React from 'react';
import Switch from 'react-switch';
import { bool, func, string } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../styles';

const CustomSwitch = styled(Switch)`
    position: ${({ reset }) => reset ? 'relative !important' : 'absolute !important'};
    right: ${({ right }) => right || "8px"};
    top: ${({ top }) => top || '15px'};

    & > .react-switch-bg {
        & > div {
            & > svg {
                display: none;
            }
        }
    }
`;

export const SwitchTrigger = ({
    checkStatus,
    switchStatus,
    top,
    reset = false,
    right
}) => {
    return (
        <CustomSwitch
            top={top}
            onColor={'#d6d6d6'}
            offColor={colors.lightGrey}
            onHandleColor={colors.blue}
            offHandleColor={colors.darkGrey}
            right={right}
            width={40}
            height={20}
            reset={reset ? reset.toString() : undefined}
            className={"switch"} 
            checked={checkStatus} 
            onChange={() => switchStatus(!checkStatus)} 
        />
    );
};

SwitchTrigger.propTypes = {
    checkStatus:  bool,
    switchStatus: func,
    top:          string,
    reset:        bool,
    right:        string
};