import React, { Fragment } from "react";
import styled from "styled-components";
import { shape, string, bool, arrayOf, any, func } from "prop-types";
import { ConfirmButton } from "../common";
import { RippleButton, RippleLink } from "../../button";
import { Overlay } from "../../../containers/OverlayContainer";
import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    OptionList,
    CancelButton,
    Item
} from "../common";
import { SwitchTrigger } from "../../switch";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";
import { ReactComponent as CheckmarkIcon } from "../../../assets/checkmark.svg";

const ArrowForward = styled(ArrowIcon)`
    position: absolute;
    right: 0;
`;

const Checkmark = styled(CheckmarkIcon)`
    position: absolute;
    right: 0;
`;

export const OptionsPopupDialog = ({
    open,
    title,
    items,
    arrows,
    cancel,
    confirm,
    selectedStatus
}) => {
    return (
        <Fragment>
            {open && (
                <Overlay
                    onClick={cancel}
                    bgc={"rgba(0, 0, 0, 0.4)"}
                    zIndex={"99999"}
                />
            )}
            <PopUp open={open} zIndex={"100000"}>
                <PopUpContent>
                    <PopUpHeader>{title}</PopUpHeader>

                    <OptionList>
                        {items.map(
                            (
                                {
                                    Icon,
                                    title,
                                    link,
                                    linkProp,
                                    click,
                                    more,
                                    checkStatus,
                                    switchStatus,
                                    outsideLink,
                                    selected
                                }, index
                            ) => (
                                <Item key={index}>
                                    {link ? (
                                        <RippleLink
                                            // type={"button"}
                                            onClick={click ? () => click() : null}
                                            to={linkProp ? { pathname: link, state: linkProp } : link}
                                        >
                                            <Icon />{title}
                                            {arrows && <ArrowForward />}
                                        </RippleLink>
                                    ) : outsideLink ? (
                                        <a href={outsideLink}>
                                            <Icon />{title}
                                            {arrows && <ArrowForward />}
                                            {more && <ArrowForward />}
                                        </a>
                                    ) : (
                                        <RippleButton
                                            onClick={
                                                click ? () => click() : null
                                            }
                                        >
                                            <Icon />
                                            {title}
                                            {switchStatus && (
                                                <SwitchTrigger 
                                                    checkStatus={checkStatus} 
                                                    switchStatus={switchStatus}
                                                    top={"4px"}
                                                />
                                            )}
                                            {arrows && <ArrowForward />}
                                            {selected && <Checkmark />}
                                            {more && <ArrowForward />}
                                        </RippleButton>
                                    )}
                                    </Item>
                                )
                            )}
                    </OptionList>
                    {confirm ? (
                        <ConfirmButton type="submit" onClick={confirm} disabled={!selectedStatus}>
                            Apply
                        </ConfirmButton>
                    ) : (
                        <CancelButton type="button" onClick={cancel}>
                            Cancel
                        </CancelButton>
                    )}
                </PopUpContent>
            </PopUp>
        </Fragment>
    );
};

OptionsPopupDialog.propTypes = {
    open: bool,
    cancel: func,
    arrows: bool,
    title: string,
    confirm: func,
    selectedStatus: bool,
    items: arrayOf(
        shape({
            Icon: any,
            title: string,
            link: string,
            linkProp: any,
            click:    func,
            more:     bool
        })
    )
};