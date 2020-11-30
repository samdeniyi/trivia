import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { func, array, bool, string } from 'prop-types';
import { getAgentReferrals } from '../../../../redux/ducks/applications/agents/actions';

import { 
    TopHeader, 
    ReferralBadge, 
    // RippleButton, 
    UserAvatar, 
    OptionsPopupDialog,
    InfoPopupDialog, 
    RippleLink,
    SearchHeader,
    Loader
} from '../../../../components';
import { 
    PageTitle, 
    PageCount, 
    PageList
} from '../containers/AgentsItemsContainer';
// import { 
//     TeamsList, 
//     TeamItem, 
//     TeamItemHeading, 
//     TeamsAvatarsReel, 
//     TeamItemSubHeading 
// } from '../containers/TeamsItemsContainer';
import { Message, PageSeeAll } from '../../../../containers/MessageContainer';
import { List, ListItem, ListHeading, 
    // ListHighlight, 
    ListLeftBlock, ListSubHeading } from '../../../../containers/ListContainer';
import { Options } from '../../../../containers/HeaderContainer';
import { ReactComponent as AgentsBanner }      from './assets/agents_banner.svg';
// import { ReactComponent as TeamsBanner }       from './assets/teams_banner.svg';
import { ReactComponent as SingleAgentIcon }   from '../../../../assets/user.svg';
import { currentHost } from '../../../../config/API';
// import { ReactComponent as CreateTeamIcon }    from '../../../../assets/team.svg';

const PageHeading = styled.div`
    position: relative;
    padding: 0 1em;
    margin-top: 64px;
`;

const Span = styled.span`
    text-transform: capitalize;
    `;

const AgentsTeamsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

// const CreateTeamButton = styled(RippleLink)`
//     width: 100%;
// `;

