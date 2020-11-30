import React, {Fragment, useState } from "react";
import {connect} from "react-redux";
import {func} from "prop-types";
import styled, {css} from "styled-components";
import {colors, fonts} from "../../../../styles";
import {
    saveUserRole,
    checkUserOnMerchapp
} from "../../../../redux/ducks/user/actions";
import {
    TopHeader,
    PageLogo,
    PageProgress,
    RippleButton,
    IntroductionPopup
} from "../../../../components";
import {Message} from "../../../../containers/MessageContainer";
import {ScreenContainer} from "../../../../containers/ScreenContainer";
import ChooseLogo from "./assets/choices.svg";
import {ReactComponent as ShopSVG} from "../../../../assets/shop.svg";
import {ReactComponent as AgentsSVG} from "../../../../assets/agents.svg";
import SelectedAnswer from "../../../../assets/selected_answer.svg";

const RoleBlock = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 24px 0;
`;

const PadBlock = styled.label`
    width: calc(50% - 8px);
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.background.component};
    font-family: ${fonts.main};
    color: ${colors.themeTextColor1};
    font-size: 14px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;

    &:hover {
        border: 1px solid ${colors.blue};
    }
    ${({selected}) =>
    selected &&
    css`
            border: 1px solid ${colors.blue};
            color: ${colors.blue};
        `}
`;

const PadRadio = styled.input`
    margin: 0;
    cursor: pointer;
    appearance: none;

    &:checked {
        &:after {
            content: url(${SelectedAnswer});
            position: absolute;
            top: 8px;
            right: 8px;
        }
    }
`;

const ChooseRole = ({checkUserOnMerchapp}) => {
    const [value, setValue] = useState("");
    const [merchantPopup, setMerchantPopup] = useState(false);
    const [agentPopup, setAgentPopup] = useState(false);
    const [confirmMerchant, setConfirmMerchant] = useState(false);
    const [confirmAgent, setConfirmAgent] = useState(false);

    return (
        <Fragment>
            <TopHeader title={"Account Type"} backLink={"/phone-signup"}/>
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={ChooseLogo}/>
                <PageProgress step={1} amount={4}/>
                <Message bottom={"16px"} align={"left"}>
                    Are you a merchant or an agent?
                </Message>
                <RoleBlock>
                    <PadBlock
                        selected={value === "user"}
                        onClick={() => {
                            setMerchantPopup(true);
                            setValue("user");
                        }}
                    >
                        Merchant
                        {value === "user" ? (
                            <PadRadio
                                defaultChecked={value === "user"}
                                type={"radio"}
                        />
                        ) : (
                            ""
                        )}
                    </PadBlock>

                    <PadBlock
                        selected={value === "agent"}
                        onClick={() => {
                            setAgentPopup(true);
                            setValue("agent");
                        }}
                    >
                        Agent
                        {value === "agent" ? (
                            <PadRadio
                                defaultChecked={false}
                                type={"radio"}
                            />
                        ) : (
                            ""
                        )}
                    </PadBlock>
                </RoleBlock>
                <RippleButton
                    type="submit"
                    top={"24px"}
                    disabled={!(confirmMerchant || confirmAgent)}
                    onClick={() => checkUserOnMerchapp(value)}
                >
                    Continue
                </RippleButton>
            </ScreenContainer>
            <IntroductionPopup
                open={merchantPopup}
                cancel={() => {
                    setMerchantPopup(!merchantPopup);
                    setConfirmMerchant(false);
                    setValue("");
                }}
                confirm={() => {
                    setConfirmMerchant(true);
                    setMerchantPopup(!merchantPopup);
                }}
                title={"Merchant"}
                Logo={ShopSVG}
                logoSpacing={"30px"}
                withConfirmation={true}
                message={
                    "Sign up as a merchant and get access to tools that help you manage your shop and your products."
                }
            />
            <IntroductionPopup
                open={agentPopup}
                cancel={() => {
                    setAgentPopup(!agentPopup);
                    setConfirmAgent(false);
                    setValue("");
                }}
                confirm={() => {
                    setConfirmAgent(true);
                    setAgentPopup(!agentPopup);
                }}
                title={"Agent"}
                Logo={AgentsSVG}
                logoSpacing={"30px"}
                withConfirmation={true}
                message={
                    "As an agent, you help bring on merchants and facilitate distribution for products across the spaces network."
                }
            />
        </Fragment>
    );
};

ChooseRole.propTypes = {
    checkUserOnMerchapp: func
};

export default connect(null, {
    saveUserRole,
    checkUserOnMerchapp
})(ChooseRole);
