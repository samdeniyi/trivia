import moment from "moment";

export const formatCreationDate = creationDate => {    
    const hours         = moment(creationDate).format("hh") ;
    const minutes       = moment(creationDate).format("mm");
    const interv       = moment(creationDate).format('A');

    let day;

    if (moment(creationDate).isSame(new Date(), "day")) {
        day = "Today";
    } else if (moment(creationDate).isSame(moment().subtract(1, 'day'), "day")) {
        day = "Yesterday";
    } else {
        day = moment(creationDate).format('D MMMM');
    };

    return `
        ${day}, 
        ${hours}:${minutes} ${interv}
    `
};