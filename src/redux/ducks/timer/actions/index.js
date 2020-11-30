import { 
    START_TIMER, 
    STOP_TIMER, 
    RESET_TIMER, 
    SET_EXPIRED 
} from '../constants';

export const tick = (counterValue) => dispatch => {
    dispatch({ type: START_TIMER, payload: counterValue });
};

export const setExpired = (condition) => dispatch => {
    dispatch({ type: SET_EXPIRED, payload: condition });
};

export const stopCounter = (counterValue) => dispatch => {
    dispatch({ type: STOP_TIMER, payload: counterValue });
};

export const resetCounter = () => dispatch => {
    dispatch({ type: RESET_TIMER });
    dispatch({ type: SET_EXPIRED, payload: false });
};