import {
    LOADING_AGENTS_DATA,
    LOADING_AGENTS_DATA_SUCCESS,
    LOADING_AGENTS_DATA_ERROR,
    SAVE_AGENTS_REFERRAL,
    SAVE_TEAM_DATA,
    SAVE_TEAM_MEMBERS,
    SAVE_AGENTS_COMMISSIONS,
    AGENT_LAST_SEEN,
    UPDATE_TEAM,
    DELETE_TEAM,
    AGENT_ACTIVATION_STATUS_SUCCESS,
    // AGENT_ACTIVATION_STATUS_FAILURE
} from '../constants';

import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { axios, currentAPI } from "../../../../../config";
import { getUserAvatar } from '../../../user/actions/avatar';
import { getUserById, getAllCommissions, getUserLastActiveState, saveUserKycVerificationState } from '../../../user/actions';
import { referredCommissions } from '../../../../../utils/filtering/commissions';
import { formatCreationDate } from '../../../../../utils/date/formatCreationDate';

export const saveAgentReferral = referral => dispatch => {
    dispatch({ type: SAVE_AGENTS_REFERRAL, payload: referral });
};

export const agentLastSeen = (id, lastSeen) => dispatch => {
    dispatch({ type: AGENT_LAST_SEEN, payload: { id, lastSeen }});
};

export const createTeam = teamData => async dispatch => {
    dispatch({ type: LOADING_AGENTS_DATA });
    
    try {    
        const token = JSON.parse(localStorage.getItem('token')).token;
        const { name, description } = teamData;

        const sendTeamResponse = await axios.post(
            `${currentAPI}/api/teams/create?name=${name}&description=${description}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (sendTeamResponse.status === 200) {
            const { id, owner } = sendTeamResponse.data;
            dispatch({ type: LOADING_AGENTS_DATA_SUCCESS });
            toast.success(`Team ${teamData.name} was successfully created`);
            dispatch({ type: SAVE_TEAM_DATA, payload: { id, owner, teamData } });
            return id;
        };
    } catch (error) {
        dispatch({
            type: LOADING_AGENTS_DATA_ERROR,
            errorMsg: error.message
        });

        toast.error(`Failed to create ${teamData.name}`);
    }
};

export const addTeamMembers = (teamId, selectedMembers, redirect = null) => async (dispatch, getState) => {
    dispatch({ type: LOADING_AGENTS_DATA });
    
    try {
        const referrals     = getState().applications.agents.referrals;
        const members       = selectedMembers.map(agentIndex => referrals[agentIndex]);
        const membersIds    = members.map(member => member.id);
        
        const token = JSON.parse(localStorage.getItem('token')).token;
        const addTeamMembersResponse = await axios.put(
            `${currentAPI}/api/teams/editMembers?members=${membersIds}&teamId=${teamId}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            );

            if (addTeamMembersResponse.status === 200) {
                dispatch({ type: LOADING_AGENTS_DATA_SUCCESS });
                toast.success("Team members were successfully saved");
                dispatch({ type: SAVE_TEAM_MEMBERS, payload: { teamId, members } });
                if (redirect) dispatch(push(redirect));
            };
    } catch(error) {
        dispatch({
            type: LOADING_AGENTS_DATA_ERROR,
            errorMsg: error.message
        });
    }
};

export const getReferralCommision = id => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const referralCommisionsResponse = 
            await axios.get(
                `${currentAPI}/api/transactions/forUserByUserId/${id}?page=0&resultsPerPage=100&types=COMMISSION`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

        return referralCommisionsResponse && referralCommisionsResponse.data;
    } catch (error) {
        console.error(error)
    }
};

export const getAgentTeams = () => async (dispatch, getState) => {
    
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const getAgentTeamsResponse = await axios.get(
            `${currentAPI}/api/teams/find`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            );

        if (getAgentTeamsResponse.status === 200) {
            const teams = getAgentTeamsResponse.data;
            const storedTeams = getState().applications.agents.teams;
            
            if (storedTeams.length < teams.length) {
                dispatch({ type: LOADING_AGENTS_DATA });

                teams.forEach(team => {
                    const { id, owner, members } = team;

                    const teamData = {
                        name: team.name,
                        description: team.description
                    };

                    dispatch({ 
                        type: SAVE_TEAM_DATA, 
                        payload: { id, owner, teamData } 
                    });

                    const membersData = members.map(member => {
                        const referrals = getState().applications.agents.referrals;
                        const referral  = referrals.filter(referral => referral.id === member.id)[0];
                        
                        return {
                            id:         member.id,
                            msisdn:     member.msisdn,
                            createdOn:  member.createdOn,
                            commission: referral.commission,
                            firstName:  member.data.firstName,
                            lastName:   member.data.lastName,
                            lastSeen:   referral.lastSeen,
                            avatar:     referral.avatar || ''
                        }
                    });

                    dispatch({ type: LOADING_AGENTS_DATA_SUCCESS });
                    dispatch({ type: SAVE_TEAM_MEMBERS, payload: { teamId: id, members: membersData } });
                });
            };
        };
    } catch (error) {
        dispatch({
            type: LOADING_AGENTS_DATA_ERROR,
            errorMsg: error.message
        });
    }
};

