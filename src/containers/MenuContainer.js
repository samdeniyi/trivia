import styled from 'styled-components';
import { colors, fonts } from '../styles';
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

export const MenuOptions = styled.ul`
    display: flex;
    flex-direction: column;
    border-top: ${({ withTitle }) => withTitle && `1px solid ${colors.border.top}`};
`;

export const MenuOptionLogo = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: center;
`;

export const OptionName = styled.h4`
    font-family: ${fonts.main};
    font-weight: 100;
    color: ${colors.themeTextColor3};
    font-size: 14px;
    margin: auto 16px;
`;

export const MenuOption = styled.li`
    display: flex;
    flex-direction: row;
    padding: 8px 0 8px 1em;
    position: relative;
	overflow: hidden;
	cursor: pointer;
    
    &:not(:first-of-type) {
        border-top: 1px solid ${colors.border.top};
    }

    &:last-of-type {
        border-bottom: 1px solid ${colors.border.bottom};
    }
    
    & > a, & > div {
        display: flex;
        flex-direction: row;
        position: static;
    
        &:focus::after {
            display: block;
        }
        
        &, &:hover {
            color: unset;
            transition: unset;
            text-decoration: none;
        }
    }
`;

export const ArrowForward = styled(ArrowIcon)`
    position: absolute;
    right: 16px;
    top: 16px;
`;