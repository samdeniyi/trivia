import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";
import { Cart, ListShops } from "../components/";
import {
    SearchHeader,
    //  OptionsPopupDialog, MoqPopup
} from "../../../../components/";
import {Main, AddFlexBox, Container, CenterText, Space} from "../styles";
// import { ReactComponent as FilterIcon } from "../assets/filter.svg";
// import { ReactComponent as SortIcon } from "../assets/sort.svg";
// import { ReactComponent as HighestRatingIcon } from "../assets/highestRating.svg";
// import { ReactComponent as LowestRatingIcon } from "../assets/lowestRating.svg";
// import { ReactComponent as BusinessCategoriesIcon } from "../assets/businessCategories.svg";
// import { ReactComponent as MoqSVG } from "../../../../assets/moq.svg";

// import {
//     FilterAndSortSection,
//     SortFilterCell
// } from "../../../../containers/ScreenContainer";

// import { sortShops } from './sort';
// import { filterShops } from './filter';
import {MerchbuyFooter} from "../components/footer";

const MerchbuyShops = () => {

    // const businessCategoriespopupOptions = [{
    //     Icon: BusinessCategoriesIcon,
    //     title: "Performance",

    // },
    // {
    //     Icon: BusinessCategoriesIcon,
    //     title: "Debit Cards",
    // },
    // {
    //     Icon: BusinessCategoriesIcon,
    //     title: "Settings",
    // },
    // {
    //     Icon: BusinessCategoriesIcon,
    //     title: "Help & Support",
    // }]

    const dispatch = useDispatch();
    const shops = useSelector(
        state => state.applications.merchbuy.MerchbuyShops
    );
    useEffect(() => {
        dispatch(merchbuyActions.getAllShops({}));
    }, [dispatch]);

    const [shopsList, setShops] = useState(shops);
    const [searchValue, setSearchValue] = useState("");
    // const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    // const [sortType, setSortType] = useState("Sort");
    // const [openFilterOptions, setOpenFilterOptions] = useState(false);
    // const [filterType, setFilterType] = useState("Filter");
    // const [openBusinessCategoriesPopup, setOpenBusinessCategoriesPopupp] = useState(false);
    // const [businessCategory, setBusinessCategory] = useState("");
    // const [openMoqPopup, setOpenMoqPopup] = useState(false);
    // const [moqValue, setMoqValue] = useState("");

    // const setMoq = data => {
    //     if (data.moq) {
    //         setFilterType("By MOQ");
    //         setMoqValue(data.moq);
    //         setOpenMoqPopup(!openMoqPopup);
    //     }
    // };


    useEffect(() => {
        shops && setShops(shops.filter(
            data => data.name.toLowerCase().includes(searchValue.toLowerCase())
		));
    }, [searchValue, shops]);

    // useEffect(() => {
	// 	sortShops(sortType, shops, setShops);
    // }, [sortType, shops, setShops]);

    // useEffect(() => {
	// 	filterShops(filterType, shops, moqValue, businessCategory, setShops);
    // }, [filterType, shops, moqValue, businessCategory, setShops]);

    return (
        <Fragment>
            <SearchHeader
                withSpacesHeader
                title={"Shops"}
                right={"56px"}
                sticky
                placeholder={"Search for shops..."}
                handleSearch={setSearchValue}
            >
                <Cart />
            </SearchHeader>
            <Main>
                {/* <FilterAndSortSection top={"14px"} bottom={"10px"}>
                    <SortFilterCell
                        justifyContent={"center"}
                        color={"#212c3d"}
                        width={"100%"}
                        border={"1px solid #f2f5fa"}
                        onClick={() => setSortOptionsOpen(!sortOptionsOpen)}
                        >
                            <SortIcon />
                            {sortType}
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
                </FilterAndSortSection> */}
                <Container>
                    <CenterText>Found {shopsList && shopsList.length} Shops </CenterText>
                <AddFlexBox>
                    <ListShops
                        data={shopsList}
                        size={{ width: "64px", height: "64px" }}
                    />
                </AddFlexBox>
                </Container>
                <Space height="50px"/>
            </Main>
            {/* <OptionsPopupDialog
                open={sortOptionsOpen}
                title={"Sort"}
                cancel={() => {
                    setSortType("Sort");
                    setSortOptionsOpen(!sortOptionsOpen);
                }}
                items={[
                    {
                        Icon: HighestRatingIcon,
                        title: "Highest Ratings",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            sortType !== "Highest Ratings" &&
                                setSortType("Highest Ratings");
                        }
                    },
                    {
                        Icon: LowestRatingIcon,
                        title: "Oldest",
                        click: () => {
                            setSortOptionsOpen(!sortOptionsOpen);
                            sortType !== "Lowest Ratings" && setSortType("Lowest Ratings");
                        }
                    }
                ]}
            />
               <OptionsPopupDialog
                open={openFilterOptions}
                title={"Filter"}
                cancel={() => {
                    setFilterType("All Shops");
                    setOpenFilterOptions(!openFilterOptions);
                }}
                items={[
                    {
                        Icon: BusinessCategoriesIcon,
                        title: "All Shops",
                        click: () => {
                            setOpenFilterOptions(!openFilterOptions);
                            filterType !== "All Shops" &&
                                setFilterType("All Shops");
                        }
                    },
                    {
                        Icon: BusinessCategoriesIcon,
                        more: true,
                        title: "Business Categories",
                        click: () => {
                            setOpenFilterOptions(!openFilterOptions);
                            setOpenBusinessCategoriesPopupp(!openBusinessCategoriesPopup);
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
               <OptionsPopupDialog
                    open={openBusinessCategoriesPopup}
                    title={"Business Categories"}
                    cancel={() => setOpenBusinessCategoriesPopupp(!openBusinessCategoriesPopup)}
                    items={businessCategoriespopupOptions}
                /> */}
                <MerchbuyFooter/>
        </Fragment>
    );
};

export default MerchbuyShops;
