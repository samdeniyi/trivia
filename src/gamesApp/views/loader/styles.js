import styled from 'styled-components';
import LoaderBg from '../../assets/backgrounds/loader-bg.svg';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    height: 100%;
    z-index: 99999;
    background-image: url(${LoaderBg});
    background-size: cover;
    background-color: #23a8ff;
    transition: all .2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoaderIconContainer= styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
`;

const BigFlashContainer= styled.div`
  position: relative;
  bottom: 80px;
  left: 63px;
`;

const SmallFlashContainer= styled.div`
  position: relative;
  top: 90px;
  right: 50px;
`;

const AnimationContainer = styled.div`
  width: 100%;
  animation-name: diagonal;
  animation-delay: 0.5s;
  animation-timing-function: ease;
  // animation: diagonal 0.5s ease;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: ${({ reverse }) => reverse ? 'alternate-reverse' : 'alternate'};
  @keyframes diagonal {
    0% {
      position: relative;
    }
    25% {
      position: relative;
      right: 2px;
      bottom: 2px;
    }
    50% {
      position: relative;
      right: 10px;
      bottom: 10px;
    }
    100% {
      position: relative;
      right: 20px;
      bottom: 20px;
    }
  }
  @-webkit-keyframes diagonal {
    0% {
      position: relative;
    }
    25% {
      position: relative;
      right: 2px;
      bottom: 2px;
    }
    50% {
      position: relative;
      right: 10px;
      bottom: 10px;
    }
    100% {
      position: relative;
      right: 20px;
      bottom: 20px;
    }
  }
`;


export {
  Overlay,
  LoaderIconContainer,
  AnimationContainer,
  BigFlashContainer,
  SmallFlashContainer,
}