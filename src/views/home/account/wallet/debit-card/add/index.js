import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { func, bool, string, array } from 'prop-types';
import { addCardInitial } from '../../../../../../redux/ducks/account/wallet/actions';
import { sendDebitCardWithPin, sendOTPAndVerifyWallet } from '../../../../../../redux/ducks/account/wallet/actions/cards/pin-verification';

import { TopHeader, Loader} from '../../../../../../components';
import { ScreenContainer }  from '../../../../../../containers/ScreenContainer';
import { DebitCardForm }    from './forms/card';
import { EnterPINForm }     from './forms/pin';
import { OTPForm }          from './forms/otp';
import OTP3DSecureModal     from './forms/otp-3d';

const AddDebitCard = ({
    isLoading,
    msisdn,
    addCardInitial,
    sendDebitCardWithPin,
    sendOTPAndVerifyWallet
}) => {
    const cardToAdd                       = useRef(null);
    const [enteredPin, setEnteredPin]     = useState("");
    const [pinFormOpen, setPinFormOpen]   = useState(false);
    const [pinApproved, setPinApproved]   = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    
    if (!pinFormOpen && !pinApproved) {
        return (
            isLoading ?
            <Loader /> :
            <Fragment>
                <TopHeader title={"Add A Debit Card"} />
                <ScreenContainer>
                    <DebitCardForm
                        otpModalOpen={otpModalOpen}
                        setOtpModalOpen={setOtpModalOpen}
                        addCardInitial={addCardInitial}
                        setPinFormOpen={setPinFormOpen}
                        pinFormOpen={pinFormOpen}
                        cardToAdd={cardToAdd}
                    />
                    <OTP3DSecureModal
                        otpModalOpen={otpModalOpen}
                        setOtpModalOpen={setOtpModalOpen}
                        debitCard={cardToAdd.current}
                    />
                </ScreenContainer>
            </Fragment>
        );
    } else if (pinFormOpen && !pinApproved) {
        return (
            isLoading ?
            <Loader /> :
            <Fragment>
                <TopHeader title={"Add A Debit Card"} />
                <ScreenContainer>
                    <EnterPINForm 
                        sendDebitCardWithPin={sendDebitCardWithPin}
                        pinFormOpen={pinFormOpen}
                        setPinFormOpen={setPinFormOpen}
                        pinApproved={pinApproved}
                        setPinApproved={setPinApproved}
                        enteredPin={enteredPin}
                        setEnteredPin={setEnteredPin}
                        cardToAdd={cardToAdd.current}
                    />
                </ScreenContainer>
            </Fragment>
        );
    } else {
        return (
            isLoading ?
            <Loader /> :
            <Fragment>
                <TopHeader title={"Add A Debit Card"} />
                <ScreenContainer>
                    <OTPForm
                        sendOTPAndVerifyWallet={sendOTPAndVerifyWallet}
                        cardToAdd={cardToAdd.current}
                        msisdn={msisdn}
                    />
                </ScreenContainer>
            </Fragment>
        );
    };
};

AddDebitCard.propTypes = {
    isLoading:              bool,
    addCardInitial:         func,
    sendDebitCardWithPin:   func,
    sendOTPAndVerifyWallet: func,
    storedCards:            array,
    msisdn:                 string
};

const mapStateToProps = ({ user, account }) => ({
    isLoading:   account.wallet.isLoading,
    msisdn:      user.msisdn
});

export default connect(
    mapStateToProps, 
    { 
        addCardInitial,
        sendDebitCardWithPin,
        sendOTPAndVerifyWallet
    }
)(AddDebitCard);