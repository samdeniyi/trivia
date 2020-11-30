import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { object } from "prop-types";
// import { colors } from '../../../../styles';

import { TopHeader, UserAvatar, PageLogo } from "../../../../components";
import {
    ScreenContainer,
    FlexCenteredBlock
} from "../../../../containers/ScreenContainer";
import { ListHeading } from "../../../../containers/ListContainer";
import {
    SecondaryText,
    CategoryLabel
} from "../../../../containers/MessageContainer";
// import { Badge } from '../../../../containers/BadgeContainer';
import {
    // BusinessCategoriesList,
    // LabelsList,
    InfoCategoryHeading,
    Space
} from "./styles";
import {
    DetailsName,
    DetailsDate,
    DetailsContactBlock,
    DetailsContactOption,
    DetailsContactLink,
    DetailsContactText,
    // DetailsBadgeHeading,
    // DetailsBadgeCommisionsAmount,
    // DetailsCommissionLink,
    // DetailsHighlight,
    DetailsBusinessDescription,
    DetailsDescriptionBody,
    DetailsBusinessDescriptionHeading
} from "../../../../containers/DetailsContainer";

// import { ReactComponent as ForwardArrowIcon } from '../../../../assets/arrow.svg';
import InfoIcon from "../../../../assets/info.svg";
// import EmailIcon           from '../../../../assets/email.svg';
import PhoneIcon from "../../../../assets/phone.svg";
import SMSIcon from "../../../../assets/sms.svg";
import WhatsAppIcon from "../../../../assets/whatsapp.svg";
import { formatCreationDate } from "../../../../utils/date/formatCreationDate";
// import AddressIcon         from '../../../../assets/address.svg';
// import BusinessContactIcon from './assets/business_contact.svg';

const MerchantDetails = ({ location }) => {
    const merchant = location.state;
    // const commissionsList = merchant.commissionsList;
    const businessProfile = merchant.businessProfile;
    return (
        <Fragment>
            <TopHeader title={"Merchant's details"} />
            <ScreenContainer>
                <FlexCenteredBlock top={"64px"}>
                    <UserAvatar
                        width={"72px"}
                        height={"72px"}
                        avatar={merchant && merchant.avatar}
                    />
                    <DetailsName>
                        {merchant && merchant.firstName}{" "}
                        {merchant && merchant.lastName}
                    </DetailsName>
                    <DetailsDate>Last seen: {formatCreationDate(merchant && merchant.lastSeen)}</DetailsDate>
                    <DetailsContactBlock>
                        <DetailsContactOption>
                            <DetailsContactLink href={`tel:${merchant && merchant.msisdn}`}>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconHeight={"16px"}
                                    iconWidth={"16px"}
                                    Icon={PhoneIcon}
                                    top={"-12px"}
                                />
                                <DetailsContactText>Call Merchant</DetailsContactText>
                            </DetailsContactLink>
                        </DetailsContactOption>
                        <DetailsContactOption>
                            <DetailsContactLink href={`sms:${merchant && merchant.msisdn}`}>
                                <PageLogo
                                    background={"#fbb97c33"}
                                    width={"32px"}
                                    height={"32px"}
                                    iconHeight={"16px"}
                                    iconWidth={"16px"}
                                    Icon={SMSIcon}
                                />
                                <DetailsContactText>
                                    Send An SMS
                                </DetailsContactText>
                            </DetailsContactLink>
                        </DetailsContactOption>
                        <DetailsContactOption>
                            <DetailsContactLink href={`whatsapp://send?phone=${merchant && merchant.msisdn}`}>
                                <PageLogo
                                    background={"#64b16133"}
                                    width={"32px"}
                                    height={"32px"}
                                    iconHeight={"16px"}
                                    iconWidth={"16px"}
                                    Icon={WhatsAppIcon}
                                />
                                <DetailsContactText>
                                    Whatsapp Message
                                </DetailsContactText>
                            </DetailsContactLink>
                        </DetailsContactOption>
                    </DetailsContactBlock>
                </FlexCenteredBlock>
                <Space height={"20px"} />
                <DetailsBusinessDescription>
                    <DetailsBusinessDescriptionHeading>
                        <PageLogo
                            width={"32px"}
                            height={"32px"}
                            iconHeight={"16px"}
                            iconWidth={"16px"}
                            Icon={InfoIcon}
                        />
                        <ListHeading>User Information</ListHeading>
                    </DetailsBusinessDescriptionHeading>
                    <DetailsDescriptionBody left={"16px"}>
                        <InfoCategoryHeading>Address</InfoCategoryHeading>
                        <SecondaryText style={{ margin: "0" }}>
                            {businessProfile && businessProfile.streetAddress}
                            <br />
                            {businessProfile && businessProfile.lga} L.G.A.
                            <br />
                            {businessProfile && businessProfile.state}
                        </SecondaryText>
                    </DetailsDescriptionBody>
                    <DetailsDescriptionBody left={"16px"}>
                        <InfoCategoryHeading>Email Address</InfoCategoryHeading>
                        <SecondaryText style={{ margin: "0" }}>
                            {businessProfile && businessProfile.email}
                        </SecondaryText>
                    </DetailsDescriptionBody>
                    <DetailsDescriptionBody left={"16px"}>
                        <InfoCategoryHeading>Phone Number</InfoCategoryHeading>
                        <SecondaryText style={{ margin: "0" }}>
                            {businessProfile && businessProfile.businessPhoneNumber}
                        </SecondaryText>
                    </DetailsDescriptionBody>
                    <DetailsDescriptionBody left={"16px"}>
                        <InfoCategoryHeading>Shop</InfoCategoryHeading>
                        <SecondaryText style={{ margin: "0" }}>
                            <CategoryLabel>
                                {businessProfile && businessProfile.businessName}
                            </CategoryLabel>
                        </SecondaryText>
                    </DetailsDescriptionBody>
                </DetailsBusinessDescription>
                <Space height={"50px"} />
            </ScreenContainer>
        </Fragment>
    );
};

MerchantDetails.propTypes = {
    location: object
};

export default withRouter(MerchantDetails);
