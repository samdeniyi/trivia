import React from 'react';
import { colors } from '../../../../styles';
import { string, bool, func } from 'prop-types';

import { CenteredOverlay, ActionBlock } from '../../../../containers/OverlayContainer';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { ResultBlock, ResultHeader, ResultText, CancelButton, Result } from '../common';
import { RippleButton } from '../../../button';
import { ReactComponent as SuccessBanner } from '../assets/success.svg';

export const TeamCreationResult = ({
    open,
    toggleOpen,
    teamName,
    addTeamAgents
}) => {
    return open && (
        <CenteredOverlay opacity={"100%"} background={colors.white}>
            <ScreenContainer>
                <ResultBlock>
                    <SuccessBanner />
                    <ResultHeader>Team created successfully</ResultHeader>
                    <ResultText>
                        Your team <Result>{teamName}</Result> has been created successfully
                    </ResultText>
                    <ActionBlock>
                        <RippleButton onClick={addTeamAgents}>Add agents to team</RippleButton>
                        <CancelButton onClick={toggleOpen}>Okay, got it</CancelButton>
                    </ActionBlock>
                </ResultBlock>
            </ScreenContainer>
        </CenteredOverlay>
    );
};

TeamCreationResult.propTypes = {
    open:             bool,
    toggleOpen:       func,
    teamName:         string,
    addTeamAgents:    func
};