import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { object, array, func } from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { colors } from '../../../../styles';
import { getUserLastActiveState } from '../../../../redux/ducks/user/actions';
import { agentLastSeen } from '../../../../redux/ducks/applications/agents/actions';

import { TopHeader, UserAvatar, 
    // RippleLink, 
    PageLogo } from '../../../../components';
import { ScreenContainer, FlexCenteredBlock } from '../../../../containers/ScreenContainer';
import { PageCount } from '../containers/AgentsItemsContainer';
import { ListHeading } from '../../../../containers/ListContainer';
import { Label, SecondaryText } from '../../../../containers/MessageContainer';
// import { Badge } from '../../../../containers/BadgeContainer';
import { ReactComponent as ForwardArrowIcon } from '../../../../assets/arrow.svg';
import TeamIcon from '../../../../assets/team.svg';
import PhoneIcon from './assets/phone.svg';
import SMSIcon from './assets/sms.svg';
import WhatsAppIcon from './assets/whatsapp.svg';

const ReferralName = styled(ListHeading)`
    margin: 1em 0 4px 0;
`;

const ReferralLastSeen = styled(SecondaryText)`
    margin: 0;
`;

// const CommisionsLink = styled(RippleLink)`
//     position: absolute;
//     top: 28px;
//     right: 24px;
// `;

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

// const BadgeHeading = styled.h5`
//     position: absolute;
//     top: 16px;
//     left: 16px;
//     font-size: 12px;
//     font-weight: 100;
//     line-height: 15px;
//     color: ${colors.themeTextColor3};
// `;

// const BadgeCommisionsAmount = styled(ListHeading)`
//     position: absolute;
//     top: 35px;
//     left: 16px;
//     font-weight: bold;
//     margin: 4px 0 0 0;
// `;

const ContactOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

const ContactText = styled(PageCount)``;

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

const ParticipatingTeams = styled.ul``;

const TeamsHeader = styled(ListHeading)`
    margin: 24px 0;
`;

const ListedTeam = styled.li`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 8px 16px;
    max-height: 48px;
    border-radius: 13px;
    border: 1px solid ${colors.gray3};
    margin-bottom: 8px;

    & > div {
        margin: 0;
    }
`;

const TeamName = styled(Label)`
    margin: auto;
    line-height: 15px;
    font-size: 12px;
    font-weight: 500;
    margin-left: 16px;
`;

const TeamLink = styled(Link)`
    margin-top: 8px;
`;

const AgentDetails = ({
    location,
    getUserLastActiveState,
    agentLastSeen,
    teams
}) => {
    const referral = location.state;
    // const commissionsList = referral.commissionsList;

    useEffect(() => {
        getUserLastActiveState(referral.id, agentLastSeen);
    }, [getUserLastActiveState, referral, agentLastSeen]);

    const teamsParticipant = []; 
    teams.forEach(team => {
        team.members.forEach(member => {
            if (member.id === referral.id) {
                teamsParticipant.push(team);
            } else return;
        });
    });
    
    return  (
        <Fragment>
            <TopHeader title={"Agent's details"} />
            <ScreenContainer>
                <FlexCenteredBlock top={"64px"}>
                    <UserAvatar
                        top={"24px"}
                        width={"72px"}
                        height={"72px"}
                        avatar={referral && referral.avatar} 
                    />
                    <ReferralName>{referral && referral.firstName} {referral && referral.lastName}</ReferralName>
                    <ReferralLastSeen>{referral.lastSeen}</ReferralLastSeen>
                    <ContactAgentBlock>
                        <ContactOption>
                            <ContactLink href={`tel:${referral && referral.msisdn}`}>
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
                            <ContactLink href={`sms:${referral && referral.msisdn}`}>
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
                            <ContactLink href={`whatsapp://send?phone=${referral && referral.msisdn}`}>
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
                {/* <Badge
                    top={"24px"}
                    height={"69px"}
                    background={colors.themeColor5}
                >
                    <BadgeHeading>Total Commissions Received</BadgeHeading>
                    <BadgeCommisionsAmount>{referral.commission}</BadgeCommisionsAmount>
                    <CommisionsLink to={{
                        pathname: "/actions/agents_commisions",
                        state: commissionsList
                    }}>
                        <ForwardArrowIcon />
                    </CommisionsLink>
                </Badge> */}
                {teamsParticipant && teamsParticipant.map((team, index) => (
                <ParticipatingTeams>
                    <TeamsHeader>Teams</TeamsHeader>
                        <ListedTeam key={index}>
                            <PageLogo
                                width={"32px"}
                                height={"32px"}
                                iconHeight={"16px"}
                                iconWidth={"16px"}
                                Icon={TeamIcon}
                            />
                            <TeamName>{team.name}</TeamName>
                            <TeamLink 
                                to={{ 
                                    pathname: "/actions/agents_team_details", 
                                    state: teams[index]
                                }}
                            >
                                <ForwardArrowIcon />
                            </TeamLink>
                        </ListedTeam>
                    </ParticipatingTeams>
                ))}
            </ScreenContainer>
        </Fragment>
    );
};

AgentDetails.propTypes = {
    location:               object,
    teams:                  array,
    getUserLastActiveState: func,
    agentLastSeen:          func
};

const mapStateToProps = ({ applications }) => ({
    teams: applications.agents.teams
});

export default connect(
    mapStateToProps, 
    {
        getUserLastActiveState,
        agentLastSeen
    }
)(withRouter(AgentDetails));
