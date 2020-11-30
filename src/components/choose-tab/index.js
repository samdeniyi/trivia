import React, { useState } from 'react';
import { string, func, arrayOf, shape, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '../../styles';
import { SubTitle } from '../../containers/MessageContainer';

const SelectVariantContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${({ top }) => top || null};
    margin-bottom: 24px;
`;

const Variant = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    height: 48px;
    cursor: pointer;
    border: 1px solid ${colors.border.default};
    background-color: ${({ bg }) => bg || colors.background.component};

    & > h5 {
        margin: 0 auto;
    }

    ${({ selected }) => selected && css`
        border: 1px solid ${colors.blue};

        & > h5 {
            color: ${colors.blue};
        }
    `}
`;

const LeftVariant = styled(Variant)`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    ${({ noBorderBottom }) => noBorderBottom && css`
        border-bottom-left-radius: unset;
    `}
`;

const RightVariant = styled(Variant)`
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    ${({ noBorderBottom }) => noBorderBottom && css`
        border-bottom-right-radius: unset;
    `}
`;

export const ChooseTab = ({
    variants,
    bg,
    top,
    defaultVariant = "left",
    noBorderBottom = false
}) => {
    const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

    return (
        <SelectVariantContainer top={top}>
            <LeftVariant
                bg={bg}
                noBorderBottom={noBorderBottom}
                selected={selectedVariant === "left"}
                onClick={() => {
                    variants[0].callback();
                    (selectedVariant !== "left") && setSelectedVariant("left");
                }} 
            >
                <SubTitle color={colors.themeTextColor3}>{variants[0].title}</SubTitle>
            </LeftVariant>
            <RightVariant
                bg={bg}
                noBorderBottom={noBorderBottom}
                selected={selectedVariant === "right"}
                onClick={() => {
                    variants[1].callback();
                    (selectedVariant !== "right") && setSelectedVariant("right");
                }}
            >
                <SubTitle color={colors.themeTextColor3}>{variants[1].title}</SubTitle>
            </RightVariant>
        </SelectVariantContainer>
    );
};

ChooseTab.propTypes = {
    bg:             string,
    noBorderBottom: bool,
    defaultVariant: string,
    variants: arrayOf(
        shape({ 
            title: string,
            callback: func
        })
    )
};