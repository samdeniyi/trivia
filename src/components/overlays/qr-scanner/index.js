import React from 'react';
import QrReader from 'react-qr-reader';
import styled from 'styled-components';
import { func, string } from 'prop-types';
import { colors, fonts } from '../../../styles';
import { Overlay } from '../../../containers/OverlayContainer';
import { Close } from '../../../containers/HeaderContainer';

const QrNavigation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
`;

const QrOverlayHelp = styled.p`
    background: ${colors.gray1};
    font-family: ${fonts.main};
    color: ${colors.white};
    font-size: 12px;
    text-align: center;
    width: 225px;
    height: 20px;
    padding: 3px 8px;
    border-radius: 17px;
    margin: auto;
`;

export const QrScanner = ({
    qr,
    setQr,
    switchOpen,
    saveReferralCode
}) => {
    return (
        <Overlay opacity={"100%"}>
            <QrNavigation>
                <Close
                    left={"true"}
                    onClick={() => {
                        if (qr) saveReferralCode("referralCode", qr);
                        switchOpen(false);
                    }} 
                />
                <QrOverlayHelp>Position the QR Code in the center</QrOverlayHelp>
            </QrNavigation>
            <QrReader 
                delay={300}
                onError={(error) => console.error(error)}
                onScan={(data) => !qr && setQr(data)}
            />
        </Overlay>
    );
};

QrScanner.propTypes = {
    saveReferralCode: func,
    switchOpen:       func,
    setQr:            func,
    qr:               string
};