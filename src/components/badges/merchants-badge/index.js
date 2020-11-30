import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';
import { string, number, func, bool } from 'prop-types';
import { SmallLightText, SecondaryText, SubTitle } from '../../../containers/MessageContainer';
import { Badge } from '../../../containers/BadgeContainer';
import DownArrowIcon from './assets/down_arrow_orange.svg';
import { ReactComponent as MerchantsBadgeIcon } from './assets/merchants_badge.svg';

const BadgeWrapper = styled(Badge)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: ${({ bottom }) => bottom || null};
`;

const BadgeData = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 13px;
`;

const BadgeHeading = styled(SecondaryText)`
    margin: 0;
    color: ${colors.badge.lightOrange.text};
    font-weight: 500;
`;

const BadgeSubHeading = styled(SubTitle)`
    margin: 2px 0 0 0;
    font-weight: bolder;
    width: min-content;
    color: ${colors.badge.lightOrange.text};
`;

const CurrentFilter = styled.div`
    position: absolute;
    right: 16px;
    width: 100px;
    height: 23px;
    border-radius: 16px;
    background: ${colors.badge.lightOrange.bg};
    cursor: pointer;
`;

const CurrentFilterHeading = styled.h6`
    ${SmallLightText};
    color: ${colors.badge.lightOrange.text};
    font-size: 12px;
    line-height: 15px;
    position: relative;
    padding: 4px 0 4px 10px;

    &::after {
        content: url(${ DownArrowIcon });
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
`;

const MerchantsBadge = ({
    title,
    merchantsCount,
    currentFilter,
    openFilters,
    setOpenFilters,
    bottom
}) => {
    return (
        <BadgeWrapper
            background={colors.badge.lightOrange.bg}
            height={"66px"}
            bottom={bottom}
        >
            <MerchantsBadgeIcon width={"32px"} height={"32px"} />
            <BadgeData>
                <BadgeHeading>{title}</BadgeHeading>
                <BadgeSubHeading>{merchantsCount}</BadgeSubHeading>
            </BadgeData>
            {/* {(merchantsCount > 0) && ( */}
                <CurrentFilter onClick={() => setOpenFilters(!openFilters)}>
                    <CurrentFilterHeading>{currentFilter}</CurrentFilterHeading>
                </CurrentFilter>
            {/* )} */}
        </BadgeWrapper>
    );
};

MerchantsBadge.propTypes = {
    title: string,
    merchantsCount: number,
    currentFilter: string,
    openFilters: bool,
    setOpenFilters: func
};

export default MerchantsBadge;