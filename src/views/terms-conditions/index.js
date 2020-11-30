import React, { Fragment } from "react";

import { TopHeader } from "../../components";
import { ScreenContainer } from "../../containers/ScreenContainer";
import { Message, UnderlinedText, BoldText, SubTitle } from "../../containers/MessageContainer";
import { ListWithLetters, ListWithCounter } from "../../containers/ListContainer";

export const TermsAndConditions = () => {
    return (
        <Fragment>
            <TopHeader title={"Terms & Conditions"} />
            <ScreenContainer>
            <SubTitle textAlign="left" top="75px">
                PLEASE READ CAREFULLY IF YOU ARE A MERCHANT (if you are an agent, scroll to
                the next section)
            </SubTitle>
            <SubTitle textAlign="left" top="30px">1. MERCHANT AGREEMENT</SubTitle>
            <Message><BoldText>This Agreement</BoldText> is made</Message>
            <Message><BoldText>Between</BoldText></Message>
            <Message>
                <BoldText>Rensource Technology Inc. Limited</BoldText> a private limited liability company incorporated under
                the laws of the federal republic of Nigeria and having its registered office at 3B Tiamiyu Savage
                Street, Victoria Island, Lagos (hereinafter referred to as “Rensource” which expression shall
                where the context so admits include its successors-in-title and assigns, agents and
                representatives) of one part;
            </Message>
            <Message>
                <BoldText>And</BoldText>
            </Message>
            <Message>
                ______________________ of ___________________ hereinafter referred to as the
                “Merchant” which expression shall where the context so admits include [it/his/hers]
                successors-in-title, assigns, agents and representatives) of the other part.
            </Message>
            <Message>
                <BoldText>Rensource</BoldText> and the <BoldText>Merchant</BoldText> shall, wherever the context requires, be referred to individually
                as a “Party” or collectively as the “Parties”.
            </Message>
            <Message>
                <BoldText>Whereas</BoldText>
            </Message>
            <ListWithLetters>
                <li>
                    <Message top="10px">
                        Rensource is the owner of the app, Spaces which provides a suite of apps that helps
                        merchants in running their daily business activities. These apps include; merchapp,
                        merchbuy, merchlist web platform and the Spaces app. Spaces runs and operates a
                        platform that allows merchants to purchase from distributors over the internet and an
                        adapted partner logistics network.
                    </Message>
                </li>
                <li>
                    <Message top="10px">
                        The Merchant is engaged in the retail business and wishes to be integrated on the App
                        in order to use the app to manage business activities such as sales records, inventory
                        keeping, order management and many more activities.
                    </Message>
                </li>
                <li>
                    <Message top="10px">
                        The Parties now seek to execute this Agreement to provide broad terms, rights and
                        obligations of each party in their dealings with each other in relation to the foregoing
                        and warrant that they are eligible to enter and perform their obligations under this
                        Agreement. Except as agreed to by parties in writing or Force Majeure
                    </Message>
                </li>
                <li>
                    <Message top="10px">
                        All terms, provisions, and conditions including any modification, addition, removal,
                        alteration, reconstruction in the Terms & Conditions available on the Spaces app are
                        hereby incorporated into this Agreement with the same force and effect as though fully
                        set forth herein.
                    </Message>
                </li>
            </ListWithLetters>
            <Message>Now Parties agree as follows:</Message>
            <ListWithCounter>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>DEFINITIONS</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <Message top="0">
                                    Unless the context otherwise requires, the following words have the following
                                    meanings:
                                </Message>
                                <Message>
                                    <BoldText>“Agreement”</BoldText> means this Agreement including all Schedules attached thereto
                                    and the Guidelines on the Supply Centre;
                                </Message>
                                <Message>
                                    <BoldText>“App”</BoldText> means Spaces;
                                </Message>
                                <Message>
                                    <BoldText>“Business Day”</BoldText> means any day other than a Saturday or Sunday or public
                                    holiday on which banks are authorized or required to open in
                                    Nigeria;
                                </Message>
                                <Message>
                                    <BoldText>“Distributor”</BoldText> means people who supply products to Merchants;
                                </Message>
                                <Message>
                                    <BoldText>“Guidelines”</BoldText> means the supply centre guideline which governs the use of the
                                    App;
                                </Message>
                                <Message>
                                    <BoldText>“Merchants”</BoldText> means people who are listed on Merchlist and are integrated on
                                    the App to carry on trading services;
                                </Message>
                                <Message>
                                    <BoldText>“Merchlist”</BoldText> a Spaces product, web application, that helps provide visibility
                                    and expand the customer base of offline merchants
                                </Message>
                                <Message>
                                    <BoldText>“Product”</BoldText> means the products to be supplied by the distributors or means
                                    the items listed on the App or Merchlist to be sold by the
                                    Merchants
                                </Message>
                                <Message>
                                    <BoldText>“Supply Centre”</BoldText> means the dedicated internet website for which the access is
                                    provided by Rensource to the Merchant to buy from the
                                    Distributor;
                                </Message>
                                <Message>
                                    <BoldText>“Spaces”</BoldText> means the app developed and owned by Rensource which
                                    connects distributors to merchants. Spaces runs and operates
                                    a platform that allows merchants to purchase from distributors
                                    over the internet and an adapted partner logistics network;
                                </Message>
                                <Message>
                                    <BoldText>“Term”</BoldText> means the period which this Agreement is in force and in effect
                                    in accordance with its terms;
                                </Message>
                                <Message>
                                    <BoldText>“Terms and Conditions”</BoldText> means the Terms and Conditions for the use of the App and
                                    Merchlist which may be revised by Rensource from time to time;
                                </Message>
                                <Message>
                                    <BoldText>“Territory”</BoldText> means the Federal Republic of Nigeria
                                </Message>
                            </div>
                        </li>
                        <li>
                            <Message top="0">
                                Unless the context otherwise requires, words in the singular shall include the plural
                                and in the plural shall include the singular;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                A reference to a statute or statutory provision shall include any subordinate
                                legislation made from time to time under that statute or statutory provision;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                A reference to a statute or statutory provision is a reference to it [as it is in fore as
                                at the Effective Date or as may be amended or re-enacted from time to time];
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                A reference to writing includes fax and email;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Any words following the terms <BoldText>including, include, in particular, for example</BoldText> or
                                any similar expression shall be construed as illustrative and shall not limit the sense
                                of the words, description, definition, phrase or term preceding those terms.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>COMMENCEMENT AND TERM</SubTitle>
                    <Message left="35px">
                        Unless otherwise agreed by the Parties in writing, this Agreement shall commence on
                        the Effective Date and shall remain in force for a period of one year (“Initial Term”) and
                        shall automatically renew and extend for successive one year terms (each a “Renewal
                        Term”), commencing at the conclusion of the Initial Term or any Renewal Term, unless
                        terminated by either Party in accordance with clause 18.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>RELATIONSHIP OF PARTIES</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                The Parties are not by this Agreement deemed to be agents of each other nor shall
                                anything herein contained be construed as creating a partnership. It is agreed that
                                each Party will be responsible only for its obligations under this Agreement and
                                neither Party shall be authorised to represent or bind the other to third parties.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Parties shall be deemed independent contractors and will be fully responsible for
                                payment of its own taxes.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                <SubTitle textAlign="left" style={{display: 'inline'}}>EXISTING ARRANGEMENTS</SubTitle>
                    <Message left="35px">
                        Nothing in this Agreement shall restrict either Party’s right to continue to conduct its
                        business activities or arrangements that existed on or before the commencement of
                        this Agreement or that otherwise came into being outside the scope of this Agreement.
                        Provided that such conduct, activities, arrangement shall not amount to a breach of
                        this Agreement.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>OBLIGATIONS OF PARTIES</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                            <Message top="0">
                                OBLIGATIONS OF RENSOURCE
                            </Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        The Seller’s products shall be listed on Merchlist according to the terms and
                                        conditions mutually agreed upon by both parties.
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Integrate the Merchants with its electronic payment systems and payment platform
                                        towards providing seamless services;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Provide the Merchant with access to a secure portal or transaction dashboard to
                                        view logs of transactions processed on a real-time basis and to resolve any
                                        disputes;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Ensure ease of onboarding the Merchant on the App upon fulfilment of the preonboarding terms and conditions and work with the Merchant to implement all
                                        necessary integration procedures;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Ensure that the Merchants are trained upon integration on the App on how to utilize
                                        the services provided and have technical personnel at hand to resolve Merchant
                                        issues timely
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Ensure adequate security and promote industry compliant security standards of
                                        the App against all likely incidents of fraud. However, Rensource shall not be liable
                                        for any fraud or liabilities in relation to this Agreement;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Without prejudice to the rights of the Merchant, unlist and/or delete any Merchant
                                        from the App or Merchlist in breach of their obligations under this Agreement, the
                                        Terms and Conditions, or any codes, policies and guidelines
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Ensure the quality of the Services is consistent with Industry Standards; and
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Be responsible for the management, maintenance, and upgrade of the App
                                        technology
                                    </Message>
                                </li>
                            </ListWithCounter>
                            </div>
                        </li>
                        <Message>
                            Spaces makes no other representations or warranties, express or implied, that the
                            Services it has agreed to provide under this Agreement will result in profitability or assist
                            the Merchant or its customers meet any other projected or defined financial performance
                            criteria except as expressly contained in this Agreement.
                        </Message>
                        <li>
                        <div>
                            <Message top="0">
                                MERCHANT’S OBLIGATIONS
                            </Message>
                            <Message>The Merchant shall conduct its business:</Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        with skill and care, and by co-operating with and acting in good faith towards
                                        Rensource and the buyers;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        in compliance with the Terms and Conditions or any other codes, policies and
                                        guidelines as may be provided by Rensource from time to time;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        in accordance with ethical business practices and industry best practice;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        in compliance with all applicable laws in force from time to time in Nigeria;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        maintain full and accurate accounting records of all Transaction Data;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        The Merchant shall always fulfill any orders made on the Merchlist.co’s platform
                                        and shall always update its profile according to the stock it has in order to curtail
                                        any inability to fulfil the customers’ orders;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        The Merchant shall be responsible for the safe and clean transportation of all
                                        products purchased from its store till it is delivered to the customer;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        provide all the proprietary, technical information, financial and non-financial
                                        resources required by Rensource for it to perform its obligations under this
                                        Agreement.
                                    </Message>
                                </li>
                            </ListWithCounter>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>PRODUCT LISTINGS</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message>
                                The Merchant shall be responsible for listing its products on the App by uploading
                                on the App a completed product page which shall include prices, detailed
                                information, specifications and images in respect of each product;
                            </Message>
                        </li>
                        <li>
                            <Message>
                                The Merchant may not publish more than one listing in respect of each product; It
                                must keep its listings up to date and any listing in respect of unavailable products
                                must be deactivated.
                            </Message>
                        </li>
                        <li>
                            <div>
                            <Message>
                                The Merchant shall be solely responsible for all listings submitted to the App and
                                listed on Merchlist and all listings must:
                            </Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        constitute bona fide listings relating to products that comply with the Terms and
                                        Conditions and codes, policies and guidelines put in place by Rensource from time
                                        to time;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        include all such information in respect of the products including specifications and
                                        guidelines as may be required pursuant to all applicable laws and regulations,
                                        including in respect of consumer protection;
                                    </Message>
                                </li>
                            </ListWithCounter>
                            </div>
                        </li>
                        <li>
                            <Message top="0">
                                be submitted to be individually reviewed and approved, at Rensource’s discretion,
                                before they are published on the App and before the Merchant is put on Merchlist;
                                Without prejudice to other rights of Rensource, Rensource reserves the right to
                                unlist and/or delete any Merchant from the App or Merchlist that breaches their
                                obligations under this Agreement, the Terms and Conditions, or any codes, policies
                                and guidelines which Rensource may put in place;
                            </Message>
                        </li>
                        <li>
                            <div>
                            <Message top="0">
                                The Merchant acknowledges and agrees that:
                            </Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        Notwithstanding that it is fully responsible for the listings on the App and Merchlist;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        Rensource reserves the right to impose penalties for breach of this Clause 6,
                                        without prejudice to its other rights;
                                    </Message>
                                </li>
                            </ListWithCounter>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                <SubTitle textAlign="left" style={{display: 'inline'}}>LIABILITY</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                            <Message top="0">
                                The Merchant agrees to indemnify, defend and hold harmless Rensource against
                                and from any third party claims (including reasonable legal or arbitration costs)
                                arising from:
                            </Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        any breach or default on the part of the Merchants of any obligations under this
                                        Agreement or the Terms and Conditions;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        negligent act or omission of the Merchant;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        wilful violation of the law, wrong description and price of products advertised;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        any offence committed by Merchant in relation to its business with Rensource;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        listing of fake, inferior or substandard products that have been sold as genuine;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        listing and selling products that have not been authorized for sale by the
                                        appropriate regulatory body (including but not limited to NAFDAC, SON etc);
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        engagement in any activity which would be considered illegal under Nigerian law,
                                        or engages in any activity that could be considered as fraudulent or misleading.
                                    </Message>
                                </li>
                            </ListWithCounter>
                            </div>
                        </li>
                        <li>
                            <div>
                            <Message top="0">
                                The Merchant hereby authorizes Rensource to set-off by whatever means the
                                whole or any part of Merchant’s liabilities to Rensource or its buyers under this
                                Agreement (or any other contract with Rensource) against any funds or products
                                credited to or owing to the Merchant under this Agreement (or any other contract
                                with Rensource).
                            </Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        Rensource may exercise this right of set-off at any time, without notice to the
                                        Merchant, whether either liability is present or future, cash or assets, and whether
                                        or not either liability arises under this Agreement;
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        In the event such set-off does not fully reimburse Rensource for the amount owed,
                                        the Merchant shall immediately pay Rensource such outstanding amount;
                                    </Message>
                                </li>
                            </ListWithCounter>
                            </div>
                        </li>
                        <li>
                            <Message top="0">
                                Any exercise of Rensource’s right under this provision is without prejudice and in
                                addition to any rights or remedies available to Rensource under this Agreement.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Rensource is only liable for our own acts or omissions and not for acts or omissions
                                of third parties. This expressly excludes our liability for acts or omissions of the
                                payment schemes, or for events or activities originating outside our system (such
                                as infrastructure failure, internet disturbances or malfunctioning in third party
                                systems), except in case such events were caused by our willful misconduct.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>THE PRODUCTS</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                The only products that may be listed on the App or Merchlist are products falling
                                within the product categories specified in the Terms and Conditions;
                            </Message>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    The Merchant must not advertise, buy, sell or supply through the App any product
                                    that:
                                </Message>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            breaches any laws or regulations, or infringes any person's intellectual property
                                            rights or other rights, or gives rise to a cause of action against any person, in each
                                            case in any jurisdiction and under any applicable law;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            consists of or contains material that would, if published on the App contravenes the
                                            rules on content in Terms and Conditions; or
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            is or relates to: drugs, narcotics, steroids or controlled substances; pornography;
                                            obscene, indecent or sexually explicit materials; swords, firearms or other
                                            weapons; ammunition for any weapon; or items that are otherwise prohibited
                                            pursuant to the prohibited and restricted products policy in the Terms and
                                            Conditions, as may be amended from time to time, or any applicable law.
                                        </Message>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                        <li>
                            <Message top="0">
                                Rensource operates a zero tolerance approach to counterfeit products and any
                                attempt to sell counterfeit products on the App, or other breach of the anticounterfeit policy may result in the following penalties: financial penalties,
                                permanent prohibition from listing on the App, and potentially prosecution.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Promptly, following receipt of a written request from Rensource, the Merchant must
                                supply to any information and documentation that may be reasonably requested in
                                order to verify the authenticity of products.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>PRICING</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                All prices of products shall be stated inclusive of VAT and any other tax applicable
                                to the transaction and in the currency of the Territory.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                The Merchant shall be solely responsible for setting the price of the products on
                                the App, which may be amended from time to time, including for the purpose of
                                any seasonal or other discounts.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                The pricing of the products shall comply with all applicable laws, including
                                competition laws.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                <SubTitle textAlign="left" style={{display: 'inline'}}>COMMISSION AND FEES</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                Rensource shall charge a commission in respect of each sale made on the App
                                and fees in respect of all services and any value added services;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                In case of promotion funded by Rensource, commission may be calculated based
                                on the selling price, being the price set by the vendor at the time of the order;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Rensource reserves the right to charge commissions and/or fees in the event that
                                the sale is not completed, by way of consideration for the costs of our services
                                rendered;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Rensource may vary commissions and/or fees from time to time, on prior notice to
                                the Merchant. This will not affect any liability to pay commission that accrues before
                                the new rates are posted or for services that have been previously paid.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>VAT AND OTHER TAXES</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <Message top="0">
                                    All amounts stated on the App are stated inclusive of VAT and any other taxes
                                    applicable to the transaction. The Merchant acknowledges that:
                                </Message>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            commissions shall be calculated as a percentage of the selling price (being the
                                            price set by the Merchant at the time of the order) inclusive of VAT and any other
                                            taxes charged to the buyer;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            commissions are inclusive of VAT and all other taxes thereon; and
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            in the event of any upwards revision in the rate of VAT or any other applicable
                                            taxes, the amount of the commission shall be automatically adjusted to ensure that
                                            Rensource’s net revenues remain constant. The seller may, in its discretion, revise
                                            prices accordingly.
                                        </Message>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                        <li>
                            <Message top="0">
                                The Merchant shall be exclusively liable in respect of all taxes applicable to the
                                transactions entered into via the App with buyers, including VAT, and shall
                                therefore be responsible for the reporting, filing and payment of the same;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                In the event any transaction consists of the importation of products for delivery to
                                the buyer and such transaction may result in the recognition of a permanent
                                establishment for the Merchant, the Merchant shall be responsible for complying
                                with its tax obligations in the territory where it has created a current or future tax
                                nexus. The Merchant understands and acknowledges that consignment fulfillment
                                may create tax nexus e.g. permanent establishment.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Should a competent tax authority determine that Rensource is liable for payment
                                of any taxes (including stamp, excise or customs duties) in respect of the
                                transactions, notably pursuant to sections 11.2 and 11.3 above, the Merchant shall
                                indemnify and hold harmless Rensource in respect of the same. Rensource may
                                make tax-related deductions to payments processed on your behalf and remit such
                                deducted amounts to the relevant government or tax authority;
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Promptly following receipt of a written request from Rensource, the Merchant must
                                supply any information and documentation that Rensource may reasonably
                                request in order to identify or facilitate compliance with its legal obligations relating
                                to the taxation of payments made to us or processed by us. We may supply such
                                information and/or documentation to relevant government and tax authorities.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                <SubTitle textAlign="left" style={{display: 'inline'}}>REMITTANCES</SubTitle>
                <ListWithCounter>
                    <li>
                        <Message top="0">
                            Rensource shall collect payments from buyers in respect of each product
                            purchased via the App, and shall deduct from the same its commissions and, as
                            may be applicable, any fees, charges, taxes, penalties, refunds and any other
                            amounts that are due in respect of any business whatsoever.
                        </Message>
                    </li>
                    <li>
                        <Message top="0">
                            Rensource shall remit the proceeds of sale of the products, after all deductions
                            pursuant to section 12.1 above, and remit the remaining funds to the Merchant in 
                            the currency of the Territory and using such payment mechanism as the Merchant
                            may be notified from time to time.
                        </Message>
                    </li>
                    <li>
                        <Message top="0">
                            Evidence of payment to the Merchant’s nominated account shall constitute
                            conclusive evidence of payment and receipt.
                        </Message>
                    </li>
                    <li>
                        <Message top="0">
                            The Merchant shall be responsible for ensuring that the account details that it
                            provides Rensource with are accurate and up to date, and that the account is
                            secure. Rensource shall not be liable for any loss or damage resulting from fraud
                            or error in respect of the Merchant’s account.
                        </Message>
                    </li>
                    <li>
                        <Message top="0">
                            Rensource shall provide the Merchant with an account statement, which shall
                            include details of all proceeds of sale of the products, deductions and remittances.
                        </Message>
                    </li>
                    <li>
                        <Message top="0">
                            Subject to the applicable laws of the Territory, we may at any time set off any
                            amount that you owe to us against any amount that we owe to you, by sending you
                            written notice of the set-off. For the avoidance of any doubt, the account statement
                            shall serve as such notice of set-off.
                        </Message>
                    </li>
                    <li>
                        <div>
                            <Message top="0">
                                In the event that Rensource holds insufficient funds on the Merchant’s behalf for
                                payment of any amounts that is owed (the Merchant’s account is in debit):
                            </Message>
                            <ListWithCounter>
                                <li>
                                    <Message top="0">
                                        the Merchant shall pay the amounts owed to Rensource by such payment method
                                        as we may request; and
                                    </Message>
                                </li>
                                <li>
                                    <Message top="0">
                                        In the event that Rensource holds any of the Merchant’s products that have not
                                        been sold or that have been returned, Rensource may dispose of such products
                                        and apply all proceeds of sale to discharge any amounts that the Merchant owes.
                                    </Message>
                                </li>
                            </ListWithCounter>
                        </div>
                    </li>
                    <li>
                        <Message top="0">
                            Rensource may delay or suspend payment to you in the event of investigation of a
                            potential fraud or other breach of this agreement.
                        </Message>
                    </li>
                    <li>
                        <Message top="0">
                            In the event that the Merchant disputes any transaction or statement of account it
                            must report its claim to Rensource within three (3) months of the date of the
                            relevant transaction, failing which such claim shall be deemed to be waived.
                        </Message>
                    </li>
                </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>BREACHES OF SELLER TERMS AND CONDITIONS</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <Message top="0">
                                    If Rensource reasonably determines that Merchant has breached the terms of
                                    this Agreement and the Terms and Conditions, or any codes, policies or
                                    guidelines put in place by Rensource, Rensource may:
                                </Message>
                                <Message top="0">a. send the Merchant one or more formal warnings;</Message>
                                <Message top="0">b. suspend, prohibit or block the Merchant’s access to the App;</Message>
                                <Message top="0">c. apply penalties for breach; and/or</Message>
                                <Message top="0">d. commence legal action against the Merchant, whether for breach of contract
                                    or otherwise.
                                </Message>
                            </div>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    The consequences of breach provided at section 13.1 above shall also apply if:
                                </Message>
                                <Message top="0">a. the Merchant fails to satisfy a minimum level of operational performance in order
                                    to provide a satisfactory buyer experience on the App; or</Message>
                                <Message top="0">b. the Merchant receives negative ratings and reviews.</Message>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>INSURANCE</SubTitle>
                    <Message>
                        The Merchant shall maintain in force a policy of insurance with an appropriate level of
                        coverage in respect of its liabilities under this Agreement.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>CONFIDENTIALITY AND DATA PRIVACY</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                All information and documents concerning the conduct of business pursuant to the
                                Terms and Conditions, including information relating to business methods,
                                procedures, policies and sales information, is strictly confidential unless it is
                                already in the public domain. The Merchant shall not use Rensource’s confidential
                                information for any purpose other than to perform its obligations under this
                                Agreement and it shall not disclose Rensource’s confidential information without it
                                prior written consent.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                The Merchant may not send advertising or promotional communications to buyers
                                on the App without the prior written consent of Rensource, and shall be directly
                                responsible to marketplace users for any misuse of their personal data.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                If Rensource is sued, fined, or otherwise incurs expenses as a result of the
                                Merchant’s handling of personal data obtained through the marketplace, the
                                Merchant shall indemnify Rensource in respect of the same.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>GOVERNING LAW AND DISPUTE RESOLUTION</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                The Agreement shall be governed by and construed in accordance with the laws
                                of the Federal Republic of Nigeria;
                            </Message>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    Unless otherwise provided, in the event of any dispute, question or difference of
                                    opinion between the Parties arising out of or under the Agreement, the aggrieved
                                    Party shall carry on in the following sequence:
                                </Message>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            The aggrieved Party shall give to the other Party a notice (Notice of Dispute)
                                            specifying the Dispute and requiring its resolution. Parties shall meet at an agreed
                                            location to attempt to resolve the dispute in good faith through negotiation;
                                        </Message>
                                    </li>
                                    <li>
                                        <div>
                                        <Message top="0">
                                            Resolution through Mediation:
                                        </Message>
                                        <ListWithCounter>
                                            <li>
                                                <Message top="0">
                                                    If the parties are unable to fully resolve the dispute through mutual discussion
                                                    within (14) business days after either party notifies the other in writing that there
                                                    is a dispute, the dispute (or the unresolved aspect) shall be referred to
                                                    mediation conducted by their legal representatives or financial representatives,
                                                    where financial matters are involved, or other professionals appointed by the
                                                    parties in the specialized areas of dispute;
                                                </Message>
                                            </li>
                                            <li>
                                                <Message top="0">
                                                    The mediation will be conducted by the Alternative Dispute Resolution Centre
                                                    of the Lagos Multi-Door Court House (LMDC). However, where the Merchant
                                                    concerned in any such dispute is not resident in and/or has no place in Lagos,
                                                    Nigeria, then the mediation shall be conducted by an accredited and reputable 
                                                    Alternative Dispute Resolution in any such other place where the Merchant is
                                                    resident and/or has his place of business.
                                                </Message>
                                            </li>
                                        </ListWithCounter>
                                        </div>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            If the parties are still unable to fully resolve the dispute through mediation within
                                            ten (10) business days of the referral of the dispute (or the unresolved aspect) shall
                                            be referred to a Court of competent jurisdiction for resolution.
                                        </Message>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                <SubTitle textAlign="left" style={{display: 'inline'}}>ASSIGNMENT</SubTitle>
                    <Message>
                        This Agreement shall be binding upon each Party and their representatives. The Merchant
                        shall not assign any right or obligation hereunder in whole or in part, without the prior
                        written consent of Rensource.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>TERMINATION</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                Either Party to this Agreement may elect to terminate this Agreement by giving one
                                (1) month’s prior notice in writing to the other Party of its intention to do so.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Rensource shall have the sole discretion to terminate this Agreement without
                                notice where the Merchant has breached any of the terms and conditions of this
                                Agreement.
                            </Message>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    Rensource has the right to delist the Merchant from the App and the Merchlist
                                    platform if any, or a combination, of the following breaches are committed:
                                </Message>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            Fails to make a product that has been sold on Merchlist platform
                                            immediately available for delivery after it was supposed to be available for
                                            delivery;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Provides fake, inferior or substandard products that have been sold as
                                            genuine;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Provides used, refurbished or damaged products that has been sold as new
                                            or unused;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Lists and sells products that have not been authorized for sale by the
                                            appropriate regulatory body (including but not limited to the NCC, NAFDAC
                                            etc);
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Engages in any activity which would be considered illegal under Nigerian
                                            law, or engages in any activity that could be considered as fraudulent or
                                            misleading;
                                        </Message>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                <SubTitle textAlign="left" style={{display: 'inline'}}><UnderlinedText>Know Your Customer (KYC)</UnderlinedText></SubTitle>
                    <Message>
                        The Merchant warrants and represents that all of the information set out in the KYC
                        Form is true and correct as at the date hereof and such further date at which the KYC
                        Form is updated or re-confirmed, and undertakes that any reports to be made shall be
                        true and correct.
                        The Merchant shall report as soon as any information on the KYC changes not later
                        than five (5) Business Days after the same comes to its attention 
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}><UnderlinedText>Notices</UnderlinedText></SubTitle>
                    <Message>
                        Any notice, request, or other communication to be given or made under this Agreement
                        to the Parties hereto shall be in writing.
                        Such notice, request or other communication shall be deemed to have been duly given
                        or made when it shall be delivered by hand, international courier (with a hard copy
                        delivered within five (5) Business Days) to the Party to which it is required or permitted
                        to be given or made at such Party’s address specified above or at such other address
                        as such Party shall have designated by notice to the Party given or making such notice,
                        request or other communication.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}><UnderlinedText>General Terms</UnderlinedText></SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <SubTitle textAlign="left" style={{display: 'inline'}}>
                                    <UnderlinedText>Force Majeure</UnderlinedText>
                                </SubTitle>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            If any Party is rendered unable, wholly or in part, by Force Majeure (as
                                            defined below) to carry out its obligations under this Agreement, it is agreed
                                            that upon such Party giving notice and reasonably full particulars of such
                                            Force Majeure in writing to the other Party as soon as possible after the
                                            occurrence of the cause relied on, then the obligations of the Party giving
                                            such notice shall, so far as they are affected by such Force Majeure, be
                                            suspended during the continuance of any inability, except for payments,
                                            and shall be as far as possible remedied with all reasonable dispatch.
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            The term “Force Majeure” as used herein shall mean an occurrence not
                                            within the control of the Party and which, by the exercise of due diligence,
                                            such Party is unable to prevent or overcome and shall include acts of God,
                                            strikes, lockouts or other industrial disturbances, acts of the public enemy,
                                            wars, blockages, insurrections, riots, sabotage, pandemics, epidemics,
                                            endemics, landslides, earthquakes, fire, storms, hurricanes, floods, civil
                                            disturbances, vandalism (including computer virus and hacking), currency
                                            exchange restrictions, interruption or failure of utility service enactment of
                                            statutes, laws or regulations, acts of governmental bodies and any other
                                            cause or causes, whether of the kind herein enumerated or otherwise, not
                                            reasonably within the control of the Party claiming suspension and which,
                                            by the exercise of reasonable diligence, such Party is unable to prevent or
                                            overcome; such term shall likewise include, in those instances where either
                                            Party hereto is required to obtain permits or licenses from any
                                            governmental body to enable such Party to perform hereunder, the inability
                                            of such Party to acquire, or the delays on the part of such Party in acquiring
                                            after the exercise of reasonable diligence, such permits or licenses.
                                        </Message>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                        <li>
                            <div>
                                <SubTitle textAlign="left" style={{display: 'inline'}}><UnderlinedText>Third Party</UnderlinedText></SubTitle>
                                <Message top="10px">
                                    Save as provided in this Agreement, the Parties do not intend that any term of this
                                    Agreement shall be enforceable by any person who is not a Party to this
                                    Agreement.
                                </Message>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
            </ListWithCounter>
            <br/>
            <br/>
            <br/>
            <br/>
            <Message align="center">
                (Execution page to follow)
            </Message>
            <br/>
            <br/>
            <br/>
            <br/>
            <Message>
                <BoldText>IN WITNESS WHEREOF</BoldText>, the Parties hereto have executed this Agreement in the manner
                hereinafter appearing the day and year hereinabove specified
            </Message>
            <Message>
                <BoldText>THE COMMON SEAL OF RENSOURCE TECHNOLOGY INC. LIMITED</BoldText>
            </Message>
            <Message>
                <BoldText>Was affixed in the presence of:</BoldText>    
            </Message>
            <div style={{display: 'flex'}}>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
            </div>
            <br/>
            <br/>
            <Message>
                <BoldText>Signed by the within named Merchant</BoldText>
            </Message>
            <br/>
            <br/>
            <br/>
            <Message>
                <BoldText>
                    ____________________________ 
                </BoldText>
                <br/>
                <br/>
                <BoldText>
                    In the Presence of
                </BoldText>
            </Message>
            <br/>
            <br/>
            <Message>
                Name……………….…………………………………
            </Message>
            <Message>
                Address………………………………………………
            </Message>
            <Message>
                Occupation…………………………………………..
            </Message>
            <Message>
                Signature….…………………………………………
            </Message>
            <Message>
                Date…...………………………………………………
            </Message>
            <Message>
                <BoldText>OR</BoldText>
            </Message>
            <Message>
                <BoldText>THE COMMON SEAL OF____________________________________________</BoldText>
            </Message>
            <Message>
                <BoldText>Was affixed in the presence of:</BoldText>
            </Message>
            <br/>
            <br/>
            <div style={{display: 'flex'}}>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Message align="center">
                <BoldText>-END OF MERCHANT AGREEMENT-</BoldText>
            </Message>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <SubTitle textAlign="left" top="75px">
                PLEASE READ CAREFULLY IF YOU ARE AN AGENT
            </SubTitle>
            <SubTitle textAlign="left" top="30px">2. AGENT AGREEMENT</SubTitle>
            <Message><BoldText>THIS AGENCY AGREEMENT</BoldText> is made</Message>
            <Message><BoldText>BETWEEN</BoldText></Message>
            <Message>
                <BoldText>RENSOURCE TECHNOLOGY INC. LIMITED</BoldText>, a private limited liability company
                incorporated under the laws of the Federal Republic of Nigeria and having its registered
                office at 3B, Tiamiyu Savage Street, Victoria Island, Lagos (hereinafter referred to as the
                <BoldText> “Rensource”</BoldText> which expression shall where the context so admits include its successorsin-title and assigns, agents and representatives) of the one part;
            </Message>
            <Message><BoldText>AND</BoldText></Message>
            <Message>
                ______________________[of]_____________________ hereinafter
                referred to as <BoldText>“the Agent”</BoldText> which expression shall where the context so admits include
                [its/his/her] successors-in-title, assigns, agents and representatives) of the other part.
            </Message>
            <Message>
                <BoldText>“Parties”</BoldText> means Rensource and the Agent collectively; and ‘the Party’ shall mean
                individually any of the Parties.
            </Message>
            <Message>
                <BoldText>WHEREAS</BoldText>
            </Message>
            <ListWithLetters>
                <li>
                    <Message top="10px">
                        <BoldText>Rensource</BoldText> is the owner of the app, Spaces which provides a suite of apps that
                        helps merchants in running their daily business activities. These apps include;
                        merchapp, merchbuy, merchlist web platform and the Spaces app. Spaces runs
                        and operates a platform that allows merchants to purchase from distributors over
                        the internet and an adapted partner logistics network.
                    </Message>
                </li>
                <li>
                    <Message top="10px">
                        The <BoldText>Agent</BoldText> shall recruit Merchants to be listed on the App.
                    </Message>
                </li>
                <li>
                    <Message top="10px">
                        <BoldText>Rensource</BoldText> requires the services of the <BoldText>Agent</BoldText> and the <BoldText>Agent</BoldText> has accepted to
                        provide such services.
                    </Message>
                </li>
                <li>
                    <Message top="10px">
                        The Parties now seek to execute this Agreement, to provide broad terms, rights
                        and obligations of each party in their dealings with each other in relation to the
                        foregoing.
                    </Message>
                </li>
            </ListWithLetters>
            <Message>NOW THEREFORE THIS AGREEMENT WITNESSES as follows:</Message>
            <ListWithCounter>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>DEFINITIONS</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <Message top="0">
                                    Unless the context otherwise requires, the following words have the following
                                    meanings:
                                </Message>
                                <Message>
                                    <BoldText>“Agreement”</BoldText> means this Agency Agreement including all Schedules and Exhibits thereto;
                                </Message>
                                <Message>
                                    <BoldText>“App”</BoldText> means any software tool developed or provided by Rensource that the agent
                                    uses.
                                </Message>
                                <Message>
                                    <BoldText>“Business Day”</BoldText> means any day other than a Saturday Sunday or public holiday on
                                    which banks are authorized or required to open in Nigeria;
                                </Message>
                                <Message>
                                    <BoldText>“Effective Date”</BoldText> means the date of commencement of this Agreement;
                                </Message>
                                <Message>
                                    <BoldText>“License”</BoldText> means the agency license issued by Rensource to it Agents;
                                </Message>
                                <Message>
                                    <BoldText>“Merchant”</BoldText> means the people who buy the Product from the Distributor;
                                </Message>
                                <Message>
                                    <BoldText>“Merchant Account”</BoldText> means the account on the Supply Centre maintained by
                                    the Merchant
                                </Message>
                                <Message>
                                    <BoldText>“Services”</BoldText> means any activity required to be carried out by the Agent in
                                    furtherance of its obligations under this Agreement;
                                </Message>
                                <Message>
                                    <BoldText>“Spaces”</BoldText> means the app developed and owned by Rensource which
                                    connects distributors to the Merchants. Spaces runs and
                                    operates a platform that allows merchants to purchase from
                                    distributors over the internet and an adapted partner logistics
                                    network;
                                </Message>
                                <Message>
                                    <BoldText>“Supply Centre”</BoldText> means the dedicated internet website for which the
                                    access is provided by Rensource to the Merchants to
                                    manage his products, announces, orders, pricing and
                                    sales operations;
                                </Message>
                                <Message>
                                    <BoldText>“Term”</BoldText> means the period which this Agreement is in force and
                                    effect in accordance with its terms;
                                </Message>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>COMMENCEMENT</SubTitle>
                    <Message>
                        This Agreement shall be effective from the Effective Date for the Term of the Agreement and
                        shall govern the rights and obligations of the Parties.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>TERM</SubTitle>
                    <Message>
                        This Agreement shall come into force on the Effective Date and shall continue unless
                        terminated by the Parties in accordance with the termination clause.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>OBLIGATIONS OF THE AGENT</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <Message top="0">
                                    Subject to the provisions of this Agreement, the Agent shall carry out its
                                    obligation throughout the Term and shall also ensure that:
                                </Message>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            it sources for Merchants on behalf of Rensource.
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            It onboard new merchants on the App;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Update business and personal information of the Merchants
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Buy the Products listed on the App;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            It monitors the performance of the Merchants;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            To deal fairly and honestly with Rensource.
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            The Agent, if a Company, agrees to provide copies of the Company’s
                                            registration certificate, company account details and other relevant
                                            business documents prior to the execution of this Agreement.
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Constantly engage Merchants on the status of their Merchant Accounts
                                            on the Supply Centre;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Provide effective after sales service by constantly engaging Merchants
                                            on the effective use of their system.
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                            Be the Merchant's first point of contact for resolution of issues relating to
                                            the use of the App and Supply Centre;
                                        </Message>
                                    </li>
                                    <li>
                                        <Message top="0">
                                        Ensure all issues arising on the Merchant Account are properly resolved.
                                        </Message>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>OBLIGATIONS OF RENSOURCE</SubTitle>
                    <Message>
                        Subject to the provisions of this Agreement, Rensource shall carry out its
                        obligation throughout the Term and shall also ensure that it sets targets to be
                        realized by the Agent provided that Rensource reserves the right to rescind the
                        Agency License upon repeated failure to meet the set targets (which targets shall
                        not be unreasonably set by Rensource) to be met by the Agent.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>OWNERSHIP</SubTitle>
                    <Message>
                        The title and ownership of the information on the App will at all times remain
                        exclusively in Rensource.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>PAYMENT TERMS</SubTitle>
                    <Message>
                        <BoldText>General Conditions of Payment</BoldText>
                    </Message>
                    <Message top="10px">
                        a. <BoldText>Payment Method:</BoldText> Payments are done by Bank Transfer. The Agent must enter its
                        exact and up to date bank information on the Spaces Agent App. Method, maybe
                        subjected to change as described in the Guidelines.
                    </Message>
                    <Message top="10px">
                        b. <BoldText>Payment Calculation:</BoldText> The revenue collected by Rensource for the Distributor is
                        based on the orders successfully delivered to the Merchant. The Distributor
                        understands that the items shipped but not delivered yet at the moment of the payment
                        are not included in the payment. Any sums due to the Distributor hereunder may be
                        applied by Rensource as a set off against any sums owed by the Distributor to
                        Rensource or against any claims of third parties against Rensource arising from the
                        Distributor’s performance, under any document or agreement. At its sole discretion,
                        Rensource may withhold from payments to be made to the Distributor amounts legally
                        required to be withheld from such payments and remitted to the taxing authority of any
                        jurisdiction relevant to the transaction.
                    </Message>
                    <Message top="10px">
                        c. <BoldText>Documents Required for Payment:</BoldText> Every payment is dependent on the following
                        documents:
                    </Message>
                    <Message top="10px" left="20px">● This Agreement electronically signed by both parties;</Message>
                    <Message top="10px" left="20px">● A valid means of identification</Message>
                    <Message top="10px" left="20px">● A valid BVN number</Message>
                    <Message top="10px">
                        d. <BoldText>Price:</BoldText> The prices are indicated in Naira, including and excluding tax.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>REPRESENTATIONS AND WARRANTIES</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                Each of the parties warrant, represent and undertake that they have the power to
                                enter into and to execute and to deliver and perform its obligations contained in this
                                Agreement.
                            </Message>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    The Agent warrants, represents and undertakes that it:
                                </Message>
                                <Message top="10px" left="20px">(a) Shall perform its obligations under this Agreement with the utmost skill,
                                    care and diligence, in an efficient, competent and professional manner,
                                    and in accordance with good industry practice;
                                </Message>
                                <Message top="10px" left="20px">(b) Shall act in fairness and honesty towards the performance of its
                                    obligations under this Agreement
                                </Message>
                                <Message top="10px" left="20px">(c) Shall not make misrepresentations (directly or indirectly) as to the true
                                    nature of services provided by Rensource to Merchants.
                                </Message>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>TERMINATION</SubTitle>
                    <ListWithCounter>
                        <li>
                            <div>
                                <Message top="0">
                                    Either party may by notice to the other terminate this Agreement by
                                    giving a 30day notice if the other party;
                                </Message>
                                <Message top="10px" left="20px">
                                    (a) commits a breach of the terms of this Agreement which is not capable of
                                    remedy;
                                </Message>
                                <Message top="10px" left="20px">
                                    (b) commits a material breach of the terms of this Agreement which is capable
                                    of remedy but fails to remedy that breach within 14 days of being notified
                                    of the breach;
                                </Message>
                                <Message top="10px" left="20px">
                                    (c) is prevented from or hindered in performing all or part of this Agreement
                                    by an event of Force Majeure for more than [30] days in aggregate;
                                </Message>
                                <Message top="10px" left="20px">
                                    (d) ceases to carry on business;
                                </Message>
                                <Message top="10px" left="20px">
                                    (e) suffers or allows any execution, whether legal or equitable, to be levied on
                                    its assets or obtained against it;
                                </Message>
                                <Message top="10px" left="20px">
                                    (f) goes into liquidation (whether voluntary or compulsory) except a solvent
                                    voluntary liquidation for the purposes of bona fide reconstruction or
                                    amalgamation;
                                </Message>
                                <Message top="10px" left="20px">
                                    (g) has a receiver, manager, administrator or administrative receiver
                                    appointed in respect of all or any of its assets;
                                </Message>
                                <Message top="10px" left="20px">
                                    (h) is the subject of a resolution petition or for its winding up;
                                </Message>
                                <Message top="10px" left="20px">
                                    (i) takes or is subject to any steps (including, without limitation, the making of
                                    an application or the giving of any notice) for the appointment of an
                                    administrator;
                                </Message>
                                <Message top="10px" left="20px">
                                    (j) is subject to any other proceedings relating to its insolvency or possible
                                    insolvency; or
                                </Message>
                                <Message top="10px" left="20px">
                                    (k) takes or suffers any similar action analogous to those described in clauses
                                    to (j) (inclusive) in any jurisdiction because of debt.
                                </Message>
                            </div>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    Rensource may also terminate this Agreement immediately by notice if:
                                </Message>
                                <Message top="10px" left="20px">a. any event occurs which, in the reasonable opinion of Rensource, would
                                    have a significant adverse effect on the Distributor’s ability to comply with
                                    this Agreement or that is detrimental to Resource’s business or
                                    reputation;
                                </Message>
                                <Message top="10px" left="20px">
                                    b. the Distributor agent ceases or threatens to cease to act as a distributor
                                    for Rensource;
                                </Message>
                                <Message top="10px" left="20px">
                                    c. if the Distributor fails to meet level of operational performance considered
                                    as bare minimum to provide a satisfactory merchant experience of
                                    purchase on the platform. Those levels and the way they are being
                                    measured are available on the guidelines section of the Supply Centre.
                                </Message>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>FORCE MAJEURE</SubTitle>
                    <Message top="10px" left="20px">a. No party will be liable to any other party for its inability to perform any
                        one or more obligations under this agreement caused by a force
                        majeure event.</Message>
                    <Message top="10px" left="20px">b. If a force majeure event occurs, then the party affected will not later than
                        14 (fourteen) business days notify the other party of the nature and
                        likely duration of the force majeure event and take all reasonable steps
                        to reduce its effect and duration, including the making of any alternative
                        arrangements for resuming the performance of its obligations which may
                        be practicable without incurring material additional expense.</Message>
                    <Message top="10px" left="20px">c. Unless this agreement is terminated under clause 9, the party affected
                        by the force majeure event will notify the other party as soon as its
                        performance of its obligations under this agreement is no longer
                        prevented by the force majeure event.</Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>ASSIGNMENT</SubTitle>
                    <Message>
                        Either Party may assign its rights and obligations under this Agreement to any of its
                        Affiliates, provided the consent of the other has been obtained, in which case the assigning
                        party shall guarantee the performance of its obligations by such Affiliate.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>NON-PERFORMANCE</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                In case of the non-performance by the Agent of its obligations under this
                                Agreement, the Agent shall be liable for the loss (es) incurred by
                                Rensource as a result of its non-performance thereof.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                In the case of Force Majeure, such non-performance shall not be
                                regarded as a breach of the provisions of this Agreement.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>NON-WAIVER</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                Any failure or delay in enforcing an obligation or exercising a right or
                                remedy under this Agreement is not intended to nor shall it amount to a
                                waiver of that obligation, right or remedy or an affirmation of this
                                Agreement by election and Rensource reserves its rights under this
                                Agreement unless otherwise notified to the Agent.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                A single or partial waiver of a breach of any term of this Agreement shall
                                not amount to a waiver of any other term nor will it prevent a party from
                                subsequently requiring compliance with the waived obligation.
                            </Message>
                        </li>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>VARIATION</SubTitle>
                    <Message>
                        It is expressly and unequivocally agreed that the terms and conditions herein shall not be
                        varied, altered and or modified, except with the mutual written consent of the Parties hereto.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>SEVERABILITY</SubTitle>
                    <Message>
                        It is agreed and understood that if any provision of this Agreement becomes illegal, invalid or
                        unenforceable in any respect, the legality, validity and enforceability of the other provisions
                        of this Agreement shall not in any way be affected or impaired.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>ENTIRE AGREEMENT</SubTitle>
                    <Message>
                        This Agreement constitute the whole agreement and understanding between the Parties with
                        respect to the subject matter of this Agreement and supersede all prior agreements,
                        negotiations and discussions between the parties relating to the subject matter of this
                        Agreement
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>COUNTER PARTS</SubTitle>
                    <Message>
                        This Agreement may be executed in any number of counterparts and by each of the parties
                        on separate counterparts, but shall not be effective until each party has executed at least
                        one counterpart.
                        Each counterpart, when executed, shall be an original, but all the counterparts together
                        constitute the same Agreement.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>CONFIDENTIALITY</SubTitle>
                    <Message>
                        The Parties, their employees, agents and or assigns, undertake to keep confidential at all
                        times during the continuance of this Agreement all information acquired by them in
                        connection with the Project, which may reasonably be regarded to be of a private, secret or
                        confidential nature except such information as required by a governmental and or regulatory
                        authority and or in the proper performance of their respective obligations hereunder and not
                        to divulge the same to any person, firm or company. Furthermore, the Parties hereto
                        undertake not to enter into agreements, discussions or other arrangements with third parties
                        which may in any way or manner compromise the ability of the Parties to maximise the
                        profits or limit the scope of the project.
                    </Message>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>NOTICE AND COMMUNICATION</SubTitle>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                Any notice or communication required to be served pursuant to the terms
                                of this Agreement shall be in writing and can either be hand-delivered,
                                sent by registered post, courier, facsimile and or electronic mail. Such
                                notice shall be sufficiently and properly served upon delivery if handdelivered. If sent by post or courier, three (3) days after same is deposited
                                at the post office, and if sent by facsimile or electronic mail, it will be
                                deemed as having been properly served upon transmission.
                            </Message>
                        </li>
                        <li>
                            <Message top="0">
                                Any notice required to be given hereunder shall be addressed to:
                            </Message>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <Message top="0" align="center"><BoldText>In case of Rensource:</BoldText></Message>
                        <br/>
                        <br/>
                        <Message top="10px">
                            <BoldText>
                                Name: Rensource Distributed Energy Limited
                            </BoldText>
                        </Message>
                        <Message top="10px">
                            <BoldText>
                                Attention: ………………..
                            </BoldText>
                        </Message>
                        <Message top="10px">
                            <BoldText>
                                Address: 3B Tiamiyu Savage Street, Victoria Island Lagos.
                            </BoldText>
                        </Message>
                        <Message top="10px">
                            <BoldText>
                                Email: …………………………
                            </BoldText>
                        </Message>
                        <br/>
                        <br/>
                        <br/>
                        <Message top="0" align="center">
                            <BoldText>
                                In case of the Agent:
                            </BoldText>
                        </Message>
                        <br/>
                        <br/>
                        <Message top="10px">
                            <BoldText>
                                Name: …………
                            </BoldText>
                        </Message>
                        <Message top="10px">
                            <BoldText>
                                Attention: ……………….
                            </BoldText>
                        </Message>
                        <Message top="10px">
                            <BoldText>
                                Address:……………………………..
                            </BoldText>
                        </Message>
                        <Message top="10px">
                            <BoldText>
                                Email: ……………………..
                            </BoldText>
                        </Message>
                    </ListWithCounter>
                </li>
                <li>
                    <SubTitle textAlign="left" style={{display: 'inline'}}>GOVERNING LAW AND DISPUTE RESOLUTION</SubTitle>
                    <Message>
                        This Agreement shall be governed and construed in all respects in accordance with the
                        Relevant Laws of the Federal Republic of Nigeria.
                    </Message>
                    <ListWithCounter>
                        <li>
                            <Message top="0">
                                The Agreement shall be governed by and construed in accordance with the laws of the
                                Federal Republic of Nigeria;
                            </Message>
                        </li>
                        <li>
                            <div>
                                <Message top="0">
                                    Unless otherwise provided, in the event of any dispute, question or difference of
                                    opinion between the Parties arising out of or under the Agreement, the aggrieved Party
                                    shall carry on in the following sequence:
                                </Message>
                                <ListWithCounter>
                                    <li>
                                        <Message top="0">
                                            The aggrieved Party shall give to the other Party a notice (Notice of Dispute) specifying
                                            the Dispute and requiring its resolution. Parties shall meet at an agreed location to
                                            attempt to resolve the dispute in good faith through negotiation;
                                        </Message>
                                    </li>
                                    <li>
                                        <div>
                                            <Message top="0">
                                                Resolution through Mediation:
                                            </Message>
                                            <Message top="10px" left="20px">a. If the parties are unable to fully resolve the dispute through mutual discussion
                                            within (14) business days after either party notifies the other in writing that there
                                            is a dispute, the dispute (or the unresolved aspect) shall be referred to
                                            mediation conducted by their legal representatives or financial representatives,
                                            where financial matters are involved, or other professionals appointed by the
                                            parties in the specialized areas of dispute;</Message>
                                            <Message top="10px" left="20px">b. The mediation will be conducted by the Alternative Dispute Resolution Centre
                                            of the Lagos Multi-Door Court House (LMDC). However, where the Distributor
                                            concerned in any such dispute is not resident in and/or has no place in Lagos,
                                            Nigeria, then the mediation shall be conducted by an accredited and reputable
                                            Alternative Dispute Resolution in any such other place where the Distributor is
                                            resident and/or has his place of business.</Message>
                                            <Message top="10px" left="40px">i. If the Parties are still unable to fully resolve the dispute through
                                            mediation within ten (10) business days of the referral of the dispute (or
                                            the unresolved aspect) shall be referred to a Court of competent
                                            jurisdiction for resolution.</Message>
                                            </div>
                                    </li>
                                </ListWithCounter>
                            </div>
                        </li>
                    </ListWithCounter>
                </li>
            </ListWithCounter>
            <br/>
            <br/>
            <br/>
            <br/>
            <Message>
                <BoldText>IN WITNESS WHEREOF</BoldText>, the Parties hereto have executed this Agreement in the manner
                hereinafter appearing the day and year hereinabove specified
            </Message>
            <Message>
                <BoldText>
                    THE COMMON SEAL OF RENSOURCE TECHNOLOGY INC. LIMITED
                </BoldText>
            </Message>
            <Message>
                <BoldText>
                    Was affixed in the presence of:
                </BoldText>
            </Message>
            <br/>
            <br/>
            <div style={{display: 'flex'}}>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
            </div>
            <br/>
            <br/>
            <Message>
                <BoldText>Signed by the within named Agent</BoldText>
            </Message>
            <br/>
            <br/>
            <br/>
            <Message>
                <BoldText>
                    ____________________________ 
                </BoldText>
                <br/>
                <br/>
                <BoldText>
                    In the Presence of
                </BoldText>
            </Message>
            <br/>
            <br/>
            <Message>
                <BoldText>Name……………….…………………………………</BoldText>
            </Message>
            <Message>
                <BoldText>Address………………………………………………</BoldText>
            </Message>
            <Message>
                <BoldText>Occupation…………………………………………..</BoldText>
            </Message>
            <Message>
                <BoldText>Signature….…………………………………………</BoldText>
            </Message>
            <Message>
                <BoldText>Date…...………………………………………………</BoldText>
            </Message>
            <br/>
            <br/>
            <Message>
                <BoldText>OR</BoldText>
            </Message>
            <br/>
            <br/>
            <Message>
                <BoldText>THE COMMON SEAL OF____________________________________________</BoldText>
            </Message>
            <Message>
                <BoldText>Was affixed in the presence of:</BoldText>
            </Message>
            <br/>
            <br/>
            <div style={{display: 'flex'}}>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
                <div style={{margin: '0 20px'}}>
                    <Message>
                        <BoldText>................................</BoldText>
                    </Message>
                    <Message>
                        <BoldText>DIRECTOR</BoldText>
                    </Message>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <Message align="center">
                <BoldText>-END OF AGENT AGREEMENT-</BoldText>
            </Message>
            </ScreenContainer>
        </Fragment>
    );
};
