import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    max-height: 50%;
    z-index: ${({ zIndex }) => zIndex || '99'};
    background-color: ${({ nonSliding, bgc }) => nonSliding ? 'rgba(205, 205, 205, 45%)' : bgc ? bgc : 'rgba(255, 255, 255, 0.8)'};
    transition: all .2s ease-in;
`;

export const PopUp = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    font-family: Montserrat;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    position: fixed;
    //top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: ${({ zIndex }) => zIndex || '1000'};
    padding: 8px;
    max-height: 50%;
    transition: opacity 0.5s linear;
    opacity: 1;
    animation: openPopup 0.3s ease-out;
    @keyframes openPopup {
        0% {
            transform: translateY(100%);
        }

        100% {
            transform: translateY(0%);
        }
`;