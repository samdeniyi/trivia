import React, { Fragment, useState } from "react"
import { connect } from "react-redux";
import { array } from "prop-types";
import { filterTeams } from "./filter";

import { TopHeader, UserAvatar, OptionsPopupDialog, RippleLink, CheckPopupDialog } from "../../../../components";
import { ScreenContainer } from "../../../../containers/ScreenContainer";
import { 
    TeamsList, 
    TeamItem, 
    TeamItemHeading, 
    TeamItemSubHeading,
    TeamsAvatarsReel
} from '../containers/TeamsItemsContainer';
import { Options } from "../../../../containers/HeaderContainer";
import { ReactComponent as SortIcon } from '../../../../assets/sort.svg';
import { ReactComponent as FilterIcon } from '../../../../assets/filter.svg';
import { ReactComponent as CreateTeamIcon } from '../../../../assets/team.svg';
import { ReactComponent as HighestCommisionsIcon } from '../../../../assets/highest_sort.svg';
import { ReactComponent as LowestCommisionsIcon } from '../../../../assets/lowest_sort.svg';

const MyTeams = ({
    teams
}) => {
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen]     = useState(false);
    const [optionsOpen, setOptionsOpen]             = useState(false);
    const [currentTeams, setCurrentTeams]           = useState(teams);

    return (
        <Fragment>
            <TopHeader title={"My Teams"}>
                <Options right={"true"} onClick={() => setOptionsOpen(!optionsOpen)} />
            </TopHeader>
            <ScreenContainer>
                <TeamsList>
                {currentTeams.map((team, index) => (
                    <TeamItem key={index}>
                       <RippleLink 
                            to={{
                                pathname: "/actions/agents_team_details",
                                state: currentTeams[index]
                            }}
                        >
                            <Options top={"16px"} right />
                        </RippleLink>
                        <TeamItemHeading>{team.name}</TeamItemHeading>
                        <TeamItemSubHeading>{team.capitalization}</TeamItemSubHeading>
                        <TeamsAvatarsReel>
                            {team.members ? team.members.map((agent, index) => (
                                <UserAvatar
                                    key={index}
                                    avatar={agent.avatar}
                                    width={"32px"}
                                    height={"32px"}
                                />
                            )) : null}
                        </TeamsAvatarsReel>
                        <TeamItemSubHeading>{team.members ? team.members.length : 0} Agents</TeamItemSubHeading>
                    </TeamItem>
                ))}
                </TeamsList>
            </ScreenContainer>
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
                        Icon: CreateTeamIcon,
                        title: "Create A Team",
                        link: "/actions/agents_create_team"
                    }
                ]}
            />
            <CheckPopupDialog
                open={openFilterOptions}
                title={"Filter"}
                cancel={() => setOpenFilterOptions(!openFilterOptions)}
                items={[
                    {
                        Icon: CreateTeamIcon,
                        title: "All teams",
                        click: () => {
                            setCurrentTeams(filterTeams(teams, "ALL"));
                        }
                    }
                ]}
            />
            <CheckPopupDialog 
                open={sortOptionsOpen}
                title={"Sort"}
                cancel={() => setSortOptionsOpen(!sortOptionsOpen)}
                items={[
                    {
                        Icon: HighestCommisionsIcon,
                        title: "Highest Commisions",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            setCurrentTeams(filterTeams(currentTeams, "HIGHEST"));
                        }
                    },
                    {
                        Icon: LowestCommisionsIcon,
                        title: "Lowest Commisions",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            setCurrentTeams(filterTeams(currentTeams, "LOWEST"));
                        }
                    }
                ]}
            />
        </Fragment>
    );
};

MyTeams.propTypes = {
    teams: array
};

const mapStateToProps = ({ applications }) => ({
    teams: applications.agents.teams
});

export default connect(
    mapStateToProps, 
    null
)(MyTeams);