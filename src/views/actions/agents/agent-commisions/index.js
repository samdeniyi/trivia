import React, { Fragment } from 'react';
import styled from 'styled-components';
import { parseTransactionsByDate } from '../../../../utils/date/parseTransactionsByDate';
import { withRouter } from 'react-router-dom';
import { TopHeader, DropdownList } from '../../../../components';
import { Message } from '../../../../containers/MessageContainer';

const CommissionsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AgentCommissions = ({
    location
}) => {
    const filteredList = parseTransactionsByDate(location.state);

    return (
        <Fragment>
            <TopHeader title={"Commissions"} />
            {(filteredList.length > 0) && (
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

export default withRouter(AgentCommissions);