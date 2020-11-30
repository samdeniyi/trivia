export const getDate = (dateStamp) => {
    const currentDate = new Date().getTime();
    const date = new Date(dateStamp).getTime();
    const diff = (currentDate - date)/(1000 * 3600 * 24);
    
    if(diff < 1){
        return "Today";
    } else if(diff < 2){
        return "Yesterday";
    } else {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(new Date(dateStamp))
    }
}