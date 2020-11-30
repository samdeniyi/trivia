import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

export const htmlToFormData = (id, callback) => {
    return new Promise((resolve, reject) => {
        html2canvas(document.querySelector(id)).then(canvas => {
            canvas.toBlob(async blob => {
                const formData = new FormData();
                formData.append('file', blob);
        
                try {
                    const url = await callback(formData);
                    url && resolve(url);
                } catch (error) {
                    if (error.message === "Network Error") {
                        toast.error(error.message);
                    } else {
                        reject("");
                        throw new Error(error);
                    };
                }
            });
        });    
    });
};