import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ConnectionIcon } from './assets/connection.svg';
import { ReactComponent as NoConnectionIcon } from './assets/no_connection.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { colors } from '../../styles';
import { SecondaryText } from '../../containers/MessageContainer';

const OfflineBlock = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    height: 56px;
    position: fixed;
    bottom: 56px;
    background-color: ${({ bg }) => bg || null};
`;

const NoConnection = styled(NoConnectionIcon)`
    width: 32px;
    height: 32px;
`;

const NetworkStatusText = styled(SecondaryText)`
    line-height: 15px;
    margin-top: 12px;
    color: ${colors.white};
`;

const Connection = styled(ConnectionIcon)`
    width: 32px;
    height: 32px;
`;

const Close = styled(CloseIcon)`
    & > g > path {
        fill: ${colors.white};
    }

    cursor: pointer;
`;

export const OfflineStripe = ({
    wasOffline,
    isOffline,
    resetOfflineStatus
}) => {
    const [open, setOpen] = useState(wasOffline !== isOffline);
    
    return open && (
        (!wasOffline && isOffline) ? (
            <OfflineBlock bg={"#f35d5d"}>
                <NoConnection />
                <NetworkStatusText>You are currently offline. Limited features available.</NetworkStatusText>
                <Close onClick={() => setOpen(!open)} />
            </OfflineBlock>
        ) : (wasOffline && !isOffline) && (
            <OfflineBlock bg={"#6dd400"}>
                <Connection />
                <NetworkStatusText>You are back online. All features have been restored.</NetworkStatusText>
                <Close 
                    onClick={() => {
                        resetOfflineStatus();
                        setOpen(!open);
                    }}  
                />
            </OfflineBlock>
        )
    );
};