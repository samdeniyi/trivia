import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';
import { CategoryLabel } from '../../containers/MessageContainer';
import CloseIcon from './assets/close.svg';

const LabelBadge = styled(CategoryLabel)`
    &:after {
        content: url(${CloseIcon});
        position: absolute;
        right: 8px;
        top: 6px;
        cursor: pointer;
    }
`;


export const SelectedLabel = ({ 
    text,
    removeLabel
}) => {
    return (
        <LabelBadge onClick={removeLabel}>{text}</LabelBadge>
    );
};

SelectedLabel.propTypes = {
    text:        string,
    removeLabel: func
};