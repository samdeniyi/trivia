import React, { Fragment } from 'react';
import styled from 'styled-components';
import { fonts, colors } from '../../styles';
import { arrayOf, string, shape, func } from 'prop-types';
import { RippleLink } from '../button';
import { 
    MenuOptions, 
    MenuOption, 
    MenuOptionLogo, 
    OptionName, 
    ArrowForward
} from '../../containers/MenuContainer';
import { SwitchTrigger } from '../switch';

const MenuHeader = styled.div`
    border-bottom: 1px solid ${colors.border.bottom};
`;

const MenuHeaderText = styled.h3`
    font-family: ${fonts.main};
    font-size: 14px;
    font-weight: 500;
    margin-left: 16px;
    margin-bottom: 16px;
    color: ${colors.themeTextColor1};
    line-height: 18px;
`;

const OptionWithSwitch = styled.div`
    position: relative;
`;

const OptionSubText = styled.h4`
    font-family: ${fonts.main};
    font-weight: 300;
    color: #212c3d80;
    font-size: 10px;
    margin: auto 16px;
`;

const OptionWithSubText = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MenuList = ({ 
    title,
    options
}) => {
    return (
        <Fragment>
            <MenuHeader>
                <MenuHeaderText>{title}</MenuHeaderText>
            </MenuHeader>
            <MenuOptions>
                {options.map(({ name, icon, link, action, subText, checkStatus, switchStatus }, index) => (
                    <Fragment key={index}>
                        {link ? (
                            <RippleLink 
                                to={link}
                                // type="button" 
                                onClick={action || null}
                            >
                                <MenuOption key={index}>
                                    <MenuOptionLogo icon={icon} />
                                    <OptionName>{name}</OptionName>
                                    <ArrowForward />
                                </MenuOption>
                            </RippleLink>
                        ) : (
                            <MenuOption key={index}>
                                <OptionWithSwitch>
                                    <MenuOptionLogo icon={icon} />
                                    <OptionWithSubText>
                                        <OptionName>{name}</OptionName>
                                        <OptionSubText>{subText}</OptionSubText>
                                    </OptionWithSubText>
                                    <SwitchTrigger checkStatus={checkStatus} switchStatus={switchStatus} />
                                </OptionWithSwitch>
                            </MenuOption>
                        )}
                    </Fragment>
                ))}
            </MenuOptions>
        </Fragment>
    );
};

MenuList.propTypes = {
    title: string,
    options: arrayOf(
        shape({ 
            name: string, 
            icon: string, 
            link: string, 
            action: func 
        })
    )
};