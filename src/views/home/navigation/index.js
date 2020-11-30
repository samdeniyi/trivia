import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { useSelector, connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetOfflineStatus } from '../../../redux/ducks/offline/actions';

import { OptionsPopupDialog, NavigationElement, /* OfflineStripe */ } from '../../../components';
import DashboardIcon from './assets/dashboard.svg';
import ActiveDashboardIcon from './assets/active_dashboard.svg';
import ReferralIcon from './assets/referral.svg';
import ActiveReferralIcon from './assets/active_referral.svg';
// import TransactionIcon from './assets/transactions.svg';
import ActiveTransactionIcon from './assets/transactionSVG.svg';
//import WalletIcon from './assets/wallet.svg';
// import ActiveWalletIcon from './assets/active_wallet.svg';
import AccountIcon from './assets/account.svg';
import ActiveAccountIcon from './assets/active_account.svg';
// import MoreIcon from './assets/more.svg';
// import ActiveMoreIcon from './assets/more.svg';
import ActiveHelpIcon from './assets/help.svg';
import HelpIcon from './assets/nav_help.svg';
// import TransactionIcon from './assets/receipt.svg';
// import ActiveTransactionIcon from './assets/receipt.svg';
// import { ReactComponent as DebitCardIcon } from './assets/debit_card.svg';
// import { ReactComponent as PerformanceIcon } from './assets/performance.svg';
//import { ReactComponent as HelpIcon } from './assets/nav_help.svg';
import { ReactComponent as SettingsIcon } from './assets/settings.svg';

const NavigationWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: white;
    box-shadow: 0 1px 10px 0 #dddddd, 0 4px 5px 0 #23000000, 0 2px 4px -1px #33000000;
    width: 100%;
`;

const NavigationBar = styled.nav`
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    max-height: 56px;
`;

const Navigation = ({
    resetOfflineStatus
}) => {
    const [open, setOpen] = useState(false);
    const route = useLocation();
    const role       = useSelector(state => state.user.role);
    // const wasOffline = useSelector(state => state.offline.wasOffline);
    // const isOffline  = useSelector(state => state.offline.isOffline);

    const popupOptions = 
        (role === "ROLE_AGENT") ? [
        // {
        //     Icon: PerformanceIcon,
        //     title: "Performance",
        //     link: "/user/performance"
        // },
        // {
        //     Icon: DebitCardIcon,
        //     title: "Debit Cards",
        //     link: "/user/wallet_cards_all"
        // },
        {
            Icon: SettingsIcon,
            title: "Settings",
            link: "/user/account_settings"
        },
        // {
        //     Icon: HelpIcon,
        //     title: "Help & Support",
        //     link: "/help"
        // }
    ] : [
        //     {
        //     Icon: DebitCardIcon,
        //     title: "Debit Cards",
        //     link: "/user/wallet_cards_all"
        // },
        {
            Icon: SettingsIcon,
            title: "Settings",
            link: "/user/account_settings"
        }
        // ,
        // {
        //     Icon: HelpIcon,
        //     title: "Help & Support",
        //     link: "/help"
        // }
        ]
    
    return (
        <Fragment>
            {/* <OfflineStripe
                wasOffline={wasOffline} 
                isOffline={isOffline} 
                resetOfflineStatus={resetOfflineStatus}
            /> */}
            <NavigationWrapper>
                <NavigationBar>
                    <NavigationElement 
                        link={"/"}
                        currentLink={route.pathname} 
                        activeIcon={ActiveDashboardIcon}
                        nonActiveIcon={DashboardIcon}
                        text={"Dashboard"}
                    />
                       <NavigationElement 
                        link={"/actions/transactions/index"}
                        currentLink={route.pathname}
                        activeIcon={ActiveTransactionIcon}
                        nonActiveIcon={ActiveTransactionIcon}
                        text={"Transactions"}
                    />
                    {/* <NavigationElement
                        activeIcon={ActiveTransactionIcon}
                        nonActiveIcon={TransactionIcon}
                        text={"Transactions"}
                        //clickState={open}
                        currentLink={route.pathname}
                        //onClick={() => setOpen(true)}
                        //link={"/user/account_referral"}
                    /> */}
                    {role === "ROLE_AGENT" && (
                        <NavigationElement
                            link={"/user/account_referral"}
                            currentLink={route.pathname}
                            activeIcon={ActiveReferralIcon}
                            nonActiveIcon={ReferralIcon}
                            text={"Referral"}
                        />
                    )}
                    <NavigationElement
                        link={"/help"}
                        currentLink={route.pathname} 
                        activeIcon={ActiveHelpIcon}
                        nonActiveIcon={HelpIcon}
                        text={"Help"}
                    />
                     {/* <NavigationElement
                        activeIcon={ActiveMoreIcon}
                        nonActiveIcon={MoreIcon}
                        text={"More"}
                        clickState={open}
                        currentLink={route.pathname}
                        onClick={() => setOpen(true)}
                    /> */}
                    <NavigationElement
                        activeIcon={ActiveAccountIcon}
                        nonActiveIcon={AccountIcon}
                        text={"Account"}
                        clickState={open}
                        currentLink={route.pathname}
                        onClick={() => setOpen(true)}
                    />
                </NavigationBar>
            </NavigationWrapper>
            <OptionsPopupDialog 
                open={open}
                arrows={true}
                title={"Options"}
                cancel={() => setOpen(!open)}
                items={popupOptions}
            />
        </Fragment>
    );
};

export default connect(
    null,
    { resetOfflineStatus }
)(Navigation);
