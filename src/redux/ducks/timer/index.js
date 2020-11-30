import { 
    START_TIMER, 
    STOP_TIMER, 
    RESET_TIMER, 
    SET_EXPIRED 
} from './constants';

const initialState = {
    counter: 59,
    expired: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case START_TIMER: {
            return {
                ...state,
                counter: action.payload - 1
            }
        }

        case STOP_TIMER: {
            return {
                ...state,
                counter: state.counter
            }
        }

        case RESET_TIMER: {
            return {
                ...state,
                counter: 59
            }
        }

        case SET_EXPIRED: {
            return {
                ...state,
                expired: action.payload
            }
        }

        default: {
            return state
        }
    }
};