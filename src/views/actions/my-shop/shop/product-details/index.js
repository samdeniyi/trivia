import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { func, shape, object, string } from "prop-types";
import { withRouter } from "react-router-dom";
import { colors } from "../../../../../styles";
import { deleteProduct, updateProductQuantity } from "../../../../../redux/ducks/applications/my-shop/actions/shop";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";
import { findCatgoryInList } from "../../../../../utils/inventory/pendingItems";

import EditProduct from "../edit-product";
import {
	ScreenContainer,
	FlexCenteredBlock,
} from "../../../../../containers/ScreenContainer";
import {
	TopHeader,
	PageLogo,
	RippleButton,
	OptionsPopupDialog,
	ConfirmPopupDialog,
	UpdateStockPopup,
} from "../../../../../components";
import {
	SubTitle,
	SecondaryText,
} from "../../../../../containers/MessageContainer";
import {
	List,
	ListItem,
	ListHeading,
	ListHighlight,
} from "../../../../../containers/ListContainer";
import { Options } from "../../../../../containers/HeaderContainer";
import SupermarketIcon from "../../assets/supermarket.svg";
import { ReactComponent as MerchLogo } from "../../../../../assets/merch_icon.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/delete.svg";

const QuantityCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-top: 0;
  margin-left: 4px;
  padding: 4px 16px;
  border-radius: 15px;
  text-align: center;
  background-color: ${colors.aquamarine};
  color: ${colors.blue};
`;

const ProductDetailsBlock = styled.section`
  position: relative;
  margin-top: 36px;
`;

const DetailsSection = styled.div`
  padding: ${({ padding }) => padding || null};
  margin-top: 16px;
  border-radius: 13px;
  border: 1px solid ${colors.gray3};
  min-height: 97px;
`;

const Detail = styled(ListItem)`
  border-top: none;
`;

const DetailHeading = styled(ListHeading)`
  font-weight: 100;
  font-size: 12px;
  margin-top: 5px;
`;

const DetailHighlight = styled(ListHighlight)`
  font-size: 12px;
`;

const ProductName = styled(SubTitle)`
    text-align: center;
