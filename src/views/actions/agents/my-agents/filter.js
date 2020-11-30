export const filterAgents = (agents, filter) => {
    switch(filter) {
        case "ALL": {
            return [...agents];
        }

        case "HIGHEST": {
            return [...agents].sort((a, b) => a.commissions - b.commissions);
        }

        case "LOWEST": {
            return [...agents].sort((a, b) => b.commissions - a.commissions);
        }

        case "Approved Agents": {
            // return [...agents].sort((a, b) => b.commissions - a.commissions);
            return [...agents].filter(agent =>
                agent.status.toLowerCase() === "approved"
            );
        }

        case "Pending Agents": {
            return [...agents].filter(agent =>
                agent.status.toLowerCase() === "pending"
            );        }

        case "Rejected Agents": {
            return [...agents].filter(agent =>
                agent.status.toLowerCase() === "rejected"
            );         }



        default: {
            return agents;
        }
    };
};