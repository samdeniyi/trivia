import React from 'react';
import styled from 'styled-components';

import loadBackground from './assets/loaderBg.svg';
import { ReactComponent as SpacesLogo } from '../../assets/spaces_logo.svg';

const Logo = styled(SpacesLogo)`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: breathing 2s ease-out infinite normal;

    @keyframes breathing {
        0% {
            transform: scale(0.9);
        }
      
        50% {
            transform: scale(1);
        }
      
        100% {
          transform: scale(0.9);
        }
    }
`;

const Overlay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(${props => props.background});
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 9999;
`;

export const Loader = () => {
    return (
        <Overlay background={loadBackground}>
            <Logo></Logo>
        </Overlay>
    );
};