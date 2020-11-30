import { func, string, bool } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Message } from '../../../containers/MessageContainer';
import { Pad } from '../../pad';
import { colors, fonts } from '../../../styles';

const AnswerBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const AnswerVariantsBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
    opacity: ${({ disabled }) => disabled ? '0.7' : '1'};
`;

const ErrorMessage = styled.div`
    color: ${colors.red};
    font-family: ${fonts.main};
    margin-top: 8px;
    font-size: 12px;
    font-weight: 400;
`;

export const SelectGender = ({
    title,
    setAnswer,
    answer,
    name,
    errors,
    disabled = false
}) => {
    return (
        <AnswerBlock>
            <Message bottom={"16px"}>{title}</Message>
            <AnswerVariantsBlock disabled={disabled}>
                <Pad
                    defaultChecked={answer === "MALE"}
                    name={name}
                    text={"MALE"}
                    yes={answer === "MALE"}
                    handleClick={() => answer !== "MALE" && setAnswer(name, "MALE")}
                />
                <Pad
                    defaultChecked={answer === "FEMALE"}
                    name={name}
                    text={"FEMALE"}
                    yes={answer === "FEMALE"}
                    handleClick={() => answer !== "FEMALE" && setAnswer(name, "FEMALE")}
                />
            </AnswerVariantsBlock>
            {errors && (<ErrorMessage>{errors}</ErrorMessage>)}
        </AnswerBlock>
    );
};

SelectGender.propTypes = {
    title: string,
    setAnswer: func,
    answer: string,
    name: string,
    errors: string,
    disabled: bool,
};