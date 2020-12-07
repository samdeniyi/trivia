import styled from "styled-components";

export const Button = styled.button`
	display: inline-block;
	background-color: #22a8ff;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	height: 48px;
	width: 100%;
	border: none;
	color: #fff;
	font-family: Montserrat;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	padding: 0;
	outline: none;

	&:focus::after {
		display: block;
	}
`;

