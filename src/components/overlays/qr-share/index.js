import React, { useState } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { bool, func, string } from 'prop-types';
import { colors } from '../../../styles';
import { currentHost } from '../../../config/API';

import { SlidingOverlay } from '../../../containers/OverlayContainer';
import { TopHeader } from '../../header';
import { Close } from '../../../containers/HeaderContainer';
import { ViewContainer, FlexCenteredBlock } from '../../../containers/ScreenContainer';
import { UserAvatar } from '../../avatar';
import { SubTitle } from '../../../containers/MessageContainer';
import { ReactComponent as ShareIcon } from './assets/share_icon.svg';
import { SharePopup } from '../../popup';

const QrShareBody = styled(ViewContainer)`
    background: ${colors.blue};
    height: 100%;
`;

const QrShareBodyWrapper = styled.div`
    margin: 102px 52px 0 52px;
`;

const QrCodeWrapper = styled.div`
    background-color: ${colors.white};
    padding: 24px 28px;
    border-radius: 10px 10px 0 0;

    & > svg {
        position: relative;
        left: calc(50% - 64px);
    }
`;

const UserDataWrapper = styled(FlexCenteredBlock)`
    padding: 24px 28px;
    background-color: ${colors.skyBlue};
    border-radius: 0 0 10px 10px;
`;

const UserName = styled(SubTitle)`
    font-weight: 500;
    margin-top: 8px;
    line-height: 17px;
`;

const ShareBlock = styled(FlexCenteredBlock)`
    cursor: pointer;
    margin-top: 32px;
`;

const ShareText = styled(SubTitle)`
    margin-top: 5px;
    color: ${colors.white};
`;

export const QrShare = ({
    open,
    cancel,
    referralCode,
    fullName,
    avatar
}) => {
    const [openSharePopup, setOpenSharePopup] = useState(false);

    return open && (
        <SlidingOverlay>
            <TopHeader noBorderBottom backgroundColor={colors.blue} noArrow title={""}>
                <Close color={colors.white} onClick={cancel} left={"true"} />
            </TopHeader>
            <QrShareBody>
                <QrShareBodyWrapper>
                    <QrCodeWrapper>
                        <QRCode renderAs={"svg"} value={referralCode} bgColor={"transparent"} />
                    </QrCodeWrapper>
                    <UserDataWrapper>
                        <UserAvatar 
                            width={"48px"}
                            height={"48px"}
                            avatar={avatar}
                        />
                        <UserName>{fullName}</UserName>
                    </UserDataWrapper>
                </QrShareBodyWrapper>
                <ShareBlock onClick={() => setOpenSharePopup(!openSharePopup)}>
                    <ShareIcon width={"32px"} height={"32px"} />
                    <ShareText>Share</ShareText>
                </ShareBlock>
            </QrShareBody>
            {openSharePopup && (
                <SharePopup
                    url={`${currentHost}/launch?referralCode=${referralCode}`}
                    marketingMessage={"Share the referral code with your friends"}
                    open={openSharePopup}
                    setOpen={setOpenSharePopup}
                />
            )}
        </SlidingOverlay>
    );
};

QrShare.propTypes = {
    open: bool,
    setOpen: func,
    referralCode: string,
    fullName: string,
    avatar: string
};