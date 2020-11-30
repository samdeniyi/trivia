import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RippleButton } from "../../../../../components";
import {
    FlexCenteredBlock,
    ScreenContainer
} from "../../../../../containers/ScreenContainer";

import { Space } from "../../styles";
import { Message, Title } from "../../../../../containers/MessageContainer";

import { ReactComponent as AddedToCartIcon } from "../../assets/added-to-cart.svg";
import History from "../../../../../utils/History";

const AddedToCartView = () => {
    const productName = useSelector(state =>
        state.router.location.params ? state.router.location.params.name : null
    );
    return (
        <Fragment>
            <ScreenContainer>
                <FlexCenteredBlock top={"60px"}>
                    <AddedToCartIcon />
                    <Space height={"32px"} />

                    <Title>Added to cart!</Title>
                    <Message
                        bottom={"24px"}
                        top={"8px"}
                        align={"center"}
                        padding={"0 1em"}
                    >
                        {productName || "Item"} was added to your cart.
                    </Message>
                </FlexCenteredBlock>

                <RippleButton
                    top={"45px"}
                    onClick={() => History.push("/actions/merchbuy/cart")}
                >
                    Go to cart
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
            </ScreenContainer>
        </Fragment>
    );
};

export default AddedToCartView;
