import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { switchWalletUsageMode } from '../../../../../redux/ducks/account/wallet/actions';

import { TopHeader, RippleLink } from '../../../../../components';
import { 
    MenuOptions, 
    MenuOption, 
    MenuOptionLogo, 
    OptionName, 
    ArrowForward
} from '../../../../../containers/MenuContainer';
import DebitCardIcon from './assets/debit_card.svg';
import BankAccountIcon from './assets/bank_account.svg';
// import USSDIcon from './assets/ussd.svg';
// import BankAppIcon from './assets/bank_app.svg';
import { Message } from '../../../../../containers/MessageContainer';

const ChoosePaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChoosePayment = ({
    switchWalletUsageMode
}) => {
    return (
        <Fragment>
            <TopHeader title={"Payment method"} />
            <ChoosePaymentContainer>
                <Message align={"left"} top={"80px"} bottom={"24px"} padding={"0 16px"}>
                    Select a payment method to complete the transaction
                </Message>
                <MenuOptions withTitle={true}>
                    <MenuOption>
                        <RippleLink 
                            to="/user/wallet_cards_all" 
                            onClick={() => switchWalletUsageMode('payment')}
                        >
                            <MenuOptionLogo icon={DebitCardIcon} />
                            <OptionName>Debit Card</OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption>
                    <MenuOption>
                        <RippleLink 
                            to="/user/wallet_withdrawal_settings"
                            onClick={() => switchWalletUsageMode('payment')}
                        >
                            <MenuOptionLogo icon={BankAccountIcon} />
                            <OptionName>Bank Account</OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption>
                    {/* <MenuOption>
                        <RippleLink to="/user/wallet_ussd">
                            <MenuOptionLogo icon={USSDIcon} />
                            <OptionName>USSD</OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption> */}
                    {/* <MenuOption>
                        <RippleLink to="/user/wallet_bank_app">
                            <MenuOptionLogo icon={BankAppIcon} />
                            <OptionName>Bank App</OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption> */}
                </MenuOptions>
            </ChoosePaymentContainer>
        </Fragment>
    );
};

export default connect(
    null, 
    { switchWalletUsageMode }
)(ChoosePayment);