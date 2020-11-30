import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, connect } from 'react-redux';
import { getUtilityProviders } from '../../../../redux/ducks/applications/bill-payments/actions/utility-services';
import { Message } from '../../../../containers/MessageContainer';
import { Loader, PageLogo, RippleLink, TopHeader } from '../../../../components';
import { List, ListHeading, ListHighlight, ListItem, ListLeftBlock } from '../../../../containers/ListContainer';
import { ScreenContainer, ViewContainer } from '../../../../containers/ScreenContainer';
import { ReactComponent as ForwardIcon } from '../../../../assets/arrow.svg';

const SelectBlock = styled(ListHighlight)`
    margin: auto 0 auto 16px;
`;

const SelectProvider = ({
    getUtilityProviders
}) => {
    const isLoading = useSelector(state => state.applications.billPayments.isLoading);
    const allProviders = useSelector(({applications}) => applications.billPayments.allProviders)

    useEffect(() => {
        getUtilityProviders("Water")
    }, [getUtilityProviders]);
    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Water Bill"} />
            <ScreenContainer>
                <ViewContainer>
                    <Message bottom={"24px"}>Select a water provider</Message>
                    <List fullScreen>
                    {allProviders && allProviders.map((provider, index) => (
                        <RippleLink
                            key={index}
                            to={{
                                pathname: "/actions/water_pay",
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
                                    <ListHeading>{provider.name}</ListHeading>
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
    { getUtilityProviders }
)(SelectProvider);