import React from "react";

// import { getTransactionById } from "../../../../../redux/ducks/account/wallet/actions/bank-account";
import styled from "styled-components";
import { ActionBlock } from "../../../../../containers/OverlayContainer";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { RippleButton } from "../../../../../components";
import { Title } from "../../../../../containers/MessageContainer";
import History from "../../../../../utils/History";

import { ReactComponent as SuccessBanner } from "../../../../../assets/success.svg";

const ResultBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`;

const ResultHeader = styled(Title)`
    margin-top: 32px;
`;

const SmallText = styled.div`
 font-size: 13px;
  margin: 10px;
  text-align: center;
`


const AccountVerified = () => {

    const push = () => {
        History.push("/user/wallet_withdrawal_settings")
    };

    return (
        <ScreenContainer>
            <ResultBlock>
                <SuccessBanner />
                <ResultHeader>
                Congratulations! Your Account has been verified and funded
                </ResultHeader>
                <SmallText> Your account funding will reflect in your wallet balance.</SmallText>
                <ActionBlock>
                    <RippleButton onClick={() => push()}>
                        Go to Bank Account Page
                    </RippleButton>
                </ActionBlock>
            </ResultBlock>
        </ScreenContainer>
    );
};

export default AccountVerified;