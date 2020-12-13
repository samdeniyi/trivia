import React, { Fragment } from "react";
import { bool } from "prop-types";
import {Overlay, LoaderIconContainer, AnimationContainer, BigFlashContainer, SmallFlashContainer} from './styles'
import LoaderTitle from '../../assets/icons/loader-title.svg';
import BigFlash from '../../assets/icons/loader-big-flash.svg';
import SmallFlash from '../../assets/icons/loader-small-flash.svg';


const Loader = ({open}) => {
  return (
    <Fragment>
      {open && (
        <Overlay>
          <LoaderIconContainer>
            <AnimationContainer>
              <BigFlashContainer>
                <img src={BigFlash} alt="loader title" />
              </BigFlashContainer>
            </AnimationContainer>
            <img src={LoaderTitle} alt="loader icon" />
            <SmallFlashContainer>
            <AnimationContainer>
              <img src={SmallFlash} alt="loader icon" />
            </AnimationContainer>
            </SmallFlashContainer>
          </LoaderIconContainer>
        </Overlay>
      )}
      
    </Fragment>
  );
};

Loader.propTypes = {
  open: bool,
};

export default Loader;
