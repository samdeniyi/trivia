import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { string, array, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { colors } from '../../../../styles';
import { addTeamMembers } from '../../../../redux/ducks/applications/agents/actions';

import { UserAvatar, SearchHeader, RippleButton } from '../../../../components';
import { List, ListItem, ListHeading } from '../../../../containers/ListContainer';
import { SmallLightText } from '../../../../containers/MessageContainer';
import { SlidingOverlay } from '../../../../containers/OverlayContainer';
import { Close } from '../../../../containers/HeaderContainer';
import { ReactComponent as CheckmarkIcon } from '../../../../assets/checkmark.svg';
import { ReactComponent as PresentCheckmarkIcon } from '../../../../assets/checkmark_copy.svg';

const ShowOption = styled.p`
    margin: 24px 0 24px 16px;
    font-size: 12px;
    font-weight: 100;
    color: ${colors.themeTextColor1};
`;

const ShowFilter = styled.span`
    font-size: 12px;
    font-weight: 100;
    color: ${colors.blue};
`;

const AddAgentsButton = styled(RippleButton)`
    position: fixed;
    bottom: 16px;
    right: 16px;
    left: 16px;
    width: calc(100% - 32px);
`;

const SelectedMark = styled(CheckmarkIcon)`
    position: absolute;
    right: 16px;
`;

const PresentCheckmark = styled(PresentCheckmarkIcon)`
    position: absolute;
    right: 16px;
`;

const PresentAgentText = styled.p`
    ${css`${SmallLightText}`};
    margin: 0;
    position: absolute;
    top: 28px;
    left: 64px;
`;

const AddTeamAgents = ({
    addTeamMembers,
    open,
    teams,
    teamId,
    setOpen,
    referrals
}) => {
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [presentAgents, setPresentAgent]    = useState([]);
    const [searchValue, setSearchValue]       = useState("");
    const teamMembers = teams.filter(team => team.id === teamId)[0].members;
    const searchedReferrals = referrals.filter(referral => referral.firstName.toLowerCase().includes(searchValue.toLowerCase()) || referral.lastName.toLowerCase().includes(searchValue.toLowerCase()));

    if (open) {
        return (
            <SlidingOverlay>
                <SearchHeader noArrow={true} title={"Add Agents To Team"} handleSearch={setSearchValue}>
                    <Close left={"true"} onClick={() => setOpen(!open)} />
                </SearchHeader>
                <ShowOption>Showing: <ShowFilter>All Agents</ShowFilter></ShowOption>
                <List>
                    {searchedReferrals && searchedReferrals.map((referral, index) => (
                        <ListItem
                            key={index} 
                            onClick={() => {
                                if (
                                    teamMembers &&
                                    (teamMembers
                                        .filter(member => member.id === referrals[index].id)
                                        .length > 0
                                    )
                                ) {
                                    setPresentAgent(presentAgents.concat(index));
                                } else if (selectedAgents && !selectedAgents.includes(index)) {
                                    setSelectedAgents(selectedAgents.concat(index));
                                } else {
                                    setSelectedAgents(
                                        selectedAgents.filter(agentIndex => agentIndex !== index)
                                    );
                                };
                            }}
                        >
                            <UserAvatar
                                avatar={referral.avatar}
                                width={"32px"}
                                height={"32px"}
                            />
                            <ListHeading style={{ marginLeft: "16px"}}>{referral.firstName} {referral.lastName}</ListHeading>
                            {(presentAgents   && presentAgents.includes(index)) ? <PresentAgentText>Already in this team</PresentAgentText> : null}
                            {(presentAgents   && presentAgents.includes(index)) ? <PresentCheckmark /> : null}
                            {(selectedAgents  && selectedAgents.includes(index)) ? <SelectedMark /> : null}
                        </ListItem>
                    ))}
                </List>
                <AddAgentsButton 
                    bottom={"24px"}
                    onClick={() => {
                        if (selectedAgents.length > 0) {
                            addTeamMembers(teamId, selectedAgents, '/actions/agents');
                        };
                    }}
                >
                    Add {selectedAgents.length} agents
                </AddAgentsButton>
            </SlidingOverlay>  
        );
    } else return null;
};

AddTeamAgents.propTypes = {
    open:            bool,
    setOpen:         func,
    addTeamMembers:  func,
    teamId:          string,
    teams:           array,
    referrals:       array
};

const mapStateToProps = ({ applications }) => ({
    teams:     applications.agents.teams,
    referrals: applications.agents.referrals
});

export default connect(
    mapStateToProps, 
    { addTeamMembers }
)(AddTeamAgents);