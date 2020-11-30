import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../styles';
import { RippleButton, RippleLink } from '../../components';
import SpacesLogo from '../../assets/spaces_logo.svg';
import LaunchBackground from './assets/launch_screen_bg.jpg';

const Launch = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(${LaunchBackground});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
`;

const AdvertisingSection = styled.section`
    position: fixed;
    bottom: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1em;
    width: 100%;
`;

const TermsAndConditions = styled.p `
    font-size: 1em;
    color: ${colors.themeTextColor1};
    margin-top: 35px;
    text-align: center;
    padding: 0 1em;
    line-height: 1.5em;
`;

const AdvertisingHeader = styled.p`
    font-size: 1em;
    color: ${colors.themeTextColor1};
    margin-top: 1.5em;
`;

export const LaunchScreen = () => {
    return (
        <Launch>
            <AdvertisingSection>
                <img src={SpacesLogo} alt="Spaces Logo" />
                <AdvertisingHeader>Start, manage and grow your business.</AdvertisingHeader>
                <RippleLink to="/phone-signup" style={{ width: "calc(100% - 16px)" }}>
                    <RippleButton type="button">Continue with phone number</RippleButton>
                </RippleLink>
                <TermsAndConditions>By continuing, you agree to our <Link to="/termsAndConditions">Terms</Link> and<Link to="/privacyPolicy"> Privacy Policy</Link></TermsAndConditions>
            </AdvertisingSection>
        </Launch>
    );
};