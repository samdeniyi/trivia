import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { PopUp, PopUpContent, PopUpHeader, CancelButton, ConfirmButton } from '../common';
import { CopyReferralBadge } from '../../badges';
import { SharePopup } from '../share-popup';
import { currentHost } from '../../../config/API';
import { SubTitle, SecondaryText } from '../../../containers/MessageContainer';
import { ReactComponent as FirstStepIcon } from './assets/first_step.svg';
import { ReactComponent as SecondStepIcon } from './assets/second_step.svg';
import { ReactComponent as ThirdStepIcon } from './assets/third_step.svg';
import { ReactComponent as DotIcon } from './assets/dot.svg';

const InfoBlock = styled.div`
    padding: 16px;
`;

const InfoBlockSteps = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
`;

const InfoIntroduction = styled(SubTitle)`
    line-height: 17px;
    margin: 0;
    font-weight: 100;
    text-align: left;
`;

const StrongText = styled.strong`
    font-weight: 500;
`;

const StepsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
`;

const Steps = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;

const Step = styled.div`
    display: flex;
    flex-direction: column;
    
    &:first-child {
        margin-bottom: 41px;
    }

    &:last-child {
        margin-top: 39px;
    }
`;

const StepHeading = styled(SubTitle)`
    font-weight: 500;
    text-align: left;
    margin: 0;
`;

const StepDetails = styled(SecondaryText)`
    margin: 2px 0 0 0;
    text-align: left;
`;

export const MerchantShareLink = ({
    open,
    setOpen,
    referralCode
}) => {
    const [openShare, setOpenShare] = useState(false);

    return open && (
        <Fragment>
            <Overlay onClick={() => setOpen(!open)} bgc={'rgba(0,0,0,0.4)'} />
            <PopUp open={open}>
                <PopUpContent>
                    <PopUpHeader align={"left"}>Add a Merchant</PopUpHeader>
                    <InfoBlock>
                        <InfoIntroduction>
                            You can <StrongText>add a merchant</StrongText> using your referral code or link.<br />
                            How our referral program works<br />
                        </InfoIntroduction>
                        <InfoBlockSteps>
                            <StepsBlock>
                                <FirstStepIcon style={{ marginBottom: "10px" }} />
                                <DotIcon style={{ marginBottom: "8.4px" }} />
                                <DotIcon style={{ marginBottom: "10.4px" }} />
                                <SecondStepIcon  style={{ marginBottom: "10px" }} />
                                <DotIcon style={{ marginBottom: "8.4px" }} />
                                <DotIcon style={{ marginBottom: "10.4px" }} />
                                <ThirdStepIcon />
                            </StepsBlock>
                            <Steps>
                                <Step>
                                    <StepHeading>Invite a Merchant</StepHeading>
                                    <StepDetails>Share your referral link or code</StepDetails>
                                </Step>
                                <Step>
                                    <StepHeading>Make sure they’re active</StepHeading>
                                    <StepDetails>Send them activation reminders.</StepDetails>
                                </Step>
                                <Step>
                                    <StepHeading>Earn More!</StepHeading>
                                    <StepDetails>Earn commissions from merchant activities!</StepDetails>
                                </Step>
                            </Steps>
                        </InfoBlockSteps>
                        <CopyReferralBadge referralCode={referralCode} embedded={true} />
                    </InfoBlock>
                    <ActionBlock direction={"row"} top={"24px"}>
                        <CancelButton type={"button"} onClick={() => setOpen(!open)}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton type={"button"} onClick={() => setOpenShare(!openShare)}>
                            Share
                        </ConfirmButton>
                    </ActionBlock>
                </PopUpContent>
            </PopUp>
            {openShare && (
                <SharePopup 
                    open={openShare}
                    setOpen={setOpenShare}
                    url={`${currentHost}/launch?referralCode=${referralCode}`}
                    marketingMessage={"Share the referral code with your friends"}
                />
            )}
        </Fragment>
    );
};

MerchantShareLink.propTypes = {
    open: bool,
    setOpen: func,
    referralCode: string
};