export const fileToFormData = async (file, fileData = null) => {
    let fileToSend;
    const formData = new FormData();

    if (typeof file === 'string') {        
        fileToSend = await fetch(file)
            .then(response => response.blob())
            .then(blob => new File([blob], 'name', { type: blob.type, lastModified: new Date() }));
    } else {
        fileToSend = file;
    }

    formData.append('file', fileToSend);
    return formData;
};