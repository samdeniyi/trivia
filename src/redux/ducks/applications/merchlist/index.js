import { 
    RETRIEVING_ORDERS, 
    RETRIEVED_ORDERS, 
    RETRIEVAL_ERROR, 
    SAVE_RETRIEVED_ORDERS
} from "./constants";
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    errorMsg:  "",
    orders: [
        // { 
        //     orderNumber: "727348292",
        //     amount: "2000",
        //     status: "PAID",
        //     createdAt: new Date(),
        //     items: [
        //         {
        //             title: "2x Pears Baby Powder",
        //             amount: "3000"
        //         }, 
        //         {
        //             title: "1x vasline Lotion",
        //             amount: "1000"
        //         }
        //     ],
        //     subTotal: "4000",
        //     serviceFee: "500",
        //     deliveryFee: "500",
        //     total: "5000",
        //     deliveryAddress: "V4, Valley Stream Estate, Castlerock Avenue, Lekki-Jakande, Lagos.",
        //     shippingStatus: "Delivered",
        //     customer: {
        //         name: "Uzodinma Akwukwuma",
        //         phoneNumber: "08135323752"
        //     },
        //     merchant: {
        //         name: "The good shop",
        //         phoneNumber: "08012345678"
        //     }
        // }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVING_ORDERS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case RETRIEVED_ORDERS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case RETRIEVAL_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        case SAVE_RETRIEVED_ORDERS: {
            const savedOrders =  state.orders.slice();

            return {
                ...state,
                orders: savedOrders.concat(action.payload)
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                errorMsg:  "",
                orders: [],
            }
        }
    
        default: {
           return state;
        }
    };
};