import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";
import {
    Cart,
    TopNavIconsMenu,
    ListProducts,
    ListShops,
    // ListProductCategories
} from "../components/";
import {
    SearchHeader,
    RippleLink,
    DeliveryLocationPopup,
    PageLogo
} from "../../../../components/";
import {
    Main,
    PageSubSections,
    PageSubSectionsTop,
    // ProductCategoriesIcon,
    PopularProductsIcon,
    ShopsIcon,
    RecommendedProductsIcon,
    PageSubSectionsTopLeft,
    PageSubSectionsTopLeftTitle,
    Space,
    Container,
    Datalist,
    DatalistOption,
    DatalistTitle
} from "../styles";
import SupermarketIcon from "../assets/supermarket.svg";

import sliderImage from "../assets/merchbuybanner.png";
// import History from "../../../../utils/History";

const MerchbuyIndex = () => {
    const shops = useSelector(
        state => state.applications.merchbuy.MerchbuyShops
    );
    const recommendedProducts = useSelector(
        state => state.applications.merchbuy.MerchbuyRecommendedProducts
    );
    const popularProducts = useSelector(
        state => state.applications.merchbuy.MerchbuyPopularProducts
    );
    // const productCategeries = useSelector(
    //     state => state.applications.merchbuy.MerchbuyProductCategeries
    // );
    const listOfAvailableStates = useSelector(
        state => state.applications.merchbuy.availableStates
    );
    // const productsFromSearch = useSelector(state => state.applications.myShop.productsFromSearch);
    const [searchValue, setSearchValue] = useState("");
    const [searchedProducts, setsearchedProducts] = useState([]);

    const dispatch = useDispatch();
    const [deliveryLocation, setDeliveryLocation] = useState(
        JSON.parse(localStorage.getItem("deliveryLocation"))
    );

    const [openDeliverLocationPopup, setOpenDeliverLocationPopup] = useState(
        deliveryLocation === null
    );
    const getLocation = data => {
        if (data.state && data.lga) {
            setDeliveryLocation(data);
            setOpenDeliverLocationPopup(!openDeliverLocationPopup);
            localStorage.setItem("deliveryLocation", JSON.stringify(data));
        }
    };

    useEffect(() => {
        dispatch(merchbuyActions.getAVailableStates());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            merchbuyActions.searchProductsOnMerchbuy(searchValue)
        ).then(data => setsearchedProducts(data));
    }, [dispatch, searchValue]);

    useEffect(() => {
        if (deliveryLocation !== null) {
            dispatch(merchbuyActions.getProductCategories());
            dispatch(merchbuyActions.getAllShops({}));
            dispatch(merchbuyActions.getRecommendedProducts(10, deliveryLocation));
            dispatch(merchbuyActions.getPopularProducts(10, deliveryLocation));
            dispatch(merchbuyActions.getShopCart());
        }
    }, [dispatch, deliveryLocation]);

    return (
        <Fragment>
            <SearchHeader
                title={"Merchbuy"}
                right={"56px"}
                // list={"ProductList"}
                sticky
                placeholder={"Search merchbuy..."}
                handleSearch={setSearchValue}
                backLink={"/"}
                withSpacesHeader
            >
                <Cart />
            </SearchHeader>
            <Main>
                    {searchValue.length > 0 ?(
                        <Datalist id="ProductList">
                            {searchedProducts.map((product, index) => (
                                <RippleLink
                                    to={`/actions/merchbuy/product/${product.id}`}
                                    onClick={()=> dispatch(merchbuyActions.setInitProductDetials(product)) }
                                >
                                    <DatalistOption key={index}>
                                        <PageLogo
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"32px"}
                                            iconHeight={"32px"}
                                            Icon={product.images.baseImageUrl}
                                            fallback={SupermarketIcon}
                                            onError={
                                                product.images.baseImageUrl = ""
                                            }
                                        />
                                        <DatalistTitle>
                                            {product.name}
                                        </DatalistTitle>
                                    </DatalistOption>
                                </RippleLink>
                            ))}
                        </Datalist>
                    ): (<>
                    <Container>
                    <Carousel showThumbs={false}>
                        <div>
                            <img src={sliderImage} alt="" />
                        </div>
                        <div>
                            <img src={sliderImage} alt="" />
                        </div>
                        <div>
                            <img src={sliderImage} alt="" />
                        </div>
                    </Carousel>
                    </Container>
                    <Space height="20px" />
                <TopNavIconsMenu />
                <PageSubSections>
                    <PageSubSectionsTop>
                        <PageSubSectionsTopLeft>
                            <PopularProductsIcon />
                            <PageSubSectionsTopLeftTitle>
                                Popular products
                            </PageSubSectionsTopLeftTitle>
                        </PageSubSectionsTopLeft>
                        <RippleLink to={"/actions/merchbuy/popular-products"}>
                            See All
                        </RippleLink>
                    </PageSubSectionsTop>
                    <ListProducts
                        data={popularProducts.slice(0, 12)}
                        size={{ width: "98px", height: "98px" }}
                        // justifyContent={"space-between"}
                    />
                </PageSubSections>
                <PageSubSections>
                    <PageSubSectionsTop>
                        <PageSubSectionsTopLeft>
                            <ShopsIcon />
                            <PageSubSectionsTopLeftTitle>
                                Shops
                            </PageSubSectionsTopLeftTitle>
                        </PageSubSectionsTopLeft>
                        <RippleLink to={"/actions/merchbuy/shops"}>
                            See All
                        </RippleLink>
                    </PageSubSectionsTop>
                    <ListShops
                        data={shops.slice(0, 2)}
                        size={{ width: "64px", height: "64px" }}
                    />
                </PageSubSections>
                {/* <PageSubSections>
                    <PageSubSectionsTop>
                        <PageSubSectionsTopLeft>
                            <ProductCategoriesIcon />
                            <PageSubSectionsTopLeftTitle>
                                Product categories
                            </PageSubSectionsTopLeftTitle>
                        </PageSubSectionsTopLeft>
                        <RippleLink to={"/actions/merchbuy/product-categories"}>
                            See All
                        </RippleLink>
                    </PageSubSectionsTop>
                    <ListProductCategories
                        data={productCategeries.slice(0, 4)}
                    />
                </PageSubSections> */}
                <PageSubSections>
                    <PageSubSectionsTop>
                        <PageSubSectionsTopLeft>
                            <RecommendedProductsIcon />
                            <PageSubSectionsTopLeftTitle>
                                Recommended products
                            </PageSubSectionsTopLeftTitle>
                        </PageSubSectionsTopLeft>
                    </PageSubSectionsTop>
                    <ListProducts
                        data={recommendedProducts.slice(0, 2)}
                        size={{ width: "156px", height: "156px" }}
                        justifyContent={"center"}
                    />
                </PageSubSections>
                </>)}
                <Space height={"50px"} />
            </Main>
            <DeliveryLocationPopup
                open={openDeliverLocationPopup}
                data={listOfAvailableStates}
                cancel={() => {
                    setOpenDeliverLocationPopup(!openDeliverLocationPopup);
                }}
                getLocation={getLocation}
            />
        </Fragment>
    );
};

export default MerchbuyIndex;
