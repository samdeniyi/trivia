import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import { colors } from '../../../styles';
import { Badge } from '../../../containers/BadgeContainer';
import { SmallLightText, SecondaryText } from '../../../containers/MessageContainer';
import { PageLogo } from '../../logo';
import CopyIcon from '../../../assets/copy.svg';
import { toast } from "react-toastify";

const ReferralCode = styled.input`
    color: ${colors.badge.lightBlue.text};
    width: min-content;
    // margin: 0 auto;
    appearance: none;
    background: none;
    text-align: left;
    outline: none;
    border: none;
    margin-top: 32px;
`;

const CenteredBadge = styled(Badge)`
    display: flex;
    flex-direction: column;
    //justify-content: center;
`;

const ReferralBadgeTitle = styled(SecondaryText)`
    font-family: monospace;
    position: absolute;
    margin-top: 0px;
    color: #62a9dc;
    font-size: 16px;
    opacity: .8;
    font-weight: 100;
`;

const CopyReferralCode = styled.div`
    position: absolute;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
    cursor: pointer;

    &:after {
        content: "Copy";
        ${SmallLightText};
        position: absolute;
        top: 36px;
        color: ${colors.badge.lightBlue.text};
    }
`;

const CopyReferralBadge = ({
    referralCode,
    embedded = false,
    top
}) => {
    return (
        <CenteredBadge
            background={colors.badge.lightBlue.bg}
            height={"66px"}
            embedded={embedded || null}
            top={top || null}
        >
            <ReferralBadgeTitle>Referral Code</ReferralBadgeTitle>
            <ReferralCode id={"referralCode"} readOnly value={referralCode} />        
            <CopyReferralCode 
                type={"button"} 
                onClick={() => {
                    document.querySelector("#referralCode").select();
                    document.execCommand("copy");
                    toast.success("copied to clipboard!");
                }}
            >
                <PageLogo 
                    width={"32px"}
                    height={"32px"}
                    iconWidth={"16px"}
                    iconHeight={"16px"}
                    background={colors.white}
                    Icon={CopyIcon}
                />
            </CopyReferralCode>
        </CenteredBadge>
    );
};

CopyReferralBadge.propTypes = {
    referralCode: string,
    embedded:     bool,
    top:          string
};

export default CopyReferralBadge;