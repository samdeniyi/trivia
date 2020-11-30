import React, {Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {connect, useSelector} from 'react-redux';
import {getUtilityProviders} from '../../../../redux/ducks/applications/bill-payments/actions/utility-services';

import {TopHeader, RippleLink, PageLogo, Loader} from '../../../../components';
import {Message} from '../../../../containers/MessageContainer';
import {List, ListItem, ListLeftBlock, ListHighlight, ListHeading} from '../../../../containers/ListContainer';
import {ScreenContainer, ViewContainer} from '../../../../containers/ScreenContainer';
import {ReactComponent as ForwardIcon} from '../../../../assets/arrow.svg';

const SelectBlock = styled(ListHighlight)`
    margin: auto 0 auto 16px;
`;

const SelectProvider = ({
                            getUtilityProviders
                        }) => {
    const isLoading = useSelector(({applications}) => applications.billPayments.isLoading);
    const allProviders = useSelector(({applications}) => applications.billPayments.allProviders)

    useEffect(() => {
        getUtilityProviders("Electric");
    }, [getUtilityProviders]);

    return (
        isLoading ?
            <Loader/> :
            <Fragment>
                <TopHeader title={"Electricity Bill"}/>
                <ScreenContainer>
                    <ViewContainer>
                        <Message bottom={"24px"}>Select a network provider</Message>
                        <List fullScreen>
                            {allProviders && allProviders.map((provider, index) => (
                                <RippleLink
                                    key={index}
                                    to={{pathname: "/actions/electricity_pay", state: provider}}
                                >
                                    <ListItem style={{alignItems: "center"}} bottom={"8px"}>
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
                                            <ForwardIcon/>
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
    {getUtilityProviders}
)(SelectProvider);