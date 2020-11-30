import axios from 'axios';
import { currentAPI } from '../../../../../config';


export const getUserPublicData = userId => async dispatch => {
    try {
        const responseUserPublicData = await axios.get(
            `${currentAPI}/api/users/public/${userId}`
        );
        
        if (responseUserPublicData.status === 200) {
            return responseUserPublicData.data || {};
        };
        return {}
    } catch (error) {
        console.error(error);
        return {}
    }
}