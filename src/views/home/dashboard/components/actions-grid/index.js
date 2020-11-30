import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { string, func } from "prop-types";
import { colors } from "../../../../../styles";
import {
    getAgentReferrals,
    getAgentTeams,
    updateAgentCommissions
} from "../../../../../redux/ducks/applications/agents/actions";
import {
    getMerchantReferrals,
    updateMerchantCommissions,
    getReferrals
} from "../../../../../redux/ducks/applications/merchants/actions";
// import { getShopInfoFromMerchapp } from "../../../../../redux/ducks/applications/my-shop/actions/shop";

import History from "../../../../../utils/History";

import { AppIframe } from "../../../../../components";

import { ReactComponent as MerchantsIcon } from "./assets/merchants.svg";
import { ReactComponent as MyAgentsIcon } from "./assets/my_agents.svg";
//import { ReactComponent as ElectricityBillIcon } from "./assets/electricity_bill.svg";
//import { ReactComponent as AirtimeDataIcon } from "./assets/airtime_data.svg";
import { ReactComponent as MerchAppIcon } from "./assets/merchapp.svg";
// import { ReactComponent as TransportationBillIcon } from "./assets/transportation.svg";
import { ReactComponent as MyShopsIcon } from "./assets/my_shops.svg";
import { ReactComponent as AddProductIcon } from "./assets/add_product.svg";
import { ReactComponent as AddSaleIcon } from "./assets/add_sale.svg";
//import { ReactComponent as EntertainmentIcon } from "./assets/entertainment.svg";
import { ReactComponent as CustomersIcon } from "./assets/customers.svg";
import { ReactComponent as SendMoneyIcon } from "./assets/send_money.svg";
import { ReactComponent as MegaPhoneIcon } from "./assets/megaphone.svg";
// import { ReactComponent as EducationIcon } from "./assets/education_bill.svg";
// import { ReactComponent as WaterIcon } from "./assets/water_bill.svg";
// import { ReactComponent as WareNextIcon } from "./assets/warenext.svg";
import { ReactComponent as TrainingIcon } from "./assets/lesson.svg";
import { ReactComponent as GameIcon } from "./assets/dice.svg";
import { ReactComponent as ElectricityBillIcon2 } from "./assets/electricity_bill2.svg";
import { ReactComponent as AirtimeDataIcon2 } from "./assets/phone.svg";
// import { ReactComponent as EnergyIcon } from "./assets/energy.svg";
// import { ReactComponent as AtomIcon } from "./assets/atom.svg";
// import { ReactComponent as EslIcon } from "./assets/esl.svg";
import { ReactComponent as DepositIcon } from "./assets/deposit.svg";
import { ReactComponent as WithdrawIcon } from "./assets/withdraw.svg";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import {
    MODULE_INTERACTION_CUSTOMER,
    MODULE_INTERACTION_REFERRALS,
    MODULE_INTERACTION_MY_MERCHANTS,
    MODULE_INTERACTION_MY_AGENTS_TEAMS,
    MODULE_INTERACTION_SEND_MONEY,
    MODULE_INTERACTION_ELECTRICITY_BILL,
    MODULE_INTERACTION_AIRTIME_DATA,
    // MODULE_INTERACTION_TRANSPORTATION,
    ///MODULE_INTERACTION_ENTERTAINMENT,
    MODULE_INTERACTION_MY_SHOP,
    MODULE_INTERACTION_MERCHBUY,
    MODULE_INTERACTION_ADD_A_SALE,
    MODULE_INTERACTION_ADD_A_PRODUCT,
    MODULE_INTERACTION_DEPOSIT,
    MODULE_INTERACTION_WITHDRAW,
    //MODULE_INTERACTION_MERCH_LIST,
    //MODULE_INTERACTION_EDUCATION_BILL,
    //MODULE_INTERACTION_WATER_BILL,
    SHOP_START_CREATE_PRODUCT,
    SHOP_START_CREATE_SALE
 } from '../../../../../utils/mix-panel/constants';
import { toast } from "react-toastify";

const ActionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(91px, 1fr));
    grid-gap: 16px;
    justify-items: center;
    @media screen and (max-width: 360px) {
        grid-gap: 8px;
    }
`;

const ActionCell = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 68px;
    padding: 4px;
    border-radius: 16px;
    background-color: ${({ bg }) => bg || null};
    cursor: pointer;
     &:after{
          content: "";
                position: absolute;
                left: 50%;
                top:50%;
                margin: -17px 0 0 -22px;
                background: white;
                border-radius: 6px;
                opacity: 0.7;
        };
    &:active:after{
                height: 34px;
                width: 45px;
                max-width: 160px;
                display: block;
                transform: scale(2);
                transition: 0.2s;
        };
`;

const ActionCellTitle = styled.h6`
    font-size: 10px;
    font-weight: 500;
    text-align: center;
    color: ${colors.themeTextColor1};
    margin-top: 8px;
`;

const ActionsList = ({
    type,
    getAgentReferrals,
    getMerchantReferrals,
    getReferrals,
    setStatusPopup
}) => {
    // const dispatch = useDispatch();
    const role = useSelector(state => state.user.role);
    const userId = useSelector(state => state.user.userId);
    const shops = useSelector(state => state.applications.myShop.shops);
    const agentState = useSelector(state => state.user.agentState ? state.user.agentState : "PENDING")
    const tier = useSelector(state => state.user.tier);
    const [openMerchlist, setOpenMerchlist] = useState(false);

    return (
        <ActionsGrid>
            {type === "AGENCYBANKING" && (
                <Fragment>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            mixPanel.track(MODULE_INTERACTION_DEPOSIT,
                                {
                                    "Icon Name": "Deposit",
                                    "Time": (new Date()).toLocaleDateString()
                                }
                            )
                        }}
                    >
                        <DepositIcon/>
                        <ActionCellTitle>Deposit</ActionCellTitle>
                    </ActionCell>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            mixPanel.track(MODULE_INTERACTION_WITHDRAW,
                                {
                                    "Icon Name": "Withdraw",
                                    "Time": (new Date()).toLocaleDateString()
                                }
                            )
                        }}
                    >
                        <WithdrawIcon/>
                        <ActionCellTitle>Withdraw</ActionCellTitle>
                    </ActionCell>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            History.push("/actions/airtime");
                            mixPanel.track(MODULE_INTERACTION_AIRTIME_DATA,
                                {
                                    "Icon Name": "Airtime & Data",
                                    "Time": (new Date()).toLocaleDateString()
                                }
                            )
                        }}
                    >
                        <AirtimeDataIcon2 />
                        <ActionCellTitle>Airtime & Data</ActionCellTitle>
                    </ActionCell>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            History.push("/actions/electricity");
                            mixPanel.track(MODULE_INTERACTION_ELECTRICITY_BILL,
                                {
                                    "Icon Name": "Electricity Bill",
                                    "Time": (new Date()).toLocaleDateString()
                                }
                            )
                        }}
                    >
                        <ElectricityBillIcon2 />
                        <ActionCellTitle>Electricity Bill</ActionCellTitle>
                    </ActionCell>
                </Fragment>
            )}
            {type === "FINANCIAL" && (
                <Fragment>
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {
                                mixPanel.track(MODULE_INTERACTION_MERCH_LIST,
                                    {
                                        "Icon Name": "Merch List",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <MerchAppIcon/>
                        <ActionCellTitle>Merch List</ActionCellTitle>
                    </ActionCell> */}
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if(!navigator.onLine) {
                                toast.error("sorry , merchbuy can't be accessed while you are offline")
                            } else {
                                if (agentState === "APPROVED") {
                                    setOpenMerchlist(!openMerchlist);
                                    History.push("/actions/merchbuy");
                                    mixPanel.track(MODULE_INTERACTION_MERCHBUY,
                                        {
                                            "Icon Name": "MerchBuy",
                                            "Time": (new Date()).toLocaleDateString()
                                        }
                                    )
                                } else {
                                    setStatusPopup(true);
                                }
                            }
                        }}
                    >
                        <MerchAppIcon/>
                        <ActionCellTitle>Merch Buy</ActionCellTitle>
                   </ActionCell>          
                    {tier && tier === "TIER_1" && (
                        <Fragment>
                            {/* <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    if (agentState === "APPROVED") {
                                        History.push("/actions/airtime");
                                        mixPanel.track(MODULE_INTERACTION_AIRTIME_DATA,
                                            {
                                                "Icon Name": "Airtime & Data",
                                                "Time": (new Date()).toLocaleDateString()
                                            }
                                        )
                                    } else {
                                        setStatusPopup(true);
                                    }
                                }}
                            >
                                <AirtimeDataIcon />
                                <ActionCellTitle>Airtime & Data</ActionCellTitle>
                            </ActionCell> */}
                            {/* <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    if (agentState === "APPROVED") {
                                        History.push("/actions/electricity");
                                        mixPanel.track(MODULE_INTERACTION_ELECTRICITY_BILL,
                                            {
                                                "Icon Name": "Electricity Bill",
                                                "Time": (new Date()).toLocaleDateString()
                                            }
                                        )
                                    } else {
                                        setStatusPopup(true);
                                    }
                                }}
                            >
                                <ElectricityBillIcon />
                                <ActionCellTitle>Electricity Bill</ActionCellTitle>
                            </ActionCell> */}
                        </Fragment> 
                    )}
                    {/* <ActionCell
                            bg={colors.dashboardActions[type]}
                            onClick={() => {
                                if (agentState === "APPROVED") {
                                    History.push("/actions/entertainment");
                                    mixPanel.track(MODULE_INTERACTION_ENTERTAINMENT,
                                        {
                                            "Icon Name": "Entertainment",
                                            "Time": (new Date()).toLocaleDateString()
                                        }
                                    )
                                } else {
                                    setStatusPopup(true);
                                }
                            }}
                        >
                        <EntertainmentIcon />
                        <ActionCellTitle>Entertainment</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {
                                History.push("/actions/transportation");
                                mixPanel.track(MODULE_INTERACTION_TRANSPORTATION,
                                    {
                                        "Icon Name": "Transportation",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <TransportationBillIcon />
                        <ActionCellTitle>Transport Bill</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {
                                mixPanel.track(MODULE_INTERACTION_EDUCATION_BILL,
                                    {
                                        "Icon Name": "Education Bill",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <EducationIcon/>
                        <ActionCellTitle>Education Bill</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {
                                mixPanel.track(MODULE_INTERACTION_WATER_BILL,
                                    {
                                        "Icon Name": "Water Bill",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <WaterIcon/>
                        <ActionCellTitle>Water Bill</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {

                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <EnergyIcon/>
                        <ActionCellTitle>Energy</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {
                           
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <AtomIcon/>
                        <ActionCellTitle>Atom</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {

                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <EslIcon/>
                        <ActionCellTitle>ESL</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (agentState === "APPROVED") {

                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <WareNextIcon/>
                        <ActionCellTitle>Warenext</ActionCellTitle>
                    </ActionCell> */}
                </Fragment>
            )}
            {type === "SHOP" && (
                <Fragment>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (role === "ROLE_USER" ||
                                (role === "ROLE_AGENT" && agentState === "APPROVED")
                            ) {
                                setOpenMerchlist(!openMerchlist);
                                History.push("/actions/shop");
                                mixPanel.track(MODULE_INTERACTION_MY_SHOP,
                                    {
                                        "Icon Name": "My Shop",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <MyShopsIcon style={{ width: "24px", height: "24px" }}/>
                        <ActionCellTitle>My Shop</ActionCellTitle>
                    </ActionCell>
                    {shops[0] && Object.keys(shops[0]).includes('branchId') && (
                        <Fragment>
                            <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    if (role === "ROLE_USER" ||
                                        (role === "ROLE_AGENT" && agentState === "APPROVED")
                                    ) {
                                        setOpenMerchlist(!openMerchlist);
                                        History.push("/actions/shop_sales_add");
                                        mixPanel.track(MODULE_INTERACTION_ADD_A_SALE,
                                            {
                                                "Icon Name": "Add A Sale",
                                                "Time": (new Date()).toLocaleDateString()
                                            }
                                        )
                                        mixPanel.track(SHOP_START_CREATE_SALE,
                                            {
                                                "Entry Point": "Dashboard",
                                                "Time": (new Date()).toLocaleDateString(),
                                                "User ID": userId,
                                                "shop ID": shops[0].id
                                            }
                                        )
                                }}}
                            >
                                <AddSaleIcon style={{ width: "24px", height: "24px" }}/>
                                <ActionCellTitle>Add A Sale</ActionCellTitle>
                            </ActionCell>
                            <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    if (role === "ROLE_USER" ||
                                        (role === "ROLE_AGENT" && agentState === "APPROVED")
                                    ) {
                                        setOpenMerchlist(!openMerchlist);
                                        History.push("/actions/shop_products_add");
                                        mixPanel.track(MODULE_INTERACTION_ADD_A_PRODUCT,
                                            {
                                                "Icon Name": "Add A Product",
                                                "Time": (new Date()).toLocaleDateString()
                                            }
                                        )
                                        mixPanel.track(SHOP_START_CREATE_PRODUCT,
                                            {
                                                "Entry Point": "Dashboard"
                                            }
                                        )
                                    } else {
                                        setStatusPopup(true);
                                    }
                                }}
                            >
                                <AddProductIcon style={{ width: "24px", height: "24px" }}/>
                                <ActionCellTitle>Add A Product</ActionCellTitle>
                            </ActionCell>
                        </Fragment>
                    )}
                </Fragment>
            )}
            {type === "CONTACTS" && (
                <Fragment>
                    {shops[0] && Object.keys(shops[0]).includes('branchId') && (
                        <ActionCell
                            bg={colors.dashboardActions[type]}
                            onClick={() => {
                                if (role === "ROLE_USER" ||
                                    (role === "ROLE_AGENT" && agentState === "APPROVED")
                                ) {
                                    History.push("/actions/shop_customers");
                                    mixPanel.track(MODULE_INTERACTION_CUSTOMER,
                                        {
                                            "Icon Name": "Customers",
                                            "Time": (new Date()).toLocaleDateString()
                                        }
                                    )
                                } else {
                                    setStatusPopup(true);
                                }
                            }}
                        >
                            <CustomersIcon style={{ width: "24px", height: "24px" }}/>
                            <ActionCellTitle>Customers</ActionCellTitle>
                        </ActionCell>
                    )}
                    {role === "ROLE_USER" && (
                        <Fragment>
                            <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    getReferrals();
                                    History.push("/actions/merchant_referrals");
                                    mixPanel.track(MODULE_INTERACTION_REFERRALS,
                                        {
                                            "Icon Name": "Referrals",
                                            "Time": (new Date()).toLocaleDateString()
                                        }
                                    )
                                }}
                            >
                                <MegaPhoneIcon />
                                <ActionCellTitle>Referrals</ActionCellTitle>
                            </ActionCell>
                        </Fragment>
                    )}
                    {role === "ROLE_AGENT" && (
                        <Fragment>
                            <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    if (agentState === "APPROVED") {
                                        getMerchantReferrals();
                                        History.push("/actions/merchants");
                                        mixPanel.track(MODULE_INTERACTION_MY_MERCHANTS,
                                            {
                                                "Icon Name": "My Merchants",
                                                "Time": (new Date()).toLocaleDateString()
                                            }
                                        )
                                    } else {
                                        setStatusPopup(true);
                                    }
                                }}
                            >
                                <MerchantsIcon />
                                <ActionCellTitle>My Merchants</ActionCellTitle>
                            </ActionCell>
                            <ActionCell
                                bg={colors.dashboardActions[type]}
                                onClick={() => {
                                    if (agentState === "APPROVED") {
                                        getAgentReferrals();
                                        History.push("/actions/agents");
                                        mixPanel.track(MODULE_INTERACTION_MY_AGENTS_TEAMS,
                                            {
                                                "Icon Name": "My Agents & Teams",
                                                "Time": (new Date()).toLocaleDateString()
                                            }
                                        )
                                    } else {
                                        setStatusPopup(true);
                                    }
                                }}
                            >
                                <MyAgentsIcon />
                                <ActionCellTitle>My Agents & Teams</ActionCellTitle>
                            </ActionCell>
                        </Fragment>
                    )}
                </Fragment>
            )}
            {type === "SERVICES" && (
                <Fragment>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if(!navigator.onLine) {
                                toast.error("sorry, merchbuy can't be accessed while you are offline")
                            } else {
                                setOpenMerchlist(!openMerchlist);
                                History.push("/actions/merchbuy");
                                mixPanel.track(MODULE_INTERACTION_MERCHBUY,
                                    {
                                        "Icon Name": "MerchBuy",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            }
                        }}
                    >
                        <MerchAppIcon/>
                        <ActionCellTitle>Merch Buy</ActionCellTitle>
                    </ActionCell>          
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            History.push("/actions/airtime");
                            mixPanel.track(MODULE_INTERACTION_AIRTIME_DATA,
                                {
                                    "Icon Name": "Airtime & Data",
                                    "Time": (new Date()).toLocaleDateString()
                                }
                            )
                        }}
                    >
                        <AirtimeDataIcon />
                        <ActionCellTitle>Airtime & Data</ActionCellTitle>
                    </ActionCell> */}
                    {/* <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            History.push("/actions/electricity");
                            mixPanel.track(MODULE_INTERACTION_ELECTRICITY_BILL,
                                {
                                    "Icon Name": "Electricity Bill",
                                    "Time": (new Date()).toLocaleDateString()
                                }
                            )
                        }}
                    >
                        <ElectricityBillIcon />
                        <ActionCellTitle>Electricity Bill</ActionCellTitle>
                    </ActionCell> */}
                </Fragment>
            )}
            {type === "LEARNING" && (
                <Fragment>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (role === "ROLE_USER" ||
                                (role === "ROLE_AGENT" && agentState === "APPROVED")
                            ) {

                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <TrainingIcon/>
                        <ActionCellTitle>Training Centre</ActionCellTitle>
                    </ActionCell>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (role === "ROLE_USER" ||
                                (role === "ROLE_AGENT" && agentState === "APPROVED")
                            ) {

                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <GameIcon/>
                        <ActionCellTitle>Games</ActionCellTitle>
                    </ActionCell>
                </Fragment>
            )}

            {type === "FINANCIALOLD" ? (
                <Fragment>
                    <ActionCell
                        bg={colors.dashboardActions[type]}
                        onClick={() => {
                            if (
                                (role === "ROLE_AGENT" &&
                                    agentState === "APPROVED") ||
                                role === "ROLE_USER"
                            ) {
                                History.push("actions/send_money");
                                mixPanel.track(MODULE_INTERACTION_SEND_MONEY,
                                    {
                                        "Icon Name": "Send Money",
                                        "Time": (new Date()).toLocaleDateString()
                                    }
                                )
                            } else {
                                setStatusPopup(true);
                            }
                        }}
                    >
                        <SendMoneyIcon />
                        <ActionCellTitle>Send Money</ActionCellTitle>
                    </ActionCell>
                </Fragment>
            ) : (
                <Fragment>
                    {openMerchlist && (
                        <AppIframe
                            title={"Merchlist"}
                            open={openMerchlist}
                            setOpen={setOpenMerchlist}
                            url={"https://www.merchlist.co/"}
                        />
                    )}
                </Fragment>
            )}

        </ActionsGrid>
    );
};

ActionsList.propTypes = {
    role: string,
    getAgentReferrals: func,
    getAgentTeams: func,
    getMerchantReferrals: func,
    getReferrals:  func,
    updateAgentCommissions: func,
    updateMerchantCommissions: func,
    getShops: func,
    setStatusPopup: func
};

const mapStateToProps = ({ user }) => ({
    role: user.role
});

export default connect(mapStateToProps, {
    getAgentReferrals,
    getAgentTeams,
    updateAgentCommissions,
    updateMerchantCommissions,
    getMerchantReferrals,
    getReferrals
})(ActionsList);