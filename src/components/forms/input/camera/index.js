import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { InputLabelBlock, InputWithValidation } from '../../../../containers/InputContainer';
import { ReactComponent as Camera } from './assets/camera.svg';
import { QrScanner } from '../../../../components';
import { func } from 'prop-types';

const CameraInputBlock = styled(InputLabelBlock)`
    display: flex;
`;

const QrWrapper = styled.div`
    display: none;
    
    ${({ openScanner }) => 
        openScanner && 
        css`
           display: block; 
        `
    }
`;

const CameraLabel = styled.label`
    display: inline-block;
    cursor: pointer;
    margin-right: 1em;
`;

const CameraIcon = styled(Camera)`
    position: absolute;
    right: 16px;
`;

export const CameraInput = ({
    saveReferralCode,
    initialValues
}) => {
    const [qr, setQr]     = useState(undefined);
    const [open, setOpen] = useState(false);
    return (
        <CameraInputBlock>
            <InputWithValidation 
                name="qrInput"
                label={"Referral code"}
                value={qr} 
                type="text"
                defaultValue={initialValues}
                size={16}
                placeholder="Referral Code"
                onChange={event => saveReferralCode("referralCode", event.target.value.trim())}
            />
            <CameraLabel>
                <CameraIcon
                    onClick={() => {
                        setQr(undefined);
                        setOpen(!open);
                    }} 
                />
                {open && (
                    <QrWrapper openScanner={qr ? !open : open}>
                        <QrScanner 
                            switchOpen={setOpen} 
                            qr={qr || undefined} 
                            setQr={setQr} 
                            saveReferralCode={saveReferralCode} 
                        />
                    </QrWrapper>
                )}
            </CameraLabel> 
        </CameraInputBlock>
    );
};

CameraInput.propTypes = {
    saveReferralCode: func
};