import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { parseTransactionsByDate } from '../../../../utils/date/parseTransactionsByDate';

import { TopHeader, DropdownList } from '../../../../components';
import { Message } from '../../../../containers/MessageContainer';

const CommissionsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MerchantCommissions = ({
    location
}) => {
    const filteredList = location.state && parseTransactionsByDate(location.state);

    return (
        <Fragment>
            <TopHeader title={"Commisions"} />
            {(filteredList && filteredList.length > 0) && (
                <CommissionsContainer>
                    <Message top={"80px"} padding={"0 16px"} align={"left"}>
                        Showing all commissions:
                    </Message>
                    {(filteredList && filteredList.map((transactionsList, index) => (
                        <DropdownList
                            key={index}
                            title={transactionsList.date} 
                            subHeading={"count"} 
                            transactionList={transactionsList.transactions}
                        />
                    )))} 
                </CommissionsContainer>
            )}
        </Fragment>
    );
};

export default withRouter(MerchantCommissions);