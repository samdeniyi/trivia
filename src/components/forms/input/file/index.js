import React, { Fragment } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../../../styles';
import { string, func, bool } from 'prop-types';

import { RippleLabel } from '../../../button';
import { ReactComponent as UploadLogo } from './assets/upload.svg';
import { ReactComponent as DeleteLogo } from './assets/delete.svg';
import { toast } from 'react-toastify';

const InputFileBlock = styled.div`
    width: 100%;
    height: 70px;
    padding: 24px 16px;
    border: 1px dashed ${colors.border.input};
    border-radius: 8px;
    margin-top: 1em;
    position: relative;
`;

const UploadText = styled.span`
    font-family: ${fonts.main};
    font-size: 14px;
    color: ${colors.themeTextColor3};
    margin: 0;
`;

const UploadButton = styled(RippleLabel)`
    position: absolute;
    right: 1em;
    top: 15px;
    appearance: button;
    cursor: pointer;
    padding: 10px;
    
    & > svg {
        width: 22px;
        height: 16px;
    }

    & > input {
        height: 0;
        width: 0;
        overflow: hidden;
        background: transparent;
    }
`;

export const FileInput = ({
    accept,
    removeFile,
    handleFile,
    fileName,
    loadedState,
    defaultText,
    disabled = false
}) => {
    return (
        <Fragment>
            <InputFileBlock style={{ 
                pointerEvents: disabled ? 'none' : 'auto', 
                opacity: disabled ? '0.6' : '1'
            }}>
                <UploadText>{(loadedState || fileName) ? fileName : (defaultText)?defaultText : "Upload a document"/*? defaultText : "Upload a document"*/ }</UploadText>
                <UploadButton type="button">
                    {loadedState ? <DeleteLogo onClick={removeFile}/> : <UploadLogo />}
                    {loadedState 
                        ? null 
                        : (<input 
                            type="file"
                            id="identity" 
                            accept={accept}
                            onChange={(event) => {
                                if (event.target.files[0].size >= 100000000) {
                                    toast.error('File size cannot be more than 10MB')
                                    return;
                                } else {
                                    handleFile(event);
                                };
                            }}
                        />
                    )}
                </UploadButton>
            </InputFileBlock>
        </Fragment>
    );
};

FileInput.propTypes = {
    accept:           string,
    saveDocument:     func,
    saveDocumentData: func,
    removeFile:       func,
    handleFile:       func,
    fileName:         string,
    loadedState:      bool,
    defaultText:      string,
    disabled:         bool  
};