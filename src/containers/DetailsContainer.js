import styled from 'styled-components';
import { RippleLink } from "../components";
import { SecondaryText } from "./MessageContainer";
import { ListHeading } from "./ListContainer";
import { colors } from '../styles';
import { PageCount } from './MessageContainer';

export const DetailsName = styled(ListHeading)`
    margin: 1em 0 4px 0;
`;

export const DetailsDate = styled(SecondaryText)`
    margin: 0;
`;

export const DetailsCommissionLink = styled(RippleLink)`
    position: absolute;
    top: 28px;
    right: 24px;
`;

export const DetailsContactBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${({ top }) => top || "16px"};

    & > div {
        margin-right: 16px;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

export const DetailsBadgeHeading = styled.h5`
    font-size: 12px;
    font-weight: 100;
    line-height: 15px;
    margin-top: ${({ top }) => top || '8px'};
    color: ${colors.themeTextColor3};
`;

export const DetailsBadgeCommisionsAmount = styled(ListHeading)`
    font-weight: bold;
    margin: 4px 0 0 0;
`;

export const DetailsContactOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

export const DetailsContactText = styled(PageCount)``;

export const DetailsContactLink = styled.a`
    text-align: center;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > span {
        max-width: 67px;
        max-height: 26px;
        text-align: center;
        margin-top: 8px;
    }
`;

export const DetailsHighlight = styled.div`
    position: absolute;
    right: 16px;
`;

export const DetailsBusinessDescription = styled.section`
    width: 100%;
    border: 1px solid ${colors.gray3};
    border-radius: 13px;
    min-height: 132px;
    margin-top: ${({ top }) => top || null};
    padding: 16px 0 ${({ noBottomPadding }) => noBottomPadding ? '0' : '16px'} 0};
    
    // &:not(:last-of-type) {
    //     margin: 24px 0 12px 0;
    // }
`;

export const DetailsBusinessDescriptionHeading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
    margin-bottom: ${({ bottom }) => bottom || null};

    & > p {
        margin-left: 8px;
    }
`;

export const DetailsDescriptionBody = styled.div`
    margin-top: 16px;
    padding-left: ${({ left }) => left || null};

    & > p {
        text-align: left;
        max-width: 70%;
        color: ${colors.themeTextColor1};
    }
`;