import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { switchWalletUsageMode } from '../../../../redux/ducks/account/wallet/actions';
import { colors } from '../../../../styles';
import { TopHeader, RippleLink } from '../../../../components';
import { 
    MenuOptions, 
    MenuOption, 
    MenuOptionLogo, 
    OptionName, 
    ArrowForward
} from '../../../../containers/MenuContainer';
import BankAccountIcon from './assets/bank_account.svg';
import UserIcon from './assets/person.svg';
import { Message, SecondaryText } from '../../../../containers/MessageContainer';
import { prepareToTransferMoney, getBeneficiaries } from '../../../../redux/ducks/account/wallet/actions/bank-account/index';

const ChoosePaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BeneficiariesHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
`;

const BeneficiaryName = styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 14px;
    color: ${colors.themeTextColor1};
`;

const BeneficiaryNumber = styled.p`
    margin: 0;
    font-size: 10px;
`;

const Name = styled(SecondaryText)`
    margin: 0;
    padding: 16px;
    color: ${colors.themeTextColor1};
    font-size: 14px;
`;

const PageSeeAll = styled(RippleLink)`
    font-size: 12px;
    font-weight: 500;
    color: ${colors.blue};
    margin-right: 15px;
`;

const SelectDestination = ({
    switchWalletUsageMode,
    prepareToTransferMoney,
    getBeneficiaries,
}) => {
    const beneficiaries = useSelector(state => state.account.wallet.beneficiaries);

    useEffect(() => {
        getBeneficiaries();
    }, [getBeneficiaries]);

    return (
        <Fragment>
            <TopHeader title={"Transfer destination"} />
            <ChoosePaymentContainer>
                <Message align={"left"} top={"80px"} bottom={"24px"} padding={"0 16px"}>
                    Select where you like the money to go to 
                </Message>
                <MenuOptions withTitle={true}>
                    <MenuOption>
                        <RippleLink 
                            to="/actions/spaces_wallets" 
                            onClick={() => switchWalletUsageMode('payment')}
                        >
                            <MenuOptionLogo icon={UserIcon} />
                            <OptionName>Spaces User’s Wallet</OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption>
                    <MenuOption>
                        <RippleLink 
                            to="/actions/send_money_bank"
                            onClick={() => switchWalletUsageMode('payment')}
                        >
                            <MenuOptionLogo icon={BankAccountIcon} />
                            <OptionName>Bank Account</OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption>
                </MenuOptions>
                <BeneficiariesHeader>
                    <Name>Beneficiaries</Name>
                    <PageSeeAll to={{ pathname: "/actions/beneficiaries" }}>
                        See All
                    </PageSeeAll>
                </BeneficiariesHeader>
                {beneficiaries && beneficiaries.map((person, index) =>(
                    <MenuOption key={index}>
                        <RippleLink 
                            to="/actions/send_money_bank"
                            onClick={() => prepareToTransferMoney(person)}
                        >
                            <MenuOptionLogo icon={UserIcon} />
                            <OptionName>
                                <BeneficiaryName>{person.full_name}</BeneficiaryName>
                                <BeneficiaryNumber>{person.account_number}</BeneficiaryNumber>
                            </OptionName>
                            <ArrowForward />
                        </RippleLink>
                    </MenuOption>
                ))}
            </ChoosePaymentContainer>
        </Fragment>
    );
};

SelectDestination.propTypes = {
    switchWalletUsageMode: func,
};

export default connect(
    null, 
    { switchWalletUsageMode, prepareToTransferMoney, getBeneficiaries }
)(SelectDestination);