import React from 'react'
import styled from 'styled-components';
import { func, bool, string } from "prop-types";
import { colors } from '../../../../styles';

import { CenteredOverlay, ActionBlock } from '../../../../containers/OverlayContainer';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { ResultBlock, ResultHeader, ResultText } from '../common';
import { RippleButton, RippleLink } from '../../../button';
import { CancelButton } from '../../../popup/common';
import { ReactComponent as SuccessIcon } from '../assets/success.svg';

const ShopName = styled.strong`
    font-weight: 500;
`;

export const ShopCreationResult = ({
    open,
    cancel,
    shopName,
    addStaff
}) => {
    return open && (
        <CenteredOverlay opacity={"100%"} background={colors.white}>
            <ScreenContainer>
                <ResultBlock>
                    <SuccessIcon />
                    <ResultHeader>Shop setup successfully</ResultHeader>
                    <ResultText>
                        Your shop <ShopName>{shopName}</ShopName> has been setup successfully. Add your staff to manage your shop.
                    </ResultText>
                    <ActionBlock>
                        <RippleLink to={"/actions/shops"}>
                            <RippleButton onClick={addStaff}>Add your staff</RippleButton>
                        </RippleLink>
                        <RippleLink to={"/actions/shops"}>
                            <CancelButton onClick={cancel}>I’ll do this later</CancelButton>
                        </RippleLink>
                    </ActionBlock>
                </ResultBlock>
            </ScreenContainer>
        </CenteredOverlay>
    );
};

ShopCreationResult.propTypes = {
    open:     bool,
    cancel:   func,
    addStaff: func,
    shopName: string
};