import React from 'react';

import { 
    AgentsAndTeamsPage,
    CreateTeam,
    MyTeams,
    MyAgents,
    AgentDetails,
    TeamDetails,
    UpdateTeam,
    AgentCommissions
} from '../../views/actions/agents';

export const myAgentsRoutes = [
    {
        path: '/actions/agents',
        exact: true,
		main: () => <AgentsAndTeamsPage />,
		public: false
    },
    {
        path: '/actions/agents_create_team',
        exact: true,
        main: () => <CreateTeam />,
        public: false
    },
    {
        path: '/actions/agents_my_teams',
        exact: true,
        main: () => <MyTeams />,
        public: false
    },
    {
        path: '/actions/agents_my_agents',
        exact: true,
        main: () => <MyAgents />,
        public: false
    },
    {
        path: '/actions/agents_agent_details',
        exact: true,
        main: () => <AgentDetails />,
        public: false
    },
    {
        path: '/actions/agents_team_details',
        exact: true,
        main: () => <TeamDetails />,
        public: false
    },
    {
        path: '/actions/agents_update_team',
        exact: true,
        main: () => <UpdateTeam />,
        public: false
    },
    {
        path: '/actions/agents_commisions',
        exact: true,
        main: () => <AgentCommissions />,
        public: false
    }
];