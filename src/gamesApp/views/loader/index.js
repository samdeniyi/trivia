import React, { Fragment } from "react";
import { bool } from "prop-types";
import { Overlay, LoaderIconContainer, AnimationContainer, BigFlashContainer, SmallFlashContainer } from './styles'
import LoaderTitle from '../../assets/icons/loader-title.svg';
import BigFlash from '../../assets/icons/loader-big-flash.svg';
import SmallFlash from '../../assets/icons/loader-small-flash.svg';

const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined'));
console.log('safari ??', isSafari);
const Loader = ({ loading }) => {
  return (
    <Fragment>
      {loading && (
        <Overlay>
          {isSafari ?
            <LoaderIconContainer>
              <BigFlashContainer>
                <img src={BigFlash} alt="loader title" />
              </BigFlashContainer>
              <img src={LoaderTitle} alt="loader icon" />
              <SmallFlashContainer>
                <img src={SmallFlash} alt="loader icon" />
              </SmallFlashContainer>
            </LoaderIconContainer>
            :
            <LoaderIconContainer>
              <BigFlashContainer>
                <AnimationContainer>
                  <img src={BigFlash} alt="loader title" />
                </AnimationContainer>
              </BigFlashContainer>
              <img src={LoaderTitle} alt="loader icon" />
              <SmallFlashContainer>
                <AnimationContainer reverse>
                  <img src={SmallFlash} alt="loader icon" />
                </AnimationContainer>
              </SmallFlashContainer>
            </LoaderIconContainer>}
        </Overlay>
      )}
    </Fragment>
  );
};

Loader.propTypes = {
  open: bool,
};

export default Loader;
