import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { colors } from '../../../../styles';
import { TopHeader, UserAvatar, EnterReferralCodePopup, RippleButton, RippleLink, PageLogo, Loader } from '../../../../components';
import { ScreenContainer, FlexCenteredBlock } from '../../../../containers/ScreenContainer';
import { ListHeading } from '../../../../containers/ListContainer';
import { Message, Title } from '../../../../containers/MessageContainer';
import PhoneIcon from './assets/phone.svg';
import SMSIcon from './assets/sms.svg';
import WhatsAppIcon from './assets/whatsapp.svg';
import NoAgents from './assets/agents_banner.svg';
import { sendAgentReferral } from '../../../../redux/ducks/user/actions';

const ReferralName = styled(ListHeading)`
    margin: 1em 0 4px 0;
`;

const ReferralState = styled(ListHeading)``;

const ReferralLocalGovt = styled(ListHeading)``;

const ReferralPhoneNumber = styled(ListHeading)``;

const ContactAgentBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;

    & > div {
        margin-right: 16px;

        &:last-of-type {
            margin-right: 0;
        }

        &:first-of-type {
            margin-bottom: 12px;
        }
    }
`;

const ContactOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

const ContactText = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 13px;
    color: ${colors.themeColor6};
`;

const ContactLink = styled.a`
    text-align: center;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > span {
        max-width: 67px;
        max-height: 26px;
        text-align: center;
        margin-top: 8px;
    }
`;

const MerchantAgentDetails = () => {
     const dispatch = useDispatch();
     const isLoading = useSelector(state => state.applications.merchants.isLoading);
     const referralCode = useSelector(state => state.user.referralCode);
     const agent = useSelector(state => state.user.agentData);
     const history = useHistory();
     const [isOpen, setOpen] = useState(false);

     const setCode = code => {
         if (code) {
             setOpen(!isOpen);
             dispatch(sendAgentReferral({ referralCode: code}));
         }
     };

    if (isLoading) {
        return <Loader />;
    } else {
        return (
            <Fragment>
                <TopHeader 
                backAction= {() => {
                    if(isOpen){
                        setOpen(false)
                    }
                }}
                title={"Agent's details"} />

                {(referralCode && referralCode.length > 0 && agent
                 && agent.msisdn && agent.msisdn.length > 10) ? (
                    <Fragment>
                        <ScreenContainer>
                           <FlexCenteredBlock top={"80px"}>
                               <UserAvatar
                                 width={"72px"}
                                 height={"72px"}
                                 avatar={agent && agent.avatar} 
                               />
                              <ReferralName>{agent && agent.firstName} {agent && agent.lastName}</ReferralName>
                              <ReferralState>{agent && agent.state}</ReferralState>
                              <ReferralLocalGovt>{agent && agent.lga}</ReferralLocalGovt>
                              <ReferralPhoneNumber>{agent && agent.msisdn}</ReferralPhoneNumber>                
                              <ContactAgentBlock>
                                  <ContactOption>
                                     <ContactLink href={`tel:${agent && agent.msisdn}`}>
                                        <PageLogo 
                                         width={"32px"}
                                         height={"32px"}
                                         iconHeight={"16px"}
                                         iconWidth={"16px"}
                                         Icon={PhoneIcon}
                                         />
                                         <ContactText>Call Agent</ContactText>
                                     </ContactLink>
                                  </ContactOption>                    
                                  <ContactOption>
                                     <ContactLink href={`sms:${agent && agent.msisdn}`}>
                                        <PageLogo
                                         background={"#fbb97c33"}
                                         width={"32px"}
                                         height={"32px"}
                                         iconHeight={"16px"}
                                         iconWidth={"16px"}
                                         Icon={SMSIcon}
                                         />
                                         <ContactText>Send An SMS</ContactText>
                                    </ContactLink>
                                  </ContactOption>
                                  <ContactOption>
                                     <ContactLink href={`whatsapp://send?phone=${agent && agent.msisdn}`}>
                                        <PageLogo
                                         background={"#64b16133"}
                                         width={"32px"}
                                         height={"32px"}
                                         iconHeight={"16px"}
                                         iconWidth={"16px"}
                                         Icon={WhatsAppIcon}
                                         />
                                         <ContactText>Whatsapp Message</ContactText>
                                     </ContactLink>
                                  </ContactOption>    
                              </ContactAgentBlock>
                           </FlexCenteredBlock>
                        </ScreenContainer>
                     </Fragment>
                ) : (
                    <Fragment>
                        <ScreenContainer>
                            <FlexCenteredBlock top={"96px"}>
                                <PageLogo
                                    Icon={NoAgents}                              
                                    width={"184px"}
                                    height={"184px"}
                                    iconHeight={"auto"}
                                    iconWidth={"auto"}
                                    margin={"24px auto"}
                                /> 
                                <Title 
                                    bottom={"24px"}
                                   top={"24px"}
                                >
                                    No Agent
                                </Title>
                                <Message
                                    bottom={"24px"}
                                    top={"8px"}
                                    align={"center"}
                                    padding={"0 1em"}
                                >
                                    You’ve not added any agent. To add an agent, enter agent referral code.
                                </Message>
                                <RippleLink
                                    style={{ width: '100%', marginTop: '101px' }}
                                    to={() => { } }
                                    onClick={() => {
                                        setOpen(true)
                                    }}>
                                    <RippleButton>Link to an Agent</RippleButton>
                                </RippleLink>
                            </FlexCenteredBlock>
                        </ScreenContainer>
                    </Fragment>
                )}
      
                <EnterReferralCodePopup
                    open = {isOpen}
                    cancel={() => {
                        setOpen(!isOpen);
                        history.goBack();
                    }}
                    setCode = {setCode}
                />
            </Fragment>
        );
    };
 };

export default withRouter(MerchantAgentDetails);
  
