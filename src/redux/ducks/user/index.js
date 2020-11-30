import {
    SAVE_USER_DATA,
    SAVE_USER_TELEPHONE,
    SAVE_USER_ROLE,
    SAVE_USER_AVATAR,
    SAVE_USER_NAME,
    SAVE_USER_EMAIL,
    SAVE_USER_ID,
    SAVE_USER_DOCUMENT,
    SAVE_USER_REGION,
    SAVE_USER_ADDRESS,
    SAVE_USER_COUNTRY,
    SAVE_USER_REFERRAL_CODE,
    SAVE_AGENT_SHARE_CODE,
    SAVE_USER_DOCUMENT_DATA,
    SAVE_USER_PASSPORT,
    SAVE_USER_PASSPORT_DATA,
    SAVE_USER_CREATION_DATE,
    SAVE_USER_VERIFICATION_STATUS,
    SET_USER_LOGIN_STATUS,
    ACTIVATE_USER_ACCOUNT,
    SET_USER_MERCHAPP_PRESENT,
    USER_LOGOUT,
    SAVE_USER_AGENT_DATA,
    SAVE_REJECTED_REASONS,
    GET_USER_DOCUMENTS,
    GET_DEFAULT_BANK_DATA,
    GET_USER_KYC_VERIFICATION_STATE,
    SAVE_USER_DOCUMENT_STATE,
    SAVE_USER_PASSPORT_STATE,
    GET_USER_TIER_LEVEL
} from "./constants";

const initialState = {
    isLoggedIn: !!JSON.parse(localStorage.getItem("token")),
    userId: "",
    createdAt: "",
    isOnMerchApp: false,
    msisdn: "",
    active: false,
    firstName: "",
    lastName: "",
    houseAddress: "",
    email: "",
    role: "",
    avatar: "",
    referralCode: "",
    agentCodeToShare: "",
    verified: false,
    country: "",
    agentState: "",
    tier: "",
    regionData: {
        country: "",
        state: "",
        lga: "",
    },
    document: {
        label: "",
        url: "",
    },
    passport: {
        label: "",
        url: "",
    },
    documentData: {
        name: "",
        type: "",
    },
    passportData: {
        name: "",
        type: "",
    },
    documentState: {
        state: "",
        progress: 0,
    },
    passportState: {
        state: "",
        progress: 0,
    },
    agentData: {
        firstName: "",
        lastName: "",
        msisdn: "",
        email: "",
        country: "",
        state: "",
        lga: "",
        avatar: "",
        agentCodeToShare: "",
    },
    rejectedReasons: {},
    documentList: [],
    defaultBankAccountData: {
        accountNumber: "",
        bankCode: "",
        currency: ""
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGIN_STATUS: {
            return {
                ...state,
                isLoggedIn: true,
            };
        }

        case SAVE_USER_CREATION_DATE: {
            return {
                ...state,
                createdAt: action.payload,
            };
        }

        case SAVE_USER_ROLE: {
            return {
                ...state,
                role: action.payload,
            };
        }

        case ACTIVATE_USER_ACCOUNT: {
            return {
                ...state,
                active: true,
            };
        }

        case SAVE_USER_DATA: {
            const { firstName, lastName, email, houseAddress } = action.payload;

            return {
                ...state,
                firstName,
                lastName,
                houseAddress,
                email: email || state.email
            };
        }

        case SAVE_USER_REGION: {
            return {
                ...state,
                regionData: {
                    country: action.payload.country,
                    state: action.payload.state,
                    lga: action.payload.lga,
                },
            };
        }

        case SAVE_USER_COUNTRY: {
            return {
                ...state,
                country: action.payload,
            };
        }

        case SAVE_USER_REFERRAL_CODE: {
            return {
                ...state,
                referralCode: action.payload,
            };
        }

        case SAVE_AGENT_SHARE_CODE: {
            return {
                ...state,
                agentCodeToShare: action.payload,
            };
        }

        case SAVE_USER_EMAIL: {
            return {
                ...state,
                email: action.payload,
            };
        }

        case SAVE_USER_ADDRESS: {
            const houseAddress = [
                action.payload.streetAddress,
                action.payload.lga,
                action.payload.state,
                action.payload.country,
            ].join(", ");

            return {
                ...state,
                houseAddress,
            };
        }

        case SAVE_USER_ID: {
            return {
                ...state,
                userId: action.payload,
            };
        }

        case SAVE_USER_TELEPHONE: {
            return {
                ...state,
                msisdn: action.payload,
            };
        }

        case SAVE_USER_NAME: {
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            };
        }

        case SAVE_USER_DOCUMENT: {
            return {
                ...state,
                document: action.payload,
            };
        }

        case SAVE_USER_DOCUMENT_DATA: {
            const { name, type } = action.payload;

            return {
                ...state,
                documentData: {
                    name,
                    type,
                },
            };
        }

        case SAVE_USER_DOCUMENT_STATE: {
            return {
                ...state,
                documentState: action.payload,
            };
        }

        case SAVE_USER_PASSPORT: {
            return {
                ...state,
                passport: action.payload,
            };
        }

        case SAVE_USER_PASSPORT_DATA: {
            const { name, type } = action.payload;
            return {
                ...state,
                passportData: {
                    name,
                    type,
                },
            };
        }

        case SAVE_USER_PASSPORT_STATE: {
            return {
                ...state,
                passportState: action.payload,
            };
        }

        case SAVE_USER_VERIFICATION_STATUS: {
            return {
                ...state,
                verified: action.payload,
            };
        }

        case SAVE_USER_AVATAR: {
            return {
                ...state,
                avatar: action.payload,
            };
        }

        case SET_USER_MERCHAPP_PRESENT: {
            return {
                ...state,
                isOnMerchApp: action.payload,
            };
        }

        case SAVE_USER_AGENT_DATA: {
            return {
                ...state,
                agentData: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    msisdn: action.payload.msisdn,
                    email: action.payload.email,
                    country: action.payload.country,
                    state: action.payload.state,
                    lga: action.payload.lga,
                    avatar: action.payload.avatar,
                    agentCodeToShare: action.payload.agentCodeToShare,
                },
            };
        }

        case SAVE_REJECTED_REASONS: {
            return {
                ...state,
                rejectedReasons: action.payload,
            }
        }

        case GET_USER_DOCUMENTS: {
            const { documentList } = action.payload;

            return {
                ...state,
                documentList
            };

        }

        case GET_USER_KYC_VERIFICATION_STATE: {
            return {
                ...state,
                agentState: action.payload,
            };
        }

        case GET_USER_TIER_LEVEL: {
            return {
                ...state,
                tier: action.payload,
            };
        }

        case GET_DEFAULT_BANK_DATA: {
            return {
                ...state,
                defaultBankAccountData: action.payload
            };
        }

        case USER_LOGOUT: {
            // localStorage.removeItem("persist:root");
            // localStorage.removeItem("token");
            // localStorage.removeItem("refreshToken");
            localStorage.clear()
            return {}
        }

        default: {
            return state;
        }
    }
};
