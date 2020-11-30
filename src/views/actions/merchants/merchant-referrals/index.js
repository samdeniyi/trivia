import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { currentHost } from '../../../../config/API';
import { 
    TopHeader, 
    //ReferralBadge,
    UserAvatar,
    RippleLink,
    PageLogo,
    Loader,
    RippleButton,
    CopyReferralBadge,
    //MerchantShareLink,
    SharePopup
} from '../../../../components';
import { 
    PageTitle, 
    PageCount, 
    PageList,
    InfoBlockSteps,
    StepsBlock,
    Steps,
    Step,
    StepHeading,
    StepDetails,
    CircledNumber,
    BrokenLine,
    InfoIntroduction,
    SubInfoIntroduction,
    ModifiedListItem,
    HorizontalDiv
} from '../styles';
import { Message, PageSeeAll } from '../../../../containers/MessageContainer';
import { List, ListHeading, ListSubHeading } from '../../../../containers/ListContainer';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import MegaPhoneBanner from './assets/megaphone.svg';
import { getDate } from '../utils/date';

const Container = styled.div`
    padding: 1em;
`;

const PageHeading = styled.div`
    position: relative;
    padding: 0 1em;
    margin-top: 24px;
`;

const ReferralWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const MerchantReferrals = () => {
    const isLoading = useSelector(state => state.applications.merchants.isLoading);
    const referrals = useSelector(state => state.applications.merchants.merchantsReferral); 
    const agentCodeToShare = useSelector(state => state.user.agentCodeToShare);
    const marketingMessage = `I am inviting you to Spaces platform. You can use my invitation link to complete your registration. Visit`;
    const url = `${currentHost}/launch?referralCode=${agentCodeToShare}`;
    const [openShareLinks, setOpenShareLinks] = useState(false);

    if (isLoading) {
        return <Loader />;
    } else {
        return (
            <Fragment>
                <TopHeader title={"Refer & Earn"} />
                <ScreenContainer padding={"0px"}>
                    <Container>
                        <InfoIntroduction>GET REWARDED FOR YOUR REFERALS.</InfoIntroduction>
                        <SubInfoIntroduction>How it works</SubInfoIntroduction>
                        <InfoBlockSteps>
                            <StepsBlock>
                                <CircledNumber data-content={"1"} />
                                <BrokenLine/>
                                <BrokenLine/>
                                <BrokenLine/>
                                <CircledNumber data-content={"2"} />
                                <BrokenLine/>
                                <BrokenLine/>
                                <BrokenLine/>
                                <CircledNumber data-content={"3"} />
                            </StepsBlock>
                            <Steps>
                                <Step>
                                    <StepHeading>Invite your friends</StepHeading>
                                    <StepDetails>To invite your friends share your referral code to your friends.</StepDetails>
                                </Step>
                                <Step>
                                    <StepHeading>They sign up and actively participate</StepHeading>
                                    <StepDetails>Make sure to let them know they have to be active on the platform.</StepDetails>
                                </Step>
                                <Step>
                                    <StepHeading>You get rewarded!</StepHeading>
                                    <StepDetails>Once your friend performs a few important actions, you are rewarded instantly!</StepDetails>
                                </Step>
                            </Steps>
                        </InfoBlockSteps>
                        
                        {/* <ReferralBadge top={"24px"} />  */}

                        <CopyReferralBadge top={"24px"} referralCode={agentCodeToShare} />
                        <RippleButton onClick={() => setOpenShareLinks(!openShareLinks)}>
                            Share
                        </RippleButton>

                    </Container>
                    {(referrals && referrals.length > 0) ? (
                    <ReferralWrapper>
                        <PageHeading>                                
                            <HorizontalDiv>
                                <PageTitle>Your Referrals</PageTitle>
                                <RippleLink 
                                  to={{ pathname: "/actions/merchant_referrals_list", state: referrals }}
                                >
                                    <PageSeeAll>See All</PageSeeAll>
                                </RippleLink>
                            </HorizontalDiv>
                            <PageCount>
                                {(referrals && referrals.length > 0) && referrals.length} Active referrals
                            </PageCount>
                        </PageHeading>
                        <List top={"16px"}>
                        {referrals && referrals.slice(0, 4).map((referral, index) => (
                            // <RippleLink
                            //     key={index}
                            //     to={{ 
                            //         pathname: "/actions/agents_agent_details", 
                            //         state: referrals[index]
                            //     }}
                            // >   
                                <ModifiedListItem key={index} height={"48px"} bottom={"8px"}>
                                    <UserAvatar 
                                        avatar={referral.avatar}
                                        width={"32px"}
                                        height={"32px"}
                                    />
                                    <HorizontalDiv left={"16px"}>
                                        <ListHeading>{`${referral.firstName} ${referral.lastName}`}</ListHeading>
                                        <ListSubHeading style={{ fontSize: '10px' }}>
                                            { getDate(referral.createdAt) }
                                        </ListSubHeading>
                                    </HorizontalDiv>
                                </ModifiedListItem>
                            // </RippleLink>
                        ))}
                      </List>
                    </ReferralWrapper> 
                    ) : (
                    <ReferralWrapper>
                        <PageHeading>
                            <PageTitle>Your Referrals</PageTitle>
                            <PageCount>0 Active referrals</PageCount>
                        </PageHeading>
                        <PageList>
                            <PageLogo
                                Icon={MegaPhoneBanner}
                                width={"100px"}
                                height={"100px"}
                                iconHeight={"auto"}
                                iconWidth={"auto"}
                                background={"#f2f5fa"}
                            /> 
                            <Message align={"center"}>
                                You haven't referred anybody yet. Friends you invite and become active will show here.
                            </Message>
                        </PageList>
                    </ReferralWrapper> 
                    )}
                    {openShareLinks && (
                        // <MerchantShareLink 
                        //     open={openShareLinks}
                        //     setOpen={setOpenShareLinks}
                        //     referralCode={agentCodeToShare}
                        // />
                        <SharePopup
                            url={url}
                            marketingMessage={marketingMessage}
                            open={openShareLinks}
                            setOpen={setOpenShareLinks}
                        />
                    )}
                </ScreenContainer>     
            </Fragment>
        );
    };
};

export default MerchantReferrals;