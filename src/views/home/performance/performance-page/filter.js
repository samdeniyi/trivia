import moment from "moment";

export const filterByDate = (list, filter) => {
    switch (filter) {
        case "TODAY": {
            const today = new Date();               
            const todaysCommissions = [];

            for (let element of list) {
                todaysCommissions.push({
                    type: element.type,
                    commissions: element.commissions.filter(commission => commission.createdAt === today)
                });
            };

            return todaysCommissions;
        }

        case "THIS_WEEK": {
            const today = moment();
            const weekCommissions = [];
            const weekStart = today.clone().startOf('isoWeek');
          
            const weekDays = [];
            for (let i = 0; i <= 6; i++) {
                weekDays.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd"));
            };

            for (let element of list) {
                weekCommissions.push({
                    type: element.type,
                    commissions: element.commissions.filter(commission => {
                        return weekDays.includes(moment(commission.createdAt).format("MMMM Do,dddd"))
                    })
                });
            };

            return weekCommissions;
        }

        case "THIS_MONTH": {
            const startOfMonth     = moment().startOf('month').format("D");
            const endOfMonth       = moment().endOf('month').format("D");
            
            const monthDays = [];
            for (let i = 0; i <= endOfMonth; i++) {
                monthDays.push(moment(startOfMonth).add(i, 'days').format("MMMM Do,dddd"));
            };
            
            const monthCommissions = [];
            for (let element of list) {
                monthCommissions.push({
                    type: element.type,
                    commissions: element.commissions.filter(commission => {
                        return monthDays.includes(moment(commission.createdAt).format("MMMM Do,dddd"))
                    })
                });
            };

            return monthCommissions;
        }

        case "THIS_YEAR": {
            const thisYear = new Date().getFullYear();
            
            const yearCommissions = [];
            for (let element of list) {
                yearCommissions.push({
                    type: element.type,
                    commissions: element.commissions.filter(commission => {
                        return new Date(commission.createdAt).getFullYear() === thisYear
                    })
                });
            };

            return yearCommissions;
        }

        default: {
            return list;
        }
    };
};