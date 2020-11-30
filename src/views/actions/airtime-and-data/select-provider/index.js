import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { getAirtimeProviders } from '../../../../redux/ducks/applications/bill-payments/actions/airtime-and-data';

import { TopHeader, RippleLink, PageLogo, Loader } from '../../../../components';
import { ScreenContainer, ViewContainer } from '../../../../containers/ScreenContainer';
import { Message } from '../../../../containers/MessageContainer';
import { List, ListItem, ListLeftBlock, ListHeading, ListHighlight } from '../../../../containers/ListContainer';
import { ReactComponent as ForwardIcon } from '../../../../assets/arrow.svg';

const NetworkName = styled(ListHeading)`
    auto 0 auto 8px;
`;

const SelectBlock = styled(ListHighlight)`
    margin: auto 0 auto 16px;
`;

const SelectProvider = ({ 
    getAirtimeProviders
}) => {
    const [availablePackages, setAvailablePackages] = useState([]);
    
    const isLoading = useSelector(({ applications }) => applications.billPayments.isLoading);

    useEffect(() => {
        getAirtimeProviders().then(packages => {
            packages && setAvailablePackages(packages);
        });
    }, [getAirtimeProviders]);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Airtime & Data"} />
            <ScreenContainer>
                <ViewContainer>
                    <Message bottom={"24px"}>Select a network provider</Message>
                    <List fullScreen>
                    {availablePackages.length && availablePackages.map(provider => (
                        <RippleLink 
                            key={provider.name} 
                            to={{ 
                                pathname: "/actions/airtime_pay", 
                                state: provider 
                            }}
                        >
                            <ListItem style={{ alignItems: "center" }} bottom={"8px"}>
                                <PageLogo 
                                    Icon={provider.logoUrl} 
                                    width={"32px"}
                                    height={"32px"}
                                    iconWidth={"32px"}
                                    iconHeight={"32px"}
                                />
                                <ListLeftBlock>
                                    <NetworkName>{provider.name}</NetworkName>
                                </ListLeftBlock>
                                <SelectBlock>
                                    <ForwardIcon />
                                </SelectBlock>
                            </ListItem>
                        </RippleLink>
                    ))}
                    </List>
                </ViewContainer>
            </ScreenContainer>
        </Fragment>
    );
};

export default connect(
    null,
    { getAirtimeProviders }
)(SelectProvider);