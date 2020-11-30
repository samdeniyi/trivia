import React, { Fragment, useEffect, useState } from "react";
import { matchPath } from "react-router-dom";
import useRouter from "use-react-router";

import { useSelector, useDispatch } from "react-redux";
import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";
import { Cart, ListProducts } from "../components";
import { SearchHeader } from "../../../../components";
import {
    Main,
    PageSubSections,
    PageSubSectionsTop,
    Container,
    PageSubSectionsTopLeft,
    PageSubSectionsTopLeftTitle,
    BadgeHeading,
    Space,
    ProductImage
} from "../styles";

import { ShopInfoSection, ProductCategory, Street, LGA, State, SeeAllbutton } from "./style";
import TempImage from "../assets/tempImage.png";

import { Badge } from "../../../../containers/BadgeContainer";
import { is_url } from "../../../../utils/urls/isUrl";

const ShopDetails = () => {
    const { location } = useRouter();
    const { pathname } = location;
    const pattern = `(.*)?${"/actions/merchbuy/shop/:id"}`;
    const match = matchPath(pathname, { path: pattern }) || {};

    const [searchValue, setSearchValue] = useState("");
    const [seeAll, setSeeAll] = useState(false);

    const dispatch = useDispatch();
    const shopProducts = useSelector(
        state => state.applications.merchbuy.MerchbuyProductsByShopId
    );
    const shopDetails = useSelector(state => state.applications.merchbuy.shop);

    const products = (shopProducts)? shopProducts.filter(data =>
        data.name.toLowerCase().includes(searchValue.toLowerCase())
    ): []


    useEffect(() => {
        dispatch(merchbuyActions.getShopDetials(match.params.id));
    }, [match.params.id, dispatch]);

    useEffect(() => {
        dispatch(merchbuyActions.getProductsByShopID(match.params.id));
    }, [match.params.id, dispatch]);


    useEffect(() => {
        return () => {
            dispatch(
                merchbuyActions.unsubscribe()
            );
        };
      }, [dispatch]);

    return (
        <Fragment>
            <SearchHeader
                title={shopDetails.name || ""}
                right={"56px"}
                sticky
                placeholder={"Search for products..."}
                handleSearch={setSearchValue}
                withSpacesHeader
            >
                <Cart />
            </SearchHeader>
            <Main>
                <Container>
                    <ProductImage
                        src={
                            is_url(shopDetails.imageUrl)
                                ? shopDetails.imageUrl
                                : TempImage
                        }
                        alt="product image"
                        width={"100%"}
                        height={"auto"}
                    />
                </Container>
                <Badge>
                    <BadgeHeading>Shop Description</BadgeHeading>
                </Badge>
                <Container>
                    <ShopInfoSection>
                            {shopDetails.businessCategoryNames &&
                                shopDetails.businessCategoryNames.map(
                                    (item, index) => (
                                        <ProductCategory
                                            width={"auto"}
                                            height={"30px"}
                                            radius={"32px"}
                                            key={index}
                                        >
                                            {item}
                                        </ProductCategory>
                                    )
                                )}
                        <Space />
                        <Street>{shopDetails.location && shopDetails.location.address}</Street>
                        <LGA>{shopDetails.location && shopDetails.location.localGovt}</LGA>
                        <State>{shopDetails.location && shopDetails.location.state}</State>
                    </ShopInfoSection>
                </Container>

                <PageSubSections>
                    <PageSubSectionsTop>
                        <PageSubSectionsTopLeft>
                            <PageSubSectionsTopLeftTitle>
                                Products
                            </PageSubSectionsTopLeftTitle>
                        </PageSubSectionsTopLeft>
                        <SeeAllbutton onClick={()=> setSeeAll(!seeAll)}>
                           {(products && products.length > 12)?(seeAll? "See Less" : "See All"): ""}
                        </SeeAllbutton>
                    </PageSubSectionsTop>
                    <ListProducts
                        data={seeAll? products : products.slice(0, 9)}
                        size={{ width: "98px", height: "98px" }}

                    />
                    <Space  height={"50px"}/>
                </PageSubSections>
            </Main>
        </Fragment>
    );
};

export default ShopDetails;