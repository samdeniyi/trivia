import React, {useEffect} from "react";
import styled from 'styled-components';


const Iframe = styled.iframe`
 width: 100%;
height: 100%;
position: absolute;
top: 0;
 border: none;
 background-color: inherit;
`;

const RedirectionModal = ({ open, authurl }) => {
    useEffect(() => {
        document.querySelector("#app-iframe").src = authurl;
    }, [authurl]);
    return (
        
        open && (
                <Iframe id={"app-iframe"}>
                </Iframe>

        )
    );
};

export default RedirectionModal;
