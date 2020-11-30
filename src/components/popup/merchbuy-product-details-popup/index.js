import React from "react";

import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    ConfirmButton
} from "../common";
import { Overlay } from "../../../containers/OverlayContainer";
import styled from "styled-components";

import { bool, func, any } from "prop-types";

const Header = styled(PopUpHeader)`
    font-weight: 500;
    border-bottom: 1.5px solid #f0f0f0
`;
const Button = styled(ConfirmButton)`
    color: #6c7984;
`;

const Table = styled.div`
    text-align: left;
    font-size: 12px
`;

const TableBlock = styled.div`
    display: flex;
    padding: 20px 0;
    border-bottom: 1.5px solid #f0f0f0
`;

const TableTitle = styled.div`
    flex: 1;
    color: #;
    margin: 0 15px;
    color: #56636d
`;
const TableDesc = styled.div`
    flex: 2.5;
    color: #29394f;
    font-weight: 500;
    margin-right: 10px
`;

export const ProductDetailsPopup = ({ open, cancel, data, productCategeries, productCategoryName }) => {
    return (
        <PopUp open={open}>
            <Overlay onClick={cancel} nonSliding={true}></Overlay>
            <PopUpContent>
                <Header align={"left"}>Product description</Header>
                <Table>
                    <TableBlock>
                        <TableTitle>Product Name</TableTitle>
                        <TableDesc>{data.name}</TableDesc>
                    </TableBlock>
                    <TableBlock>
                        <TableTitle>Product Category</TableTitle>
                        <TableDesc>{productCategoryName(productCategeries, data.primaryCategory)}</TableDesc>
                    </TableBlock>
                    <TableBlock>
                        <TableTitle>Product Unit</TableTitle>
                        <TableDesc>{data.unitValue}</TableDesc>
                    </TableBlock>
                    <TableBlock>
                        <TableTitle>Minimum Quantity</TableTitle>
                        <TableDesc>{data.moq}</TableDesc>
                    </TableBlock>
                    <TableBlock>
                        <TableTitle>Description</TableTitle>
                        <TableDesc>
                        {data.description}
                        </TableDesc>
                    </TableBlock>
                </Table>
                <Button type="submit" onClick={cancel}>
                    Okay
                </Button>
            </PopUpContent>
        </PopUp>
    );
};

ProductDetailsPopup.propTypes = {
    open: bool,
    cancel: func,
    data: any,
    productCategeries: any,
    productCategoryName: func
};
