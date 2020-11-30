import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { string, func, array } from 'prop-types';
import { formatPrice } from '../../../../../utils/currency/formatPriceWithComma';
import { unparseBalance } from '../../../../../utils/currency/parseBalance';
import { colors } from '../../../../../styles';
import { calculateProductsSubTotal, calculateProductsTotal, calculateTotalProfit } from '../../../../../utils/sales/calculateProductsTotal';

import { SubListContainer, SubList, SubListHeading, SubListValue } from '../../../../../containers/CheckoutContainer';
import { InputWithLabel, YesNoBlock, RippleButton, SetDiscountPopup, SwitchTrigger, AmountDue } from '../../../../../components';
import { SimpleSaleValidationSchema } from './SimpleSaleValidationSchema';
import { AdvancedSaleValidationSchema } from './AdvancedSaleValidationSchema';
import { InputBlock } from '../../../../../containers/InputContainer';
import { Message, SubTitle, SecondaryText } from '../../../../../containers/MessageContainer';
import { AddProductsForSale } from '../../sales/add-products';
import { ReactComponent as UserIcon } from '../../../../../assets/user.svg';
import { ReactComponent as SelectCustomerIcon } from '../../../../../assets/customers.svg';
import { SelectCustomer } from '../../customers/select-customer';
import { List } from '../../../../../containers/ListContainer';
import { searchProductsOnMasterList } from '../../../../../redux/ducks/applications/my-shop/actions/shop';

const CustomerInformationBlock = styled.div`
    margin: 24px 0 16px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    position: relative;
`;

const Customer = styled(UserIcon)`
    width: 24px;
    height: 24px;
    margin-right: 16px;
`;

const ApplyDiscountButton = styled(RippleButton)`
    color: ${colors.blue};
    background-color: ${colors.blueish};
    margin-bottom: 0px;
`;

const SelectCustomerBlock = styled.div`
    display: grid;
    grid-template-columns: minmax(264px, 100%) 1fr;
    margin-bottom: 0;
`;

const SelectCustomerButton = styled.div`
    max-width: 48px;
    background-color: ${colors.themeColor3};
    border-radius: 8px;
    margin-left: 16px;
    cursor: pointer;
    max-height: 52px;

    & > svg {
       width: 32px;
       height: 32px;
       margin: 8px;
    }
`;

const SaleCheckout = styled(List)`
    position: relative;
    padding: 16px;
    margin-bottom: 16px;
`;

const NameLabel = styled(SecondaryText)`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.themeTextColor1};
    margin: 0px 0 4px 0;
`;

const Container = styled.div``;

const ProfitValue = styled(SubListValue)`
    color: ${({ textColor }) => textColor || colors.myShop.profit.profit};
`;

