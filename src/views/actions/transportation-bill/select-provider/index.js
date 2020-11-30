import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAllBillsToPay } from '../../../../redux/ducks/applications/bill-payments/actions';
import { mapAvailablePackages } from '../../../../utils/bill-payments/mapAvailablePackages';

import { TopHeader, RippleLink, PageLogo, Loader } from '../../../../components';
import { Message } from '../../../../containers/MessageContainer';
import { ScreenContainer, ViewContainer } from '../../../../containers/ScreenContainer';
import { List, ListItem, ListLeftBlock, ListHighlight, ListHeading } from '../../../../containers/ListContainer';
import { ReactComponent as ForwardIcon } from '../../../../assets/arrow.svg';
import LCCIcon from './assets/lcc.jpg';

const SelectBlock = styled(ListHighlight)`
    margin: auto 0 auto 16px;
`;

const mapPackageTypeLogo = type => {
    switch (type) {
        case "LCC Lekki-Epe Expressway": {
            return LCCIcon;
        }

        case "LCC Ikoyi Bridge": {
            return LCCIcon;
        }

        default: {
            return null;
        }
    };
};

const SelectProvider = ({
                            isLoading,
                            getAllBillsToPay,
                            country
                        }) => {
    const [availablePackages, setAvailablePackages] = useState([]);
    const providersList =
        (availablePackages && availablePackages.length > 0) ?
            mapAvailablePackages(country, availablePackages, mapPackageTypeLogo) : [];

    useEffect(() => {
        getAllBillsToPay(["LCC"]).then(receivedPackages => {
            setAvailablePackages(receivedPackages);
        });
    }, [getAllBillsToPay]);

    return (
        isLoading ?
            <Loader /> :
            <Fragment>
                <TopHeader title={"Transportation Bill"} />
                <ScreenContainer>
                    <ViewContainer>
                        <Message bottom={"24px"}>Select a provider</Message>
                        <List fullScreen>
                            {providersList && providersList.map((provider, index) => (
                                <RippleLink
                                    key={index}
                                    to={{
                                        pathname: "/actions/transportation_pay",
                                        state: provider
                                    }}
                                >
                                    <ListItem style={{ alignItems: "center" }} bottom={"8px"}>
                                        <PageLogo
                                            Icon={provider.logo}
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"32px"}
                                            iconHeight={"32px"}
                                        />
                                        <ListLeftBlock>
                                            <ListHeading>{provider.type}</ListHeading>
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

const mapStateToProps = ({ user, applications }) => ({
    isLoading: applications.billPayments.isLoading,
    country:   user.country
});

export default connect(
    mapStateToProps,
    { getAllBillsToPay }
)(SelectProvider);