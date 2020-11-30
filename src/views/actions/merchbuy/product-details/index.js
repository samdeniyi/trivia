import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { matchPath } from "react-router-dom";
import useRouter from "use-react-router";
import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";
import { Cart, ListProducts } from "../components";
import { productCategoryName } from "../utils/getProductCatNameById";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";
import History from "../../../../utils/History";

import styled from "styled-components";
import {
  TopHeader,
  RippleButton,
  ProductDetailsPopup,
  MerchbuyAddtoCartPopup,
  InfoPopupDialog
} from "../../../../components";
import {
  Main,
  AddFlexBox,
  AddFlex,
  HorizontalScrollBox,
  BadgeHeading,
  ActionButton,
  Container,
  PageSubSectionsTop,
  PageSubSectionsTopLeft,
  PageSubSectionsTopLeftTitle,
  RecommendedProductsIcon,
  StoreIcon,
  ProductCategoryName,
  Space,
  Description,
  MainProductImage,
  MoqItem,
  MoqItemPrice,
  MoqItemDesc,
  Divider
} from "../styles";
import { ReactComponent as ForwardArrowIcon } from "../../../../assets/arrow.svg";
import { Badge } from "../../../../containers/BadgeContainer";
import ProductFallbackImage from "../assets/productFallbackImage.png";

const ProductCategory = styled(ProductCategoryName)`
  margin: 5px;
`;

const ForwardIcon = styled(ForwardArrowIcon)`
  position: absolute;
  top: 28px;
  right: 24px;
`;

const MoqDescription = styled(Description)`
  font-size: 12px;
`;

const ModifiedBadge = styled(Badge)`
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  margin-bottom: 14px;
`;

const ProductDetails = () => {
  const { location } = useRouter();
  const { pathname } = location;
  const pattern = `(.*)?${"/actions/merchbuy/product/:id"}`;
  const match = matchPath(pathname, { path: pattern }) || {};

  const dispatch = useDispatch();
  const recommendedProducts = useSelector(
    state => state.applications.merchbuy.MerchbuyRecommendedProducts
  );
  const productCategeries = useSelector(
    state => state.applications.merchbuy.MerchbuyProductCategeries
  );

  const product = useSelector(state => state.applications.merchbuy.product);
  const shopDetails = useSelector(state => state.applications.merchbuy.shop);

  const [openProductDetailsPopup, setOpenProductDetailsPopup] = useState(false);
  const [openCartPopup, setOpenCartPopup] = useState(false);
  const [openContactMerchant, setOpenContactMerchant] = useState(false);

  useEffect(() => {
    dispatch(merchbuyActions.getRecommendedProducts(10, ""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(merchbuyActions.getProductDetials(match.params.id)).then(
      product.branchId &&
        dispatch(merchbuyActions.getShopDetials(product.branchId))
      );
  }, [match.params.id, product.branchId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(merchbuyActions.unsubscribe());
    };
  }, [dispatch]);

  return (
    <Fragment>
      <TopHeader title={"Product details"} right={"16px"} withSpacesHeader>
        <Cart />
      </TopHeader>
      <Main>
        <MainProductImage
          src={
            product.images
              ? product.images.baseImageUrl
              : ProductFallbackImage
          }
          onError={e => {
            e.target.src = ProductFallbackImage;
          }}
          alt="product image"
          width={"100%"}
          height={"auto"}
        />
        <Container>
          <Space height={"20px"} />
          <Description>
            { (product.name && product.name.toLowerCase()) + " - " + (product.unitValue || "units")}
          </Description>
        </Container>

        <ModifiedBadge
          top={"14px"}
          height={"69px"}
          onClick={() => {
            setOpenProductDetailsPopup(!openProductDetailsPopup);
          }}
        >
          <BadgeHeading>Product Description</BadgeHeading>

          <ForwardIcon />
        </ModifiedBadge>
        <Container>
          <HorizontalScrollBox>
            {product.bulkPrices &&
              product.bulkPrices.map((item, index) => (
                <MoqItem key={index}>
                  <MoqItemPrice>{formatPrice(item.price || 0)}</MoqItemPrice>
                  <MoqItemDesc>
                    {product.bulkPrices[index + 1]
                      ? item.moq
                      : item.moq + (" " + product.unitValue + "+") || " Units+"}
                    {product.bulkPrices[index + 1]
                      ? " - " +
                          Number(product.bulkPrices[index + 1].moq - 1) +
                          (" " + product.unitValue + "+") || " Units+"
                      : ""}
                  </MoqItemDesc>
                </MoqItem>
              ))}
          </HorizontalScrollBox>

          <Space height={"20px"} />
          <MoqDescription>
            Minimum Order Quantity: {product.moq + product.unitValue || "units"}
          </MoqDescription>
          </Container>
          <Divider top={"16px"} bottom={"16px"}/>
          <Container>
          <RippleButton
            top={"0"}
            type={"button"}
            onClick={() => setOpenCartPopup(!openCartPopup)}
          >
            Start Order
          </RippleButton>
          </Container>
           <Divider top={"16px"} bottom={"16px"}/>
          <Container>
          <PageSubSectionsTop>
            <PageSubSectionsTopLeft>
              <StoreIcon />
              <PageSubSectionsTopLeftTitle>
                {shopDetails && shopDetails.name}
              </PageSubSectionsTopLeftTitle>
            </PageSubSectionsTopLeft>
          </PageSubSectionsTop>
          {product.primaryCategory && (
            <AddFlexBox>
              <ProductCategory width={"auto"} height={"30px"} radius={"32px"}>
                {productCategoryName(
                  productCategeries,
                  product.primaryCategory
                )}
              </ProductCategory>
            </AddFlexBox>
          )}
          <AddFlex >
            <ActionButton
                width={"100%"}
                right={"8px"}
                onClick={() =>
                shopDetails &&
                History.push(`/actions/merchbuy/shop/${shopDetails.id}`)
              }
            >
              Visit Shop
            </ActionButton>
            <ActionButton
                width={"100%"}
                left={"8px"}
                onClick={() => setOpenContactMerchant(!openContactMerchant)}
            >
              Contact Merchant
            </ActionButton>
          </AddFlex>

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
          />
          <Space height={"50px"} />
        </Container>
      </Main>
      <ProductDetailsPopup
        open={openProductDetailsPopup}
        data={product}
        productCategoryName={productCategoryName}
        productCategeries={productCategeries}
        cancel={() => {
          setOpenProductDetailsPopup(!openProductDetailsPopup);
        }}
      />

      <MerchbuyAddtoCartPopup
        open={openCartPopup}
        data={product}
        cancel={() => setOpenCartPopup(!openCartPopup)}
        confirm={merchbuyActions.addProductToCart}
      />
      <InfoPopupDialog
        open={openContactMerchant}
        cancel={() => setOpenContactMerchant(!openContactMerchant)}
        title={"Contact Merchant"}
        message={"Coming Soon."}
        padding={"38px 8px"}
        messagePadding={"5px 0 40px 0"}
      />
    </Fragment>
  );
};

export default ProductDetails;
