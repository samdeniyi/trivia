import React from 'react';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';
import { FlexCenteredBlock } from '../../../containers/ScreenContainer';
import { Title, SubTitle } from '../../../containers/MessageContainer';
import { PopUp, PopUpContent, OkayCancelButton, PopUpHeader } from '../common';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { ReactComponent as MarketplaceIcon } from './assets/marketplace.svg';
import { ReferralBadge } from '../../badges';

const BadgeWrapper = styled.div`
    margin: 16px 0;
    padding: 0 8px;
`;

const EmptyStateContent = styled(FlexCenteredBlock)`
    padding: 43px 16px 50px 16px;
`;

export const StorefrontLinksPopup = ({
    open,
    cancel,
    merchbuyLink,
    merchlistLink
}) => {
    return open && (
        <PopUp open={open}>
            <Overlay bgc={"rgba(0, 0, 0, 0.45)"} onClick={cancel}></Overlay>
            <PopUpContent>
                {(merchbuyLink || merchlistLink) && (
                    <PopUpHeader align={"center"}>Share Marketplace Links</PopUpHeader>
                )}
                {(!merchbuyLink && !merchlistLink) ? (
                    <EmptyStateContent>
                        <MarketplaceIcon />
                        <Title top={"34px"}>No marketplace listings</Title>
                        <SubTitle top={"8px"}>You have not made your shop visible on any marketplace listings</SubTitle>
                    </EmptyStateContent>
                ) :
                (<BadgeWrapper>
                    {merchlistLink && (
                        <ReferralBadge
                            embedded={true}
                            shareData={merchlistLink}
                            marketingMessage={`Visit my shop on Merchlist`}
                            url={merchlistLink}
                            shareMessage={merchlistLink}
                            title={"Merchlist"}
                        />
                    )}
                    {merchbuyLink && (
                        <ReferralBadge
                            embedded={true}
                            //shareData={merchbuyLink}
                            marketingMessage={`Visit my shop on Merchbuy`}
                            top={"16px"}
                            disabled={true}
                            //url={merchbuyLink}
                            shareMessage={"Share the link to your shop with your friends"}
                            title={"Merchbuy"}
                            opacity={'0.6'}
                        />
                    )}
                </BadgeWrapper>)}
                <ActionBlock top={"24px"}>
                    <OkayCancelButton type="button" onClick={cancel}>Cancel</OkayCancelButton>
                </ActionBlock>
            </PopUpContent>
        </PopUp>
    );
};

StorefrontLinksPopup.propTypes = {
    open:          bool,
    cancel:        func,
    merchbuyLink:  string,
    merchlistLink: string
};