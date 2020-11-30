import styled from 'styled-components';
import { colors } from '../../../../styles';

export const PageTitle = styled.h4`
    font-size: 14px;
    font-weight: 500;
    margin-top: 24px;
    color: ${colors.themeTextColor1};
    line-height: 18px;
`;

export const PageCount = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 13px;
    color: ${colors.themeColor6};
`;

export const PageList = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px;
    padding: 33px 16px;
    height: 75vh;
    border-radius: 13px;
    border: 1px solid ${colors.gray3};
`;