import React, { useEffect } from 'react';
import styled from 'styled-components';
import { bool, func, string } from 'prop-types';
import { TopHeader } from '../header';
import { Close } from '../../containers/HeaderContainer';
import { Overlay } from '../../containers/OverlayContainer';

const Iframe = styled.iframe`
    width: 100%;
    height: calc(100% - 56px);
    border: none
`;

export const AppIframe = ({
    open,
    setOpen,
    url,
    title,
    onLoad
}) => {

    useEffect(() => {
        document.querySelector("#app-iframe").src = url;
    }, [url]);
    return open && (
        <Overlay opacity={"100%"}>
            <TopHeader title={title} noArrow>
                <Close left={"16px"} onClick={() => setOpen(!open)} />
            </TopHeader>
            <Iframe id={"app-iframe"} onLoad={onLoad}>
            </Iframe>
        </Overlay>
    );
};

AppIframe.propTypes = {
    open: bool,
    setOpen: func,
    onLoad: func,
    url: string,
    title: string
};