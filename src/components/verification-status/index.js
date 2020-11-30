import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { string } from 'prop-types';
import { colors } from "../../styles";
import { ReactComponent as PendingIcon } from './assets/clock.svg';
import { ReactComponent as UnapprovedIcon } from './assets/wrong.svg';
import { ReactComponent as ApprovedIcon } from './assets/good.svg';

const VerificationStatusWrapper = styled.div`
    border-radius: 100px;
    background: ${({bgc}) => bgc || 'none'};
    margin: 4px 16px;
    display: flex;
    padding: 2px 6px;
    width: fit-content;
`;

const StatusText = styled.span`
    font-size: 10px;
    margin-left: 4px;
    color: ${({color}) => color || colors.themeTextColor1};
    white-space: nowrap;
`;

export const VerificationStatus = ({ 
    status
}) => {
    const [statusText, setStatusText] = useState('');
    const [color, setColor] = useState('');
    const [icon, setIcon] = useState('');
    const [bg, setBg] = useState('');

    useEffect(() => {
        if(status === 'INCOMPLETE' || status === 'REJECTED') {
            setStatusText('Unapproved');
            setColor(colors.red);
            setIcon(<UnapprovedIcon />);
            setBg(colors.redBg);
        } else if (status === 'APPROVED') {
            setStatusText('Verified');
            setColor(colors.greenText);
            setIcon(<ApprovedIcon />);
            setBg(colors.greenBg);
        } else {
            setStatusText('Verification Pending');
            setColor(colors.transactions.pending);
            setIcon(<PendingIcon />);
            setBg(colors.yellowBg);
        }
    }, [status]);

    return (
        <VerificationStatusWrapper bgc={bg}>
            {icon}
            <StatusText color={color}>{statusText}</StatusText>
        </VerificationStatusWrapper>
    )
};

VerificationStatus.propTypes = {
    status:        string,
};