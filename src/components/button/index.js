import styled from "styled-components";
import {colors, fonts} from "../../styles";
import {ExtendComponent} from "../../styles/hoc/extendComponent";
import {Link} from 'react-router-dom';

const Button = styled.button`
	display: inline-block;
	background-color: ${colors.blue};
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	height: 48px;
	width: 100%;
	border: none;
	margin-top: ${({top}) => top || '32px'};
	color: ${colors.white};
	font-family: ${fonts.main};
	cursor: pointer;
	position: relative;
	overflow: hidden;
	padding: 0;
	outline: none;

	&:focus::after {
		display: block;
	}
`;

export const InlineButton = styled.button`
	display: inline-block;
	margin: 0;
	padding: 0;
	border: none;
	background: transparent;
	font-family: ${fonts.main};
	font-size: 12px;
	font-weight: lighter;
	color: ${colors.blue};
	position: relative;
	overflow: hidden;
	cursor: pointer;

	&:focus::after {
		display: block;
	}
`;

const TextLabel = styled.label`
	&:active::after {
		display: block;
		margin: 0;
		top: calc(50% - 6px);
		left: calc(50% - 3px);
		max-width: 6px;
		max-height: 6px;
	}
`;

export const RippleEffect = `
	&::after {
		display: none;
		content: "";
		position: absolute;
		border-radius: 50%;
		background-color: ${colors.background.ripple};
		width: 100px;
		height: 100px;
		margin-top: -50px;
		margin-left: -50px;
		top: 50%;
		left: 50%;
		animation: ripple 1.5s;
		opacity: 0;
	}

	@keyframes ripple {
		from {
			opacity: 1;
			transform: scale(0);
		}

		to {
			opacity: 0;
			transform: scale(10);
		}
	}
`;

export const RippleInlineButton = ExtendComponent(InlineButton, ``);
export const RippleButton = ExtendComponent(Button, `
      position: relative;
        z-index: 5;
        &:after{
          content: "";
                position: absolute;
                left: 50%;
                top:50%;
                 margin: -15px 0 0 -30px;
                background: #305776;
                border-radius: 45%;
                z-index: -1;
        };
        &:active:after{
                height: 30px;
                width: 60px;
                display: block;
                transform: scale(30);
                transition: 1s;
        };

    `);
export const RippleLabel = ExtendComponent(TextLabel, ``);
export const RippleLink = ExtendComponent(Link, `
`);

export const FloatingButtonWrapper = styled.div`
	position: sticky;
	bottom: 0;
	z-index: 10000;
	padding: 20px 20px;
	background: white;
`;

export const FloatingButton = styled(RippleButton)`
	margin: 0 16px;
	width: calc(100% - 32px);
`;

export const LightRippleButton = styled(RippleButton)`
	background-color: ${colors.blueish};
	color: ${colors.blue};
	      &:after{
          content: "";
                position: absolute;
                left: 50%;
                top:50%;
                margin: -15px 0 0 -30px;
                background: #cfd0d1;
                border-radius: 45%;
                z-index: -1;
        };
`;