`;

const ProductDetails = ({
	location,
	updateProductQuantity,
	deleteProduct
}) => {

	const selectedProduct = location.state.product;
	const shopId = location.state.shopId;
	const shops = useSelector(state => state.applications.myShop.shops);
	const [openOptions, setOpenOptions] = useState(false);
	const [openEditProduct, setOpenEditProduct] = useState(false);
	const [confirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
	const [openUpdateStock, setOpenUpdateStock] = useState(false);
	const categoriesList = useSelector(state => state.applications.myShop.productCategories);
	const product = shops
		.find(shop => shop.id === shopId).inventory
		.find(product => product.id === selectedProduct.id);

	useEffect(() => {
		if (!selectedProduct.productCategory) setOpenEditProduct(true);
	}, [selectedProduct]);

	useEffect(() => {
		setOpenUpdateStock(false);
	}, [shops]);

	return (
		<Fragment>
			{!openEditProduct && (
				<TopHeader title={"Product details"} backLink={"/actions/shop_inventory"} withSpacesHeader>
					<Options right={"true"} onClick={() => setOpenOptions(!openOptions)} />
				</TopHeader>
			)}
			<ScreenContainer paddingBottom={"65px"}>
				<FlexCenteredBlock top={"64px"}>
					<PageLogo
						top={"8px"}
						background={"transparent"}
						width={"48px"}
						height={"48px"}
						iconWidth={"48px"}
						iconHeight={"48px"}
						Icon={
							(selectedProduct.images && selectedProduct.images.baseImageUrl) ||
							selectedProduct.base64ProductImageString ||
							SupermarketIcon
						}
					/>
					<ProductName top={"16px"}>
						{selectedProduct.productName}
					</ProductName>
					<SecondaryText
						style={{ color: colors.smoothGreyText }}
						top={"16px"}
						bottom={"12px"}
						weight={"500"}
					>
						{categoriesList && findCatgoryInList(categoriesList, selectedProduct.productCategory)}
					</SecondaryText>
					<SecondaryText top={"0"} bottom={"0"}>
						Quantity in stock
                        <QuantityCount>{product && product.quantity}</QuantityCount>
					</SecondaryText>
				</FlexCenteredBlock>
				{((selectedProduct.costPrice > 0) && selectedProduct.productUnit) && (
					<ProductDetailsBlock>
						<SubTitle>Details</SubTitle>
						<DetailsSection>
							<List noBorderBottom>
								<Detail top={"16px"} bottom={"16px"} borderBottom>
									<DetailHeading>Retail unit price</DetailHeading>
									<DetailHighlight>
										{formatPrice(selectedProduct.retailUnitPrice)}
									</DetailHighlight>
								</Detail>
								<Detail top={"16px"} bottom={"16px"} borderBottom>
									<DetailHeading>Cost</DetailHeading>
									<DetailHighlight>
										{formatPrice(selectedProduct.costPrice)}
									</DetailHighlight>
								</Detail>
								<Detail top={"16px"} bottom={"16px"} borderBottom>
									<DetailHeading>Sold in</DetailHeading>
									<DetailHighlight>
										{selectedProduct.productUnit}
									</DetailHighlight>
								</Detail>
							</List>
						</DetailsSection>
					</ProductDetailsBlock>
				)}
				<ProductDetailsBlock>
					<SubTitle>Visibility</SubTitle>
					<DetailsSection>
						<List noBorderBottom>
							<Detail top={"16px"} bottom={"16px"} borderBottom>
								<MerchLogo />
								<DetailHeading>Merchlist</DetailHeading>
								<DetailHighlight>
									{selectedProduct.availableAtRetailPrice
										? "Yes"
										: "No"}
								</DetailHighlight>
							</Detail>
							<Detail top={"16px"} bottom={"16px"} borderBottom>
								<MerchLogo />
								<DetailHeading>MerchBuy</DetailHeading>
								<DetailHighlight>
									{selectedProduct.availableAtWholesalePrice
										? "Yes"
										: "No"}
								</DetailHighlight>
							</Detail>
						</List>
					</DetailsSection>
				</ProductDetailsBlock>
				{(selectedProduct.bulkPrices && selectedProduct.bulkPrices.length > 0 && Object.values(selectedProduct.bulkPrices[0]).every(value => value !== "")) && (
					<ProductDetailsBlock>
						<SubTitle>Minimum Order Quantity</SubTitle>
						<DetailsSection>
							{selectedProduct.bulkPrices.length > 0 &&
								selectedProduct.bulkPrices.map((item, index) => (
									<List noBorderBottom key={index}>
										<Detail
											top={"16px"}
											bottom={"16px"}
											borderBottom
										>
											<DetailHeading>
												{item.moq + selectedProduct.productUnit}
											</DetailHeading>
											<DetailHighlight>{formatPrice(item.price || 0)}</DetailHighlight>
										</Detail>
									</List>
								))}
						</DetailsSection>
					</ProductDetailsBlock>
				)}
				{selectedProduct.productDescription && (
					<ProductDetailsBlock>
						<SubTitle>Description</SubTitle>
						<DetailsSection padding={"16px"}>
							<DetailHeading>
								{selectedProduct.productDescription}
							</DetailHeading>
						</DetailsSection>
					</ProductDetailsBlock>
				)}
				<RippleButton
					top={"16px"}
					onClick={() => setOpenUpdateStock(!openUpdateStock)}
				>
					Update stock
                </RippleButton>
			</ScreenContainer>
			{openUpdateStock && (
				<UpdateStockPopup
					open={openUpdateStock}
					title={"Edit Stock"}
					quantity={String(product && product.quantity)}
					message={"How many items are you adding or removing from this product’s stock?"}
					cancel={() => setOpenUpdateStock(!openUpdateStock)}
					updateProductQuantity={updateProductQuantity}
					shopId={shopId}
					id={selectedProduct.id}
					productName={selectedProduct.productName}
				/>
			)}
			<OptionsPopupDialog
				open={openOptions}
				title={"Options"}
				cancel={() => setOpenOptions(!openOptions)}
				items={[
					// {
					//     Icon: MerchLogo,
					//     title: "Re-order from Merchbuy",
					//     click: () => {
					//         setOpenOptions(!openOptions);
					//     }
					// },
					{
						Icon: EditIcon,
						title: "Edit Product Details",
						click: () => {
							setOpenOptions(!openOptions);
							setOpenEditProduct(!openEditProduct);
						}
					},
					{
						Icon: DeleteIcon,
						title: "Delete Product",
						click: () => {
							setOpenOptions(!openOptions);
							setConfirmDeletionOpen(!confirmDeletionOpen);
						}
					}
				]}
			/>
			<ConfirmPopupDialog
				open={confirmDeletionOpen}
				title={"Are you sure you want to delete this product?"}
				confirmationText={"Deleting a product will remove it from your inventory."}
				answers={[
					{
						variant: "No",
						action: () => setConfirmDeletionOpen(!confirmDeletionOpen)
					},
					{
						variant: "Yes",
						action: () => {
							setConfirmDeletionOpen(!confirmDeletionOpen);
							deleteProduct(shopId, selectedProduct.id);
						}
					}
				]}
			/>
			{openEditProduct && (
				<EditProduct
					open={openEditProduct}
					setOpen={setOpenEditProduct}
					shopId={shopId}
					product={selectedProduct}
				/>
			)}
		</Fragment>
	);
};

ProductDetails.propTypes = {
	location: shape({ state: shape({ product: object, shopId: string }) }),
	deleteProduct: func,
	updateProductQuantity: func,
};

export default connect(null, {
	deleteProduct,
	updateProductQuantity,
})(withRouter(ProductDetails));
