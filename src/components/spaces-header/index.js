import React from "react";
import styled from "styled-components";
import History from '../../utils/History'

import {ReactComponent as BackArrowWhite} from "../../assets/arrow-back-white.svg";
import {ReactComponent as SpacesIcon} from "../../assets/group-white.svg";

const Header = styled.div`
    display:flex;
    align-items: center;
    position: fixed;
    padding: 16px;
    width:100%;
    background: #3EA8FF;
    z-index:100;
    height: 7.2vh;
    box-sizing: border-box;
`;

const HeaderButton = styled.div`
background: #53BBFF;
display:flex;
align-items: center;
justify-content: center;
width: 10%;
min-width: 60px;
border-radius: 30px;
height: 24px;
cursor: pointer;

&:active{
opacity: 0.5;
}
`;
const Placeholder = styled.div`
height: 7.2vh;
width: 100%;`

export const SpacesHeader = () => (
    <Placeholder><Header>
        <HeaderButton onClick={() => History.push('/')}>
            <BackArrowWhite/>
            <SpacesIcon style={{margin: "0 4px 0 10px"}}/>
        </HeaderButton>
    </Header>
    </Placeholder>)