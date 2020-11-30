import React, { Fragment, useState } from "react"
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { array, string } from "prop-types";
import { connect } from "react-redux";
import { filterAgents } from "./filter";

import { UserAvatar, ReferralBadge, InfoPopupDialog, OptionsPopupDialog, CheckPopupDialog, RippleLink, SearchHeader } from "../../../../components";
import { List, ListItem, ListHeading, ListHighlight, ListSubHeading, ListLeftBlock } from "../../../../containers/ListContainer";
import { Options } from "../../../../containers/HeaderContainer";
import { ReactComponent as SortIcon } from '../../../../assets/sort.svg';
import { ReactComponent as FilterIcon } from '../../../../assets/filter.svg';
import { ReactComponent as AddAnAgentIcon } from '../../../../assets/user.svg';
import { ReactComponent as HighestCommisionsIcon } from '../../../../assets/highest_sort.svg';
import { ReactComponent as LowestCommisionsIcon } from '../../../../assets/lowest_sort.svg';
import { ReactComponent as AgentsIcon } from '../../../../assets/agents_icon.svg';
import { ViewContainer } from "../../../../containers/ScreenContainer";
import { currentHost } from "../../../../config/API";

const AgentsListStyled = styled(List)`
    & > a:first-child > li {
        border-top: 0;
    }
`;

const Span = styled.span`
    text-transform: capitalize;
    `;

const MyAgents = ({
    location,
    agentCodeToShare
}) => {
    const referrals                                 = location.state;
    const [currentReferrals, setCurrentReferrals]   = useState(referrals);
    const [openReferralOption, setReferralOption]   = useState(false);
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen]     = useState(false);
    const [optionsOpen, setOptionsOpen]             = useState(false);
    const [searchValue, setSearchValue]             = useState("");


    const searchedAgentList =
    currentReferrals.filter(agent =>
        agent.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
        agent.lastName.toLowerCase().includes(searchValue.toLowerCase())  
    );

    return (
        <Fragment>

            <SearchHeader 
                title={"My Agents"} 
                right={"40px"}
                placeholder={"Search for an agent…"}
                handleSearch={setSearchValue}
            >
            <Options right={"true"} onClick={() => setOptionsOpen(!optionsOpen)} />

                </SearchHeader>
            <ViewContainer top={"0"}>
                <AgentsListStyled top={"64px"}>
                {searchedAgentList && searchedAgentList.map((referral, index) => (
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
                            <ListHighlight>{referral.commission}</ListHighlight>
                        </ListItem>
                    </RippleLink>
                ))}
                </AgentsListStyled>
            </ViewContainer>
            <OptionsPopupDialog
                open={optionsOpen}
                title={"Options"}
                cancel={() => setOptionsOpen(!optionsOpen)}
                items={[
                    {
                        Icon: SortIcon,
                        title: "Sort",
                        click: () => {
                            setOptionsOpen(!optionsOpen);
                            setSortOptionsOpen(!sortOptionsOpen);
                        }
                    },
                    {
                        Icon: FilterIcon,
                        title: "Filter",
                        click: () => {
                            setOptionsOpen(!optionsOpen);
                            setOpenFilterOptions(!openFilterOptions);
                        }
                    },
                    {
                        Icon: AddAnAgentIcon,
                        title: "Add An Agent",
                        click: () => {
                            setOptionsOpen(!optionsOpen);
                            setReferralOption(!openReferralOption)
                        }
                    }
                ]}
            />
            <OptionsPopupDialog 
                open={sortOptionsOpen}
                title={"Sort"}
                cancel={() => setSortOptionsOpen(!sortOptionsOpen)}
                items={[
                    {
                        Icon: HighestCommisionsIcon,
                        title: "Highest Commisions",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            setCurrentReferrals(filterAgents(currentReferrals, "HIGHEST"));
                        }
                    },
                    {
                        Icon: LowestCommisionsIcon,
                        title: "Lowest Commisions",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            setCurrentReferrals(filterAgents(currentReferrals, "LOWEST"));
                        }
                    }
                ]}
            />
            <CheckPopupDialog
                open={openFilterOptions}
                title={"Filter"}
                cancel={() => setOpenFilterOptions(!openFilterOptions)}
                items={[
                    {
                        Icon: AgentsIcon,
                        title: "All Agents",
                        click: () => {
                            setCurrentReferrals(filterAgents(referrals, "ALL"));
                            setOpenFilterOptions(false)
                        }
                    },
                    {
                        Icon: AgentsIcon,
                        title: "Approved Agents",
                        click: () => {
                            setCurrentReferrals(filterAgents(referrals, "Approved Agents"));
                            setOpenFilterOptions(false)
                        }
                    },
                    {
                        Icon: AgentsIcon,
                        title: "Pending Agents",
                        click: () => {
                            setCurrentReferrals(filterAgents(referrals, "Pending Agents"));
                            setOpenFilterOptions(false)
                        }
                    },
                    {
                        Icon: AgentsIcon,
                        title: "Rejected Agents",
                        click: () => {
                            setCurrentReferrals(filterAgents(referrals, "Rejected Agents"));
                            setOpenFilterOptions(false)
                        }
                    }
                ]}
            />
            <InfoPopupDialog
                open={openReferralOption}
                cancel={() => setReferralOption(!openReferralOption)}
                title={"Add An Agent"}
                message={"To add an agent, send your referral code to the person."}
            >
                <ReferralBadge
                    embedded={true}
                    shareData={agentCodeToShare}
                    marketingMessage={`I am inviting you to earn extra income as an agent on Spaces. You can use my invitation link to complete your registration. Visit`}
                    url={`${currentHost}/launch?referralCode=${agentCodeToShare}`}
                    shareMessage={"Share the referral code with your friends"}
                    title={"Referral Code"}
                    right={"8px"}
                    left={"8px"} 
                    top={"24px"} 
                    bottom={"24px"} 
                />
            </InfoPopupDialog>
        </Fragment>
    );
};

MyAgents.propTypes = {
    referrals:         array,
    agentCodeToShare:  string
};

const mapStateToProps = ({ user, applications }) => ({
    referrals:        applications.agents.referrals,
    agentCodeToShare: user.agentCodeToShare
});

export default connect(
    mapStateToProps, 
    null
)(withRouter(MyAgents));