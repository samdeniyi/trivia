import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { string, func } from 'prop-types';
import { colors } from '../../../../styles';
import { logoutUser } from '../../../../redux/ducks/user/actions';
import { switchWalletUsageMode, hideBalance } from '../../../../redux/ducks/account/wallet/actions';
import {
    UserAvatar,
    TopHeader,
    ApprovalStatusPopup,
    MenuList,
    RippleButton,
    IntroductionPopup,
} from '../../../../components';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { Message, SecondaryText, SubTitle } from '../../../../containers/MessageContainer';
import { ReactComponent as LogoutIcon } from './assets/logout.svg';
//import { ReactComponent as JetSVG } from "./assets/jet.svg";
import { ReactComponent as ConvertMerchantIcon } from './assets/convert.svg';
import UserIcon from '../../../../assets/user.svg';
import KYCIcon from './assets/kyc.svg';
import BankDataIcon from './assets/bank_data.svg';
import PinIcon from './assets/pin.svg';
import DebitCardIcon from './assets/debit_card.svg';
import TermsAndConditionsIcon from './assets/terms_and_conditions.svg';
import PrivacyPolicyIcon from './assets/privacy_policy.svg';
import { ReactComponent as AgentsSVG } from "../../../../assets/agents.svg";
import TermsInfoOverlay from './termsInfoOverlay'
import History from "../../../../utils/History";
// import NextOfKinIcon from './assets/next_of_kin.svg';
import HideWalletBalanceIcon from './assets/hide_wallet_balance.svg';
//  import HelpAndSupportIcon from './assets/help_and_support.svg';
// import PushNotificationsIcon from './assets/push_notifications.svg';
// import SmsNotificationsIcon from './assets/sms_notifications.svg';
// import DownloadAccountStatementIcon from './assets/download_account_statement.svg';
// import AboutIcon from './assets/about.svg';
import { mixPanel } from '../../../../utils/mix-panel/mixPanel';
import { SETTINGS_MERCHANT_UPGRADE } from '../../../../utils/mix-panel/constants';

const Menu = styled.section`
    margin: 18px 0;

    & > ul:not(:last-of-type) {
        margin-bottom: 32px;
    }
`;

const LogoutButton = styled(RippleButton)`
    text-align: center;
    color: ${colors.themeTextColor3};
    font-weight: 500;
    background-color: ${colors.white};
    border-radius: unset;
    margin-top: 0;
    border-bottom: 1px solid ${colors.border.bottom};

    & > svg {
        position: relative;
        top: 5px;
        margin-right: 4px;
    }
`;

const UpgradeBox = styled.div`
    display: flex;
    background-color: #56636d10;
    border-radius: 10px;
    margin: 16px;
    padding: 16px;
    align-items: center;
`;

const AgentMessageBoxLeftSide = styled.div`
    flex: 75%;
`;

const ImageWrapper = styled.div`
    position: relative;
    height: 83px;
    flex: 25%;
    padding: 4px;
`;

const UserBox = styled.section`
    display: flex;
    width: 100%;
    border: 1px solid ${colors.gray3};
    border-radius: 13px;
    margin: 64px 0px 0px 0px;
    padding: 16px;
    flex-direction: row; 
`;

const UserType = styled.span`
    margin-left: ${({ margin }) => margin || null};
    background-color: ${({ backgroundColor }) => backgroundColor || colors.setting.userTypeBg};
    border-radius: 7px;
    padding: 2px 8px;
    display: inline-block;
`;

const UserInfo = styled.div` 
    align-items: left;
    margin-left: 8px;
`;

const UMTitle = styled(SubTitle)``;

const AgentInfo = styled.div``;

