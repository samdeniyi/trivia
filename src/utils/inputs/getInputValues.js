export const getInputValues = (type) => {
    let str = ""
    const arr = Array.from(document.querySelectorAll(`input[name=${type}]`))
    .map(input => input.value)
    for(let i =0; i <arr.length; i++){
    if(arr[i]){
        str = str + String(arr[i][arr[i].length - 1])
    }
    }
    return str;
};