export const getMessageFromString = str => {
    const splittedStr = str.split(",");
    const message = splittedStr[2].split(":");  //2 is the number of "message property in str"
    if(message.length > 2){
        return message[1] + ":" + message[2]
    }
    return message[1]
}