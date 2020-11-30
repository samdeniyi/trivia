import {
    SENDING_CODE,
    SENDING_CODE_SUCCESS,
    SENDING_CODE_ERROR
} from './constants';

const initialState = {
	isLoading: false,
    errorMsg: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SENDING_CODE: {
            return {
                ...state,
                isLoading: true,
                errorMsg: ''
            }
        }

        case SENDING_CODE_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }

        case SENDING_CODE_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            }
        }
    
        default: {
            return state;
        }
    }
};