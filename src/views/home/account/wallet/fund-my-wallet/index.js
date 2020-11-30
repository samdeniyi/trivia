import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector, useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { colors } from '../../../../../styles';
import { saveWalletFundAmount, topUpWalletBalance, verifyWalletPayment } from '../../../../../redux/ducks/account/wallet/actions';

import { TopHeader, RippleButton, MoneyInput, usePaystackPayment } from '../../../../../components';
import { ScreenContainer, ViewContainer } from '../../../../../containers/ScreenContainer';
import { Message } from '../../../../../containers/MessageContainer';
import { toast } from "react-toastify";
import { countriesMap } from '../../../../../data/countries';

const paystackKey = process.env.REACT_APP_SPACES_PAYSTACK_KEY

const FundAmount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    border-radius: 15px;
    background-color: ${colors.blueish};
    margin: 0 5vw;
`;

const FundButton = styled(RippleButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px auto auto;
    width: calc(100% - 10vw);
`;

const FundWallet = ({ 
    saveWalletFundAmount
}) => {
    const [amount, setAmount] = useState('');
    const country = useSelector(state => state.user.country);
    const email = useSelector(state => state.user.email);
    const currency = countriesMap.get(country).currency.code
    
    const FundHook = () => {
        const dispatch = useDispatch();
        const initializePayment = usePaystackPayment();

        const payload = {
            amount: amount * 100,
            currency: currency,
            description: ""
        }

        return (
            <FundButton
                    type={"button"} 
                    onClick={async () => {
                        
                        if(amount < 100){
                            toast.error("Please enter an amount higher than 100");
                            return;
                        }

                        const response = await dispatch(topUpWalletBalance(payload));
                        if (response.status) {
                             const config = {
                                 reference: response.data.transactionRef,
                                 email: email,
                                 amount: response.data.amount,
                                 publicKey: paystackKey
                             };
                             

                             initializePayment(
                                 config,
                                 (reference) => {
                                    dispatch(
                                        verifyWalletPayment(reference.trxref)
                                    );
                                 },
                                 () => {
                                     console.log("closed");
                                 }
                             );
                        } else toast.error(response.message);
                    }}
                >
                    Fund
                </FundButton>
        );
    };


    return (
        <Fragment>
            <TopHeader title={"Fund Wallet"} />
            <ScreenContainer>
                <ViewContainer top={"56px"}>
                    <Message 
                        color={colors.themeTextColor1} 
                        size={"18px"} 
                        align={"center"}
                        top={"64px"}
                        weight={"500"}
                        lineHeight={"22px"}
                        bottom={"54px"}
                    >
                        How much would you like add to your wallet?
                    </Message>
                    <FundAmount>
                        <MoneyInput country={country} amount={amount} setAmount={setAmount} />
                    </FundAmount>
                    <FundHook/>
                    {/* <FundButton 
                        type={"button"} 
                        onClick={() => 
                            {
                                //console.log("implement paystack funding here")
                                

                            }
                        }
                    >
                        Fund
                    </FundButton> */}
                </ViewContainer>
            </ScreenContainer>
        </Fragment>
    );
};

FundWallet.propTypes = {
    saveWalletFundAmount: func
};

export default connect(
    null, 
    { saveWalletFundAmount }
)(FundWallet);