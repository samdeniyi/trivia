import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { string, bool, func, number, oneOfType } from 'prop-types';
import { colors } from '../../../../styles';

import { RippleButton } from '../../../button';
import { ResultBlock, ResultHeader, ResultText, CancelButton, Result } from '../common';
import { CenteredOverlay, ActionBlock } from '../../../../containers/OverlayContainer';
import { ReactComponent as SuccessBanner } from '../assets/success.svg';
import { ReactComponent as FailBanner } from '../assets/fail.svg';

export const TransactionResult = ({
    open,
    toggleOpen,
    tryAgain,
    type,
    successHeader,
    amount
}) => {
    return open && (
        <CenteredOverlay opacity={"100%"} background={colors.white}>
            <ResultBlock>
            {(type === 'success') ? (
                <Fragment>
                    <SuccessBanner />
                    <ResultHeader>{successHeader}</ResultHeader>
                    <ResultText>
                        Your wallet was successfully funded with<br />
                        <Result>{amount}</Result>
                    </ResultText>
                    <ActionBlock>
                        <Link to={"/"}>
                            <RippleButton onClick={toggleOpen}>Okay</RippleButton>
                        </Link>
                    </ActionBlock>
                </Fragment>
            ) : (
                <Fragment>
                    <FailBanner />
                    <ResultHeader>Failed transaction</ResultHeader>
                    <ResultText>
                        The Payment of 
                        <Result>
                            {amount}
                        </Result> to your wallet was unsuccessful
                    </ResultText>
                    <ActionBlock>
                        <RippleButton onClick={tryAgain}>Try again</RippleButton>
                        <CancelButton onClick={toggleOpen}>Cancel</CancelButton>
                    </ActionBlock>
                </Fragment>
            )}
            </ResultBlock>
        </CenteredOverlay>
    );  
};

TransactionResult.propTypes = {
    open:             bool,
    setOpen:          func,
    tryAgain:         func,
    type:             string,
    amount:           oneOfType([string, number]),
    successHeader:    string,
    successAction:    func,
    successCloseText: string,
    successText:      string
};