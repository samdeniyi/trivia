import React, { useState } from "react";
import styled from 'styled-components';
import { string, func, bool } from "prop-types";
import { Message } from "../../../containers/MessageContainer";
import { Pad } from "../../pad";

const AnswerBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const AnswerVariantsBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const YesNoBlock = ({
    title,
    setAnswer,
    answer,
    name
}) => {
    const [yes, setYes] = useState(answer);

    return (
        <AnswerBlock>
            <Message bottom={"16px"}>{title}</Message>
            <AnswerVariantsBlock>
                <Pad
                    defaultChecked={answer || true}
                    name={name}
                    text={"No"}
                    handleClick={() => {
                        setAnswer(name, answer ? !answer : answer);
                        setYes(answer);
                    }}
                    yes={yes}
                />
                <Pad
                    defaultChecked={answer || false}
                    name={name}
                    text={"Yes"}
                    handleClick={() => {
                        setAnswer(name, answer ? answer : !answer);
                        setYes(answer);
                    }}
                    yes={yes}
                />
            </AnswerVariantsBlock>
        </AnswerBlock>
    );
};

YesNoBlock.propTypes = {
    title:     string,
    setAnswer: func,
    answer:    bool,
    name:      string
};