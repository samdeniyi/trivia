import styled from "styled-components";
import {
    ProductCategoryName
  } from "../styles";

export const ProductCategory = styled(ProductCategoryName)`
  margin: 5px;
`;

export const ShopInfoSection = styled.div`
   color:#56636d;
   padding: 20px;
   border: solid 1px #eeeeee;
   border-radius: .75rem;
   font-size: 14px;
`
export const Street = styled.div`
  margin: 5px;
`;

export const LGA = styled.div`
  margin: 5px;
`;

export const State = styled.div`
  margin: 5px;
`;

export const SeeAllbutton = styled.button`
  border:none;
  background: inherit;
  &:focus {
    outline: none;
    border: none
}
 `;