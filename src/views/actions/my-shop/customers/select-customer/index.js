import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchHeader } from '../../../../../components';
import { Close } from '../../../../../containers/HeaderContainer';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { List, ListCheckedRow, ListItem, ListSubHeading, ListHeading, ListLeftBlock } from '../../../../../containers/ListContainer';
import { SlidingOverlay } from '../../../../../containers/OverlayContainer';
import { Message } from '../../../../../containers/MessageContainer';
import { FloatingButton, FloatingButtonWrapper } from '../../../../../components/button';
import { ReactComponent as CustomersLogo } from '../assets/customer.svg';

const SelectCustomerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 63px;
`;

export const SelectCustomer = ({
    open,
    setOpen,
    customers,
    selectedCustomer,
    setSelectedCustomer,
    setFieldValue
}) => {
    const [allCustomers, setAllCustomers] = useState(customers);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setAllCustomers(
            customers.filter(
                customer => 
                customer.name.includes(searchValue) ||
                customer.name.toLowerCase().includes(searchValue) ||
                customer.phoneNumber.includes(searchValue)
            )
        );
    }, [searchValue, customers]);

    return (
        open && (
            <SlidingOverlay>
                <SearchHeader 
                    noArrow 
                    title={"Select a Customer"}
                    placeholder={"Find a customer to select"}
                    right={"16px"}
                    handleSearch={setSearchValue}
                >
                    <Close left={"16px"} onClick={() => setOpen(!open)} />                
                </SearchHeader>
                <ScreenContainer>
                    <SelectCustomerContainer>
                        <Message bottom={"24px"}>Showing {allCustomers.length} customers</Message>
                        <List fullScreen>
                        {allCustomers.map((customer, index) => (
                            <ListItem 
                                key={index} 
                                onClick={() => {
                                    if (selectedCustomer && (customer.id === selectedCustomer.id)) {
                                        setSelectedCustomer(undefined);
                                        setFieldValue('customerName', '');
                                        setFieldValue('customerPhoneNumber','');
                                    } else {
                                        setSelectedCustomer(customer);
                                        setFieldValue('customerName', customer.name);
                                        setFieldValue('customerPhoneNumber', customer.phoneNumber);
                                    };
                                }
                            }>
                                <CustomersLogo />
                                <ListCheckedRow className={((selectedCustomer && selectedCustomer.id) === customer.id) ? "active" : ""}>
                                    <ListLeftBlock left={"0"}>
                                        <ListHeading>{customer.name}</ListHeading>
                                        <ListSubHeading>{customer.phoneNumber}</ListSubHeading>
                                    </ListLeftBlock>
                                </ListCheckedRow>
                            </ListItem>
                        ))}
                        </List>
                    </SelectCustomerContainer>
                </ScreenContainer>
                <FloatingButtonWrapper>
                    <FloatingButton 
                        type={"button"} 
                        onClick={() => setOpen(!open)} 
                    >
                        Select
                    </FloatingButton>
                </FloatingButtonWrapper>
            </SlidingOverlay>
        )
    );
};