import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";
import { Cart, ListProductCategories } from "../components";
import { SearchHeader } from "../../../../components";
import { Main, AddFlexBox, Container, Space } from "../styles";

const MerchbuyProductCategories = () => {
    const productCategeries = useSelector(
        state => state.applications.merchbuy.MerchbuyProductCategeries
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(merchbuyActions.getProductCategories());
    }, [dispatch]);

    const [searchValue, setSearchValue] = useState("");

    const categories = productCategeries.filter(
        data => data.name.toLowerCase().includes(searchValue.toLowerCase())
    );



    return (
        <Fragment>
            <SearchHeader
                title={"Product Categories"}
                right={"56px"}
                sticky
                placeholder={"Search for Product Categories..."}
                handleSearch={setSearchValue}
                withSpacesHeader
            >
                <Cart />
            </SearchHeader>
            <Main>
                <Container>
                    <AddFlexBox>
                        <ListProductCategories data={categories} />
                    </AddFlexBox>
                </Container>
            </Main>
            <Space height="50px"/>
        </Fragment>
    );
};

export default MerchbuyProductCategories;