const AccountSettings = ({
    avatar,
    firstName,
    lastName,
    msisdn,
    switchWalletUsageMode,
    logoutUser,
    hideBalance,
    balanceHidden
}) => {
    // const [smsNotifications, setSmsNotifications] = useState(false);
    // const [pushNotifications, setPushNotifications] = useState(false);
    const role = useSelector(state => state.user.role);
    const tier = useSelector(state => state.user.tier);
    // const agencyBankingState  = useSelector(state => 
    //     (state.account.agencyBanking && 
    //     state.account.agencyBanking.agencyBankDetails && 
    //     state.account.agencyBanking.agencyBankDetails.status) || ""
    //     ); 
    const agentState = useSelector(state => state.user.agentState ? state.user.agentState : "PENDING")
    const [confirmUpgrade, setConfirmUpgrade] = useState(false);
    const [openTermsOverlay, setOpenTermsOverlay] = useState(false);
    const [statusPopup, setStatusPopup] = useState(false);
    const history = useHistory();

    return (
        <Fragment>
            <TopHeader title={"Account & Settings"} />
            <ScreenContainer paddingBottom={"0px"}>
                <UserBox>
                    <UserAvatar width={"72px"} height={"72px"} avatar={avatar} />
                    <UserInfo>
                        <Message top={"3px"} weight={"500"} align={"left"} size={"14px"}>{firstName} {lastName}</Message>
                        <Message top={"3px"} weight={"400"} align={"left"} size={"10px"}>{msisdn}</Message>
                        {(role === "ROLE_USER") ? ( 
                         <UserType>
                           <Message top={"0px"} weight={"500"} align={"left"} size={"10px"} color={colors.setting.userTypeTextColor}>
                              {"Merchant account"}
                           </Message>
                         </UserType>
                        ) : (
                            <AgentInfo>
                                <UserType>
                                     <Message top={"0px"} weight={"500"} align={"left"} size={"10px"} color={colors.setting.userTypeTextColor}>
                                     {"Agent account"}
                                     </Message>
                                </UserType>
                                {(tier && (
                                    <UserType margin={"8px"} backgroundColor={colors.setting.agentTier1Bg}>
                                        <Message top={"0px"} weight={"500"} align={"left"} size={"10px"} 
                                            color={colors.setting.agentTier1TextColor}>
                                            {(tier && tier === "TIER_2") ? "Tier 2" : "Tier 1"}
                                        </Message>
                                    </UserType>
                                ))}
                           </AgentInfo>
                        )}
                    </UserInfo>
                </UserBox>
            </ScreenContainer>

            <Menu>
                {(role === "ROLE_USER") ? (
                 <MenuList
                     title={"Account"}
                     options={[
                         {
                             name: "Personal Details",
                             icon: UserIcon,
                             link: "/user/update_data"
                         },
                        //  {
                        //      name: "Next Of Kin",
                        //      icon: NextOfKinIcon,
                        //      link: "/user/account_next_of_kin"
                        //  }
                     ]}
                />
                ) : (
                <MenuList
                     title={"Account"}
                     options={[
                         {
                             name: "Personal Details",
                             icon: UserIcon,
                             link: "/user/update_data"
                         },
                         {
                             name: "KYC",
                             icon: KYCIcon,
                             link: "/user/account_kyc"
                         },
                        //  {
                        //      name: "Next Of Kin",
                        //      icon: NextOfKinIcon,
                        //      link: "/user/account_next_of_kin"
                        //  },
                         {
                             name: "Bank Data",
                             icon: BankDataIcon,
                             link: "/user/account_kyc_bank_data"
                         }
                     ]}
                />
                )}
                <MenuList
                    title={"Privace & Security"}
                    options={[
                        {
                            name: "PIN",
                            icon: PinIcon,
                            link: "/user/password_update"
                        },
                        {
                            name: "Hide Wallet Balance",
                            subText: "Hide your balance on the home screen",
                            icon: HideWalletBalanceIcon,
                            checkStatus: balanceHidden,
                            switchStatus: () => {
                                if (balanceHidden === true) {
                                    hideBalance(!balanceHidden);
                                } else {
                                    hideBalance(!balanceHidden);
                                };
                            },
                        }
                    ]}
                />
                {/* <MenuList
                    title={"Notifications"}
                    options={[
                        {
                            name: "Push Notifications",
                            icon: PushNotificationsIcon,
                            checkStatus: pushNotifications,
                            switchStatus: setPushNotifications
                        },
                        {
                            name: "SMS Notifications",
                            icon: SmsNotificationsIcon,
                            checkStatus: smsNotifications,
                            switchStatus: setSmsNotifications
                        }
                    ]}
                /> */}
                {(process.env.REACT_APP_ENV_NAME === "release" || process.env.REACT_APP_ENV_NAME==="development") && (
                    <MenuList 
                        title={"Payment Methods & Bank Settings"}
                        options={[
                            {
                                name: "Debit Cards",
                                icon: DebitCardIcon,
                                link: "/user/wallet_cards_all",
                                action: () => switchWalletUsageMode("manage")
                            },
                            {
                                name: "Withdrawal Settings",
                                icon: BankDataIcon,
                                link: "/user/wallet_withdrawal_settings",
                                action: () => switchWalletUsageMode("manage")
                            }
                        ]}
                    />
                )}
                <MenuList
                    title={"More Information"}
                    options={[
                        // {
                        //     name: "Download account statement",
                        //     icon: DownloadAccountStatementIcon,
                        //     link: "/"
                        // },
                        // {
                        //     name: "Help & Support",
                        //     icon: HelpAndSupportIcon,
                        //     link: "/help"
                        // },
                        {
                            name: "Privacy Policy",
                            icon: PrivacyPolicyIcon,
                            link: "/privacyPolicy"
                        },
                        {
                            name: "Terms & Conditions",
                            icon: TermsAndConditionsIcon,
                            link: "/termsAndConditions"
                        },
                        {
                            name: "My Referring User",
                            icon: UserIcon,
                            link: "/actions/merchant_agent"
                        }
                        // {
                        //     name: "About",
                        //     icon: AboutIcon,
                        //     link: "/"
                        // }
                    ]}
                />
                <LogoutButton onClick={logoutUser}>
                    <LogoutIcon /> Logout
                </LogoutButton>
            </Menu>   
            {(role === "ROLE_USER") && (    
                <UpgradeBox>         
                    <AgentMessageBoxLeftSide>
                        <UMTitle>Convert to an Agent account</UMTitle>
                        <SecondaryText weight={"400"}>Convert your account to join the agent networks on spaces.</SecondaryText>
                        <RippleButton 
                             style={{ 
                                width: 'min-content', 
                                paddingLeft: '24px',
                                paddingRight: '24px',
                            }} 
                            onClick={() => { 
                                setConfirmUpgrade(!confirmUpgrade); 
                                mixPanel.track(SETTINGS_MERCHANT_UPGRADE, 
                                    { 
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            }}
                        >Convert</RippleButton>
                    </AgentMessageBoxLeftSide>
                    <ImageWrapper>
                        <ConvertMerchantIcon></ConvertMerchantIcon>
                    </ImageWrapper>
                </UpgradeBox>
            )}
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
            )}            */}
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
            <IntroductionPopup
                open={confirmUpgrade}
                cancel={() => {
                    setConfirmUpgrade(!confirmUpgrade);
                }}
                confirm={() => {
                    setConfirmUpgrade(!confirmUpgrade);
                    history.push('/actions/um_agent_region_selection')
                }}
                title={"Agent"}
                Logo={AgentsSVG}
                logoSpacing={"30px"}
                withConfirmation={true}
                confirmText={"Continue"}
                message={
                    "Upgrade to an agent and earn money from merchants you sign up and services you offer."
                }
            />
        </Fragment>
    );
};

AccountSettings.propTypes = {
    avatar:                string,
    firstName:             string,
    lastName:              string,
    msisdn:                string,
    logoutUser:            func,
    switchWalletUsageMode: func,
    hideBalance:           func
};

const mapStateToProps = ({ user, account }) => ({
    avatar:        user.avatar,
    firstName:     user.firstName,
    lastName:      user.lastName,
    msisdn:        user.msisdn,
    balanceHidden: account.wallet.hideBalance
});

export default connect(
    mapStateToProps,
    {
        logoutUser,
        switchWalletUsageMode,
        hideBalance
    }
)(AccountSettings);