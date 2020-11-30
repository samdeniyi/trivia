import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { func, object, string } from 'prop-types';
import { colors } from '../../../../styles';
import { saveWalletTransferAmount } from '../../../../redux/ducks/account/wallet/actions';
import { TopHeader, RippleButton, MoneyInput } from '../../../../components';
import { TransactionStatus } from '../../../../containers/MessageContainer';
import { ScreenContainer, ViewContainer } from '../../../../containers/ScreenContainer';
import { Message } from '../../../../containers/MessageContainer';
import { ReactComponent as WalletIcon } from '../assets/wallet.svg';
import { unparseBalance } from '../../../../utils/currency/parseBalance';

const FundAmount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    border-radius: 15px;
    background-color: ${colors.blueish};
    margin: 0 5vw;
`;

const SendButton = styled(RippleButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px auto auto;
    width: calc(100% - 10vw);
`;

const WalletBalance = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
`;

const SendMoney = ({ 
    saveWalletTransferAmount
}) => {
    const [amount, setAmount] = useState(parseFloat(0).toFixed(2));
    const country = useSelector(state => state.user.country);
    const wallet = useSelector(state => state.account.wallet);

    return (
        <Fragment>
            <TopHeader title={"Send Money"} />
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
                        How much would you like send?
                    </Message>
                    <FundAmount>
                        <MoneyInput balance={wallet.balance === 0 ? unparseBalance(toString(wallet.balance)) : unparseBalance(wallet.balance)} country={country} amount={amount} setAmount={setAmount} />
                    </FundAmount>
                    <WalletBalance>
                        <WalletIcon/>
                        <TransactionStatus>Wallet Balance: {wallet.balance}</TransactionStatus>
                    </WalletBalance>
                    <SendButton 
                        type={"button"} 
                        onClick={() => saveWalletTransferAmount(amount, 'notTransfered', '/actions/send_money_destination')}
                        disabled={+amount <= 0}
                    >
                        Send
                    </SendButton>
                </ViewContainer>
            </ScreenContainer>
        </Fragment>
    );
};

SendMoney.propTypes = {
    saveWalletTransferAmount: func,
    wallet: object,
    country: string,
};

export default connect(
    null, 
    { saveWalletTransferAmount }
)(SendMoney);