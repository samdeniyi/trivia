import React from 'react';
import { connect } from 'react-redux';
import { shape, string, func, bool } from 'prop-types';
import { addCardWith3DSecure } from '../../../../../../../../redux/ducks/account/wallet/actions/cards/3d-secure';
import { RippleButton } from '../../../../../../../../components';
import { Overlay } from '../../../../../../../../containers/OverlayContainer';

const OTP3DSecureModal = ({
    debitCard,
    otpModalOpen,
    addCardWith3DSecure
}) => {
    return otpModalOpen && (
        <Overlay opacity={"100%"}>
            <iframe title={"otpFrame"} width={"100%"} height={"70%"} id={"frame"}></iframe>
            <RippleButton onClick={() => addCardWith3DSecure(debitCard)}>
                Confirm card with 3D Secure
            </RippleButton>
        </Overlay>
    );
};

OTP3DSecureModal.propTypes = {
    addCardWith3DSecure: func,
    otpModalOpen:        bool,
    debitCard:           shape({ cardNumber: string, expirationDate: string, cvv: string })
};

export default connect(
    null, 
    { addCardWith3DSecure }
)(OTP3DSecureModal);