import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { bool, func, object, array } from 'prop-types';
import { PhoneNumberSignUpValidationSchema } from './PhoneNumberSignUpValidationSchema';
import { saveWalletTransferData, sendMoneyFromWalletToWallet, saveLastTransferedRecipient, saveWalletTransferAmount, switchWalletUsageMode } from '../../../../redux/ducks/account/wallet/actions';
import { flags, countriesData } from '../../../../data/countries';
import { listToAlphabetMap } from '../../../../utils/sorting/alphabeticSort';
import {
    Loader,
    InputWithLabel, 
    TopHeader,
    RippleButton,
    SelectCountryOverlay,
    TransferConfirmation,
    PageLogo,
    // SwitchTrigger,
    // TransactionResult,
} from '../../../../components';
import { Message, SubTitle } from '../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { InlineButton } from '../../../../components/button';
// import { OptionName } from '../../../../containers/MenuContainer';
import ChevronDownIcon from '../../../../assets/chevron_down.svg';
import { ReactComponent as TimeIcon } from './assets/time_management.svg';
import { ReactComponent as ReadFromCamera } from './assets/camera.svg';
import { insertZero } from '../../../../utils/inputs/formatPhoneNumber';
import { findCustomerOnRave } from '../../../../redux/ducks/account/wallet/actions/rave-wallet';
import uniqBy from 'lodash.uniqby';
import QrReader from 'react-qr-reader';

const CountryPhoneBlock = styled.div`
    position: relative;
`;

const CurrentSelectedCountry = styled.div`
    position: absolute;
    left: 16px;
    top: 12px; 
    z-index: 2;
    cursor: pointer;

    &::after {
        content: url(${ ChevronDownIcon });
        position: absolute;
        width: 24px;
        height: 24px;
        text-align: center;
        cursor: pointer;
        top: 3px;
    }
`;

const CountryFlag = styled.img`
    width: 24px;
    height: 24px;
`;

const SubtitleWithIcon = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const MostRecentBlock = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 20px;
`;

const MostRecentPersonWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 20px;
    cursor: pointer;
`;

const NameText = styled.p`
    font-size: 10px;
    color: #56636d;
    margin: 0;
    margin-top: 2px;
`;

const ButtonWrapper = styled.div`
    text-align: right;
    margin: 5px 0;
`;

// const OptionWithSwitch = styled.div`
//     position: relative;
//     display: flex;
//     flex-flow: row nowrap;
//     align-items: center;
// `;

const Icon = styled(ReadFromCamera)`
    position: absolute;
    right: 10px;
    top: 15px;
`;

