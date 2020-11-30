import moment from 'moment';

export const relativeTimeFormat = time => {
    return moment(new Date(time)).fromNow();
};