import styled from 'styled-components'; 
import { colors } from '../../../../styles';

export const TeamsList = styled.ul`
    display: grid;
    padding: 16px;
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    grid-gap: 16px;
`;

export const TeamItem = styled.li`
    position: relative;
    background-color: ${colors.themeColor5};
    min-width: 140px;
    max-width: 100%;
    min-height: 140px;
    max-height: 168px;
    border-radius: 10px;
    padding: 16px;
`;

export const TeamItemHeading = styled.h5`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    max-width: 100px;
    max-height: 36px;
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    color: #212c3d;
    color: ${colors.themeTextColor1};
    margin-bottom: 8px;
`;

export const TeamItemSubHeading = styled.span`
    font-size: 10px;
    line-height: 13px;
    font-weight: 100;
`;

export const TeamsAvatarsReel = styled.ul`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    margin-bottom: 8px;
    overflow-y: hidden;

    & > img {
        margin-right: 4px;
    }
`;
