import React, { Fragment } from 'react';
import { bool, func, string, arrayOf, shape, any } from 'prop-types';

import { PopUp, PopUpContent, PopUpHeader, CancelButton, Radio, OptionList, LabelItem, LabelText, TextBlock, AdditionalText } from '../common';
import { Overlay } from '../../../containers/OverlayContainer';
import { RippleLink } from '../..';

export const CheckPopupDialog = ({
    open, 
    title,
    items,
    cancel
}) => {
    return (
        <Fragment>
            {open && (
                <Overlay
                    bgc={"rgba(0, 0, 0, 0.4)"}
                    zIndex={"99999"} 
                    onClick={cancel} 
                />
            )}
            <PopUp open={open} zIndex={"100000"}>
                <PopUpContent>
                    <PopUpHeader>{title}</PopUpHeader>
                        <OptionList>
                        {items.map(({ Icon, title, subTitle, click, defaultChecked, link }, index) => {
                            if (link) {
                                return (
                                    <RippleLink to={link} key={index}>
                                        <LabelItem onClick={click}>
                                        {Icon && <Icon />}
                                        <TextBlock>
                                            <LabelText>{title}</LabelText>
                                            {subTitle && <AdditionalText>{subTitle}</AdditionalText>}
                                        </TextBlock>
                                        </LabelItem>
                                    </RippleLink>
                                );
                            } else return (
                                <LabelItem key={index} onClick={click}>
                                    {Icon && <Icon />}
                                    <TextBlock>
                                        <LabelText>{title}</LabelText>
                                        {subTitle && <AdditionalText>{subTitle}</AdditionalText>}
                                    </TextBlock>
                                    <Radio
                                        top={"4px"}
                                        right={"4px"}
                                        name={"filter"} 
                                        type={"radio"} 
                                        defaultChecked={defaultChecked} 
                                    />  
                                </LabelItem>
                            );
                        })}
                        </OptionList>
                    <CancelButton type="button" onClick={cancel}>Cancel</CancelButton>
                </PopUpContent>
            </PopUp>
        </Fragment>
    );
};

CheckPopupDialog.propTypes = {
    open:   bool,
    cancel: func,
    title:  string,
    items:  arrayOf(
        shape({ 
            Icon:           any, 
            title:          string,
            subTitle:       string,
            click:          func,
            defaultChecked: bool
        })
    )
};

