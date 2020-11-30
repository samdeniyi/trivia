import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { bool, func, object } from "prop-types";
import { colors } from "../../../styles";
import { PopUp, PopUpContent, CancelButton, ConfirmButton } from "../common";
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import { ReactComponent as SubstractIcon } from "./assets/substract.svg";
import { ReactComponent as AddIcon } from "./assets/add.svg";
import { is_url } from "../../../utils/urls/isUrl";
import { formatPrice } from "../../../utils/currency/formatPriceWithComma";

import FallbackProductImage from "./assets/productImage.svg";

const ProductBlock = styled.div`
    margin: 20px 0;
    display: flex;
    width: 100%;
`;

const ProductImage = styled.img`
    width: 82px;
    height: 82px;
    margin-top: 0;
    margin-left: 10px;
    border-radius: 20%;
    object-fit: cover;
    padding: 10px 0;
    background-color: #f2f5fa;
`;

const ProductInfo = styled.div`
    flex: 1;
    font-size: 14px;
    padding: 5px 15% 5px 10px;
`;
const ModifiedSubstractIcon = styled(SubstractIcon)`
    margin: 0 20px;
`;
const ModifiedAddIcon = styled(AddIcon)`
    margin: 0 20px;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin: 24px 0;
`;

const ProductDesc = styled.div`
    font-size: 14px;
    text-align: left;
`;

const UpdateCalculatorBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    & > svg {
        cursor: pointer;
    }
`;

const QuantityDisplay = styled.div`
    border-radius: 8px;
    width: 82px;
    height: 48px;
    background-color: ${colors.themeColor3};
    text-align: center;
`;

const CurrentQuantity = styled.input`
    position: relative;
    top: calc(50% - 8px);
    font-weight: 100;
    font-size: 14px;
    font-weight: 500;
    color: ${({ color }) => color || colors.themeTextColor1};
    margin-top: ${({ top }) => top || null};
    margin-left: ${({ left }) => left || null};
    width: 60%;
    background-color: inherit;
    border: none;
    text-align: center;
    &:focus {
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
`;

const MoqParagraph = styled.div`
    margin: 10px 0;
    font-size: 10px;
    color: #56636d;
    margin-bottom: 30px;
`;
const Table = styled.table`
    border: none;
    border-collapse: collapse;
    width: 70%;
    margin: 0 auto;
    text-align: left;
    color: #56636d;
    font-size: 12px;
`;

const TH = styled.th`
    border: none;
    border-collapse: collapse;
    font-weight: 400;
    padding: 10px;
    width: 50%;
`;

const TD = styled.td`
    border: none;
    border-collapse: collapse;
    padding: 10px;
`;

const TR = styled.tr`
&.active {
    color: #62a9dc;
  }
`


export const MerchbuyAddtoCartPopup = ({ open, cancel, data, confirm }) => {
    const [selectedMoq, setSelectedMoq] = useState(data.bulkPrices? data.bulkPrices[0].moq: 0);
    // const [nextMoq, setNextMoq] = useState(data.bulkPrices? data.bulkPrices[1].moq: "");
    // const [prevMoq, setPrevMoq] = useState(Number.NEGATIVE_INFINITY);
    const [IDX, setIDEX] = useState(0);


    const dispatch = useDispatch();

    useEffect(() => {
        if(data.bulkPrices) setSelectedMoq(data.bulkPrices[0].moq);
    }, [data])

  
    return (
        <PopUp open={open}>
            <Overlay onClick={cancel}></Overlay>
            <PopUpContent>
                <ProductBlock>
                    <ProductImage
                        src={
                            is_url(data.images? data.images.baseImageUrl: "")
                                ? data.images.baseImageUrl
                                : FallbackProductImage
                        }
                        alt="product image"
                    />
                    <ProductInfo>
                        <ProductDesc>
                            {data.name} <br /> {data.bulkPrices && (formatPrice(data.bulkPrices[0].price || 0) + ("/"+data.unitValue)|| "/Unit")}
                        </ProductDesc>
                    </ProductInfo>
                </ProductBlock>
                <Title>Quantity</Title>

                <UpdateCalculatorBlock>
                    <ModifiedSubstractIcon
                        onClick={() => {
                            setSelectedMoq(
                                parseInt(selectedMoq) - 1 <= data.moq
                                    ? data.moq
                                    : parseInt(selectedMoq) - 1
                            );
                        }}
                    />
                    <QuantityDisplay>
                        <CurrentQuantity
                            value={selectedMoq}
                            type={"number"}
                            onChange={e => {
                                setSelectedMoq(
                                    e.target.value < 0
                                        ? 0
                                        : parseInt(e.target.value)
                                );
                            }}
                        />
                    </QuantityDisplay>
                    <ModifiedAddIcon
                        onClick={() =>
                            setSelectedMoq(parseInt(selectedMoq) + 1)
                        }
                    />
                </UpdateCalculatorBlock>
                <MoqParagraph>
                    Minimum Order Quantity: {data.moq  + data.unitValue|| "Units"} 
                </MoqParagraph>

                <Table>
                 <thead>
                    <TR>
                        <TH>Qty</TH>
                        <TH>Price/{data.unitValue|| "Unit"}</TH>
                    </TR>
                    </thead>
                    <tbody>
                    {data.bulkPrices && data.bulkPrices.map((item, index) => (
                        <TR key={index} onClick={()=> {
                            setSelectedMoq(item.moq)
                            setIDEX(index)
                            // setNextMoq((data.bulkPrices[index + 1])? data.bulkPrices[index + 1].moq : Number.POSITIVE_INFINITY)
                            // setPrevMoq((data.bulkPrices[index - 1])? data.bulkPrices[index - 1].moq : Number.NEGATIVE_INFINITY)

                        } } className={
                            IDX === index ? "active" : ""
                          }>
                            <TD>{data.bulkPrices[index + 1]? item.moq: (item.moq + (" " +data.unitValue + "+")|| "Units+")}
                                    {data.bulkPrices[index + 1]
                                        ? (" - " + Number(data.bulkPrices[index + 1].moq -1) + (" "+data.unitValue)|| " Units")
                                        : ""}</TD>
                            <TD>{formatPrice(item.price || 0)}</TD>
                        </TR>
                    ))}
                    </tbody>
                </Table>

                <ActionBlock direction={"row"} top={"16px"}>
                    <CancelButton type={"button"} onClick={cancel}>Cancel</CancelButton>
                    <ConfirmButton onClick={()=> {
                        data.quantity = selectedMoq;
                        data.productId = data.id;
                        data.shopId = data.branchId;
                        dispatch(confirm(data))
                    }}>Add to cart</ConfirmButton>
                </ActionBlock>
            </PopUpContent>
        </PopUp>
    );
};

MerchbuyAddtoCartPopup.propTypes = {
    open: bool,
    cancel: func,
    data: object,
    confirm: func
};
