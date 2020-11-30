import React, {Fragment} from 'react';
import styled, {css} from 'styled-components';
import {connect} from 'react-redux';
import {array} from 'prop-types';
import {colors} from '../../../styles';
import {toggleSeen} from '../../../redux/ducks/account/notifications/actions';
import {formatCreationDate} from '../../../utils/date/formatCreationDate';

import {CenteredBlock} from '../../../containers/ScreenContainer';
import {PageLogo, TopHeader} from '../../../components';
import {Title, SecondaryText} from '../../../containers/MessageContainer';
import {
    List,
    ListItem,
    ListHeading,
    //ListSubHeading,
    ListLeftBlock,
    ListSubDetail
} from '../../../containers/ListContainer';
import NotificationsEmptyIcon from './assets/notifications_empty.svg';
import {ReactComponent as CommissionIcon} from './assets/commission_payout.svg';
import {ReactComponent as TransactionIcon} from './assets/transaction.svg';
import {ReactComponent as BonusIcon} from './assets/bonus_payout.svg';
import {ReactComponent as PromotionIcon} from './assets/promotion.svg';
import {ReactComponent as WalletCreditIcon} from './assets/wallet_credit.svg';

const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Notification = styled(ListItem)`
    & > svg {
        min-width: 32px;
        min-height: 32px;
    }

    ${({ seen }) => (seen === "UNREAD") && css`
        &::after {
            content: '●';
            color: ${colors.blue};
            position: absolute;
            top: 12px;
            right: 21px;
        }
    `}
`;

const ListSubHeading = styled(SecondaryText)`
    display: inline;
    font-weight: 100;
    height: fit-content;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: ${({ top }) => top ? `${top} 0 0 0` : '4px 0 0 0'};
`;

const NotificationType = ({ type }) => {
    switch (type) {
        case "MERCHANT_ONBOARD": {
            return <CommissionIcon />;
        }

        case "AGENT_ONBOARD": {
            return <CommissionIcon />;
        }

        case "TRANSACTION": {
            return <TransactionIcon />;
        }

        case "WALLET_DEBIT": {
            return <TransactionIcon />;
        }

        case "WALLET_CREDIT": {
            return <WalletCreditIcon />;
        }

        case "BONUS": {
            return <BonusIcon />;
        }

        case "PROMOTION": {
            return <PromotionIcon />;
        }

        case "SIGN_UP": {
            return <PromotionIcon />;
        }

        case "WEEKLY_SALES_REPORT": {
            return <PromotionIcon />
        }

        case "REFERRAL_SIGN_UP": {
            return <PromotionIcon />
        }

        case "STATUS_OF_AGENCY_BANKING_APPLICATION_CHANGED": {
            return <PromotionIcon />
        }

        default: {
            return <PromotionIcon />;
        }
    };
};

const mapNotificationName = type => {
    switch (type) {
        case "AGENT_ONBOARD": {
            return "Agent Onboarding";
        }

        case "MERCHANT_ONBOARD": {
            return "Merchant Onboarding";
        }

        case "BONUS": {
            return "Bonus";
        }

        case "WALLET_CREDIT": {
            return "Top-Up Balance"
        }

        case "WALLET_DEBIT": {
            return "Money Transfer"
        }

        case "SIGN_UP": {
            return "Welcome to Spaces";
        }

        case "WEEKLY_SALES_REPORT": {
            return "Weekly Sales Report"
        }

        case "REFERRAL_SIGN_UP": {
            return "My Referral"
        }

        case "STATUS_OF_AGENCY_BANKING_APPLICATION_CHANGED": {
            return "Agency Banking"
        }

        default: {
            return null;
        }
    };
}

const Notifications = ({
    notifications,
    toggleSeen
}) => {
    return (
        <Fragment>
            <TopHeader title={"Notifications"} />
            {(notifications && notifications.length === 0) ? (
                <CenteredBlock>
                    <PageLogo
                        Icon={NotificationsEmptyIcon}
                        width={"184px"}
                        height={"184px"}
                        iconHeight={"auto"}
                        iconWidth={"auto"}
                        margin={"24px auto"}
                    />
                    <Title>No notifications yet</Title>
                </CenteredBlock>
            ) : (
                <NotificationContainer>
                    <List top={"63px"}>
                        {notifications && notifications.map((notification, index) => {
                            const {state, id, type, payload: {description}, createdAt} = notification;
                            let textEl = <ListSubHeading>{description}</ListSubHeading>;
                            if (type === "WEEKLY_SALES_REPORT") {
                                const bodyIndex = description.indexOf("Body");
                                const title = description.slice(6, bodyIndex);
                                const body = description.slice(bodyIndex + 4);
                                textEl = <>
                                    <ListSubHeading>
                                        {title}
                                    </ListSubHeading>
                                    <ListSubHeading>
                                        {body}
                                    </ListSubHeading>
                                </>
                            };

                            return <Notification
                                bottom={"8px"}
                                key={index}
                                onClick={() => toggleSeen(state, id)}
                                seen={state}
                            >
                                <NotificationType type={type}/>
                                <ListLeftBlock>
                                    <ListHeading>
                                        {mapNotificationName(type)}
                                    </ListHeading>
                                    {textEl}
                                    <ListSubDetail>{formatCreationDate(createdAt)}</ListSubDetail>
                                </ListLeftBlock>
                            </Notification>
                        })}
                    </List>
                </NotificationContainer>
            )}
        </Fragment>
    );
};

Notifications.propTypes = {
    notifications: array
};

const mapStateToProps = ({ account }) => ({
    notifications: account.notifications.allNotifications
});

export default connect(
    mapStateToProps,
    { toggleSeen }
)(Notifications);