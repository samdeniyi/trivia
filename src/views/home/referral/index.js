import React, { Fragment } from 'react';
import styled from 'styled-components';
import Navigation from '../navigation';
import { FlexCenteredBlock, ScreenContainer } from '../../../containers/ScreenContainer';
import { Title, Message } from '../../../containers/MessageContainer';
import { TopHeader, PageLogo, ReferralBadge } from '../../../components';
import ReferralIcon from './assets/megaphone.svg';
import { useSelector } from 'react-redux';
import { currentHost } from '../../../config/API';

const FragmentWrapper = styled(FlexCenteredBlock)`
    animation: fromRightTransform 0.5s ease;
    @keyframes fromRightTransform {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

export const ReferralPage = () => {
    const role = useSelector(state => state.user.role);
    const agentCodeToShare = useSelector(state => state.user.agentCodeToShare);
    
    return (
        <Fragment>
            <TopHeader title={"Referral"} noArrow={true} />
            <ScreenContainer>
                <FragmentWrapper top={"64px"}>
                    <PageLogo
                        Icon={ReferralIcon}
                        width={"184px"}
                        height={"184px"}
                        iconHeight={"auto"}
                        iconWidth={"auto"}
                        margin={"24px auto"}
                    />
                    <Title>Your referral code</Title>
                    <Message
                        bottom={"24px"}
                        top={"0"}
                        align={"center"}
                    >
                        Share your referral code with your contacts.
                    </Message>
                    {(role === "ROLE_AGENT") && (
                        <ReferralBadge
                            title={"Referral Code"}
                            shareData={agentCodeToShare}
                            marketingMessage={`I am inviting you to earn extra income as an agent on Spaces. You can use my invitation link to complete your registration. Visit`}
                            url={`${currentHost}/launch?referralCode=${agentCodeToShare}`}
                            shareMessage={"Share the referral code with your friends"}
                        />
                    )}
                </FragmentWrapper>
            </ScreenContainer>
            <Navigation />
        </Fragment>
    );
};