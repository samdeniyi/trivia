import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { colors } from '../../../styles';
import { autoSign } from '../../../utils/inputs/autoFormat';
import { bool, func, instanceOf } from 'prop-types';
import { PopUp, InfoMessage, CancelButton, ConfirmButton, PopUpContent, PopUpHeader } from '../common';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { CustomInput } from '../../../containers/InputContainer';

const InputRange = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`;

const RangeSeparator = styled.hr`
    width: 17px;
    height: 1px;
    color: ${colors.border.default};
    margin: 0 8px;
`;

const RangeInput = styled(CustomInput)`
    width: 139px;
    height: 48px;
`;

export const DateRangePopup = ({
    open,
    setOpen,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setSelectedFilter
}) => {
    const [dateFormat]                            = useState("DD-MM-YYYY");
    const [currentStartDate, setCurrentStartDate] = useState(startDate || undefined);
    const [currentEndDate, setCurrentEndDate]     = useState(endDate || undefined);

    return (
        <Fragment>
            {open && (
                <Overlay onClick={() => setOpen(!open)} bgc={'rgba(0,0,0,0.4)'} zIndex="99999" />
            )}
            <PopUp open={open} zIndex="100000">
                <PopUpContent>
                    <PopUpHeader align={"left"}>Date Range</PopUpHeader>
                    <InfoMessage
                        top={"24px"}
                        align={"left"}   
                    >
                        Please enter date range.
                    </InfoMessage>
                    <InputRange>
                        <RangeInput
                            name="startDate" 
                            type="text"
                            autoComplete={'off'} 
                            size={14}
                            nobottom={"true"}
                            placeholder={dateFormat.toLowerCase()}
                            onKeyUp={event => {
                                if (event.which !== 8) {
                                    event.target.value = autoSign('-', event.target.value, 8);

                                    if (event.target.value.length >= 9) {
                                        event.target.value = event.target.value.slice(0, 10);
                                    };

                                    setCurrentStartDate(event.target.value);
                                };                                
                            }}
                        />
                        <RangeSeparator />
                        <RangeInput
                            name="endDate" 
                            type="text"
                            autoComplete={'off'} 
                            size={14}
                            nobottom={"true"}
                            placeholder={dateFormat.toLowerCase()}
                            onKeyUp={event => {
                                if (event.which !== 8) {
                                    event.target.value = autoSign('-', event.target.value, 8);

                                    if (event.target.value.length >= 9) {
                                        event.target.value = event.target.value.slice(0, 10);
                                    };

                                    setCurrentEndDate(event.target.value);
                                };                                
                            }}
                        />
                    </InputRange>
                    <ActionBlock direction={"row"} top={"16px"}>
                        <ConfirmButton 
                            onClick={() => {
                                setStartDate(moment(currentStartDate, dateFormat));
                                setEndDate(moment(currentEndDate, dateFormat));
                                setOpen(!open);
                                setSelectedFilter("Date range");
                            }}
                        >
                            Okay
                        </ConfirmButton>
                        <CancelButton type={"button"} onClick={() => setOpen(!open)}>
                            Cancel
                        </CancelButton>
                    </ActionBlock>
                </PopUpContent>
            </PopUp>
        </Fragment>
    );
};

DateRangePopup.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
    startDate: instanceOf(moment),
    endDate: instanceOf(moment),
    setStartDate: func.isRequired,
    setEndDate: func.isRequired
};