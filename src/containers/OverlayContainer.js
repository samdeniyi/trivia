import styled, { css } from 'styled-components';
import { colors } from '../styles';
import { ExtendComponent } from '../styles/hoc/extendComponent';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;
    z-index: ${({ zIndex }) => zIndex || '99'};
    background-color: ${({ nonSliding, bgc }) => nonSliding ? 'rgba(205, 205, 205, 45%)' : bgc ? bgc : 'rgba(255, 255, 255, 0.8)'};
    transition: all .2s ease-in;
`;

export const CenteredOverlay = styled(Overlay)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SlidingOverlayStyling = css`
    @keyframes slideOut {
        0% {
            top: 0;    
        }

        50% { 
            top: 50%; 
        }

        100% {
            top: 100%;
        }
    }

    @keyframes slideIn {
        0% {
            top: 100%;    
        }
        
        50% { 
            top: 50%; 
        }
        
        100% {
            top: 0;
        }
    }

    background-color: ${colors.white};
`;

export const ActionBlock = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || "column"};
    width: 100%;
    margin-top: ${({ top }) => top || null};
    margin-bottom: ${({ bottom }) => bottom || null};

    & > button {
        width: 100%;
    }
`;

export const SlidingOverlay = ExtendComponent(Overlay, SlidingOverlayStyling);