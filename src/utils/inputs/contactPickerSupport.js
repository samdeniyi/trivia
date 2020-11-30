export const contactPickerSupport = ('contacts' in navigator) && ('ContactsManager' in window);

export const selectContact = (setContact, fieldName) => {
    navigator.contacts.select(["tel"])
        .then(contacts => {
            if (contacts.length > 0) {
                setContact(fieldName, contacts[0].tel.filter(tel => tel.length > 0)[0])
            };
        })
        .catch(console.error);
};