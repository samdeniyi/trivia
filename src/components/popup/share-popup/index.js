import React from 'react';
import styled from 'styled-components';
import { InfoPopupDialog } from '../info-popup';
import { bool, func, string } from 'prop-types';
import { 
    FacebookShareButton, 
    FacebookIcon, 
    TwitterIcon, 
    TwitterShareButton,
    EmailIcon,
    EmailShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import { ReactComponent as SMSIcon }   from './assets/sms.svg';

const SocialMediaOptions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 24px;
`;

const SMSShareButton = styled.a`
    background-color: transparent;
    border: none;
    padding: 0px;
    font: inherit;
    color: inherit;
    cursor: pointer;
    appearance: button;
    text-transform: none;

    & > svg {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }
`;

export const SharePopup = ({
    open,
    setOpen,
    marketingMessage,
    url,
    title = "Share",
    shareMessage = "Share the referral code with your friends"
}) => (
    <InfoPopupDialog
        open={open}
        cancel={() => setOpen(!open)}
        title={title}
        message={shareMessage}
    >
        <SocialMediaOptions>
            <FacebookShareButton url={url} title={marketingMessage}>
                <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={marketingMessage}>
                <TwitterIcon size={48} round />
            </TwitterShareButton>
            <EmailShareButton body={marketingMessage.concat(url)}>
                <EmailIcon size={48} round />
            </EmailShareButton>
            <WhatsappShareButton url={url} title={marketingMessage}>
                <WhatsappIcon size={48} round />
            </WhatsappShareButton>
            <SMSShareButton href={`sms:;?&body=${marketingMessage.concat(url)}`}>
                <SMSIcon></SMSIcon>
            </SMSShareButton>
        </SocialMediaOptions>
    </InfoPopupDialog>
);

SharePopup.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
    marketingMessage: string.isRequired,
    url: string.isRequired,
    title: string,
    shareMessage: string
};