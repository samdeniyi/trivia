import React, { Fragment, useState } from "react";
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import styled from "styled-components";
import { colors } from "../../../../styles";

import AgentGroupIcon from "../../../../assets/agent_group.svg";
import { ReactComponent as Info } from "../../../../assets/info.svg";
import { ReactComponent as SpacesIcon } from "../../../../assets/spaces_icon.svg";
import { ReactComponent as CircleIcon } from "./assets/circle.svg";
import { ReactComponent as CancelSVG } from "./assets/cancel.svg";
import { upgradeMerchantToAgent } from '../../../../redux/ducks/auth/signup/agent/actions';

import {
    Loader,
    TopHeader,
    PageProgress,
    PageLogo,
    RippleButton,
    IntroductionPopup,
    AgentNetworkPopupDialog
} from "../../../../components";
import { ScreenContainer } from "../../../../containers/ScreenContainer";
import { Message } from "../../../../containers/MessageContainer";

import TermsInfoOverlay from './termsInfoOverlay'

const InfoIcon = styled(Info)`
    position: absolute;
    margin-left: 7px;
`;

const SmallInfoIcon = styled(Info)`
    width: 10px;
    position: absolute;
    top: 6px;
`;

const Text = styled.div`
    color: ${colors.blue};
    font-size: 10px;
    margin: 10px 0;
    margin-left: 15px;
`;
const Block = styled.div`
    position: relative;
    display: inline-block
`;

const GroupDescBox = styled.div`
    width: 156px;
    height: 89px;
    background-color: #91d4ff20;
    radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const CancelIcon = styled(CancelSVG)`
    position: absolute;
    top: -10px;
    right: -5px
`;


const GroupDescBoxContainer = styled.div`
`;

const GroupDescBoxIcon = styled(SpacesIcon)`
    width: 32px;
    height: 32px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    display: block;
    cursor; pointer;
`;

const GroupDescBoxTitle = styled.div`
    font-size: 12px;
    font-weight: 400;
    text-align: center
`;

const UMAgentGroup = ({
    isLoading,
    upgradeMerchantToAgent
}) => {
    const [spaceForcePopup, setSpaceForcePopup] = useState(false);
    const [primaryNetworkPopup, setPrimaryNetworkPopup] = useState(false);
    const [primaryNetwork] = useState(true);
    const [termsPopup, setTermsPopup] = useState(false);
    // const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [openOverlay, setOpenOverlay] = useState(false);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Agent Network Selection"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={AgentGroupIcon} />
                <PageProgress step={4} amount={4}></PageProgress>
                <Message bottom={"16px"} align={"left"}>
                    Primary network 
                    <InfoIcon  
                        onClick={()=> 
                            setPrimaryNetworkPopup(!primaryNetworkPopup)
                        }
                    />
                </Message>
                <Block>
                    {primaryNetwork && <CancelIcon />}
                    <GroupDescBox 
                        // onClick={()=> {
                        //  setPrimaryNetwork(!primaryNetwork)
                        //     if(!primaryNetwork) {
                        //         setTermsPopup(!termsPopup)
                        //     }
                        // }}
                 >
                    <GroupDescBoxContainer>
                        <GroupDescBoxIcon/>
                        <GroupDescBoxTitle>Space Force</GroupDescBoxTitle>
                    </GroupDescBoxContainer>
                </GroupDescBox>
                <Block onClick={()=> setSpaceForcePopup(!spaceForcePopup)}>
                    <SmallInfoIcon />
                    <Text>See information</Text>
                </Block>
                </Block>
                <RippleButton
                    type="submit"
                    onClick={() =>  setTermsPopup(true)} 
                >
                    Continue
                </RippleButton>

            </ScreenContainer>
            
            <IntroductionPopup
                open={spaceForcePopup}
                cancel={() => setSpaceForcePopup(!spaceForcePopup)}
                title={"Space Force"}
                Logo={SpacesIcon}
                logoSpacing={"30px"}
                message={
                    "SpaceForce is a team of exceptional sales agents  who help onboard new merchants onto the Spaces Super App while enabling the use of its services."
                }
            />
            <IntroductionPopup
                open={primaryNetworkPopup}
                cancel={() => setPrimaryNetworkPopup(!primaryNetworkPopup)}
                title={"Primary network"}
                Logo={CircleIcon}
                logoSpacing={"30px"}
                message={
                    "This is the primary network you belong to. Your Primary network is the network you signed up under."
               }
            />

            <AgentNetworkPopupDialog
                open={termsPopup}
                cancel={() => setTermsPopup(!termsPopup)}
                confirm ={() => {
                    //setAcceptedTerms(!acceptedTerms)
                    setTermsPopup(!termsPopup)
                    upgradeMerchantToAgent()
                }}
                setOpenInfo={setOpenOverlay}
                title={"Space Force"}
                desc={
                     "Continuing means you agree to the terms & conditions of the selected agent network(s)."
                }
            />
            <TermsInfoOverlay 
                setOpen={setOpenOverlay}
                open={openOverlay}
            />
        </Fragment>
    );
};

UMAgentGroup.propTypes = {
    isLoading:          bool,
    upgradeMerchantToAgent: func
};

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.signup.agent.isLoading
});

export default connect(
    mapStateToProps,
    { upgradeMerchantToAgent }
)(UMAgentGroup);
