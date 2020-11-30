import React from 'react';
import styled from 'styled-components';
import { string, func, bool } from 'prop-types';
import { fonts } from '../../styles';
import { Link } from "react-router-dom";
import { colors } from '../../styles';

const DisplayIcon = styled.img`
    margin-bottom: 5px;
`;

const NavIcon = styled(Link)`
    display: flex;
    flex-direction: column;
    font-size: 10px;
    font-family: ${fonts.main};
    width: 25%;
    height: 56px;
    justify-content: flex-end;
    align-items: center;
    padding: 8px;
    &.active {
        border-top: 3px solid ${colors.blue}
    }
`;

export const NavigationElement = ({
    text,
    nonActiveIcon,
    activeIcon,
    onClick,
    clickState,
    link,
    currentLink
}) => {
    return (
        <NavIcon 
            to={link ? link : currentLink} 
            onClick={onClick || null} 
            activeclassname="active"
            exact={"true"}
            className={((link === currentLink) || clickState) ? 'active' : ''}
        >
            <DisplayIcon 
                src={((link === currentLink) || clickState) ? activeIcon : nonActiveIcon} 
                alt={`${text} icon`} 
            />
            {text}
        </NavIcon>
    );
};

NavigationElement.propTypes = {
    text:          string,
    nonActiveIcon: string,
    activeIcon:    string,
    onClick:       func,
    clickState:    bool,
    link:          string,
    currentLink:   string
};
