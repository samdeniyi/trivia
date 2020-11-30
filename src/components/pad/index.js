import React from 'react';
import styled, { css } from 'styled-components';
import { string, func } from 'prop-types';
import { colors, fonts } from '../../styles';
import { RippleLink } from '../button';
import SelectedAnswer from './assets/selected_answer.svg';

const PadBlock = styled.label`
    width: calc(50% - 8px);
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.background.component};
    font-family: ${fonts.main};
    color: ${colors.themeTextColor1};
    font-size: 14px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;

    &:hover {
        border: 1px solid ${colors.blue};
    }
    ${({ selected }) => selected && css`
        border: 1px solid ${colors.blue};
        color: ${colors.blue};
    `}
`;

const PadRadio = styled.input`
    margin: 0;
    cursor: pointer;
    appearance: none;

    &:checked {
        &:after {
            content: url(${ SelectedAnswer });
            position: absolute;
            top: 8px;
            right: 8px;
        }
    }
`;

export const Pad = ({ 
    text, 
    link, 
    handleClick,
    name,
    defaultChecked,
    yes
}) => {
    return link ? (
        <RippleLink to={link}>
            <PadBlock onClick={handleClick}>
                {text}
                <PadRadio type={"radio"} name={name} /> 
            </PadBlock>
        </RippleLink>
    ) : (
        <PadBlock onClick={handleClick} selected={(text === 'No' && !yes) || (text === 'Yes' && yes)}>
            {text}
            <PadRadio defaultChecked={defaultChecked || false} name={name} type={"radio"} />
        </PadBlock>
    );
};

Pad.propTypes = {
    handleClick: func,
    text:        string,
    link:        string
};