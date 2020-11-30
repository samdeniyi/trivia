import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import { TopHeader, RippleButton } from '../../../../../components';
import { SlidingOverlay } from '../../../../../containers/OverlayContainer';
import { Close } from '../../../../../containers/HeaderContainer';
import { ScreenContainer, ViewContainer } from '../../../../../containers/ScreenContainer';
import { Message } from '../../../../../containers/MessageContainer';
import { List, ListItem, ListCheckedRow, ListSubHeading } from '../../../../../containers/ListContainer';

const FieldName = styled(ListSubHeading)`
    color: ${colors.themeTextColor1};
    margin: auto 0;
    padding-bottom: 8px;
`;

export const AddFields = ({
    setOpen,
    open,
    selectedFields,
    setSelectedFields
}) => {
    const availableFields = [
        { title: 'Email Address', value: 'EMAIL' }, 
        { title: 'House Address', value: 'HOUSE_ADDRESS' },
        { title: 'Bank Account Number', value: 'BANK_ACCOUNT' },
        { title: 'Office Address', value: 'OFFICE_ADDRESS' }
    ];

    return (
        <SlidingOverlay>
            <TopHeader title={"Add Field"} noArrow>
                <Close left={"16px"} onClick={() => setOpen(!open)} />
            </TopHeader>
            <ScreenContainer>
                <ViewContainer>
                    <Message bottom={"24px"}>Add a new field to current details for a new customer.</Message>
                    <List fullScreen>
                    {availableFields.map((field, index) => (
                        <ListItem 
                            key={index} 
                            onClick={() => {
                                if (selectedFields.includes(field.value)) {
                                    setSelectedFields(selectedFields.filter(selectedField => selectedField !== field.value));
                                } else {
                                    setSelectedFields(fields => [...fields, field.value ]);
                                };
                            }}
                        >
                            <ListCheckedRow className={selectedFields.includes(field.value) ? "active" : ""}>
                                <FieldName>{field.title}</FieldName>
                            </ListCheckedRow>
                        </ListItem> 
                    ))}
                    </List>
                </ViewContainer>
                <RippleButton 
                    type={"button"} 
                    top={"24px"} 
                    onClick={() => setOpen(!open)}
                >
                    Add Field(s)
                </RippleButton>
            </ScreenContainer>
        </SlidingOverlay>
    );
};