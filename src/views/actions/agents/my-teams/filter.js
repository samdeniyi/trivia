export const filterTeams = (teams, filter) => {
    switch(filter) {
        case "ALL": {
            return teams;
        }
        
        case "HIGHEST": {
            return teams.sort((a, b) => a.commissions - b.commissions);
        }

        case "LOWEST": {
            return teams.sort((a, b) => b.commissions - a.commissions);
        }

        default: {
            return teams;
        }
    };
};