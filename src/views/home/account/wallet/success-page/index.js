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


const SuccessPage = () => {

    if(window.top.frames.length !==0) {
        window.top.location.href = window.top.location.origin + "/user/wallet_transaction_success"
    }


    const push = () => {
        History.push("/")
    };

    return (
        <ScreenContainer>
            <ResultBlock>
                <SuccessBanner />
                <ResultHeader>
                Congratulations! Your transaction is completed
                </ResultHeader>
                <SmallText> Your account funding will reflect in your wallet balance.</SmallText>
                <ActionBlock>
                    <RippleButton onClick={() => push()}>
                        Go to Dashboard
                    </RippleButton>
                </ActionBlock>
            </ResultBlock>
        </ScreenContainer>
    );
};

export default SuccessPage;
