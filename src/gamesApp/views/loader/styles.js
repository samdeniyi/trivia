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
  bottom: 100px;
  left: 50px;
`;

const SmallFlashContainer= styled.div`
  position: relative;
  top: 100px;
  right: 50px;
`;

const AnimationContainer = styled.div`
  width: 100%;
  animation: bounce 0.5s ease;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @keyframes bounce {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-15px);
    }
  }
  @-webkit-keyframes bounce {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-15px);
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