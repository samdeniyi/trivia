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
  bottom: 97px;
  left: 40px;
`;

const SmallFlashContainer= styled.div`
  position: relative;
  top: 70px;
  right: 70px;
`;

// Does not work with Safari
const AlternateAnimationContainer = styled.div`
  width: 100%;
  animation-name: diagonal;
  animation-delay: 0.5s;
  animation-timing-function: ease;
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

// Works with Safari 
const AnimationContainer = styled.div`
  width: 100%;
  -webkit-animation-name: diagonal;
  -webkit-animation-delay: 0.5s;
  -webkit-animation-timing-function: ease;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: ${({ reverse }) => reverse ? 'alternate-reverse' : 'alternate'};
  
  animation-name: diagonal;
  animation-delay: 0.5s;
  animation-timing-function: ease;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: ${({ reverse }) => reverse ? 'alternate-reverse' : 'alternate'};

  @-webkit-keyframes diagonal {
    0% {
      transform: translatex(0px) translatey(0px)
    }
    25% {
      transform: translatex(10px) translatey(10px);
    }
    50% {
      transform: translatex(15px) translatey(15px);
    }
    100% {
      transform: translatex(20px) translatey(20px);
    }
  }
  @keyframes diagonal {
    0% {
      transform: translatex(0px) translatey(0px)
    }
    25% {
      transform: translatex(10px) translatey(10px);
    }
    50% {
      transform: translatex(15px) translatey(15px);
    }
    100% {
      transform: translatex(20px) translatey(20px);
    }
  }
`;


export {
  Overlay,
  LoaderIconContainer,
  AnimationContainer,
  BigFlashContainer,
  SmallFlashContainer,
  AlternateAnimationContainer,
}