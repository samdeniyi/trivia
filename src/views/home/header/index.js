import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { string, array, func } from 'prop-types';
import { colors } from '../../../styles';

import { UserAvatar } from '../../../components';
import NotificationIcon from './assets/bell.svg';
import SpacesLogo from './assets/spaces_logo.svg';
import { ReactComponent as ConnectionIcon } from './assets/connection.svg';
import { ReactComponent as NoConnectionIcon } from './assets/no_connection.svg';

const HeaderBar = styled.header`
    display: flex;
    flex-direction: row;
    margin: 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    padding: 20px;
    background: white;
    z-index: 1
`;

const IconWrapper = styled.div`
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    left: 40px;
    top: 40px;
    background: ${({bgc}) => bgc || 'none'};
`;

const NotificationBell =  styled.div`
    padding: 7px 8px 7px 9px;
    position: relative;
    background-image: url(${ NotificationIcon });
    background-position: center;
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;

    ${({ notifications }) => notifications.some(notification => notification.state === "UNREAD") && css`
        &::after {
            content: '●';
            color: ${colors.orange};
            position: absolute;
            left: 21px;
            bottom: 18px;
        }
    `}
`;

const HeaderLogo = styled.img``;

export const Header = ({
    notifications,
    avatar
}) => {
    const isOffline  = useSelector(state => state.offline.isOffline);

    return (
        <HeaderBar>
            <Link to="/user/update_data">
                <UserAvatar avatar={avatar} alt="User avatar"></UserAvatar>
                <IconWrapper bgc={!isOffline ? colors.green : colors.red}>
                    {!isOffline
                        ? <ConnectionIcon width={"18px"} height={"18px"} />
                        : <NoConnectionIcon width={"18px"} height={"18px"} />
                    }
                </IconWrapper>
            </Link>
            <HeaderLogo src={SpacesLogo} alt="Spaces Logo" />
            <Link to="/user/notifications">
                <NotificationBell notifications={notifications} />
            </Link>
        </HeaderBar>
    );
};

Header.propTypes = {
    avatar:        string,
    notifications: array,
    updateWalletBalance: func,
};