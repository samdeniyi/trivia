import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { string, array, func } from "prop-types";
import { connect, useSelector } from "react-redux";
import History from "../../../utils/History";
import { getNotifications } from "../../../redux/ducks/account/notifications/actions";
import { getShops } from "../../../redux/ducks/applications/my-shop/actions/shop";
import { getCustomers } from "../../../redux/ducks/applications/my-shop/actions/customers";
import { getWalletBalance } from "../../../redux/ducks/account/wallet/actions";
import { getAgentActivationStatus } from "../../../redux/ducks/applications/agents/actions";
import { getAvailableBanks } from "../../../redux/ducks/account/wallet/actions/bank-account";
import subscribeUser from "../../../redux/ducks/account/notifications/push/subscription";
import {
    getRejectedReasons,
    getUserAdditionalInfo
} from '../../../redux/ducks/user/actions';
import { activateWallet } from "../../../redux/ducks/account/wallet/actions/index";
import ActionsList from "./components/actions-grid";
import { Header, Navigation } from "../../home";
import {
    //WalletBadge,
    WalletBadge2,
    ApprovalStatusPopup,
    RippleLink,
    //RippleButton,
    //OptionsPopupDialog,
    ComingSoon
} from "../../../components";
import { ScreenContainer } from "../../../containers/ScreenContainer";
import {
    CategoryRow,
    CategoryTitle,
    //SubTitle,
    //SecondaryText
} from "../../../containers/MessageContainer";
//import { ReactComponent as AgencyBankingIcon } from "./assets/agency-banking.svg";
import { ReactComponent as FinancialIcon } from "./assets/financial.svg";
import { ReactComponent as ContactsIcon } from "./assets/contacts.svg";
import { ReactComponent as ShopIcon } from "./assets/shop.svg";
//import { ReactComponent as LearningIcon } from "./assets/learning.svg";
import FallbackUserAvatar from "../../../assets/user-avater.svg";
import PendingUserSVG from "../../../assets/pending-user.svg";
import UnapprovedUserSVG from "../../../assets/unapproved-user.svg";
import WalletIcon from './assets/wallet_unavailable.svg';

//import { ReactComponent as walletIcon } from '../../../assets/wallet.svg';
//import { ReactComponent as JetSVG } from "./assets/jet.svg";
import TermsInfoOverlay from './termsInfoOverlay'
import { getAgencyBankingSignupState } from '../../../redux/ducks/account/agency-banking/actions'
import { colors } from "../../../styles";

const DashboardWrapper = styled(ScreenContainer)`
    animation: fromRightTransform 0.5s ease;
    @keyframes fromRightTransform {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0%);
        }
    }
`;

const DashboardCategory = styled.section``;

const DashboardBlock = styled.div`
    margin-bottom: 72px;
    transition: margin 0.2s linear;
    &.firstStep {
        margin-top: 20px;
        transition: margin 0.2s linear;
    }
    &.secondStep {
        margin-top: 80px;
        transition: margin 0.2s linear;
    }
    &.thirdStep {
        margin-top: 94px;
        transition: margin 0.2s linear;
    }
    &.fourthStep {
        margin-top: 104px;
        transition: margin 0.2s linear;
    }
`;

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: ${({ radius }) => radius};
    object-fit: ${({ objectFit }) => objectFit || "initial"};
    position: absolute;
    left: ${({ left }) => left};
`;

const AgentActivativationMessageBox = styled.div`
    display: flex;
    width: 100%;
    height: 83px;
    background-color: ${({ background }) => background};
    border-radius: 10px;
    margin: 20px 0;
    margin-top: 30px;
    padding: 10px 0;
`;

const AgentActivativationMessageBoxRightSide = styled.div`
    flex: 75%;
`;

const Paragraph = styled.div`
    padding: 7px 0;
    padding-right: 16px;
    font-size: 12px;
    color: #212c3d;
`;

const ImageWrapper = styled.div`
    position: relative;
    height: 83px;
    flex: 25%;
`;

const ActivationStatusLink = styled.div`
    color: #579fd7;
    font-size: 10px;
