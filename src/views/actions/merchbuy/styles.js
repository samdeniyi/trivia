import styled from "styled-components";
import { colors } from "../../../styles";
import { RippleLink } from "../../../components";
import { ReactComponent as Cart } from "./assets/shoppingCart.svg";
import { ReactComponent as Trash } from "./assets/trash.svg";
import { ReactComponent as ProductCategories } from "./assets/productCategories.svg";
import Shops from "./assets/shops.png";
import { ReactComponent as Store } from "./assets/storeIcon.svg";
import { ReactComponent as RecommendedProducts } from "./assets/recommendedProducts.svg";
import { ReactComponent as PopularProducts } from "./assets/popularProducts.svg";

export const PositionRelative = styled.span`
  position: absolute;
`;

export const CartIcon = styled(Cart)`
  position: absolute;
  right: 16px;
  height: 24px;
  width: 24px;
  top: 20px;
  cursor: pointer;
`;

export const TrashIcon = styled(Trash)`
  position: absolute;
  right: -3%;
  height: 24px;
  width: 24px;
  top: 20px;
  cursor: pointer;
`;


export const ProductCategoriesIcon = styled(ProductCategories)`
  height: 24px;
  width: 24px;
`;
export const ShopsIcon = styled.img.attrs(() => ({src: Shops}))`
height: 48px;
width: 48p
`;

export const StoreIcon = styled(Store)`
  height: 52px;
  width: 52px;
`;

export const RecommendedProductsIcon = styled(RecommendedProducts)`
  height: 24px;
  width: 24px;
`;
export const PopularProductsIcon = styled(PopularProducts)`
  height: 24px;
  width: 24px;
`;

export const NoOfItemsOnCart = styled.span`
  position: absolute;
  right: 8px;
  top: 7px;
  color: white;
  background-color: ${colors.blue2};
  width: 18px;
  height: 18px;
  padding: 4px;
  font-size: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Main = styled.main`
  padding-top: 60px;
`;
export const Container = styled.div`
  width: 93%;
  margin: 0 auto;
  margin-top: ${({top})=> top || "0"}
`;

export const HorizontalScrollBox = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
`;

export const AddGridBox = styled.div`
display: grid;
grid-template-columns: ;
grid-template-columns: ${({ width }) => `repeat(auto-fill, ${width})`};
justify-content: space-between;
}`

export const GridItem = styled.div`
  margin: 5px 0;
`;

export const AddFlex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ justifyContent }) => justifyContent || ""};
`;

export const AddFlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyContent }) => justifyContent || ""};
`;

export const ItemFlex = styled.div`
  margin: 5px;
  mergin-left: ${({ left }) => left || "5px"}
  flex: 1
`;

export const PageSubSections = styled.div`
  padding: 14px;
`;

export const PageSubSectionsTop = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  padding: ${({ padding }) => padding || "10px"};
`;

export const Sections = styled(PageSubSectionsTop)`
  font-weight: 500;
  padding: 0px;
`;

export const PageSubSectionsTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HorizontalSubSectionsTopLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageSubSectionsTopLeftTitle = styled.h4`
  font-weight: 700;
  font-size: 14px;
  margin-left:${({ left }) => left || "8px" };;
`;

export const ProductImage = styled.img`
  width: ${({ width }) => width || "98px"};
  height: ${({ height }) => height || "98px"};
  margin-top: ${({ top }) => top || 0};
  margin-bottom: 4px;
  border-radius: 12%;
  object-fit: cover;
  padding: 0;
`;

export const MainProductImage = styled.img`
  width: 100%;
  height: 360px;
  margin: 0;
  padding: 0 !important;
  object-fit: cover;
  padding: 10px 5px;
`;


export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.themeTextColor3};
  font-size: 10px;
  max-width: ${({ width }) => width || "100px"};
  padding: 0 5px;
`;

