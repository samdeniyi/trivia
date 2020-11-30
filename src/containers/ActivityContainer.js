import styled, { css } from 'styled-components';
import { colors } from '../styles';
import { Label } from './MessageContainer';

export const ActivityBlock = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 64px;
    padding: 16px 8px;
    border: 1px solid ${colors.gray3};
    border-radius: 13px;

    ${({ noBottomBorder }) =>
        noBottomBorder &&
        css`
            border-bottom: 0;
        `}
`;

export const ActivityLabel = styled(Label)`
    font-size: 12px;
    font-weight: 100;
    color: ${colors.themeTextColor3};
    line-height: 15px;
    margin: 0;
`;

export const ActivityGraphBlock = styled(ActivityBlock)`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${({ padding }) => padding || "24px 16px"};
`;

export const ActivitySummaryBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const ActivityTotal = styled.div`
    display: block;
`;