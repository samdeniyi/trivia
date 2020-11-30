import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";
import { Cart, ListProducts } from "../components";
import { SearchHeader,     OptionsPopupDialog,
    MoqPopup,
    PriceRangePopup } from "../../../../components";
import { Main, Container, Space } from "../styles";

import { sortProducts } from '../utils/sortProducts';
import { filterProducts } from '../utils/filterProducts';

import { ReactComponent as FilterIcon } from "../assets/filter.svg";
import { ReactComponent as SortIcon } from "../assets/sort.svg";

import { ReactComponent as MostRecent } from "../../../../assets/most_recent.svg";
import { ReactComponent as Oldest } from "../../../../assets/oldest.svg";
import { ReactComponent as Ascending } from "../../../../assets/highest_sort_2.svg";
import { ReactComponent as Descending } from "../../../../assets/lowest_sort_2.svg";
import { ReactComponent as MoqSVG } from "../../../../assets/moq.svg";
import { ReactComponent as PriceSVG } from "../../../../assets/price.svg";
import { ReactComponent as AllOrderSVG } from "../../../../assets/all_products.svg";

import {
    FilterAndSortSection,
    SortFilterCell
} from "../../../../containers/ScreenContainer";

const MerchbuyPopularProducts = () => {

    const dispatch = useDispatch();
    const popularProducts = useSelector(
        state => state.applications.merchbuy.MerchbuyPopularProducts
    );

    useEffect(() => {
        dispatch(merchbuyActions.getPopularProducts(10, ''));
    }, [dispatch]);

    const [products, setProducts] = useState(popularProducts);
    const [searchValue, setSearchValue] = useState("");
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    const [openMoqPopup, setOpenMoqPopup] = useState(false);
    const [openPriceRangePopup, setOpenPriceRangePopup] = useState(false);
    const [sortType, setSortType] = useState("Most Recent");
    const [filterType, setFilterType] = useState("All Products");
    const [moqValue, setMoqValue] = useState("");
    const [priceRange, setPriceRange] = useState({
        minPrice: "",
        maxPrice: ""
    });

    const setMoq = data => {
        if (data.moq) {
            setFilterType("By MOQ");
            setMoqValue(data.moq);
            setOpenMoqPopup(!openMoqPopup);
        }
    };

    const setFilterPrice = data => {
        if (data.minPrice && data.maxPrice) {
            setFilterType("BY Price");
            setPriceRange(data);
            setOpenPriceRangePopup(!openPriceRangePopup);
        }
    };


    useEffect(() => {
        popularProducts && setProducts(popularProducts.filter(
            data => data.name.toLowerCase().includes(searchValue.toLowerCase())
		));
    }, [searchValue, popularProducts]);

    useEffect(() => {
		sortProducts(sortType, popularProducts, setProducts);
    }, [sortType, popularProducts, setProducts]);

    useEffect(() => {
		filterProducts(filterType, popularProducts, moqValue, priceRange, setProducts);
    }, [filterType, popularProducts, moqValue, priceRange, setProducts]);

    return (
        <Fragment>
            <SearchHeader
                title={"Popular products"}
                right={"56px"}
                sticky
                placeholder={"Search for products..."}
                handleSearch={setSearchValue}
                withSpacesHeader
            >
                <Cart />
            </SearchHeader>
            <Main>
                <FilterAndSortSection top={"14px"}>
                    <SortFilterCell
                        justifyContent={"center"}
                        color={"#212c3d"}
                        width={"100%"}
                        border={"1px solid #f2f5fa"}
                        onClick={() => setSortOptionsOpen(!sortOptionsOpen)}
                    >
                        <SortIcon />
                        {sortType}
                        <SortIcon />
                    </SortFilterCell>
                    <SortFilterCell
                        justifyContent={"center"}
                        color={"#212c3d"}
                        width={"100%"}
                        border={"1px solid #f2f5fa"}
                        onClick={() => setOpenFilterOptions(!openFilterOptions)}
                        >
                            {filterType}
                        <FilterIcon />
                    </SortFilterCell>
                </FilterAndSortSection>
                <Container>
                        <ListProducts
                            data={products}
                            size={{ width: "167px", height: "167px" }}
                        />
                </Container>
                <Space height="50px"/>
            </Main>
            <OptionsPopupDialog
                open={sortOptionsOpen}
                title={"Sort"}
                cancel={() => {
                    setSortType("Most Recent");
                    setSortOptionsOpen(!sortOptionsOpen);
                }}
                items={[
                    {
                        Icon: MostRecent,
                        title: "Most Recent",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            sortType !== "Most Recent" &&
                                setSortType("Most Recent");
                        }
                    },
                    {
                        Icon: Oldest,
                        title: "Oldest",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            sortType !== "Oldest" && setSortType("Oldest");
                        }
                    },
                    {
                        Icon: Ascending,
                        title: "Price (High - Low)",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            sortType !== "Highest Price" &&
                                setSortType("Highest Price");
                        }
                    },
                    {
                        Icon: Descending,
                        title: "Price (Low - High)",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            sortType !== "Lowest Price" &&
                                setSortType("Lowest Price");
                        }
                    }
                ]}
            />
            <OptionsPopupDialog
                open={openFilterOptions}
                title={"Filter"}
                cancel={() => {
                    setFilterType("All Products");
                    setOpenFilterOptions(!openFilterOptions);
                }}
                items={[
                    {
                        Icon: AllOrderSVG,
                        title: "All Products",
                        click: () => {
                            setOpenFilterOptions(!openFilterOptions);
                            filterType !== "All Products" &&
                                setFilterType("All Products");
                        }
                    },
                    {
                        Icon: PriceSVG,
                        more: true,
                        title: "Price",
                        click: () => {
                            setOpenFilterOptions(!openFilterOptions);
                            setOpenPriceRangePopup(!openPriceRangePopup);
                        }
                    },
                    {
                        Icon: MoqSVG,
                        more: true,
                        title: "Minimum Order Quantity",
                        click: () => {
                            setOpenFilterOptions(!openFilterOptions);
                            setOpenMoqPopup(!openMoqPopup);
                        }
                    }
                ]}
            />
              <MoqPopup
                open={openMoqPopup}
                setMoq={setMoq}
                cancel={() => {
                    setOpenMoqPopup(!openMoqPopup);
                }}
            />
            <PriceRangePopup
                open={openPriceRangePopup}
                cancel={() => {
                    setOpenPriceRangePopup(!openPriceRangePopup);
                }}
                setFilterPrice={setFilterPrice}
            />
        </Fragment>
    );
};

export default MerchbuyPopularProducts;