`;

// const UpgradeBox = styled.div`
//     display: flex;
//     background-color: #56636d10;
//     border-radius: 10px;
//     padding: 16px;
//     align-items: center;
//     margin-bottom: 72px;
// `;

// const AgentMessageBoxLeftSide = styled.div`
//     flex: 75%;
// `;

const Home = ({
    role,
    avatar,
    notifications,
    getNotifications,
    getShops,
    getCustomers,
    getWalletBalance,
    status,
    getAvailableBanks,
    getAgentActivationStatus,
    getRejectedReasons,
    activateWallet,
    getUserAdditionalInfo,
    getAgencyBankingSignupState
}) => {
    // const shops = useSelector(state => state.applications.myShop.shops);
    const banks = useSelector(state => state.account.wallet.availableBanks);
    const agentState = useSelector(state => state.user.agentState ?
         state.user.agentState.toUpperCase() : "PENDING")
    const userId = useSelector(state => state.user.userId);
    //const tier = useSelector(state => state.user.tier);
    const agencyBankingState  = useSelector(state => 
        (state.account.agencyBanking && 
        state.account.agencyBanking.agencyBankDetails && 
        state.account.agencyBanking.agencyBankDetails.status) || ""
        );
    const [classNames, setClassNames]   = useState("");
    const [statusPopup, setStatusPopup] = useState(false);
    //const [OpenFundingOptions, setFundingOptions] = useState(false);
    const [openTermsOverlay, setOpenTermsOverlay] = useState(false);
    const [openWallet, setOpenWallet] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return _ => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY < 50)  setClassNames("");
        if (scrollY > 50)  setClassNames("firstStep");
        if (scrollY > 100) setClassNames("secondStep");
        if (scrollY > 120) setClassNames("thirdStep");
        if (scrollY > 140) setClassNames("fourthStep");
    };

    useEffect(() => {
        getNotifications();
    }, [getNotifications]);

    useEffect(() => {
        getShops();
    }, [getShops]);

    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    useEffect(() => {
         getWalletBalance();
    }, [getWalletBalance]);

    useEffect(() => {
        (!banks || banks.length === 0) && getAvailableBanks();
    }, [banks, getAvailableBanks]);

    useEffect(() => {
        if(agencyBankingState !== 'APPROVED'){
            getAgentActivationStatus();
        }
    }, [agencyBankingState, getAgentActivationStatus]);

    useEffect(() => {
        agentState !== 'APPROVED' && getRejectedReasons(userId);
    }, [agentState, getRejectedReasons, userId]);

    useEffect(() => {
        subscribeUser();
    }, []);

    useEffect(() => {
        getAgencyBankingSignupState();
    }, [getAgencyBankingSignupState]);

    useEffect(() => {
        getUserAdditionalInfo();
    }, [getUserAdditionalInfo]);

    return (
        <Fragment>
            <Header avatar={avatar} notifications={notifications} />
            <DashboardWrapper>
                {/* <WalletBadge classNames={classNames} setFundingOptions={setFundingOptions}/> */}
                <WalletBadge2 
                    setOpenWallet={setOpenWallet}
                    classNames={classNames} 
                    addMoney={() => {
                        if(role === "ROLE_AGENT" && agentState !== "APPROVED") {
                            setStatusPopup(!statusPopup)
                        }
                        else {
                            if(status === "ACTIVE") {
                                History.push("/user/wallet_fund")
                            } else {
                                activateWallet().then(data => {
                                    if(data === true){
                                        History.push("/user/wallet_fund")
                                    }
                                })
                            }
                        }
                    }}
                    sendMoney={() => {
                        if(role === "ROLE_AGENT" && agentState !== "APPROVED") {
                            setStatusPopup(!statusPopup)
                        }
                        else {
                            if(status === "ACTIVE") {
                                History.push("/user/wallet_to_wallet")
                            } else {
                                activateWallet().then(data => {
                                    if(data === true){
                                        History.push("/user/wallet_to_wallet")
                                    }
                                })
                            }
                        }
                    }}
                />
                {role === "ROLE_AGENT" && agentState !== "APPROVED" ? (
                    <RippleLink to={"/user/account_kyc"}>
                        <AgentActivativationMessageBox
                            background={agentState === "PENDING" ? colors.lightYellow : colors.lightRed}
                        >
                            <ImageWrapper>
                                <Avatar
                                    src={avatar || FallbackUserAvatar}
                                    alt="User Avatar"
                                    objectFit={avatar ? "cover" : "initial"}
                                    radius={avatar ? "50%" : ""}
                                    left={"15%"}
                                />
                                <Avatar
                                    src={agentState === "PENDING" ? PendingUserSVG : UnapprovedUserSVG}
                                    alt="User Avatar"
                                    objectFit={"cover"}
                                    left={"40%"}
                                />
                            </ImageWrapper>
                            <AgentActivativationMessageBoxRightSide>
                                <Paragraph>
                                    {agentState === "PENDING"
                                        ? "Your Space Force Agent activation is pending."
                                        : "Your Space Force Agent profile was not approved."}
                                </Paragraph>
                                <ActivationStatusLink>
                                    See activation details
                                </ActivationStatusLink>
                            </AgentActivativationMessageBoxRightSide>
                        </AgentActivativationMessageBox>
                    </RippleLink>
                ) : (
                    ""
                )}

                <DashboardBlock className={classNames}>
                    {/* {role === "ROLE_AGENT" && tier && tier === "TIER_2" && (
                        <DashboardCategory>
                            <CategoryRow>
                                <AgencyBankingIcon />
                                <CategoryTitle>Agency Banking</CategoryTitle>
                            </CategoryRow>
                            <ActionsList
                                type={"AGENCYBANKING"}
                                setStatusPopup={setStatusPopup}
                            />
                        </DashboardCategory>
                    )} */}
                    {role === "ROLE_AGENT" && (
                        <DashboardCategory>
                            <CategoryRow>
                                <FinancialIcon />
                                <CategoryTitle>Make Money</CategoryTitle>
                            </CategoryRow>
                            <ActionsList
                                type={"FINANCIAL"}
                                setStatusPopup={setStatusPopup}
                            />
                        </DashboardCategory>
                    )}
                    <DashboardCategory>
                        <CategoryRow>
                            <ShopIcon />
                            <CategoryTitle>Manage Store</CategoryTitle>
                        </CategoryRow>
                        <ActionsList
                            type={"SHOP"}
                            setStatusPopup={setStatusPopup}
                        />
                    </DashboardCategory>
                    <DashboardCategory>
                        <CategoryRow>
                            <ContactsIcon />
                            <CategoryTitle>My Contacts</CategoryTitle>
                        </CategoryRow>
                        <ActionsList
                            type={"CONTACTS"}
                            setStatusPopup={setStatusPopup}
                        />
                    </DashboardCategory>
                    {role === "ROLE_USER" && (
                        <DashboardCategory>
                            <CategoryRow>
                                <FinancialIcon />
                                <CategoryTitle>Services</CategoryTitle>
                            </CategoryRow>
                            <ActionsList
                                type={"SERVICES"}
                                setStatusPopup={setStatusPopup}
                            />
                        </DashboardCategory>
                    )}
                    {/* <DashboardCategory>
                        <CategoryRow>
                            <LearningIcon />
                            <CategoryTitle>Learning & Trivia</CategoryTitle>
                        </CategoryRow>
                        <ActionsList
                            type={"LEARNING"}
                            setStatusPopup={setStatusPopup}
                        />
                    </DashboardCategory> */}
                </DashboardBlock>
                {/* {(role === "ROLE_AGENT" && tier && tier === "TIER_1") && (    
                    <UpgradeBox>         
                        {((agencyBankingState === 'PENDING' || agencyBankingState === 'REJECTED') ? (
                            <AgentMessageBoxLeftSide>
                                <SubTitle>
                                   {agencyBankingState === "PENDING"
                                        ? "Your application is in review."
                                        : "Your application was rejected"
                                    }
                                    </SubTitle>
                                <SecondaryText weight={"400"}>Your application for tier-2 has been received and our team is currently reviewing it.</SecondaryText>
                                <RippleButton 
                                    style={{ 
                                         width: 'min-content', 
                                         paddingLeft: '24px',
                                         paddingRight: '24px',
                                         whiteSpace: 'nowrap'
                                     }} 
                                     onClick={() => {
                                        History.push("/user/account_agency_banking_signup")
                                    }}
                                >See Status</RippleButton>
                            </AgentMessageBoxLeftSide>
                       ) : (
                            <AgentMessageBoxLeftSide>
                                <SubTitle>Upgrade Account To Tier 2</SubTitle>
                                <SecondaryText weight={"400"}>Tier 2 agent account gives you the ability to offer agency banking services.</SecondaryText>
                                <RippleButton 
                                     style={{ 
                                        width: 'min-content', 
                                        paddingLeft: '24px',
                                        paddingRight: '24px',
                                    }} 
                                    onClick={() => {
                                        if (agentState === "APPROVED"){
                                            setOpenTermsOverlay(!openTermsOverlay)
                                        } else {
                                            setStatusPopup(true);
                                        }
                                    }}
                                >Upgrade</RippleButton>
                            </AgentMessageBoxLeftSide>
                        ))}
                        <ImageWrapper>
                            <JetSVG></JetSVG>
                        </ImageWrapper>
                    </UpgradeBox>
                )} */}
            </DashboardWrapper>
            <Navigation />
            <ApprovalStatusPopup
                open={statusPopup}
                cancel={() => setStatusPopup(!statusPopup)}
                status={agentState}
            />
            <TermsInfoOverlay 
                open={openTermsOverlay} 
                cancel={() => {
                    setOpenTermsOverlay(!openTermsOverlay);    
                }} 
                confirm={() => {
                    setOpenTermsOverlay(!openTermsOverlay); 
                    History.push("/user/account_agency_banking_signup")
                }}
            />
            <ComingSoon
                open={openWallet}
                cancel={() => setOpenWallet(!openWallet)}
                icon={WalletIcon}
                title={"Wallet"}
                subtitle={"You can use the wallet to send money to other users and bank accounts."} 
                notifyText={"We will notify you as soon as the wallet is ready for use"}
            />

            {/* <OptionsPopupDialog
                open={OpenFundingOptions}
                title={"Fund Wallet"}
                arrows={true}
                cancel={() => setFundingOptions(!OpenFundingOptions)}
                items={[
                    {
                        Icon: walletIcon,
                        title: "Fund my Wallet",
                        click: () => {
                            if(status === "ACTIVE") {
                                History.push("/user/wallet_fund")
                            }
                            else {
                                activateWallet().then(data => {
                                    if(data === true){
                                        History.push("/user/wallet_fund")
    
                                    }
                                    else {
                                        setFundingOptions(false)
                                    }
                                })
                            } 
                        }
                    },
                    {
                        Icon: walletIcon,
                        title: "Fund Other's Wallet",
                        click: () => {
                            if(status === "ACTIVE") {
                                History.push("/user/wallet_to_wallet")
                            }
                            else {
                                activateWallet().then(data => {
                                    if(data === true){
                                        History.push("/user/wallet_to_wallet")
                                    }
                                    else {
                                        setFundingOptions(false)
                                    }
                                })
                            } 
                        }
                    }
                ]}
            />
             */}
        </Fragment>
    );
};

Home.propTypes = {
    userId: string,
    avatar: string,
    notifications: array,
    getNotifications: func,
    getShops: func,
    getWalletBalance: func,
    getAgentActivationStatus: func,
    status: string,
    activateWallet: func,
    getUserAdditionalInfo: func,
    getAgencyBankingSignupState: func
};

const mapStateToProps = ({ user, account }) => ({
    avatar: user.avatar,
    notifications: account.notifications.allNotifications,
    role: user.role,
    status: account.wallet.status
});

export default connect(mapStateToProps, {
    getNotifications,
    getShops,
    getCustomers,
    getWalletBalance,
    getAvailableBanks,
    getAgentActivationStatus,
    getRejectedReasons,
    activateWallet,
    getUserAdditionalInfo,
    getAgencyBankingSignupState
})(Home);
