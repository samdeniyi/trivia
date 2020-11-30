import styled from "styled-components";
import { colors, fonts } from "../../../styles";
import { RippleButton } from "../../button";
import { Title, SecondaryText } from "../../../containers/MessageContainer";

export const ResultBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
`;

export const ResultHeader = styled(Title)`
    margin-top: 32px;
`;

export const ResultText = styled(SecondaryText)`
    font-family: ${fonts.main};
    font-size: 14px;
    text-align: center;
    margin: 8px 0 48px 0;
`;

export const CancelButton = styled(RippleButton)`
    color: ${colors.blue};
    background-color: ${colors.blueish};
`;

export const Result = styled.strong`
    line-height: 18px;
    font-weight: 500;
    color: ${colors.themeTextColor3};
`;