const AgentsAndTeamsPage = ({
    isLoading,
    referrals,
    teams,
    agentCodeToShare
}) => {
    const [openReferralOption, setReferralOption] = useState(false);
    const [openOptions, setOpenOptions]           = useState(false);
    const role = useSelector(state => state.user.role);
    const [searchValue, setSearchValue]             = useState("");

    const searchedAgentList =
    referrals.filter(agent =>
        agent.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
        agent.lastName.toLowerCase().includes(searchValue.toLowerCase())  
    );

    if (isLoading) {
        return <Loader />;
    } else {
        return (
            <Fragment>
                {(searchedAgentList && searchedAgentList.length === 0) ? (
                    <AgentsTeamsWrapper>
                        <TopHeader title={"Agents & Teams"} />
                        <PageHeading>
                            <PageTitle>Your Agents</PageTitle>
                            <PageCount>0 Agents</PageCount>
                        </PageHeading>
                        <PageList>
                            <AgentsBanner />
                            <Message align={"center"}>
                                You’ve not added any agent. To add an agent, send your referral code to the person.
                            </Message>
                            {(role === "ROLE_AGENT") && (
                                <ReferralBadge 
                                    top={"16px"}
                                    title={"Referral Code"}
                                    shareData={agentCodeToShare}
                                    marketingMessage={`I am inviting you to earn extra income as an agent on Spaces. You can use my invitation link to complete your registration. Visit`}
                                    url={`${currentHost}/launch?referralCode=${agentCodeToShare}`}
                                    shareMessage={"Share the referral code with your friends"}
                                />
                            )}
                        </PageList>
                    </AgentsTeamsWrapper>
                ) : (
                    <Fragment>
                <SearchHeader 
                title={"Agents & Teams"} 
                right={"40px"}
                placeholder={"Search for an agent…"}
                handleSearch={setSearchValue}
            >
            <Options right={"true"} onClick={() => setOpenOptions(!openOptions)} />

                </SearchHeader>
                        {/* <TopHeader title={"Agents & Teams 2"}>
                            <Options right={"true"} onClick={() => setOpenOptions(!openOptions)} />
                        </TopHeader> */}
                        <AgentsTeamsWrapper>
                            <PageHeading>
                                <PageTitle>Your Agents</PageTitle>
                                <PageCount>
                                    {(referrals && referrals.length > 0) && referrals.length} Agents
                                </PageCount>
                                <RippleLink to={{ pathname: "/actions/agents_my_agents", state: referrals }}>
                                    <PageSeeAll>See All</PageSeeAll>
                                </RippleLink>
                            </PageHeading>
                            <List top={"16px"}>
                            {searchedAgentList && searchedAgentList.slice(0, 4).map((referral, index) => (
                                <RippleLink
                                    key={index}
                                    to={{ 
                                        pathname: "/actions/agents_agent_details", 
                                        state: referrals[index]
                                    }}
                                >   
                                    <ListItem height={"48px"} bottom={"8px"}>
                                        <UserAvatar 
                                            avatar={referral.avatar}
                                            width={"32px"}
                                            height={"32px"}
                                        />
                                        <ListLeftBlock>
                                            <ListHeading>{`${referral.firstName} ${referral.lastName}`}</ListHeading>
                                            <ListSubHeading style={{ fontSize: '10px' }}>Status: <Span>{referral.status}</Span></ListSubHeading>
                                            {referral.rejectionReason.length >0 && referral.rejectionReason.map((reason, index) => (
                                            <ListSubHeading style={{ fontSize: '10px' }} key={index}>{reason.details.docType}: {reason.details.text}</ListSubHeading>
                                            ))
                                            }

                                            <ListSubHeading style={{ fontSize: '10px' }}>Last seen: {referral.lastSeen}</ListSubHeading>
                                        </ListLeftBlock>
                                        {/* <ListHighlight>{referral.commission}</ListHighlight> */}
                                    </ListItem>
                                </RippleLink>
                            ))}
                            </List>
                        </AgentsTeamsWrapper>
                        <OptionsPopupDialog
                            open={openOptions}
                            arrows={false}
                            title="Options"
                            cancel={() => setOpenOptions(!openOptions)}
                            items={[
                                {
                                    Icon: SingleAgentIcon,
                                    title: "Add an Agent",
                                    click: () => setReferralOption(!openReferralOption)
                                },  
                                // {
                                //     Icon: CreateTeamIcon,
                                //     title: "Create A Team",
                                //     link: "/actions/agents_create_team"
                                // }
                            ]}
                        />
                        <InfoPopupDialog
                            open={openReferralOption}
                            cancel={() => setReferralOption(!openReferralOption)}
                            title={"Add An Agent"}
                            message={"To add an agent, send your referral code to the person."}
                        >
                            {(role === "ROLE_AGENT") && (
                                <ReferralBadge
                                    embedded={true}
                                    right={"8px"}
                                    left={"8px"}
                                    shareData={agentCodeToShare}
                                    marketingMessage={`I am inviting you to earn extra income as an agent on Spaces. You can use my invitation link to complete your registration. Visit`}
                                    url={`${currentHost}/launch?referralCode=${agentCodeToShare}`}
                                    shareMessage={"Share the referral code with your friends"}
                                    title={"Referral Code"}
                                    top={"24px"} 
                                    bottom={"24px"} 
                                />
                            )}
                        </InfoPopupDialog>
                    </Fragment>
                )}
                {/* {(teams && teams.length === 0) ? (
                    <Fragment>
                    {(referrals.length > 0) && (
                        <Fragment>
                            <PageHeading>
                                <PageTitle>Your Teams</PageTitle>
                                <PageCount>0 Teams</PageCount>
                            </PageHeading>
                            <PageList>
                                <TeamsBanner />
                                <Message align={"center"}>
                                    You’ve not created any teams. Create teams to better manage your agents.
                                </Message>
                                <CreateTeamButton to="/actions/agents_create_team">
                                    <RippleButton>Create a team</RippleButton>
                                </CreateTeamButton>
                            </PageList>
                        </Fragment>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <PageHeading>
                        <PageTitle>Your Teams</PageTitle>
                        <PageCount>{teams.length} {(teams.length !== 1) ? "Teams" : "Team"}</PageCount>
                            <PageSeeAll>See All</PageSeeAll>
                        <RippleLink to="/actions/agents_my_teams" />
                    </PageHeading>
                    <TeamsList>
                    {teams && teams.slice(0, 4).map((team, index) => (
                        <TeamItem key={index}>
                            <RippleLink 
                                to={{
                                    pathname: "/actions/agents_team_details",
                                    state: teams[index]
                                }}
                            >
                                <Options right={"true"} top={"16px"} />
                            </RippleLink>
                            <TeamItemHeading>{team.name}</TeamItemHeading>
                            <TeamItemSubHeading>{team.capitalization}</TeamItemSubHeading>
                            <TeamsAvatarsReel>
                            {team.members && team.members.slice(0, 3).map((agent, index) => (
                                <UserAvatar
                                    key={index}
                                    avatar={agent.avatar}
                                    width={"32px"}
                                    height={"32px"}
                                />
                            ))}
                            </TeamsAvatarsReel>
                            <TeamItemSubHeading>{team.members ? team.members.length : 0} Agents</TeamItemSubHeading>
                        </TeamItem>
                    ))}
                    </TeamsList>
                </Fragment>
            )} */}
            </Fragment>
        );
    };
};

AgentsAndTeamsPage.propTypes = {
    isLoading:         bool,
    getAgentReferrals: func,
    referrals:         array,
    teams:             array,
    agentCodeToShare:  string
};

const mapStateToProps = ({ user, applications }) => ({
    isLoading:        applications.agents.isLoading,
    referrals:        applications.agents.referrals,
    teams:            applications.agents.teams,
    agentCodeToShare: user.agentCodeToShare
});

export default connect(
    mapStateToProps, 
    { getAgentReferrals }
)(AgentsAndTeamsPage);