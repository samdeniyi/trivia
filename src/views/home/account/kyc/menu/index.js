import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

import { TopHeader, RippleLink } from '../../../../../components';
import { 
    MenuOptions, 
    MenuOption, 
    MenuOptionLogo, 
    OptionName, 
    ArrowForward
} from '../../../../../containers/MenuContainer';
import MeansOfIDIcon from './assets/means_of_id.svg';
import GlobeIcon from './assets/world.svg';
// import AddressIcon from './assets/pin.svg';
import { VerificationStatus } from '../../../../../components/verification-status';
import { useSelector, connect } from 'react-redux';
import { FlexStartBlock } from '../../../../../containers/ScreenContainer';
import { getRejectedReasons } from '../../../../../redux/ducks/user/actions';
// import { Message } from '../../../../../containers/MessageContainer';
// import { colors } from '../../../../../styles';
import { getAgentActivationStatus } from "../../../../../redux/ducks/applications/agents/actions";

const KycContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const KYCPage = ({ 
    getRejectedReasons, 
    getAgentActivationStatus,
}) => {
    const userId = useSelector(state => state.user.userId);
    const agentState = useSelector(state => state.user.agentState ? state.user.agentState : "PENDING")

    useEffect(() => {
        getAgentActivationStatus();
    }, [getAgentActivationStatus]);

    useEffect(() => {
        if(agentState !== 'APPROVED') {
            getRejectedReasons(userId);
        } 
    }, [agentState, getRejectedReasons, userId]);

    return (
        <Fragment>
            <TopHeader title={"KYC"} />
            <KycContainer>
                <MenuOptions style={{ marginTop: "64px" }}>
                    <RippleLink to="/user/account_kyc_region">
                        <MenuOption>
                            <MenuOptionLogo icon={GlobeIcon} />
                            <FlexStartBlock>
                                <OptionName>Region Selection</OptionName>
                            </FlexStartBlock>
                            <ArrowForward />
                        </MenuOption>
                    </RippleLink>
                    <RippleLink to="/user/account_kyc_means">
                        <MenuOption>
                            <MenuOptionLogo icon={MeansOfIDIcon} />
                            <FlexStartBlock>
                                <OptionName>Means of Identification</OptionName>
                                <VerificationStatus status={agentState} />
                            </FlexStartBlock>
                            <ArrowForward />
                        </MenuOption>
                    </RippleLink>    
                    {/* <RippleLink to="/user/account_kyc_address">
                        <MenuOption>
                            <MenuOptionLogo icon={AddressIcon} />
                            <OptionName>Address</OptionName>
                            <ArrowForward />
                        </MenuOption>
                    </RippleLink> */}   
                </MenuOptions>
            </KycContainer>
        </Fragment>
    );
};

export default connect(null, { getRejectedReasons, getAgentActivationStatus })(KYCPage);