import React from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { FlexCenteredBlock } from '../../../containers/ScreenContainer';
import { PopUp, PopUpContent, InfoMessage, CancelButton } from '../common';
import { Overlay } from '../../../containers/OverlayContainer';
import { Title, SubTitle } from '../../../containers/MessageContainer';

const FlexCentered = styled(FlexCenteredBlock)`
    padding-top: 32px;
    padding-left: 16px;
    padding-right: 16px;
`;

const OkayButton = styled(CancelButton)`
    background-color: #f0f0f0;
    color: #6c7984;
`;

const ImageWithFallback = styled.img`
    width: ${({ iconWidth }) => iconWidth || '48px'};
    height: ${({ iconHeight }) => iconHeight || '48px'};
    background-image: ${({ fallback }) => `url(${fallback})` || null};
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: ${({ objectFit }) => objectFit || 'initial'};
`;

const NotifySpan = styled.span`
    margin-top: 24px;
    background-color: ${({ backgroundColor }) => backgroundColor || "#a7d9ff40"};
    border-radius: 10px;
    padding: 8px;
    display: inline-block;
`;

export const ComingSoon = ({
    open,
    cancel,
    icon,
    title,
    subtitle,
    notifyText,
    notifyBackgroundColor
}) => {
    return (
        <PopUp open={open}>
            <Overlay onClick={cancel}></Overlay>
            <PopUpContent>
                <FlexCentered>
                    <ImageWithFallback
                        src={icon}
                        iconWidth={"80px"}
                        iconHeight={"80px"}
                        alt={""}
                    />
                    <Title top={'24px'}>{title}</Title>
                    <SubTitle color={'#56636d'} top={'8px'} textAlign={'center'}>
                       {subtitle} 
                    </SubTitle>
                    <NotifySpan backgroundColor={notifyBackgroundColor}>
                        <InfoMessage top={"0px"} weight={"500"} align={"center"} size={"12px"} color={"#579fd7"}>
                            {notifyText}
                       </InfoMessage>
                    </NotifySpan>
                </FlexCentered>
                <OkayButton type="button" onClick={cancel}>Okay got it!</OkayButton>
            </PopUpContent>
        </PopUp>        
    );
};

ComingSoon.propTypes = {
    open: bool,
    setOpen: func
};