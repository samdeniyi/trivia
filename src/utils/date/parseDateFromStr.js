import {months} from "./months";

export const parseDate = date => {
    const currentDate = new Date(date)
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    const month = months[currentDate.getMonth()]
    const dateNum = currentDate.getDate();
    return `${month} ${dateNum}, ${strTime}`
}