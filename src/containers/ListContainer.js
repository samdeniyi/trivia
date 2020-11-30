import styled, { css } from 'styled-components';
import { colors, fonts } from '../styles';
import { SecondaryText, SmallLightText, SubTitle } from './MessageContainer';
import CheckedIcon from '../assets/checkmark.svg';

export const List = styled.ul`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: ${({ top }) => top || 0};
    border-bottom: ${({ noBorderBottom }) => noBorderBottom ? 'none' : `1px solid ${colors.border.bottom}`};
    margin: ${({ fullScreen }) => fullScreen && "0 -16px"};
    cursor: pointer;

    ${({ childLink }) => childLink && css`
        & > a:first-child {
            border-top: 1px solid ${colors.border.top};
        }
        & > a:not(:last-child) {
            border-bottom: 1px solid ${colors.border.bottom};
        };
    `};
`;

export const ListWithLetters = styled.ol`
    list-style-type: lower-latin;
`;

export const ListItem = styled.li`
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    position: relative;
    padding: ${({ padding }) => padding || '0 16px'};
    font-family: ${fonts.main};
    padding-top: ${({ top }) => top || "8px"};
    padding-bottom: ${({ bottom }) => bottom || null};
    min-height: ${({ height }) => height || "56px"};
    ${({ pressedUpList }) => pressedUpList ? css`
        &:not(:first-of-type) {
            border-top: 1px solid ${colors.border.top};
        }
    ` : css`
        border-top: 1px solid ${colors.border.top};
    `};
    &:not(:last-of-type) {
        border-bottom: ${({ borderBottom }) => borderBottom && `1px solid ${colors.border.bottom}`};
    };

    &:hover{
    background: #F2F5FA;
    };

`;

export const ListItemNoDivider = styled.li`
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    position: relative;
    padding: ${({ padding }) => padding || '0 1px'};
    font-family: ${fonts.main};
    padding-top: ${({ top }) => top || "8px"};
    padding-bottom: ${({ bottom }) => bottom || null};
`;

export const ListLeftBlock = styled.div`
    display: flex;
    flex-direction: column;
    //width: 100%;
    //background: #000000;
    margin-left: ${({ left }) => left || '16px'};
`;

export const ListHeading = styled.p`
    margin: 0;
    max-width: ${({ maxWidth }) => maxWidth ||'240px'};
    font-family: ${fonts.main};
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${colors.themeTextColor1};
    line-break: loose;
    height: fit-content;
    text-transform: capitalize;

    ${({ noHeadingWrap }) => noHeadingWrap ? null : css`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        // @media screen and (max-width: 360px) {
        //     max-width: ${({ maxWidth }) => maxWidth ||'220px'};
        // }
    `}
`;

export const ListSubHeading = styled(SecondaryText)`
    display: inline;
    font-weight: 100;
    height: fit-content;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: ${({ top }) => top ? `${top} 0 0 0` : '4px 0 0 0'};
    max-width: ${({ maxWidth }) => maxWidth ||'180px'};
`;

export const ListSubDetail = styled.span`
    ${SmallLightText}
    margin-top: 8px;
`;

export const ListHighlight = styled(ListHeading)`
    position: absolute;
    right: 16px;
`;

export const TransactionDetail = styled(ListHighlight)`
    top: ${({ top }) => top || null};
    min-width: auto;
    text-transform: uppercase;
    max-width: 240px;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const ListCheckedRow = styled(ListLeftBlock)`
    flex-direction: row;
    width: 100%;

    &.active {
        &:after {
            content: url(${CheckedIcon});
            position: absolute;
            top: 16px;
            right: 24px;
        }
    }
`;

export const ListPopUp = styled(ListLeftBlock)`
    width: 100%;
`;

export const AlphabetList = styled.ul`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const AlphabetItems = styled.ul`
    flex-direction: column;
    margin: 0;
    padding: 0;
    position: relative;
`;

export const AlphabetSortedItems = styled(ListItem)`
    position: relative;
    align-items: center;
    padding: 16px;
    margin-left: 0;
    border-top: 1px solid ${colors.border.top};
    border-bottom: 1px solid ${colors.border.bottom};
`;

export const AlphabetLetter = styled(SubTitle)`
    font-weight: 100;
    margin: 24px 16px;
`;

export const ListWithCounter = styled.ol`
    counter-reset: item;
    padding-left: 10px;
    & li {
        display: block;
        margin-top: 30px;
        &::before {
            content: counters(item, ".") ".";
            counter-increment: item;
            margin-right: 10px;
        }
        ol {
            padding-left: 0;
        }
        li {
            margin-top: 30px;
            display: flex;
           ol {
                padding-left: 0;
            }
        }
    }
`;

export const EmptyList = styled.div`
    margin-top: 32px;
`;

export const NoRecordFoundTitle = styled(SecondaryText)`
    margin-left: 16px;
`;
