import styled from 'styled-components';
import { SubTitle, SecondaryText, SmallLightText } from '../../../../../containers/MessageContainer';
import { colors } from '../../../../../styles';
import WarningIcon from './assets/caution.svg';

export const ShopContainer = styled.div`
    margin: 64px 0 8px 0;
`;

export const ShopHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ShopBasicInfo = styled.div``;

export const ShopTitleText = styled(SubTitle)`
    font-weight: bolder;
    margin-bottom: ${({ bottom }) => bottom || null};
`;
 
export const ShopCreationDate = styled(SecondaryText)`
    margin: 5px 0 0 0;
`;

export const ShopContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(124px, 1fr));
    grid-gap: 16px;
    margin: 24px 0;
`;

export const ShopContentItem = styled.div`
    height: 116px;
    border-radius: 10px;
    background-color: ${({ bg }) => bg || null};
    padding: 16px;
    position: relative;
`;

export const ShopContentData = styled.div`
    margin-top: 16px;

    & > * {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
    }
`;

export const ShopContentHeading = styled(SecondaryText)`
    font-weight: 500;
    margin: 0 0 3px 0;
    color: ${({ color }) => color || null};
    line-height: 15px;
`;

export const ShopContentAmount = styled(SubTitle)`
    font-weight: 600;
    line-height: 18px;
    color: ${({ color }) => color || null};
`;

export const ShopWarning = styled.section`
    width: 100%;
    border-radius: 10px;
    padding: 16px;
    background-color: ${colors.myShop.warning};
    margin-top: 36px;
    position: relative;
`;

export const WarningTitleText = styled(SecondaryText)`
    margin: ${({ top }) => top || '3px'} 0 ${({ bottom }) => bottom || "0"} 0;

    & > strong {
        font-weight: 500;
    }
`;

export const WarningCountBadge = styled.div`
    &::before {
        content: url(${ WarningIcon });
        position: absolute;
        left: 8px;
    }    

    ${SmallLightText};
    width: 45px;
    height: 20px;
    border-radius: 10px;
    background-color: ${colors.red};
    color: ${colors.white};
    position: relative;
    padding: 4px 12px;
    text-align: end;
`;

export const ShopContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

export const ShopStatsContainer = styled.section`
    margin-bottom: 8px;
    position: relative;
`;

export const StatsBlock = styled.div`
    width: 100%;
    min-height: 400px;
    background-color: ${colors.white};
    border: 1px solid ${colors.border.default};
    border-top: none;
`;

export const NoSalesContainer = styled.div`
    width: 100%;
    border: 1px solid ${colors.border.default};
    border-radius: 13px;
`;

export const OverlayOptions = styled.div`
    position: fixed;
    bottom: 0;
    right: 16px;

    & > a > div {
        margin: 16px 0;
    }
`;

export const OverlayRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    margin: 16px 7px;
    transition: all 0.3s ease-in-out;
    &.animated_btn1, &.animated_btn2 {
        & .icon {
            transform: scale(0);
            animation: floatButtons 0.5s ease forwards;
            animation-delay: 0.1s;
            &:before, &:after {
                content: "";
                position: absolute;
                
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                
                background-color: white;
                opacity: 0.4;
                border-radius: inherit;
              }
              
              &:before {
                z-index: -2;
                animation: beat-before 1s ease 100ms infinite;
              }
              
              &:after {
                z-index: -1;
                animation: beat-after 2s ease 200ms infinite;
              }
        }
        & span {
            transform: scale(0);
            animation: animateText 0.2s ease forwards;
            animation-delay: 0.3s;
        }
        &:hover {
            transform: scale(0.98);
        }
    }

    &.animated_btn1 {
        & .icon {
            animation-delay: 0.3s;
            &:before, &:after {
                animation-delay: 0.7s;
            }
        }
        & span {
            animation-delay: 0.5s;
        }
    }
    &.close_btn {
        opacity: 1;
        margin: 0;
        margin-bottom: 16px;
        & span {
            animation: animateText 0.2s ease forwards;
        }
    }

    @keyframes floatButtons {
        0% {
            opacity: 0;
            transform: scale(0) rotateZ(0deg);
            box-shadow: 0px 0px 41px -15px rgba(255,255,255,0.86);
        }
        20% {
            opacity: 0;
            transform: scale(1.1) rotateZ(-3deg) translateY(46px);
        }
        50% {
            transform: scale(0.8) rotateZ(5deg) translateY(-5px);
        }
        70% {
            transform: scale(1.1) rotateZ(-3deg) translateY(2px);
            box-shadow: 0px 0px 6px 9px rgba(255,255,255,0.4);
        }
        100% {
            opasity: 1;
            transform: scale(1) rotateZ(0deg) translateY(0px);
            box-shadow: none;
        }
    }
    @keyframes beat-before {
        0% {
          transform: scale(1);
        }
        
        50% {
          transform: scale(1.15);
        }
    }
    
    @keyframes beat-after {
        0% {
            transform: scale(1);
        }
        
        50% {
            transform: scale(1.3);
        }
    }

    @keyframes animateText {
        0% {
            // transform: scale(0) translateX(50px) rotateY(0deg);
            opacity: 0;
            transform: scale(0);
        }

        50% {
            // transform: scale(1.7) translateX(-10px) rotateY(90deg);
            transform: scale(1.2);
        }
        
        100% {
            // transform: scale(1) translateX(0px) rotateY(0deg);
            opacity: 1;
            transform: scale(1);
        }
    }

`;

export const OverlayRowText = styled.span`
    font-size: 14px;
    font-weight: bolder;
    margin-right: ${({ right }) => right || "16px"};
    color: ${({ color }) => color || null};
`;

export const Space = styled.div`
    height: ${({val}) => val || "10px"};
`;
