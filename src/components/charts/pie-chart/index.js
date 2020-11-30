import React, { useState } from "react";
import styled from "styled-components";
import { string, any, bool } from "prop-types";
import { amountShare } from "../../../utils/currency/countAmount";
import { colors, fonts } from "../../../styles";

import { PieChart } from "react-minimal-pie-chart";
import { SecondaryText, SmallLightText } from "../../../containers/MessageContainer";
import { ActivitySummaryBlock, ActivityTotal, ActivityLabel } from "../../../views/home/performance/performance-page/styles";
import { ActivityGraphBlock } from "../../../containers/ActivityContainer";
import DownArrowIcon from "../assets/down-arrow.svg";

export const NameLabel = styled(SecondaryText)`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.themeTextColor1};
    margin: 24px 0;
`;

export const ChartBlock = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;

    & > svg {
        width: 122px;
        height: 136px;
    }
`;

export const ChartDescription = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
`;

export const ChartDescriptionElement = styled.li`
    &:before {
        content: "⬤";
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 12px;
        color: ${({ type }) => `${colors.performanceChart[type]}`};
    }

    font-family: ${fonts.main};
    font-size: 12px;
    font-weight: 100;
    line-height: 18px;
    color: ${colors.themeTextColor3};
    margin-bottom: 12px;
`;

export const TotalAmount = styled(NameLabel)`
    font-weight: bold;
    text-align: left;
    margin: 0;
`;

export const FilterData = styled.div`
    width: 100px;
    height: 23px;
    border-radius: 16px;
    background: ${colors.blueish};
    cursor: pointer;
`;

export const FilterHeading = styled.h6`
    ${SmallLightText};
    color: ${colors.blue};
    font-size: 12px;
    line-height: 15px;
    position: relative;
    padding: 4px 0 4px 10px;

    &::after {
        content: url(${DownArrowIcon});
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
`;

export const PieChartStat = ({
    noBorderBottom = false,
    total,
    title,
    selectedFilter,
    activityData
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    const activityValues = activityData.map(activity => ({
        type: activity.title,
        value: amountShare(total, activity.value)
    }));

    return (
        <ActivityGraphBlock noBorderBottom padding={"16px 16px 0 16px"}>
            <ActivitySummaryBlock>
                <ActivityTotal>
                    <TotalAmount>{total}</TotalAmount>
                    <ActivityLabel>{title}</ActivityLabel>
                </ActivityTotal>
                <FilterData onClick={() => setFilterOpen(!filterOpen)}>
                    <FilterHeading>{selectedFilter}</FilterHeading>
                </FilterData>
            </ActivitySummaryBlock>
            <ChartBlock>
                <PieChart lineWidth={32} data={activityData} />
                <ChartDescription>
                    {activityValues &&
                        activityValues.map((element, index) => (
                            <ChartDescriptionElement
                                key={index}
                                type={element.type.toUpperCase()}
                            >
                                {element.value} From {element.type}
                            </ChartDescriptionElement>
                        ))}
                </ChartDescription>
            </ChartBlock>
        </ActivityGraphBlock>
    );
};

PieChartStat.propTypes = {
    title: string,
    selectedFilter: string,
    noBorderBottom: bool,
    activityData: any
};
