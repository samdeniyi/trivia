import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../../../styles';
import { number, string, func, bool } from 'prop-types';

import { ProgressBar } from '../../../progress'
import { RippleLabel } from '../../../button';
import { ReactComponent as UploadLogo } from './assets/upload.svg';
import { ReactComponent as DeleteLogo } from './assets/delete.svg';
import { ReactComponent as RetryLogo } from './assets/retry.svg';
import { ReactComponent as CancelLogo } from './assets/cancel.svg';

const InputFileBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    padding: 4px;
    border: 1px dashed ${colors.border.input};
    border-radius: 8px;
    margin-top: 1em;
    position: relative;
    align-items: center;
`;

const LeftBox = styled.div`
    width: calc(100% - 50px);
    align-items: center;
    justify-content: center;
    padding: 2px 12px;
`;

const UploadText = styled.span`
    font-family: ${fonts.main};
    font-size: 12px;
    color: ${colors.themeTextColor3};
    margin: 0;
    font-weight: 400;

    //white-space: nowrap;
    verflow: hidden;
    text-overflow: ellipsis;
`;

const UploadButton = styled(RippleLabel)`
    position: absolute;
    right: 1em;
    appearance: button;
    cursor: pointer;
   
    & > svg {
        width: 32px;
        height: 32px;
    }

    & > input {
        height: 0;
        width: 0;
        overflow: hidden;
        background: transparent;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin: 4px 0;
    font-style: oblique;
    font-size: 10px;
    font-weight: 400;
`;

export const NORMAL    = 'normal';
export const PROGRESS  = 'progress';
export const FAILED    = 'failed';
export const SUCCESS   = 'success';

export const FileInput2 = ({
    accept,
    deleteFile,
    handleFile,
    retryFile,
    cancelFile,
    fileName,
    defaultFileName,
    progress,
    disabled,
    documentState
}) => {
  
    const [documentError, setDocumentError] = useState("");
    
    function getSvg(state){
        switch(state){
            case NORMAL: 
                return <UploadLogo/>
            case PROGRESS:
                return <CancelLogo onClick={() => {
                         setTimeout(() => {
                            cancelFile()
                         }, 300);
                        }}/>   
            case FAILED:
                return <RetryLogo onClick={() => {
                          setTimeout(() => {
                            retryFile()
                          }, 300);
                       }}/> 
            case SUCCESS:
                return <DeleteLogo onClick={() => {
                         setTimeout(() => {
                           deleteFile()
                         }, 300);
                        }}/>  
            default:
                return null
        }
    }

    return (
        <Fragment>
            <InputFileBlock style={{ 
                pointerEvents: disabled ? 'none' : 'auto', 
                opacity: disabled ? '0.6' : '1'
            }}>
            
            <LeftBox>
                <UploadText>{ fileName ? fileName : (defaultFileName) ? defaultFileName : "Upload a document" }</UploadText>
                <ErrorMessage>{documentState === FAILED ? "upload failed" : documentError}</ErrorMessage>
                {documentState === PROGRESS && (
                   <ProgressBar step={progress} amount={100} />
                )}
            </LeftBox>
            
            <UploadButton type="button">
                { getSvg(documentState) }

                { documentState !== NORMAL
                ? null 
                : (<input 
                        type="file"
                        id="identity" 
                        accept={accept}
                        onChange={(event) => {
                            if (event.target.files[0]) {
                                const file = event.target.files[0];
                                if (file.size > (5000 * 1024)) {
                                    setDocumentError("File size exceeds 5mb")
                                    return;
                                } else {
                                    setDocumentError("")
                                    handleFile(event)
                               };
                            };
                        }}
                    />
                  )
                }
            </UploadButton>
        </InputFileBlock>
    </Fragment>
   );
};

FileInput2.propTypes = {
    accept:          string,
    deleteFile:      func,
    handleFile:      func,
    retryFile:       func,
    cancelFile:      func,
    fileName:        string,
    defaultFileName: string,
    progress:        number,
    disabled:        bool,
    documentState:   string
};