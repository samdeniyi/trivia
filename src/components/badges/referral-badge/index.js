import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { string, bool } from 'prop-types';
import { colors } from '../../../styles';

import { Badge } from '../../../containers/BadgeContainer';
import { SmallLightText, Title, SecondaryText } from '../../../containers/MessageContainer';
import { LogoImage } from '../../../components/logo'; 
import { ReactComponent as ShareIcon } from '../../../assets/share.svg';
import { SharePopup } from '../../popup';

const ReferralBadgeTitle = styled(SecondaryText)`
    font-family: monospace;
    position: absolute;
    margin-top: 4px;
    color: ${colors.white};
    font-size: 16px;
    opacity: .8;
    font-weight: 100;
    margin-bottom: 0;
`;

const BadgeDataToShare = styled(Title)`
    font-family: monospace;
    position: absolute;
    left: 16px;
    bottom: 16px;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 0;
    color: ${colors.white};
    letter-spacing: .5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 260px;
`;

const BadgeShareButton = styled.div`
    position: absolute;
    bottom: 32px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${colors.themeColor4};
    cursor: pointer;

    &::after {
        content: "Share";
        position: relative;
        top: 16px;
        left: 2px;
        text-align: center;
        color: ${colors.themeTextColor2};
        ${css`${SmallLightText}`};
    }
`;

const BadgeShareIcon = styled(LogoImage)``;

const ReferralBadge = ({
    top,
    bottom,
    right,
    left,
    embedded,
    opacity,
    title,
    shareData,
    url,
    marketingMessage,
    shareMessage,
    disabled
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Badge 
            background={colors.blue}
            height={"82px"}
            embedded={embedded || null}
            top={top || null}
            bottom={bottom || null}
            left={left || null}
            right={right || null}
            opacity={opacity}
        >
            <ReferralBadgeTitle>{title}</ReferralBadgeTitle>
            <BadgeDataToShare>{shareData}</BadgeDataToShare>
            <BadgeShareButton onClick={() => {
                if(disabled){
                  setOpen(false)
                }
                else {
                   setOpen(!open)
                }
            }}>
                <BadgeShareIcon>
                    <ShareIcon />
                </BadgeShareIcon>
                {open && (
                    <SharePopup
                        url={url}
                        marketingMessage={marketingMessage}
                        open={open}
                        setOpen={setOpen}
                        shareMessage={shareMessage}
                    />
                )}
            </BadgeShareButton>
         </Badge>
    );
};

ReferralBadge.propTypes = {
    top:              string,
    bottom:           string,
    left:             string,
    right:            string,
    embedded:         bool,
    title:            string,
    shareData:        string,
    url:              string,
    marketingMessage: string,
    shareMessage:     string
};

export default ReferralBadge;