import React from "react";
import styled from "styled-components";

import { TopHeader, RippleButton } from "../../../../components";
import { ScreenContainer } from "../../../../containers/ScreenContainer";
import { Close } from "../../../../containers/HeaderContainer";
import { colors } from "../../../../styles";
import { ReactComponent as SpacesSVG } from "../../../../assets/spaces_icon.svg";
import { Message, SubTitle } from "../../../../containers/MessageContainer";
import { ActionBlock } from "../../../../containers/OverlayContainer";

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

const TermsInfoOverlay = ({ open, cancel, confirm }) => {
    return (
        open && (
            <Modal>
                <TopHeader title={"Terms & Conditions"} noArrow>
                    <Close
                        left={"true"}
                        onClick={cancel}
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
                    <Message>TERMS OF AGENCY AGREEMENT</Message>
                   
                    <SubTitle textAlign="left" top="30px">1. APPOINTMENT</SubTitle>
                    <Message>1.1  Upon signing this Agreement, TRANSBILL SOLUTIONS LIMITED appoints the Agent, and the Agent agrees to render Agent Banking Services as outlined in this Agreement.</Message>
                    <Message>1.2  This Agreement shall commence when signed and shall continue to be in force until terminated in accordance with terms and provisions of this Agreement.</Message>
                    <SubTitle textAlign="left" top="30px">2. ROLES OF THE AGENT</SubTitle>
                    <Message>The Agent shall:</Message>
                    <Message>2.1 Be available to undergo training and accreditation as determined by TRANSBILL SOLUTIONS LIMITED.</Message>
                    <Message>2.2 Not set any minimum transaction value for the Services or the Scope of Services performed by his/her/it except as authorized under the terms of this Agreement.</Message>
                    <Message>2.3 Always render Services at the Service premises approved by TRANSBILL SOLUTIONS LIMITED. Agent shall not relocate or close its agent location without prior written notice to TRANSBILL SOLUTIONS LIMITED.</Message>
                    <Message>2.4 Not to withhold a Customer’s transaction reference details following the completion of a transaction for any reason.</Message>
                    <Message>2.5 Not to charge the Customer any additional fee beyond TRANSBILL SOLUTIONS LIMITED stipulated fees.</Message>
                    <Message>2.6 Not to operate or carry out any transaction when there is communication failure with TRANSBILL SOLUTIONS LIMITED or where a receipt or acknowledgement cannot be generated.</Message>
                    <Message>2.7 Shall not give any guarantee for loans and other obligations to customer or third party.</Message>
                    <Message>2.8 Not to undertake cheque deposit and encashment of cheques.</Message>
                    <Message>2.9 Not to provide cash advance or engage in foreign currency transactions.</Message>
                    <Message>2.10 Not to brand its premises in such a manner as to suggest that it is a bank or other financial institution.</Message>
                    <Message>2.11 Not to request for Customer’s secret Personal Identification Number (PIN), balances or any other confidential information of the customer.</Message>
                    <Message>2.12 To be highly confidential in all matters that come to his/her/its knowledge or possession by virtue of his/her/its position as an Agent.</Message>
                    <Message>2.13 Acceptance of cash payment for Transactions shall only be in naira and kobo.</Message>
                    <Message>2.14 Shall comply with the process pertaining to transactions and shall not conclude the transaction unless the fully required amount and Fee has been duly received.</Message>
                    <Message>2.15 Produce all records within 7 (seven) business days of receipt of request.</Message>
                    <Message>2.16 Keep and maintain financial records of all transactions processed for a period of at least 7(seven) years following the date of each transaction.</Message>
                    <Message>2.17 Display openly the name and logo of TRANSBILL SOLUTIONS LIMITED; the services offered; a notice to the effect that that the services shall be provided subject to availability of funds; transaction charges applicable to each service which  are  payable  by  Customers  and  the  telephone  lines  through  which  the Customers can contact the TRANSBILL SOLUTIONS LIMITED.</Message>
                    <Message>2.18 Be subject to the authority of the TRANSBILL SOLUTIONS LIMITED and the CBN always.</Message>
                    <Message>2.19 Do all that is expected under this Agreement with reasonable care, due diligence and skill.</Message>
                    <SubTitle textAlign="left" top="30px">3. ROLES OF THE TRANSBILL SOLUTIONS LIMITED</SubTitle>
                    <Message>shall:</Message>
                    <Message>3.1 Provide branding and marketing materials to Agents.</Message>
                    <Message>3.2 At its sole discretion, provide the Agent with training and documentation relating to the Agent Banking Services.</Message>
                    <Message>3.3 Provide the Agent with operational guidelines, manuals and/or risk management policy documents as shall be required for efficient rendering of Agent Banking Services.</Message>
                    <Message>3.4 Obtain and maintain such operational licenses from the CBN and other regulatory authorities as may be required from time to time to ensure smooth operations.</Message>
                    <Message>3.5 Pay the Agent all agreed fees and commissions based on the monetary value and volume of agent Banking Services rendered by the Agent to Customers. The commission shall be payable to the Agent’s Account with TRANSBILL SOLUTIONS partner Bank. The basis of computation may change from time to time in line with the dictates of business and market conditions; however, any change to the agreed commission will be communicated to Agent.</Message>
                    <Message>3.6 Periodically set the business and performance targets to be met by Agents.</Message>
                    <Message>3.7 Follow CBN guidelines in carrying out its duties under this Agreement.</Message>

                    <SubTitle textAlign="left" top="30px">4. GENERAL PROVISIONS</SubTitle>
                    <Message>4.1 Relationship</Message>
                    <Message>The Agent acknowledges that it is a contractor and not an employee of TRANSBILL SOLUTIONS LIMITED and shall have no authority to enter into agreements binding on TRANSBILL SOOLUTIONS LIMITED in any manner.</Message>
                    <Message>4.2 Expenses</Message>
                    <Message>All expenses incurred by the Agent under this Agreement shall be for the Agent’s exclusive account, unless otherwise specified by TRANSBILL SOLUTIONS LIMITED in writing.</Message>
                    <Message>4.3 Liability</Message>
                    <Message>TRANSBILL SOLUTIONS LIMITED shall not be liable to the Agent for any loss or damage, including without limitation, loss of profit, revenue, anticipated savings, business transactions, goodwill or other contracts howsoever arising.</Message>
                    <Message>4.4 Termination</Message>
                    <Message>This Agreement may be terminated by TRANSBILL SOLUTIONS LIMITED where:</Message>
                    <Message>4.4.1 Agent commits a breach of any provision of this Agreement and fails to remedy such breach within 30 (thirty) days;</Message>
                    <Message>4.4.2 Agent does meet performance targets as stipulated;</Message>
                    <Message>4.4.3 Any document, information, representation and data provided on the basis of which this Agreement has been entered into is found to be incorrect, misleading or false; or</Message>
                    <Message>4.4.4 TRANSBILL SOLUTIONS LIMITED has any reason to believe that the Agent or anyone acting on his/her/its behalf is engaged in fraudulent practices; or</Message>
                    <Message>4.4.5 The Agent or any of its personnel/representative is guilty of misconduct or willful neglect in the discharge of its duties under this Agreement; or</Message>
                    <Message>4.4.6 The Agent is guilty of any act which brings TRANSBILL SOLUTIONS LIMITED into disrepute or which in TRANSBILL SOLUTIONS LIMITED’s opinion is prejudicial to TRANSBILL SOLUTIONS LIMITED’s interest.</Message>
                    <Message>4.5 Governing Law and Dispute Resolution</Message>
                    <Message>4.5.1 This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria</Message>
                    <Message>4.5.2 Any dispute, or conflict arising out of or in connection with this Agreement shall be amicably resolved between the parties within a period of ten (10) business days. Failing Agreement, it shall be referred to arbitration by a sole arbitrator, appointed by the consensus of the Parties hereto or failing such consensus, by the Chairman of the Chartered Institute of Arbitration (UK) Nigeria branch. The arbitral proceedings shall be conducted in English in the place of arbitration shall be Lagos State and in accordance with the Arbitration and Conciliation Act Cap A18 Laws of the Federation of Nigeria 2004.</Message>
                    <Message>4.6 Assignment</Message>
                    <Message>The Agent shall not assign any rights and/or obligations arising out of this Agreement without the written permission of TRANSBILL SOLUTIONS LIMITED.</Message>
                    <Message>4.7 No Warranties</Message>
                    <Message>No statement, representation, warranty, covenant, indemnity, or agreement of any kind not expressly set forth in this Agreement will affect, or be used to interpret, change or restrict the express terms and provisions.</Message>

                    <SubTitle textAlign="left" top="30px">5. PERMISSIBLE AGENT BANKING SERVICES UNDER THIS AGREEMENT</SubTitle>
                    <Message>i. Account Opening</Message>
                    <Message>ii. Cash deposit and withdrawal.</Message>
                    <Message>iii. Bills payment (utilities, taxes, tenement rates, subscription etc.).</Message>
                    <Message>iv. Funds transfer services (local money value transfer). </Message>
                    <Message>v. Agent mobile payments</Message>
                    <Message>vi. Collection of TRANSBILL SOLUTIONS LIMITED mail/correspondence for customers.</Message>
                    <Message>vii. Any other activity as the CBN may from time to time prescribe.</Message>
                    <Message>viii. It shall be the responsibility of TRANSBILL SOLUTIONS LIMITED to determine, based on agent risk assessment, which services a particular agent may provide.</Message>

                    <SubTitle textAlign="left" top="30px">6. PROHIBITED ACTIVITIES UNDER THE AGENT BANKING SERVICES</SubTitle>
                    <Message>An Agent shall not:</Message>
                    <Message>i. Operate or carry out any transaction when there is communication failure with TRANSBILL SOLUTIONS LIMITED.</Message>
                    <Message>ii. Carryout a transaction where a receipt or acknowledgement cannot be generated.</Message>
                    <Message>iii. Charge Customers any fees except as prescribed by TRANSBILL SOLUTIONS LIMITED.</Message>
                    <Message>iv. Give any guarantee to Customers.</Message>
                    <Message>v. Offer any Agent Banking services on its own accord.</Message>
                    <Message>vi. Continue with the agency business when it has a proven criminal record involving fraud, dishonesty, integrity or any other financial impropriety.</Message>
                    <Message>vii. Provide, render or hold itself out to be providing or rendering any Agent Banking service which is not specifically permitted in this Agreement.</Message>
                    <Message>viii. Grant loans or carry out any appraisal function for the purpose of granting a loan or any other facility except as maybe permitted by any other written law to which the Agent is subject.</Message>
                    <Message>ix. Undertake cheque deposit and encashment of cheques.</Message>
                    <Message>x. Transact in foreign currency.</Message>
                    <Message>xi. Provide cash advances.</Message>
                    <Message>xii. Sub-contract another entity to carry out Agent Banking on its behalf except where there is a TRANSBILL SOLUTIONS LIMITED structure in place.</Message>
                    <Message>xiii. TRANSBILL SOLUTIONS LIMITED may, in the contract document, specify other activities, which the Agent is prohibited from undertaking.</Message>

                    <Message>I certify that I have read, understood and agreed to the terms and conditions of TRANSBILL SOLUTIONS LIMITED (Eazimoni) as stipulated above:</Message>

                    <Message>Name: .................................................................................................................</Message>
                    <Message>Address: .............................................................................................................</Message>
                    <Message>Signature: .........................................................................................................</Message>
                    <Message>Date: ..................................................................................................................</Message>
                    
                    <Message>For: TRANSBILL SOLUTIONS LIMITED (Eazimoni)</Message>
                    <Message>Name: ..........................................................................................................</Message>
                    <Message>Designation: ...............................................................................................</Message>
                    <Message>Signature: .........................................................................................................</Message>
                    <Message>Date: ..................................................................................................................</Message>
                
                    <ActionBlock direction={"row"} top={"10px"}>
                      <RippleButton style={{ margin: '10px' }}  onClick={cancel}>Cancel</RippleButton>
                      <RippleButton style={{ margin: '10px' }} onClick={confirm}>Confirm</RippleButton>
                    </ActionBlock>
                </ScreenContainer>
            </Modal>
        )
    );
};

export default TermsInfoOverlay;