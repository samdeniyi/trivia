import {
    LOADING_AGENTS_DATA,
    LOADING_AGENTS_DATA_SUCCESS,
    LOADING_AGENTS_DATA_ERROR,
    SAVE_AGENTS_REFERRAL,
    SAVE_AGENTS_COMMISSIONS,
    SAVE_TEAM_DATA,
    SAVE_TEAM_MEMBERS,
    DELETE_TEAM,
    UPDATE_TEAM,
    AGENT_LAST_SEEN,
    AGENT_ACTIVATION_STATUS_SUCCESS,
    AGENT_ACTIVATION_STATUS_FAILURE
} from "./constants";
import { calculateCapitalization } from "../../../../utils/currency/calculateCapitalization";
import { USER_LOGOUT } from "../../user/constants";

const initialState = {
    isLoading: false,
    errorMsg: "",
    referrals: [],
    teams: [],
    activationStatus: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_AGENTS_DATA: {
            return {
                ...state,
                isLoading: true
            };
        }

        case LOADING_AGENTS_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case LOADING_AGENTS_DATA_ERROR: {
            return {
                ...state,
                errorMsg: action.payload
            };
        }

        case SAVE_AGENTS_REFERRAL: {
            return {
                ...state,
                referrals: action.payload
            };
        }

        case SAVE_AGENTS_COMMISSIONS: {
            const agentId = action.payload.id;
            const foundCommissions = action.payload.foundCommissions;
            const totalCommission = action.payload.totalCommission;

            return {
                ...state,
                referrals: state.referrals.map(referral => {
                    if (referral.id === agentId) {
                        referral.commissionsList = foundCommissions;
                        referral.commission = totalCommission;
                    }

                    return referral;
                })
            };
        }

        case AGENT_LAST_SEEN: {
            return {
                ...state,
                referrals: state.referrals.map(referral => {
                    if (referral.id === action.payload.id) {
                        referral.lastSeen = action.payload.lastSeen;
                    }

                    return referral;
                })
            };
        }

        case SAVE_TEAM_DATA: {
            const { name, description } = action.payload.teamData;
            const id = action.payload.id;
            const owner = action.payload.owner;
            const teams = state.teams.slice();

            teams.push({
                name,
                id,
                owner,
                description,
                members: []
            });

            return {
                ...state,
                teams
            };
        }

        case SAVE_TEAM_MEMBERS: {
            const teams = state.teams.slice();
            const teamId = action.payload.teamId;

            return {
                ...state,
                teams: teams.map(team => {
                    if (team.id === teamId) {
                        const members = team.members.concat(
                            action.payload.members
                        );
                        const capitalization = calculateCapitalization(members);
                        const commissions = state.referrals.flatMap(
                            referral => referral.commissionsList
                        );

                        return {
                            ...team,
                            members,
                            capitalization,
                            commissions
                        };
                    }

                    return team;
                })
            };
        }

        case DELETE_TEAM: {
            const teams = state.teams.slice();
            const newTeams = teams.filter(team => team.id !== action.payload);

            return {
                ...state,
                teams: newTeams
            };
        }

        case UPDATE_TEAM: {
            const { teamId, teamData } = action.payload;
            const { name, description } = teamData;

            return {
                ...state,
                teams: state.teams.map(team =>
                    team.id === teamId ? { ...team, name, description } : team
                )
            };
        }
        case AGENT_ACTIVATION_STATUS_SUCCESS: {
            return {
                ...state,
                activationStatus: action.payload
            };
        }
        case AGENT_ACTIVATION_STATUS_FAILURE: {
            return {
                ...state,
                activationStatus: {}
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                errorMsg: "",
                referrals: [],
                teams: [],
                activationStatus: false
            };
        }

        default: {
            return state;
        }
    }
};
