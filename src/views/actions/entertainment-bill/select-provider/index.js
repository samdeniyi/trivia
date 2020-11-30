import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { getCabelProviders } from '../../../../redux/ducks/applications/bill-payments/actions/entertainment';

import { TopHeader, RippleLink, PageLogo, Loader } from '../../../../components';
import { ScreenContainer, ViewContainer } from '../../../../containers/ScreenContainer';
import { Message } from '../../../../containers/MessageContainer';
import { List, ListItem, ListLeftBlock, ListHeading, ListHighlight } from '../../../../containers/ListContainer';
import { ReactComponent as ForwardIcon }    from '../../../../assets/arrow.svg';

const SelectBlock = styled(ListHighlight)`
    margin: auto 0 auto 16px;
`;

const SelectProvider = ({
    getCabelProviders
}) => {
    const [availablePackages, setAvailablePackages] = useState([]);
    const isLoading = useSelector(({ applications }) => applications.billPayments.isLoading);

    useEffect(() => {
        getCabelProviders().then(packages => setAvailablePackages(packages));
    }, [getCabelProviders]);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Entertainment"} />
            <ScreenContainer>
                <ViewContainer>
                    <Message bottom={"24px"}>Select an entertainment provider</Message>
                    <List fullScreen>
                    {availablePackages && availablePackages.map((provider, index) => (
                        <RippleLink
                            key={index} 
                            to={{
                                pathname: "/actions/entertainment_pay",
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
    { getCabelProviders }
)(SelectProvider);