import React, { Fragment, useState, useEffect } from 'react';
import { colors } from '../../styles';
import { number, bool, func } from 'prop-types';
import { ResendLabel, ResendCode } from '../../containers/MessageContainer';
import { OptionsPopupDialog } from '../popup';
import { ReactComponent as WhatsAppLogo } from './assets/whatsapp.svg';

export const ResendCodeTimer = ({
    counter,
    expired,
    sendViaWhatsApp,
    setExpired,
    tick,
    resendCode
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = (counter >= 0) && (!expired) && setInterval(() => {
            tick(counter);
        }, 1000);

        if (counter < 0) clearInterval(timer);

        return () => clearInterval(timer);
    }, [counter, tick, expired]);

    useEffect(() => {
        if (counter < 0) setExpired(true);
    }, [counter, setExpired]);

    useEffect(() => {
        if (counter < 0 || expired) setOpen(true);
    }, [counter, expired, setOpen]);

    return (
        (counter >= 0 && !expired) ? 
            <ResendLabel color={"primary"}>
                Resend code in {counter} seconds
            </ResendLabel> : (
            <Fragment>
                <OptionsPopupDialog
                    open={open}
                    arrows={false}
                    title="Other ways to get verification code"
                    cancel={() => setOpen(!open)}
                    items={[ 
                        {
                            Icon: WhatsAppLogo,
                            title: "Get verification code via WhatsApp",
                            click: sendViaWhatsApp
                        }
                    ]}
                /> 
                <ResendCode 
                    type="button" 
                    style={{ color: colors.blue }}
                    onClick={(event) => {
                        event.preventDefault();
                        resendCode();
                    }}
                >
                    I didn't get a code
                </ResendCode>
            </Fragment>
        )
    );
};

ResendCodeTimer.propTypes = {
    counter:    number,
    expired:    bool,
    setExpired: func,
    tick:       func,
    resendCode: func
};