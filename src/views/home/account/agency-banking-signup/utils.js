export const modifyRejectedReasons = (reasons) => {
    const oldReasons = reasons ? [...reasons] : [];
    let modifiedReasons = [];
    oldReasons.forEach(([key, value]) => {
        if(key === "identificationCardImageUrl") {
            modifiedReasons.push(["ID Card", value]);
        } else if(key === "billImageUrl") {
            modifiedReasons.push(["Utility Bill", value]);
        } else if(key === "passportPhotograph") {
            modifiedReasons.push(["Passport Photograph", value]);
        } else {
            modifiedReasons.push([key, value]);
        }
    });
    return modifiedReasons;
}