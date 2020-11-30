import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import History from "../../../../../utils/History";
import { merchbuyActions } from "../../../../../redux/ducks/applications/merchbuy/actions";
import styled from "styled-components";

import {
    RippleButton
} from "../../../../../components";
import {
    FlexCenteredBlock,
    ScreenContainer
} from "../../../../../containers/ScreenContainer";
import {
    Title,
    SubTitle
} from "../../../../../containers/MessageContainer";

//import { ReactComponent as AddedToCartIcon } from "../../assets/added-to-cart.svg";
//import logo from '../../assets/eye.gif';
import AddedToCartIcon from "../../assets/added-to-cart.svg";

import { Space } from "../../styles";

const Gif = styled.img``;

const SuccessfulOrder = () => {
    const dispatch = useDispatch();
    const passedId = useSelector(
        state =>
        state.router.location.state ? state.router.location.state.id: null
    );

    return (
        <Fragment>
            <ScreenContainer>
                <FlexCenteredBlock top={"96px"}>
                    <Space height={"80px"} />
                    {/* <AddedToCartIcon /> */}
                    <Gif src={AddedToCartIcon} alt="loading..." />
                    <Space height={"32px"} />

                    <Title>Your order is on the way!</Title>
                    <SubTitle color={"#56636d"} textAlign={"center"}>Your order was successful! You can track your progress on the orders tab.</SubTitle>
                   
                    <RippleButton
                    top={"45px"}
                    onClick={() => {
                        dispatch(merchbuyActions.getOrderHistoryById(passedId))
                        History.push({
                            pathname: '/actions/merchbuy/order-history',
                            state: { id: passedId}
                        })
                    }}
                    >
                   View order details
                </RippleButton>
                <RippleButton
                    top={"20px"}
                    style={{
                        backgroundColor: `rgba(87,159,215,.4)`,
                        color: `rgb(59, 120, 220)`,
                        paddingLeft: 20,
                        paddingRight: 20,
                        opacity: `40%`
                    }}
                    onClick={() => History.push("/actions/merchbuy")}
                  >
                    Continue shopping
                </RippleButton>
                </FlexCenteredBlock>
            </ScreenContainer>
        </Fragment>
    );
};

export default SuccessfulOrder;
