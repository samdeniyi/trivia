import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListHeading, ListSubHeading } from '../../../../containers/ListContainer';
import { SearchHeader, UserAvatar /*, RippleLink*/ } from '../../../../components';
import { ViewContainer } from '../../../../containers/ScreenContainer';
import { ModifiedListItem, HorizontalDiv } from '../styles';
import { getDate } from '../utils/date';

const MerchantReferralsList = () => {
    const referrals = useSelector(state => state.applications.merchants.merchantsReferral);
    const [referralsList, setReferralsList]         = useState([...referrals]);
    const [searchValue, setSearchValue]             = useState("");
      
    useEffect(() => {
        setReferralsList(
            referrals.filter(referral => (referral.firstName ||  referral.lastName) && (
                referral.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
                referral.lastName.toLowerCase().includes(searchValue.toLowerCase()) )
            )
        );
    }, [searchValue, referrals]);
    
    return (
        <Fragment>
            <SearchHeader 
                title={"Active referrals"} 
                right={"24px"}
                placeholder={"Search for a referral…"}
                handleSearch={setSearchValue}
            />
            <ViewContainer style={{ padding: '0 16px' }} top={"64px"}>
                <Fragment>
                    <List fullScreen>
                    {referralsList && referralsList.map((referral, index) => (
                        // <RippleLink
                        //     key={index} 
                        //     to={{
                        //         pathname: "/actions/merchant_details",
                        //         state: referral
                        //     }}
                        // >   
                            <ModifiedListItem key={index} height={"48px"} bottom={"8px"}>
                                <UserAvatar 
                                    avatar={referral.avatar}
                                    width={"32px"}
                                    height={"32px"}
                                />
                                <HorizontalDiv left={"16px"}>
                                    <ListHeading>{`${referral.firstName} ${referral.lastName}`}</ListHeading>
                                    <ListSubHeading style={{ fontSize: '10px' }}>
                                        { getDate(referral.createdAt) }
                                    </ListSubHeading>
                                </HorizontalDiv>
                            </ModifiedListItem>
                        // </RippleLink>
                    ))}
                    </List>
                </Fragment>
            </ViewContainer>
        </Fragment>
    );
};

export default MerchantReferralsList;