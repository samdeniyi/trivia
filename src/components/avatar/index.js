import React from 'react';
import styled from 'styled-components';
import FallbackUserAvatar from './assets/user.svg';
import { colors } from '../../styles';
import { string } from 'prop-types';

const AvatarWrapper = styled.div`
    width: ${({ width }) => width || '32px'};
    height: ${({ height }) => height || '32px'};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Avatar = styled.img`
    width: ${({ width }) => width || '32px'};
    height: ${({ height }) => height || '32px'};
    margin-top: ${({ top }) => top || 0};
    object-fit: ${({ objectFit }) => objectFit || 'initial'};
    background-color: ${colors.background.logo};
`;

export const UserAvatar = ({ 
    avatar,
    width,
    height,
    top,
    borderRadius
}) => {
    return (
        <AvatarWrapper 
            width={width}
            height={height} 
        >
            <Avatar 
                src={avatar && avatar !== "Not Set"? avatar : FallbackUserAvatar}
                alt="User Avatar"
                width={width}
                height={height}
                top={top}
                borderRadius={borderRadius}
                objectFit={avatar ? 'cover' : 'initial'}
            />
        </AvatarWrapper>
    );
};

UserAvatar.propTypes = {
    avatar: string,
    width:  string,
    height: string,
    top:    string
};