import styled from 'styled-components';
import { colors } from '../../../../../styles';
import { Field } from 'formik';

export const Space = styled.div`
    height: ${({val}) => val || "10px"};
`;

export const Text = styled.div`
    font-size: 14px;
    color: #56636d;
    margin: 15px 0 20px
`;

export const MapBox = styled.div`
    height: 477px;
    width: 100%;
    margin: 20px 0;
`;

export const InputField = styled(Field)`
border: none;
padding: '14px'};
height: 48px;
font-size: 14px;
width: 100%;
position: relative;
background-color: ${colors.border.default};
outline: none;

&:not(:placeholder-shown) {
    margin-top: 6px;
}

&:not(:placeholder-shown) + label {
    display: block;
}

&:-webkit-autofill,
&:-webkit-autofill:hover,
&:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px ${colors.border.default} inset !important;
}
`;