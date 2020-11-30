import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../../styles";
import { string, func, bool } from "prop-types";
import { useHistory, Link } from "react-router-dom";
import backArrow from "./assets/back.svg";

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    position: fixed;
    background-color: ${({ backgroundColor }) => backgroundColor || colors.white};
    z-index: 50;
    border-bottom: ${({ noBorderBottom }) => !noBorderBottom ? `1px solid ${colors.border.default}` : "none"};
    top: ${({withSpacesHeader}) => withSpacesHeader ? "7.2vh" : "0"};
`;

const Title = styled.h1`
    margin: 0;
    height: fit-content;
    font-family: ${fonts.main};
    font-size: 1em;
    font-weight: 500;
    letter-spacing: 0.04px;
    color: ${colors.themeTextColor1};
`;

const BackButtonWrapper = styled.div`
    padding: 16px;
    position: absolute;
    left: 0;
`;

const BackArrow = styled.div`
    width: 10px;
    height: 16px;
    cursor: pointer;
    background-image: url(${({ image }) => image || null});
    background-repeat: no-repeat;
    background-size: contain;
`;


export const TopHeader = ({
    title,
    backAction,
    noArrow,
    noTitle,
    children,
    backLink,
    backgroundColor,
    noBorderBottom,
    withSpacesHeader
}) => {
    const history = useHistory();
    return (
        <Header withSpacesHeader={withSpacesHeader} backgroundColor={backgroundColor} noBorderBottom={noBorderBottom}>
            {!noArrow && (
                <BackButtonWrapper
                    onClick={() => {
                        backAction && backAction();
                        if(!backLink) {
                         history.goBack();
                        }
                    }}
                >
                    {backLink? (<Link to={backLink}>
                    <BackArrow
                        role="button"
                        aria-label="Back button"
                        image={backArrow}
                    />
                    </Link>): <>
                    <BackArrow
                        role="button"
                        aria-label="Back button"
                        image={backArrow}
                    />
                    </>}

                </BackButtonWrapper>
            )}
            {!noTitle && <Title>{title}</Title>}
            {children}
        </Header>
    );
};

TopHeader.propTypes = {
    title: string.isRequired,
    backAction: func,
    noArrow: bool,
    noTitle: bool,
    backLink: string
};