export const SaleForm = ({
    openSelectCustomer,
    setOpenSelectCustomer,
    setSelectedProducts,
    openProductsList,
    setOpenProductsList,
    addProductOnTheFly,
    shopId,
    selectedProducts,
    submit,
    type,
    inventory
}) => {
    const isLoading = useSelector(state => state.applications.myShop.isLoading);
    const customers = useSelector(state => state.applications.myShop.customers);
    const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
    const [openDiscountPopup, setOpenDiscountPopup] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState(undefined);
    const advancedTotal =
        ((type === "Advanced Sale") && (selectedProducts.length > 0)) ?
        unparseBalance(calculateProductsTotal(selectedProducts, discount, 0)) : 0;
    const totalProfit =
        ((type === "Advanced Sale") && (selectedProducts.length > 0)) ?
        unparseBalance(calculateTotalProfit(selectedProducts, discount, 0)) : 0;

    return (
        <Formik
            initialValues={{
                fullPay: true,
                saleAmount: advancedTotal || "",
                paymentAmount: "",
                amountDue: "",
                customerPhoneNumber: "",
                discount,
                profit: totalProfit || 0,
                customerName: "",
                salesItemDetails: selectedProducts || null
            }}
            validationSchema={type === "Simple Sale" ? SimpleSaleValidationSchema : AdvancedSaleValidationSchema}
            enableReinitialize
            onSubmit={values => {
                if (values.fullPay) {
                    values.paymentAmount = values.saleAmount;
                } else {
                    values.amountDue = values.saleAmount - values.paymentAmount;
                };

                submit(values);
            }}
        >
        {({ errors, touched, values, setFieldValue, initialValues }) => (
            <Form>
                {(type !== "Advanced Sale") && (
                    <Fragment>
                        <Message bottom={"16px"} top={"0"}>How much was this sale ?</Message>
                        <InputWithLabel
                            label={"Sale amount"}
                            type={"text"}
                            autoComplete={'off'}
                            onBlur={e => e.target.value = formatPrice(values.saleAmount)}
                            onFocus={e => e.target.value = values.saleAmount}
                            placeholder={"Sale amount"}
                            inputMode={"numeric"}
                            name="saleAmount"
                            value={values.saleAmount}
                            valid={`${(!touched.saleAmount && !errors.saleAmount)}`}
                            errors={(touched && touched.saleAmount) && (errors && errors.saleAmount)}
                            setFieldValue={setFieldValue}
                            initialValues={initialValues}
                            bottom={'0'}
                        />
                        <YesNoBlock
                            title={"Did the customer pay in full?"}
                            setAnswer={setFieldValue}
                            answer={values.fullPay}
                            name={"fullPay"}
                        />
                    </Fragment>
                )}
                {(type === "Advanced Sale") && (
                    <Fragment>
                        {(selectedProducts.length > 0) && (
                        <Container>
                            <SaleCheckout fullScreen padding={"16px"}>
                                <SubListContainer>
                                    <SubList>
                                        <SubListHeading>SubTotal</SubListHeading>
                                        <SubListValue>
                                            {calculateProductsSubTotal(selectedProducts, 0)}
                                        </SubListValue>
                                    </SubList>
                                    <SubList>
                                        <SubListHeading>Discount</SubListHeading>
                                        <SubListValue>{formatPrice(discount)}</SubListValue>
                                    </SubList>
                                    {/* <SubList>
                                        <SubListHeading>V.A.T. (5%)</SubListHeading>
                                        <SubListValue>{calculateProductsVAT(selectedProducts, discount, 0.05)}</SubListValue>
                                    </SubList> */}
                                    <SubList>
                                        <SubListHeading>TOTAL</SubListHeading>
                                        <SubListValue>{values.saleAmount && formatPrice(values.saleAmount)}</SubListValue>
                                    </SubList>
                                </SubListContainer>
                            </SaleCheckout>
                            <SaleCheckout fullScreen>
                                <NameLabel>Profit Information</NameLabel>
                                <SubList>
                                  <SubListHeading>Profit on Sale</SubListHeading>
                                  <ProfitValue textColor={Math.sign(totalProfit) === -1 ? colors.myShop.profit.loss : colors.myShop.profit.profit }>
                                       {calculateTotalProfit(selectedProducts, discount, 0)}
                                  </ProfitValue>
                                </SubList>
                            </SaleCheckout>
                        </Container>
                        )}
                        <ApplyDiscountButton
                            type={"button"}
                            top={"0"}
                            disabled={values.saleAmount === ''}
                            onClick={() => setOpenDiscountPopup(!openDiscountPopup)}
                        >
                            {(values.discount > 0) ? "Change discount" : " Apply a discount"}
                        </ApplyDiscountButton>
                    </Fragment>
                )}
                {(type === "Advanced Sale" || !values.fullPay) && (
                    <Fragment>
                        <Message bottom={"16px"} top={"24px"}>How much did the customer pay?</Message>
                        <InputWithLabel
                            label={"Payment amount"}
                            type={"text"}
                            autoComplete={'off'}
                            placeholder={"Payment amount"}
                            inputMode={"numeric"}
                            name="paymentAmount"
                            disabled={values.saleAmount === ""}
                            onBlur={e => e.target.value = formatPrice(values.paymentAmount)}
                            onFocus={e => e.target.value = values.paymentAmount}
                            onKeyUp={event => {
                                if (Number(values.saleAmount) - Number(values.paymentAmount) > 0) {
                                    setFieldValue('fullPay', false);
                                } else {
                                    setFieldValue('fullPay', true);
                                };
                            }}
                            value={values.paymentAmount}
                            valid={`${(!touched.paymentAmount && !errors.paymentAmount)}`}
                            errors={(touched && touched.paymentAmount) && (errors && errors.paymentAmount)}
                            setFieldValue={setFieldValue}
                            initialValues={initialValues}
                            bottom={'24px'}
                        />
                    </Fragment>
                )}
                {!values.fullPay && (
                    <Fragment>
                        <Message bottom={"16px"} top={"24"}>Amount due</Message>
                        <AmountDue
                            amount={
                                (values.saleAmount && values.paymentAmount) ?
                                    (values.saleAmount - values.paymentAmount < 0) ? 0 :
                                    (values.saleAmount - values.paymentAmount) : 0
                            }
                        />
                    </Fragment>
                )}
                <CustomerInformationBlock>
                    <Customer />
                    <SubTitle color={colors.themeTextColor3}>Customer’s Information</SubTitle>
                    <SwitchTrigger
                        checkStatus={values.fullPay ? openCustomerDetails : !values.fullPay}
                        switchStatus={setOpenCustomerDetails}
                        right={"0px"}
                        top={"3px"}
                    />
                </CustomerInformationBlock>
                {(!values.fullPay || openCustomerDetails) && (
                    <InputBlock top={"16px"}>
                        <SelectCustomerBlock>
                            <InputWithLabel
                                label={"Phone Number"}
                                type={"number"}
                                value={values.customerPhoneNumber}
                                placeholder={"Phone Number"}
                                inputMode={"numeric"}
                                onKeyUp={e => e.target.value = e.target.value.replace(/\s/g, '')}
                                name="customerPhoneNumber"
                                valid={`${(!touched.customerPhoneNumber && !errors.customerPhoneNumber)}`}
                                errors={(touched && touched.customerPhoneNumber) && (errors && errors.customerPhoneNumber)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            {(customers.length > 0) && (
                                <SelectCustomerButton onClick={() => setOpenSelectCustomer(!openSelectCustomer)}>
                                    <SelectCustomerIcon />
                                </SelectCustomerButton>
                            )}
                        </SelectCustomerBlock>
                        <InputWithLabel
                            label={"Customer’s name"}
                            type={"text"}
                            value={values.customerName}
                            placeholder={"Customer’s name"}
                            name="customerName"
                            valid={`${(!touched.customerName && !errors.customerName)}`}
                            errors={(touched && touched.customerName) && (errors && errors.customerName)}
                            setFieldValue={setFieldValue}
                            initialValues={initialValues}
                        />
                    </InputBlock>
                )}
                {(type === "Advanced Sale") && (
                    <SetDiscountPopup
                        open={openDiscountPopup}
                        setOpen={setOpenDiscountPopup}
                        discount={discount}
                        setDiscount={setDiscount}
                        setFieldValue={setFieldValue}
                        amount={values.saleAmount}
                    />
                )}
                {(type === "Advanced Sale") && (
                    <AddProductsForSale
                        searchProductsOnMasterList={searchProductsOnMasterList}
                        shopId={shopId}
                        addProductOnTheFly={addProductOnTheFly}
                        open={openProductsList}
                        setOpen={setOpenProductsList}
                        setProducts={setSelectedProducts}
                        setFieldValue={setFieldValue}
                        inventory={inventory}
                        selectedProducts={selectedProducts}
                    />
                )}
                {openSelectCustomer && (
                    <SelectCustomer
                        open={openSelectCustomer}
                        setOpen={setOpenSelectCustomer}
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                        setFieldValue={setFieldValue}
                        customers={customers}
                    />
                )}
                <RippleButton
                    type="submit"
                    top={"8px"}
                    disabled={
                        isLoading || 
                        ((type === "Advanced Sale") ?
                        (values.paymentAmount === "" && values.saleAmount === "") :
                        values.saleAmount === "")
                    }
                >
                    Add Sale
                </RippleButton>
            </Form>
        )}
        </Formik>
    );
};

SaleForm.propTypes = {
    addProductOnTheFly: func,
    submit:             func,
    type:               string,
    inventory:          array
};