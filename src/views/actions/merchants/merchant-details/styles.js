import styled from "styled-components";
import { SmallLightText } from "../../../../containers/MessageContainer";
import { colors } from "../../../../styles";

export const LabelsList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(74px, min-content));
    grid-column-gap: 24px;
    grid-row-gap: 16px;
`;

export const BusinessCategoriesList = styled.ul`
    margin: 8px 0;
`;

export const InfoCategoryHeading = styled.h6`
    ${SmallLightText};
    color: ${colors.themeColor6};
    padding: 10px 0;
`;

export const Space = styled.div`
  height: ${({ height }) => height || "10px"};
`;
