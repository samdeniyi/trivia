import React from 'react';
import styled from 'styled-components';
import { string, bool, func } from 'prop-types';
import { colors, fonts } from '../../../styles';
import { formatPrice } from '../../../utils/currency/formatPriceWithComma';
import { Badge } from '../../../containers/BadgeContainer';
import { ReactComponent as CoinIcon } from './assets/coin.svg';
import { connect } from 'react-redux';

const WalletBalance = styled.div`
    position: absolute;
    top: 16px;
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
        top: 10px;
        span {
            font-size: 16px;
            margin-left: 5px;
        }
    }
`;

const WalletBalanceAmount = styled.span`
    font-family: ${fonts.redesign};
    line-height: 22px;
    font-size: 24px;
    font-weight: bold;
    color: #192f3d;
`;

const WalletBalanceTitle = styled.h6`
    font-family: ${fonts.redesign};
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #76788e;
`;

const ButtonsWrapper = styled.div`
    position: absolute;
    bottom: 16px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    transition: all 0.2s linear;
    margin-top: 30px;
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

const BonusesWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    border-radius: 20px;
    background-color: #fff0e1;
    height: 40px;
    min-width: 120px;
    padding: 6px;
    @media screen and (max-width: 360px) {
        min-width: 110px;
    }
`;

const Bonuses = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 8px;
`;

const BonusesTitle = styled.h6`
    font-family: ${fonts.redesign};
    font-weight: bolder;
    color: #b28a63;
    font-size: 14px;
`;

const BonusesAmount = styled.span`
    line-height: 16px;
    font-weight: bold;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.black};
`;

const FundWallet = styled.button`
    height: 40px;
    min-width: 140px;
    background-color: #e8f6ff;
    border-radius: 8px;
    font-family: ${fonts.redesign};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding-top: 10px;
    color: #22a8ff;
    border: none;
    @media screen and (max-width: 360px) {
        min-width: 120px;
    }
`;

const WalletBadge = ({
    status,
    balance,
    hideBalance,
    cards,
    classNames,
    activateWallet,
    setFundingOptions
}) => {
    return (
        <Badge
            background={colors.white}
            boxShadow
            className={`sticky_badge ${classNames}`}
        >
            <WalletBalance className={classNames}>
                <WalletBalanceTitle>Wallet Balance</WalletBalanceTitle>
                {!hideBalance && (
                    <WalletBalanceAmount>
                        {(typeof balance === "string") ? balance : formatPrice(balance || 0)}
                    </WalletBalanceAmount>
                )}
            </WalletBalance>
            <ButtonsWrapper className={classNames}>
                <BonusesWrapper>
                    <CoinIcon />
                    <Bonuses>
                        <BonusesTitle>Bonus</BonusesTitle>
                        <BonusesAmount>{Number(0).toFixed(3)}</BonusesAmount>
                    </Bonuses>
                </BonusesWrapper>
                <FundWallet
                    onClick={()=>{  
                        setFundingOptions(true)
                    } }
                >
                    Fund wallet
                </FundWallet> 
            </ButtonsWrapper>


        </Badge>
    );
};

WalletBalance.propTypes = {
    status :     string,
    balance:     string,
    hideBalance: bool,
    activateWallet: func,
    setFundingOptions: func
};

const mapStateToProps = ({ account }) => ({
    status :     account.wallet.status,
    balance:     account.wallet.balance,
    hideBalance: account.wallet.hideBalance,
    cards:       account.wallet.cards
});

export default connect(
    mapStateToProps,
    null
)(WalletBadge);