export const getAvatarById = id => async dispatch => {
    const { msisdn } = await dispatch(getUserById(id));
    const avatar     = await dispatch(getUserAvatar(msisdn));
    return avatar;
};

export const updateTeam = (teamId, teamData) => async dispatch => {
    dispatch({ type: LOADING_AGENTS_DATA });
    
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const deleteTeamResponse = await axios.patch(
            `${currentAPI}/api/teams/editTeam?newDescription=${teamData.description}&newName=${teamData.name}&teamId=${teamId}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (deleteTeamResponse.status === 200) {
            dispatch({ type: LOADING_AGENTS_DATA_SUCCESS }); 
            dispatch({ type: UPDATE_TEAM, payload: { teamId, teamData } });
            dispatch(push('/actions/agents'));
        };
    } catch(error) {
        dispatch({
            type: LOADING_AGENTS_DATA_ERROR,
            errorMsg: error.message
        });

        toast.error("Failed to update team");
    }
};

export const deleteTeam = teamId => async dispatch => {
    dispatch({ type: LOADING_AGENTS_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const deleteTeamResponse = await axios.delete(
            `${currentAPI}/api/teams/delete?teamId=${teamId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (deleteTeamResponse.status === 200) {
            dispatch({ type: LOADING_AGENTS_DATA_SUCCESS }); 
            dispatch({ type: DELETE_TEAM, payload: teamId });
            dispatch(push('/actions/agents'));
        };
    } catch (error) {
        dispatch({
            type: LOADING_AGENTS_DATA_ERROR,
            errorMsg: error.message
        });

        toast.error("Failed to delete the team");
    }
};

export const getAgentReferrals = () => async (dispatch, getState) => {
    
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        dispatch({ type: LOADING_AGENTS_DATA });
        const getAgentReferralsResponse = await axios.get(
            `${currentAPI}/api/users/getReferrals`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        
        let referralsData = 
        getAgentReferralsResponse && 
            getAgentReferralsResponse.data.filter(referral => referral.role.name === "ROLE_AGENT")
            
        if (referralsData.length) {
            referralsData = 
            referralsData.map(async referral => {
                const lastSeen = await dispatch(getUserLastActiveState(referral.id));
                const rejectionReason = (referral.data.agentState === "INCOMPLETE")? await dispatch(getRejectedReasons(referral.id)): ""

                return {
                    id:        referral.id,
                    firstName: referral.data.firstName,
                    lastName:  referral.data.lastName,
                    avatar:    referral.data.image || '',
                    lastSeen:  formatCreationDate(lastSeen),
                    msisdn:    referral.data.msisdn,
                    role:      referral.role.name,
                    createdAt:   referral.createdAt,
                    status:   (referral.data.agentState === "INCOMPLETE")? "rejected" : referral.data.agentState.toLowerCase(),
                    // rejectionReason: rejectionReason.map( item => item.details )
                    rejectionReason
                };
            });

          const allData =  await Promise.all(referralsData)
        dispatch({ 
            type: SAVE_AGENTS_REFERRAL, 
            payload: [...allData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        });
        };
        dispatch({ type: LOADING_AGENTS_DATA_SUCCESS });


    } catch (error) {
        dispatch({
            type: LOADING_AGENTS_DATA_ERROR,
            errorMsg: error.message
        });
    }
};

export const updateAgentCommissions = () => async (dispatch, getState) => {
    const allCommissions = await dispatch(getAllCommissions());
    const agents         = getState().applications.agents.referrals;

    agents.forEach(agent => {
        const id = agent.id;

        const foundCommissions = allCommissions.transactions.filter(transaction => {
            return transaction.commissionDetails.generatedByUserID === id
        });

        const savedMerchantCommissions = 
            (agent.commissionsList && agent.commissionsList.length > 0) ? 
            agent.commissionsList.filter(transaction => {
                return transaction.commissionDetails.generatedByUserID === id
            }) : [];

        if (foundCommissions.length > savedMerchantCommissions.length) {
            const totalCommission = referredCommissions(allCommissions, agent).totalAmount;
            dispatch({ type: SAVE_AGENTS_COMMISSIONS, payload: { id, foundCommissions, totalCommission } })
        };
    });
};

export const getAgentActivationStatus = () => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const activationStatusResponse = await axios.get(
            `${currentAPI}/api/users/userData`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (activationStatusResponse.status === 200) {
            const { agentState } = activationStatusResponse.data;
            agentState && dispatch(saveUserKycVerificationState(agentState));
            
            dispatch({
                type: AGENT_ACTIVATION_STATUS_SUCCESS,
                payload: activationStatusResponse.data
            });
        }
    } catch (error) {
        // dispatch({
        //     type: AGENT_ACTIVATION_STATUS_FAILURE,
        //     payload: error.message
        // });
        console.error(error.message);
    }
};


export const getRejectedReasons = id => async() => {

    try {
        const reasonsResponse = await axios.get(`
            ${currentAPI}/api/rejectedReasons/byAgentId`, {
                params: {
                    agentId: id,
                }
            });

        if (reasonsResponse.status === 200) {
           return reasonsResponse.data
        } 
        return {}

    } catch (error) {
        return {}
    }
};
