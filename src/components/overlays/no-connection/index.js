import React from 'react';
import { bool, func } from 'prop-types';
import { CenteredBlock } from '../../../containers/ScreenContainer';
import { Title, Message } from '../../../containers/MessageContainer';
import { SlidingOverlay, ActionBlock } from '../../../containers/OverlayContainer';
import { PageLogo } from '../../logo';
import NoConnectionIcon from './assets/no_connection.svg';
import { LightRippleButton, RippleButton } from '../../button';

export const NoConnection = ({
    open,
    setOpen,
    tryAgain
}) => {
    return open && (
        <SlidingOverlay>
            <CenteredBlock top={"16px"}>
                <PageLogo
                    Icon={NoConnectionIcon}
                    width={"184px"}
                    height={"184px"}
                    iconHeight={"auto"}
                    iconWidth={"auto"}
                    margin={"24px auto"}
                />
                <Title>No internet connection</Title>
                <Message
                    bottom={"24px"}
                    top={"0"}
                    align={"center"}
                >
                   Your action was not completed. Connect to the internet and try again.
                </Message>
                <ActionBlock direction={"column"} top={"101px"}>
                    <RippleButton
                        type={"button"}
                        onClick={() => setOpen(!open)}
                    >
                        Okay
                    </RippleButton>
                    <LightRippleButton
                        type={"button"}
                        onClick={tryAgain}
                    >
                        Try again
                    </LightRippleButton>
                </ActionBlock>
            </CenteredBlock>
        </SlidingOverlay>
    );
};

NoConnection.propTypes = {
    open:     bool,
    setOpen:  func,
    tryAgain: func
};