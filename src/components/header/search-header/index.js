import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { string, bool, func } from 'prop-types';
import { TopHeader } from "../index";
import { Search, Close } from '../../../containers/HeaderContainer';

const SearchInput = styled.input`
    border: none;
    outline-color: transparent;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 10px;
    width: 70%;
    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: scale(0);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }

    &::placeholder {
        font-size: 16px;
        font-weight: 500;
    }
`;

export const SearchHeader = ({
    title,
    noArrow,
    right,
    handleSearch,
    backAction,
    placeholder,
    customStyles,
    backLink,
    children,
    noFixed,
    withSpacesHeader
}) => {
    const [openInput, setOpenInput] = useState(false);
    const [fadeIn, setFadeIn] = useState('');

    return (
        <Fragment>
        {!openInput ? (
            <TopHeader withSpacesHeader={withSpacesHeader} title={title} noFixed={noFixed} noArrow={noArrow} backAction={backAction}  backLink={backLink}>
                <Search right={right} onClick={() => { setFadeIn('fadeIn'); setTimeout(() => setOpenInput(!openInput),300)}} className={fadeIn}/>
                {children}
            </TopHeader>
        ) : (
            <TopHeader withSpacesHeader={withSpacesHeader} title={title} noFixed={noFixed}  noArrow={noArrow} backAction={backAction}  backLink={backLink} noTitle>
                <SearchInput style={customStyles || null}  onChange={e => handleSearch(e.target.value)} placeholder={placeholder} />
                <Close right={"16px"} onClick={() => { setFadeIn('fadeOut'); setOpenInput(!openInput); handleSearch("")} } />
            </TopHeader>
        )}
        </Fragment>
    );
};

SearchHeader.propTypes = {
    title:        string.isRequired,
    handleSearch: func,
    noArrow:      bool,
    placeholder:  string,
    right:        string,
    backLink:     string,
};