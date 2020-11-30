import React from 'react';
import styled from 'styled-components';
import { string, func, object, oneOfType, bool } from 'prop-types';
import { PageLogo } from '../logo';
import { colors } from '../../styles';
import UserImage from './assets/user.svg';
import { toast } from 'react-toastify';

const UploadForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0;

    & > img {
        width: 4.5em;
        height: 4.5em;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const UploadButton = styled.label`
    margin-top: 8px;
    text-align: center;
    font-size: 12px;
    color: ${colors.blue};
    cursor: pointer;
    
    & > input {
        height: 0;
        width: 0;
        overflow: hidden;
        background: transparent;
    }
`;

export const UploadPicture = ({
    text,
    picture,
    pictureAction,
    defaultPicture,
    width,
    height,
    formName = "",
    showCropper = false,
}) => {
    return (
        <UploadForm id="avatarForm">
            {picture && picture !== "Not Set" ?
                <img
                    src={picture}
                    id="picture"
                    alt="New Avatar"
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}
                /> :
                <PageLogo
                    id="picture"
                    Icon={defaultPicture || UserImage}
                    width="48px"
                    height="48px"
                    borderRadius={"50%"}
                    iconHeight={height || "48px"}
                    iconWidth={width || "48px"}
                />
            }
            <UploadButton>
                {text || 'Upload profile picture'}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const reader = new FileReader();
                       reader.addEventListener('load', (event) => {
                            const image = event.target.result;
                            if(!showCropper)
                            {
                                document
                                    .querySelector('#picture')
                                    .setAttribute('src', image);
    
                                formName && pictureAction(formName, image)
                            }
                        });

                        if (event.target.files[0]) {
                            const file = event.target.files[0];
                           
                            if (file.size >= 100000000) {
                                toast.error('File size cannot be more than 10MB')
                                return;
                            } else {
                                !formName && pictureAction(file);
                                reader.readAsDataURL(file);
                            };
                        } else return;
                    }}
                />
            </UploadButton>
        </UploadForm>
    );
};

UploadPicture.propTypes = {
    text:            string,
    picture:         oneOfType([ string, object ]),
    pictureAction:   func,
    defaultPicture:  string,
    width:           string,
    height:          string,
    saveImageToForm: bool,
    showCropper: bool,
};