import React, { Fragment, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../../../../styles';
import { connect } from 'react-redux';
import { array, string, func, shape, number, oneOfType } from 'prop-types';
import { 
    deleteUserDebitCard, 
    switchWalletUsageMode, 
    saveWalletFundAmount, 
    chargeWallet
} from '../../../../../../redux/ducks/account/wallet/actions';

import {
    Loader,
    TopHeader,
    PageLogo,
    RippleButton,
    ConfirmPopupDialog,
    TransactionResult
} from '../../../../../../components';
import { ScreenContainer, FlexSpaceBetweenBlock } from '../../../../../../containers/ScreenContainer';
import { Message, Title, SmallLightText } from '../../../../../../containers/MessageContainer';
import { Add } from '../../../../../../containers/HeaderContainer';
import DebitCardLogo from './assets/credit_card.svg';
import MasterCardIcon from './assets/master_card_logo.svg';
import VisaIcon from './assets/visa_logo.svg';
import { ReactComponent as DeleteIcon } from './assets/delete_card.svg';
import { ReactComponent as ArrowForward } from '../../../../../../assets/arrow.svg';

const AddCard = styled(RippleButton)`
    & > a, 
    & > a:hover {
        color: ${colors.white};
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardWallet = styled.ul`
    margin: 64px 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const Card = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid ${colors.border.bottom};
`;

const CardInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CardLabel = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;

    & > h5 {
        color: ${colors.themeTextColor3};   
    }

    & > span {
        margin-top: 5px;
        ${css`${SmallLightText}`};
    }
`;

const DeleteCardButton = styled(DeleteIcon)`
    cursor: pointer;
`;

const DebitCardPage = ({
    isLoading,
    cards,
    mode,
    fund,
    chargeWallet,
    switchWalletUsageMode,
    saveWalletFundAmount,
    deleteUserDebitCard
}) => {
    const [deleteClicked, setDeleteClicked] = useState(false);
    const selectedCard = useRef(null);
    const cardWalletNonEmpty = (cards.length > 0);
    
    return (
        isLoading ?
        <Loader /> : (
        <Fragment>
            {cardWalletNonEmpty ?
                <Fragment>
                    <TopHeader title={"Debit Cards"} backAction={() => switchWalletUsageMode("manage")}>
                        <Link to="/user/wallet_cards_add">
                            <Add right={"true"} />
                        </Link>
                    </TopHeader>
                    <TransactionResult
                        open={fund.status !== "notFunding"}
                        type={fund.status}
                        amount={fund.amount}
                        tryAgain={() => chargeWallet(fund.amount, selectedCard.current)}
                        toggleOpen={() => {
                            saveWalletFundAmount(0, "notFunding", '/');
                            switchWalletUsageMode("manage");
                        }}
                    />
                    <CardContainer>
                        <CardWallet>
                        {cards.map((card, index) => (
                            <Card key={index}>
                                <CardInfo>
                                    <PageLogo 
                                        width={"32px"} 
                                        height={"32px"}
                                        Icon={card.cardBrand === "VISA" ? VisaIcon : MasterCardIcon}
                                        iconHeight={"32px"}
                                        iconWidth={"32px"}
                                    />
                                    <CardLabel>
                                        <h5>{card.cardBrand}</h5>
                                        <span>{'●●●● '.repeat(3).concat(card.last4digits)}</span>
                                    </CardLabel>
                                </CardInfo>
                                {(mode === 'payment') ?
                                    <ArrowForward 
                                        onClick={() => {
                                            selectedCard.current = cards[index].embedToken;
                                            chargeWallet(fund.amount, cards[index].embedToken)
                                        }} 
                                    /> : <DeleteCardButton onClick={() => setDeleteClicked(!deleteClicked)} />
                                }
                                <ConfirmPopupDialog 
                                    open={deleteClicked}
                                    title={"Are you sure you want to remove this card?"}
                                    confirmationText={"When you remove this card, it will no longer appear in saved cards."}
                                    answers={[
                                        {
                                            variant: "No",
                                            action: () => setDeleteClicked(!deleteClicked)
                                        }, 
                                        {
                                            variant: "Yes",
                                            action: () => {
                                                deleteUserDebitCard(index);
                                                setDeleteClicked(!deleteClicked);
                                            }
                                        }
                                    ]}
                                />
                            </Card>
                        ))}
                        </CardWallet>
                    </CardContainer>
                </Fragment> : (
                <Fragment>
                    <TopHeader title={"Debit Cards"} />
                    <ScreenContainer>
                    <FlexSpaceBetweenBlock top={"64px"}>
                        <div>
                            <PageLogo
                                Icon={DebitCardLogo}
                                width={"184px"}
                                height={"184px"}
                                iconHeight={"auto"}
                                iconWidth={"auto"}
                                margin={"48px auto"}
                            />
                            <Title>No debit cards</Title>
                            <Message
                                bottom={"24px"}
                                top={"0"}
                                align={"center"}
                            >
                                You’ve not added a debit card. Add a debit card to easily fund your account.
                            </Message>
                        </div>
                        <AddCard top={'0'}>
                            <Link to="/user/wallet_cards_add">
                                Add a debit card
                            </Link>
                        </AddCard>
                    </FlexSpaceBetweenBlock>
                </ScreenContainer>
            </Fragment>
            )}
            </Fragment>
        )
    );
};

DebitCardPage.propTypes = {
    mode:                  string,
    cards:                 array,
    deleteUserDebitCard:   func,
    switchWalletUsageMode: func,
    saveWalletFundAmount:  func,
    chargeWallet:          func,
    fund:                  shape({ amount: oneOfType([number, string]), status: string })
};

const mapStateToProps = ({ account }) => ({
    isLoading: account.wallet.isLoading,
    cards:     account.wallet.cards,
    mode:      account.wallet.mode,
    fund:      account.wallet.fund
});

export default connect(
    mapStateToProps,
    {
        chargeWallet,
        switchWalletUsageMode,
        saveWalletFundAmount,
        deleteUserDebitCard 
    }
)(DebitCardPage);