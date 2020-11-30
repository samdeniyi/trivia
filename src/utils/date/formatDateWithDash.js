export const formatDateWithDash = date => {
    return new Intl.DateTimeFormat().format(new Date()).replace(/\//g, '-');
}