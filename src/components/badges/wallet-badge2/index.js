import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bool, func, any } from 'prop-types';
import { colors, fonts } from '../../../styles';
import { formatPrice } from '../../../utils/currency/formatPriceWithComma';
import { Badge } from '../../../containers/BadgeContainer';
import { ReactComponent as WalletIcon } from './assets/money_wallet.svg';
import { ReactComponent as AddMoneyIcon } from './assets/add_money.svg';
import { ReactComponent as SendMoneyIcon } from './assets/send_money.svg';

const WalletBalance = styled.div`
    position: absolute;
    top: 16px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    &.thirdStep {
        display: flex;
        align-items: flex-end;
        span {
            font-size: 16px;
            margin-left: 5px;
        }
    }
    &.fourthStep {
        display: flex;
        align-items: flex-end;
        top: 5px;
        span {
            font-size: 16px;
            margin-left: 5px;
        }
    }
`;

const BalanceWrapper = styled.div`
    margin: 0 8px;

    &.thirdStep {
        display: flex;
        align-items: flex-end;
        span {
            font-size: 16px;
            margin-left: 5px;
        }
    }
    &.fourthStep {
        display: flex;
        align-items: flex-end;
        span {
            font-size: 16px;
            margin-left: 5px;
        }
    }
`;

const ButtonsWrapper = styled.div`
    position: absolute;
    bottom: 16px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    transition: all 0.2s linear;
    width: calc(100% - 32px);
    &.firstStep {
        opacity: 0;
        transition: all 0.2s linear;
    }
    &.secondStep {
        opacity: 0;
        transition: all 0.2s linear;
    }
    &.thirdStep {
        opacity: 0;
        display: none;
    }
    &.fourthStep {
        opacity: 0;
        display: none;
    }
`;

const Circle = styled.div`
    width: ${({ width }) => width || '32px'};
    height: ${({ height }) => height || '32px'};
    border-radius: ${({ borderRadius }) => borderRadius || '50%'};
    background: ${({ background }) => background || "#FFFFFF33"};
    margin-top: ${({ top }) => top || "0px"};
    margin: ${({ margin }) => margin || null};
    padding: 8px;
`;

const WalletBalanceAmount = styled.span`
    font-family: ${fonts.redesign};
    line-height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

const Dot = styled.span`
    height: 6px;
    width: 6px;
    background-color: #ffffff;
    border-radius: 50%;
    display: inline-block;
    margin-right: 1px;
    margin-left: 1px;
`;

const WalletBalanceTitle = styled.h6`
    font-family: ${fonts.main};
    font-size: 10px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #ffffff;
`;

const AddMoneyButton = styled.button`
    height: 40px;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF33;
    color: #ffffff;
    text-align: center;
    border-radius: 8px;
    font-family: ${fonts.main};
    font-size: 10px;
    font-weight: 500;
    border: none;
    outline:none;
    @media screen and (max-width: 360px) {
        min-width: 120px;
    }
`;

const SendMoneyButton = styled.button`
    height: 40px;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF33;
    color: #ffffff;
    text-align: center;
    border-radius: 8px;
    font-family: ${fonts.main};
    font-size: 10px;
    font-weight: 500;
    border: none;
    outline:none;
    @media screen and (max-width: 360px) {
        min-width: 120px;
    }
`;

const WalletBadge2 = ({
    setOpenWallet,
    balance,
    hideBalance,
    classNames,
    addMoney,
    sendMoney
}) => {
    return (
        <Badge
            background={colors.background.walletBadge}
            boxShadow
            className={`sticky_badge ${classNames}`}
        >  
            <WalletBalance className={classNames}>
                <Circle>
                    <WalletIcon />
                </Circle>
                <BalanceWrapper className={classNames}>
                    {hideBalance ? (
                        <WalletBalanceAmount>
                            <Dot/>
                            <Dot/>
                            .
                            <Dot/>
                            <Dot/>
                        </WalletBalanceAmount>
                    ) : (
                        <WalletBalanceAmount>
                            {formatPrice(balance || 0)}
                        </WalletBalanceAmount>
                    )}
                    <WalletBalanceTitle>Wallet Balance</WalletBalanceTitle>
                </BalanceWrapper>
            </WalletBalance>
            <ButtonsWrapper className={classNames}>
                <AddMoneyButton
                    //onClick={addMoney}
                    onClick={()=> {setOpenWallet(true)}}
                >
                    <AddMoneyIcon style={{ marginRight: '8px'}}/>
                    Add Money
                </AddMoneyButton> 
                <SendMoneyButton
                    //onClick={sendMoney}
                    onClick={()=> {setOpenWallet(true)}}
                >
                    <SendMoneyIcon style={{ marginRight: '8px'}}/>
                    Send Money
                </SendMoneyButton> 
            </ButtonsWrapper>
        </Badge>
    );
};

WalletBadge2.propTypes = {
    balance:     any,
    hideBalance: bool,
    setFundingOptions: func,
    addMoney: func,
    sendMoney: func
};

const mapStateToProps = ({ account }) => ({
    status :     account.wallet.status,
    balance:     account.wallet.balance,
    hideBalance: account.wallet.hideBalance
});

export default connect(
    mapStateToProps,
    null
)(WalletBadge2);