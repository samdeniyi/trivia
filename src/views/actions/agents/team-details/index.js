import React, { Fragment, useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { object, func, string, array } from 'prop-types';
import { colors, fonts } from '../../../../styles';
import { getAvatarById, deleteTeam } from '../../../../redux/ducks/applications/agents/actions';
import { getUserById } from '../../../../redux/ducks/user/actions';
import { months } from '../../../../utils/date/months';

import { TopHeader, PageLogo, RippleLink, UserAvatar, OptionsPopupDialog, ConfirmPopupDialog } from '../../../../components';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { List, ListItem, ListHeading, ListLeftBlock, ListSubHeading } from '../../../../containers/ListContainer';
import { Badge } from '../../../../containers/BadgeContainer';
import { Label, SecondaryText } from '../../../../containers/MessageContainer';
import AddTeamAgents from '../add-agents';
import DescriptionIcon from './assets/description.svg';
import { Options } from '../../../../containers/HeaderContainer';
import { ReactComponent  as ForwardArrowIcon  } from '../../../../assets/arrow.svg';
import { ReactComponent  as DeleteTeamIcon }    from '../../../../assets/delete.svg';
import { ReactComponent  as AddAgentsIcon }     from './assets/add.svg';
import { ReactComponent  as EditTeamIcon }      from '../../../../assets/edit.svg';

const TeamInfo = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
`;

const TeamHeader = styled(Label)`
    margin: 0 auto 24px auto;
    text-align: center;
    width: 100%;
    font-weight: 500;
`;

const CreatedTeam = styled.p`
    font-size: 12px;
    font-weight: 100;
    margin: 24px auto 0 auto;
    color: ${colors.themeTextColor3};

    & > strong {
        font-weight: 500;
        color: ${colors.themeTextColor3};
    }
`;

const CreationDate = styled.time`
    color: ${colors.themeTextColor3};
    font-family: ${fonts.main};
    font-size: 12px;
    font-weight: 100;
    margin: 4px auto;
    text-align: center;
`;

const TeamDescription = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 56px;
    padding: 16px;
    border-radius: 13px;
    border: 1px solid ${colors.gray3};
`;

const TeamDescriptionHeader = styled.div`
    display: flex;
    flex-direction: row;    
    
    & > div {
        margin: 0;
    }
`;

const TeamHeaderDescription = styled(ListHeading)`
    margin: auto 0 auto 16px;
    text-align: center;
`;

const TeamDescriptionText = styled(SecondaryText)`
    margin: 16px 0 0 0;
`;

const BadgeHeading = styled.h5`
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 12px;
    font-weight: 100;
    line-height: 15px;
    color: ${colors.themeTextColor3};
`;

const BadgeCommisionsAmount = styled.p`
    position: absolute;
    top: 35px;
    left: 16px;
    font-size: 14px;
    font-weight: bold;
    margin: 4px 0 0 0;
    color: ${colors.themeTextColor1};
`;

const CommisionsLink = styled(RippleLink)`
    position: absolute;
    top: 28px;
    right: 24px;
`;

const PageSeeAll = styled(RippleLink)`
    position: absolute;
    right: 16px;
    top: 16px;
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: ${colors.blue};
`;

const RelatedAgentsSections = styled.section`
    margin: 16px 0;
    position: relative;
`;

const AgentsCount = styled(SecondaryText)`
    margin: 0;
    padding: 16px;
    color: ${colors.themeTextColor1};
`;

const TeamDetails = ({
    location,
    userId,
    referrals,
    getAvatarById,
    getUserById,
    deleteTeam
}) => {
    const [creatorAvatar, setCreatorAvatar]             = useState(undefined);
    const [creatorName, setCreatorName]                 = useState("");
    const [optionsOpen, setOptionsOpen]                 = useState(false);
    const [confirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
    const [openAddAgentOverlay, setOpenAddAgentOverlay] = useState(false);

    const team               = location.state;
    const ownerId            = team.owner.id;
    const creationDate       = new Date(team.owner.createdAt);

    useEffect(() => {
        getAvatarById(ownerId)
            .then(resolvedAvatar => {
                setCreatorAvatar(resolvedAvatar);
            });
    }, [ownerId, getAvatarById]);

    useEffect(() => {
        if (userId === ownerId) {
            setCreatorName("You");
        } else {
            getUserById(ownerId).then(({ firstName, lastName }) => {
                setCreatorName(`${firstName} ${lastName}`);
            });
        };
    }, [getUserById, ownerId, userId]);
    
    return (
        <Fragment>
            <TopHeader title={"Team details"}>
                <Options right={"true"} onClick={() => setOptionsOpen(!optionsOpen)} />
            </TopHeader>
            <ScreenContainer>
                <TeamInfo>
                    <TeamHeader>{team.name}</TeamHeader>
                    <UserAvatar 
                        width={"32px"}
                        height={"32px"}
                        avatar={creatorAvatar}
                    />
                    <CreatedTeam>Created by <strong>{creatorName}</strong></CreatedTeam>
                    <CreationDate>{`${months[creationDate.getMonth()]} ${creationDate.getDate()}, ${creationDate.getFullYear()}`}</CreationDate>
                </TeamInfo>
                <TeamDescription>
                    <TeamDescriptionHeader>
                        <PageLogo 
                            width={"32px"}
                            height={"32px"}
                            iconWidth={"16px"}
                            iconHeight={"16px"}
                            Icon={DescriptionIcon}
                        />
                        <TeamHeaderDescription>
                            Team Description
                        </TeamHeaderDescription>
                    </TeamDescriptionHeader>
                    <TeamDescriptionText>{team.description}</TeamDescriptionText>
                </TeamDescription>
                <Badge
                    top={"24px"}
                    height={"69px"}
                    background={colors.themeColor5}
                >
                    <BadgeHeading>Total Commissions Received</BadgeHeading>
                    <BadgeCommisionsAmount>{team.capitalization}</BadgeCommisionsAmount>
                    <CommisionsLink to={{
                        pathname: "/actions/agents_commisions",
                        state: team.commissions
                    }}>
                        <ForwardArrowIcon />
                    </CommisionsLink>
                </Badge>
            </ScreenContainer>
            <RelatedAgentsSections>
                <AgentsCount>{team.members ? team.members.length : 0} Agents</AgentsCount>
                <PageSeeAll to={{ pathname: "/actions/agents_my_agents", state: team.members }}>
                    See All
                </PageSeeAll>
                <List>
                {team.members && team.members.map((agent, index) => (
                    <RippleLink
                        key={index}
                        to={{ 
                            pathname: "/actions/agents_agent_details", 
                            state: agent
                        }}
                    > 
                        <ListItem>
                            <UserAvatar
                                avatar={agent.avatar || ""}
                                width={"32px"}
                                height={"32px"}
                            />
                            <ListLeftBlock>
                                <ListHeading>{`${agent.firstName} ${agent.lastName}`}</ListHeading>
                                <ListSubHeading style={{ fontSize: '10px' }}>{agent.lastSeen}</ListSubHeading>
                            </ListLeftBlock>
                        </ListItem>
                    </RippleLink>
                ))}
                </List>
            </RelatedAgentsSections>
            {openAddAgentOverlay && (
                <AddTeamAgents
                    referrals={referrals} 
                    open={openAddAgentOverlay}
                    setOpen={setOpenAddAgentOverlay}
                    teamId={team.id}
                />
            )}
            <OptionsPopupDialog
                open={optionsOpen}
                title={"Options"}
                cancel={() => setOptionsOpen(!optionsOpen)}
                items={[
                    {
                        Icon: AddAgentsIcon,
                        title: "Add Agents To Team",
                        click: () => {
                            setOptionsOpen(!optionsOpen);
                            setOpenAddAgentOverlay(!openAddAgentOverlay);
                        }
                    },
                    {
                        Icon: EditTeamIcon,
                        title: "Edit Team Details",
                        link: "/actions/agents_update_team",
                        linkProp: team.id
                    },
                    {
                        Icon: DeleteTeamIcon,
                        title: "Delete Team",
                        click: () => {
                            setConfirmDeletionOpen(!confirmDeletionOpen)
                        }
                    }
                ]}
            />
            <ConfirmPopupDialog
                open={confirmDeletionOpen}
                title={"Are you sure you want to delete this team?"}
                confirmationText={"Deleting a team doesn’t remove agents from your list."}
                answers={[
                    {
                        variant: "No",
                        action: () => setConfirmDeletionOpen(!confirmDeletionOpen)
                    }, 
                    {
                        variant: "Yes",
                        action: () => {
                           deleteTeam(team.id);
                        }
                    }
                ]}
            />
        </Fragment>
    );
};

TeamDetails.propTypes = {
    location:      object,
    userId:        string,
    referrals:     array,
    getAvatarById: func,
    deleteTeam:    func,
    getUserById:   func
};

const mapStateToProps = ({ user, applications }) => ({ 
    userId:    user.userId,
    referrals: applications.agents.referrals
});

export default connect(
    mapStateToProps, 
    { 
        getAvatarById,
        getUserById,
        deleteTeam
    }
)(withRouter(memo(TeamDetails)));