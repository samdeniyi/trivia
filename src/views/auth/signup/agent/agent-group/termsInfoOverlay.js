import React from "react";
import styled from "styled-components";

import { TopHeader } from "../../../../../components";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { Close } from "../../../../../containers/HeaderContainer";
import { colors } from "../../../../../styles";
import { ReactComponent as SpacesSVG } from "../../../../../assets/spaces_icon.svg";
import { Message, SubTitle } from "../../../../../containers/MessageContainer";

const Modal = styled.div`
    position: fixed; 
    z-index: 5000000; 
    padding: 50px 0;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: white
`;

const Block = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
`;

const SpacesIcon = styled(SpacesSVG)`
    height: 24px;
    weight: 24px;
`;

const Logo = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${colors.background.logo};
    overflow: hidden;
`;

const LogoImage = styled.div`
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TermsInfoOverlay = ({ open, setOpen }) => {
    return (
        open && (
            <Modal>
                <TopHeader title={"Terms & Conditions"} noArrow>
                    <Close
                        left={"true"}
                        onClick={() => {
                            setOpen(!open);
                        }}
                    />
                </TopHeader>

                <ScreenContainer>
                    <Block>
                        <Logo>
                            <LogoImage>
                                <SpacesIcon />
                            </LogoImage>
                        </Logo>
                    </Block>
                    <Message>
                    Rensource Energy, a company registered under the laws of the Federal Republic of Nigeria and having its principal office at 3b Tiamiyu Savage, off Amadu Bello Road, Victoria Island, Lagos, Nigeria (hereinafter referred to as “The Company”). 
and Name as registered above in the Agent Agreement form. 
(hereinafter “Consultant”), 
(individually the “Party” and collectively the “Parties”) have entered into the following agreement (the “Agreement”)
                    </Message>
                    <SubTitle textAlign="left" top="30px">Article 1: Services</SubTitle>
                    <Message>(1) The Parties mutually agree that the Consultant shall provide sales services to the Company, and the Consultant shall earn fees which shall be a basic and incentive on all his/her sales made on behalf of the Company.</Message>
                    <SubTitle textAlign="left" top="30px">Article 2: Duties of Consultant</SubTitle>
                    <Message>(2) The Consultant agrees:</Message>
                    <Message>(a) To promote and sell the products contained on the Spaces Super App as directed by the Company.</Message>
                    <Message>(b) To maintain the highest standards of integrity, honesty, and responsibility in dealings with the Company, Consumers and other sales consultants. To represent the products being offered on the Spaces Super App in a truthful and sincere manner and hold the Company harmless from damages resulting from misrepresentations by the Consultant.</Message>
                    <Message>(c) To perform the Services with due diligence and in a safe and competent manner;</Message>
                    <Message>(d) To acquaint himself/herself and comply with any practices, rules, or procedures put in place by the Company.</Message>
                    <Message>(e) To comply with all applicable laws;</Message>
                    <Message>(f) To act in, and use his/her best endeavors to promote and protect, the interests of the Company in accordance with the general policy of the Company;</Message>
                    <Message>(g) To comply with all reasonable instructions given by the Company;</Message>
                    <Message>(h) To give to the Company such information regarding the provision of Services or obtained by him/her in the course of performing the Services as the Company may require.</Message>
                    <Message>(i) To attend trainings and meetings at the Company office on a weekly basis or as may be required by the Company from time to time.</Message>
                    <Message>(j) To protect the Company’s trademarks and trade-name by obtaining the Company’s written permission prior to the Consultant’s use in any advertising or literature other than the Company’s published material.</Message>
                    <Message>(k) Not to undertake any form of advertisement on behalf of the Company without first obtaining the written permission of the Company.</Message>
                    <Message>(3) The Consultant shall immediately disclose any conflict of interest to the Company, which arises in relation to the provision of the Services as a result of any present or future appointment, employment, or other interest of the Consultant.</Message>
                    <SubTitle textAlign="left" top="30px">Article 3: Independent Contractor.</SubTitle>
                    <Message>(4) The parties are independent contractors to each other. Nothing in this Agreement shall constitute a partnership, joint venture, agency, or an employee-employer relationship between the parties.</Message>
                    <SubTitle textAlign="left" top="30px">Article 4: Duration and Termination</SubTitle>
                    <Message>(5) The Consultant will begin to provide the Services on (insert date) (“the Commencement Date”) and this Agreement will continue perpetually until terminated in accordance with the provisions of this Article 4.</Message>
                    <Message>(6) Either party may terminate this Agreement at any time by giving notification notice in writing.</Message>
                    <Message>(7) Notwithstanding the provisions of this Article 4, the Company may terminate this Agreement immediately by summary notice in writing and without any further liability if the Consultant:</Message>
                    <Message>(a) commits any material or continued or repeated breach of this Agreement, or is convicted of any criminal offense; or</Message>
                    <Message>(b) adversely prejudices or does or fails to do anything which in the reasonable opinion of the Company is likely to prejudice adversely the interests or reputation of the Company.</Message>
                    <SubTitle textAlign="left" top="30px">Article 5: Tax</SubTitle>
                    <Message>(8) The Company shall make withholding tax deductions of 5% on payments of consulting fees to the Consultant.</Message>
                    <SubTitle textAlign="left" top="30px">Article 6: Duty of Confidentiality</SubTitle>
                    <Message>(9) The Consultant agrees to keep confidential all information relating to business and trade secrets and operational matters of confidential nature which are specified as such in writing or orally or by their nature identifiable as such and agrees that he/she will not directly or indirectly use or disclose such information or permit it to be disclosed either directly or indirectly to or by any third party unless required by law or authorized by the Company. This duty of confidentiality shall also extend to internal business matters and/or business and trade secrets of Group Companies and to customers and contract partners of the Company, Group Companies, or companies with which the Company is otherwise associated financially or organisationally.</Message>
                    <Message>(10) This clause shall continue to apply after the termination of this agreement (whether terminated lawfully or not) without limit of time.</Message>
                    <SubTitle textAlign="left" top="30px">Article 7: Fees</SubTitle>
                    <Message>(11) The Consultant shall earn a basic salary and incentive in accordance with Appendix 1 to this Agreement.</Message>
                    <SubTitle textAlign="left" top="30px">Article 8: Final Terms/Miscellaneous</SubTitle>
                    <Message>(12) This Agreement constitutes the entire agreement between the parties and supersedes any previous agreement between them (which will be deemed to have been terminated by mutual consent). Any variation of this Agreement shall be made in writing and signed by or on behalf of the parties.</Message>
                    <Message>(13) This Agreement shall be governed by and construed in accordance with the Laws of the Federal Republic of Nigeria and each of the parties agrees to submit to the exclusive jurisdiction of the Nigerian courts as regards any claim or matter arising under this Agreement.</Message>
                    <Message>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.</Message>
                </ScreenContainer>
            </Modal>
        )
    );
};

export default TermsInfoOverlay;