export const ProductInfoDesc = styled.div`
  display: block;
  font-size: 10px;
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  line-height: 1.3;
  text-transform: capitalize;
`;

export const ProductInfoOuter = styled.div`
display: flex !important;
align-items: center;
height: 24px
`;


export const ProductInfoPrice = styled.div`
  display: block;
  font-weight: 700;
  padding: 4px 0;
  font-size: 10px;
`;

export const ProductInfoBulkInfo = styled.div`
  display: block;
  font-size: 10px;
`;

export const ProductCategoryName = styled.div`
  display: block;
  background-color: ${colors.background.component};
  color: #29394f;
  font-size: 14px;
  width: ${({ width }) => width || "150px"};
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  padding: 7px 14px;
  font-size: 10px;
  text-align: center;
  height: ${({ height }) => height || "75px"};
  border-radius: ${({ radius }) => radius || "12%"};
`;

export const ShopBlock = styled.div`
  margin: 7px 0;
  display: flex;
  width: 100%;
`;

export const ShopImage = styled.img`
  width: ${({ width }) => width || "98px"};
  height: ${({ height }) => height || "98px"};
  margin-top: ${({ top }) => top || 0};
  border-radius: 20%;
  object-fit: cover;
  padding: 0;
  background-color: #f2f5fa;
`;

export const ShopInfo = styled.div`
  flex: 1;
  font-size: 14px;
  padding: 5px 3% 5px 10px;
`;

export const ShopName = styled.div`
  color: ${colors.themeTextColor3};
  font-weight: 700;
  padding: 2px 0;
  font-size: 10px
`;

export const ShopCategory = styled.div`
  color: ${colors.themeTextColor3};
  padding: 2px 0;
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px
`;

export const ShopLocation = styled.div`
  color: ${colors.themeTextColor4};
  font-size: 10px
`;

export const CenterText = styled.div`
  color: ${colors.themeTextColor4};
  margin: 20px 0;
  text-align: center;
`;

export const Description = styled.div`
  color: ${colors.themeTextColor3};
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const ArrowLink = styled(RippleLink)`
  position: absolute;
  top: 28px;
  right: 24px;
`;

export const BadgeHeading = styled.h5`
  position: absolute;
  top: 30px;
  left: 16px;
  font-size: 14px;
  line-height: 15px;
  color: #56636d;
  font-weight: 500;
`;

export const ActionButton = styled.button`
  display: inline-block;
  border: 1px solid ${colors.blue2};
  background-color: ${colors.white};
  color: ${colors.blue2};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  width:  ${({ width }) => width || "160px"} ;
  margin: 32px 0;
  margin-left: ${({ left }) => left || "0"};
  margin-right: ${({ right }) => right || "0"};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0;
  outline: none;
  &:focus::after {
    display: block;
  }
`;

export const Space = styled.div`
  height: ${({ height }) => height || "10px"};
`;

export const MoqBox = styled.div`
  display: flex;
`;

export const MoqItem = styled.div`
  height: 67px;
  min-width: 140px;
  border-radius: 10px;
  background-color: ${colors.background.component};
  margin: 5px;
`;
export const MoqItemPrice = styled.div`
  font-weight: 700;
  padding: 10px 15px;
  color: ${colors.themeTextColor3};
`;
export const MoqItemDesc = styled.div`
  font-size: 10px;
  padding: 0 15px;
  color: ${colors.themeTextColor3};
`;

export const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
  width: 100%;
  margin-top: ${({ top }) => top || "20px"};
  margin-bottom: ${({ bottom }) => bottom || "20px"};
`;

export const Datalist = styled.div`
    position: fixed;
    background: #fff;
    width: 93%;
    padding: 10px;
    height: 100%;
    z-index: 10000;
    border: 0;
`;

export const DatalistOption= styled.div`
    display: flex;
    padding: 10px 0;
    color: #29394f;
    font-size: 10px;
`;

export const DatalistTitle = styled.div`
 margin: 10px;
 `


