import styled, { css } from 'styled-components';
import { colors, fonts } from '../styles';

export const Message = styled.h3`
    text-align: ${({ align }) => align || null};
    padding: ${({ padding }) => padding || null};
    font-family: ${fonts.main};
    font-size: ${({ size }) => size || '14px'};
    font-weight: ${({ weight }) => weight || 100};
    color: ${({ color }) => color || colors.themeTextColor3};
    line-height: ${({ lineHeight }) => lineHeight || '18px'};
    margin-top: ${({ top }) => top || '24px'};
    margin-bottom: ${({ bottom }) => bottom || null};
    margin-left: ${({ left }) => left || null};
`;

export const Label = styled.p`
    margin-top: ${({ top }) => top || '1.5em'};
    margin-bottom: ${({ bottom }) => bottom || '1em'};
    height: fit-content;
    width: fit-content;
`;

export const ResendCode = styled.p`
    margin-top: 39px;
    text-align: center;
    color: ${({ color }) => (color === 'primary') ? colors.themeTextColor1 : 'blue'};
    font-size: 1em;
    font-weight: 300;
    cursor: pointer;
    background: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ResendLabel = styled.p`
    margin-top: 40px;
    text-align: center;
    color: ${colors.themeTextColor1};
`;

export const Title = styled.h2`
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 500;
    text-align: ${({ textAlign }) => textAlign || 'center'};
    color: ${colors.themeTextColor1};
    margin-top: ${({ top }) => top || null};
    margin-left: ${({ left }) => left || null};
`;

export const SubTitle = styled.h5`
    font-size: ${({font}) => font || "14px"};
    font-weight: 500;
    text-align: ${({ textAlign }) => textAlign || null};
    color: ${({color}) => color || colors.themeTextColor1};
    margin-top: ${({ top }) => top || null};
    margin-left: ${({ left }) => left || null};
    margin-bottom: ${({bottom}) => bottom || null};
`;

export const SecondaryText = styled(Label)`
    font-size: 12px;
    font-weight: ${({ weight }) => weight || '100'};
    color: ${colors.themeTextColor3};
    line-height: 15px;
    margin-top: ${({ top }) => top || null};
`;

export const SecondaryStrongText = styled.strong`
    font-family: ${fonts.main};
    color: ${colors.lightBoldBlue};
`;

export const SmallLightText = `
    font-family: ${fonts.main};
    font-weight: 100;
    font-size: 10px;
`;

export const TransactionAmount = styled.span`
    font-size: 18px;
    font-weight: 500;
    margin: 16px 0 24px 0;
    ${({ type }) => (type === "PENDING") && css`
        color: ${colors.transactions.pending};
    `};
    ${({ type }) => (type === "PAID") && css`
        color: ${colors.transactions.paid};
    `};
    ${({ type }) => (type === "WITHDRAWAL") && css`
        color: ${colors.transactions.withDrawal};
    `};
`;

export const TransactionStatus = styled.span`
    font-size: 14px;
    font-weight: 500;
    ${({ type }) => (type === "PENDING") && css`
        color: ${colors.transactions.pending};
    `};
    ${({ type }) => (type === "PAID") && css`
        color: ${colors.transactions.paid};
    `};
    ${({ type }) => (type === "WITHDRAWAL") && css`
        color: ${colors.transactions.withDrawal};
    `};
`;

export const CategoryLabel = styled.span`
    position: relative;
    padding: ${({ padding }) => padding || '4px 8px'};
    min-height: ${({ height }) => height || "24px"};
    min-width: ${({ width }) => width || "74px"};
    border-radius: 8px;
    background-color: ${colors.blueish};
    font-family: ${fonts.main};
    font-size: 12px;
    line-height: 16px;
    color: ${colors.blue};
`;

export const Error = styled.span`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
    color: ${colors.red};
    margin-top: ${({ top }) => top || '16px'};
    margin-left: ${({ left }) => left || null};
    margin-bottom: ${({ bottom }) => bottom || null};
    ${SmallLightText};
`;

export const PageCount = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 13px;
    color: ${colors.themeColor6};
    margin-bottom: ${({ bottom }) => bottom || null};
`;

export const CategoryRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 35px 0 ${({ bottom }) => bottom || '27px'} 0;
`;

export const CategoryTitle = styled.h4`
    font-weight: 700;
    text-transform: ${({ noTransform }) => noTransform ? 'none' : 'uppercase'};
    font-size: 14px;
    margin-left: 8px;
`;

export const BoldText = styled.span`
    font-weight: bold;
`;

export const UnderlinedText = styled.span`
    text-decoration: underline;
`;

export const PageSeeAll = styled.p`
    margin: 0;
    font-family: ${fonts.main};
    font-size: 12px;
    font-weight: 500;
    color: ${colors.blue};
`;

export const ShowOption = styled.p`
    margin: 24px 0;
    font-size: 12px;
    font-weight: 100;
    color: ${colors.themeTextColor1};
`;