const SpacesWallets = ({ 
    isLoading, 
    saveWalletTransferData,
    findCustomerOnRave,
    sendMoneyFromWalletToWallet,
    saveLastTransferedRecipient,
    saveWalletTransferAmount, 
    switchWalletUsageMode,
}) => {    
    const [openCountrySelect, setOpenCountrySelect] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({});
    const [openConfirmation, setOpenConfirmation] = useState(false);
    // const [addBeneficiary, setAddBeneficiary] = useState(false);
    const [QROpen, setQROpen] = useState(false);
    const [scannedNumber, setScannedNumber] = useState(undefined);
    const amount = useSelector(state => state.account.wallet.transfer.amount);
    const transfer = useSelector(state => state.account.wallet.transfer);
    const recipients = useSelector(state => state.account.wallet.recipients);
    const filteredRecipients = uniqBy(recipients, 'id');
    const countriesInfo = listToAlphabetMap(
        countriesData.filter(country => country.name === "Nigeria").map(country => country.name)
    );

    const handleScanCode = () => {
        setQROpen(!QROpen);
    }

    const handleScan = (data, setFieldValue) => {
        if (data) {
            const number = data.replace(/[\s.,:;+%]/g, '').split('TEL')[1].slice(-10);
            setScannedNumber(insertZero(number));
            setFieldValue('phoneNumber', insertZero(number));

            setQROpen(!QROpen);
        }
      }
      const handleError = err => {
        console.error(err)
      }

      const handleOnUserClick = (data, setFieldValue) => {
        setScannedNumber(data);
        setFieldValue('phoneNumber', data);
      }
      
    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <Formik
                initialValues={{
                    phoneNumber: '',
                    country: 'NG'
                }}
                validationSchema={PhoneNumberSignUpValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    setTimeout(() => {
                        let recipientName;
                        if(values.phoneNumber.length === 10) {
                            recipientName = insertZero(values.phoneNumber);
                        } else {
                            recipientName = values.phoneNumber;
                        }
                        resetForm();
                        saveWalletTransferData(recipientName, values.whatFor);
                        findCustomerOnRave('mobile', recipientName).then(info => {
                            if(info) {
                                setCustomerInfo(info.data);
                                saveLastTransferedRecipient(info.data);
                                setOpenConfirmation(!openConfirmation);
                            }
                        });
                    }, 1000);
                }}
            >
                {({ touched, values, errors, initialValues, setFieldValue, handleBlur }) => (
                    <>
                        <TopHeader title={"Spaces User's Wallet"} />
                        <ScreenContainer top={"80px"}>
                            <SubtitleWithIcon>
                                <TimeIcon style={{marginRight: '10px'}} />
                                <SubTitle>Most recent</SubTitle>
                            </SubtitleWithIcon>
                            <MostRecentBlock>
                                {filteredRecipients.map((person, index) => (
                                    <MostRecentPersonWrapper key={index} onClick={() => handleOnUserClick(person.mobile_number, setFieldValue)}>
                                        <PageLogo 
                                            width={"32px"}
                                            height={"32px"}
                                            iconWidth={"32px"}
                                            iconHeight={"32px"}
                                            Icon={person && person.first_name}
                                            margin={"0 0 5px 0"}
                                        />
                                        <NameText>{person && person.first_name}</NameText>
                                        <NameText>{person && person.last_name}</NameText>
                                    </MostRecentPersonWrapper>
                                ))}
                            </MostRecentBlock>
                            <Message bottom={"24px"} top={"8px"}>Enter recipient’s phone number</Message>
                            <Form>
                                <CountryPhoneBlock>
                                    <CurrentSelectedCountry>
                                        <CountryFlag
                                            onClick={() => setOpenCountrySelect(!openCountrySelect)}
                                            src={flags.filter(flag => flag.customAbbreviation === values.country)[0].value}
                                            alt={flags.filter(flag => flag.customAbbreviation === values.country)[0].label}
                                        />
                                    </CurrentSelectedCountry>
                                    <SelectCountryOverlay 
                                        open={openCountrySelect}
                                        setOpen={setOpenCountrySelect}
                                        countriesInfo={countriesInfo}
                                        currentCountry={values.country}
                                        setCountry={setFieldValue}
                                    />
                                    <InputWithLabel
                                        label="Phone number"
                                        placeholder="Phone number" 
                                        name="phoneNumber" 
                                        type="text"
                                        inputMode={"tel"}
                                        onKeyUp={e => e.target.value =  e.target.value.replace(/\s/g, '')}
                                        autoComplete={"tel"}
                                        countryselection={true}                     
                                        errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                        valid={`${(touched.phoneNumber && !errors.phoneNumber)}`}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                        bottom={'0'}
                                        value={scannedNumber && scannedNumber}
                                    />
                                    {QROpen && (
                                        <QrReader
                                            delay={300}
                                            onError={handleError}
                                            onScan={e => handleScan(e, setFieldValue)}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                    <Icon onClick={() => handleScanCode()} />
                                </CountryPhoneBlock>
                                <ButtonWrapper>
                                    <InlineButton type="button">Phone Contacts</InlineButton>
                                </ButtonWrapper>
                                <InputWithLabel
                                    label="What is this money for?"
                                    placeholder="What is this money for?" 
                                    name="whatFor" 
                                    type="text"
                                    inputMode={"text"}
                                    autoComplete={'no'}                  
                                    errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                    valid={`${(touched.phoneNumber && !errors.phoneNumber)}`}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                    top={'16px'}
                                />
                                {/* <OptionWithSwitch>
                                    <OptionName>Add to beneficiaries</OptionName>
                                    <SwitchTrigger checkStatus={addBeneficiary} switchStatus={setAddBeneficiary} top={"0"} />
                                </OptionWithSwitch> */}
                                <RippleButton 
                                    type="submit"
                                    disabled={
                                        (values.phoneNumber.length < 10) || 
                                        (errors.phoneNumber)
                                    }
                                >
                                    Continue
                                </RippleButton>
                                {openConfirmation && 
                                    <TransferConfirmation
                                        open={openConfirmation}
                                        close={setOpenConfirmation}
                                        confirm={sendMoneyFromWalletToWallet}
                                        transactionDetails={{
                                            message:        transfer.message,
                                            amount:         amount,
                                            customer_name:  `${customerInfo.first_name}${customerInfo.last_name}`,
                                            phoneNumber:    customerInfo.mobile_number,
                                        }}
                                    />
                                }
                            </Form>
                        </ScreenContainer>
                    </>
                )}
            </Formik>
        </Fragment>
    );
};

SpacesWallets.propTypes = {
    isLoading:     bool,
    saveWalletTransferData: func,
    findCustomerOnRave: func,
    sendMoneyFromWalletToWallet: func, 
    saveLastTransferedRecipient: func,
    transfer: object,
    recipients: array,
    saveWalletTransferAmount: func,
    switchWalletUsageMode: func,
};

const mapStateToProps = ({ auth }) => ({
	isLoading: auth.phone.isLoading,
});

export default connect(
    mapStateToProps,
    { saveWalletTransferData, sendMoneyFromWalletToWallet, findCustomerOnRave, saveLastTransferedRecipient, saveWalletTransferAmount, switchWalletUsageMode }
)(withRouter(SpacesWallets));