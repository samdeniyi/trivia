import Cropper from 'react-easy-crop';
import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import {string, func} from 'prop-types';
import { RippleButton } from '../../button';
import { toast } from 'react-toastify';
 
export const convertToBlob =  (blob) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        var base64data = reader.result;                
        return(base64data);
    }
}

export const toDataURL = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}));

const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

const getCroppedImg = async(imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    image.width = image.width / 2;
    image.height = image.height / 2;

    const safeArea = Math.max(image.width, image.height) * 2;

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    if (!ctx) {
      return null;
    }

    const getRadianAngle = (degreeValue) => {
      return (degreeValue * Math.PI) / 180;
    };
    
    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width,
      safeArea / 2 - image.height
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width - pixelCrop.x,
      0 - safeArea / 2 + image.height - pixelCrop.y
    );

  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}

const Container = styled.div`
position: fixed;
width: 100%;
display: ${({showCropper}) => showCropper ? 'block': 'none'}
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0,0.5);
z-index: 100;
cursor: pointer;
`;



const CropperFooter = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 64px;
position: fixed;
background-color: white;
z-index: 10000;
border-bottom: none;
bottom: 0;
`;

const ButtonDiv = styled.div`
display: flex;
width: 80%;
justify-content: space-between;
`;

const ButtonStyle = {marginTop: 0, width: '35%'};

export const ImageCropper = ({avatar, onCancel, onSave}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect] = useState(4/3);
    const [croppedImage, setCroppedImage] = useState(avatar);

    const onCropComplete = async (_, croppedAreaPixels) => {
        const cropped = await getCroppedImg(avatar, croppedAreaPixels);
        setCroppedImage(cropped);
      }
   
      return (
        <Fragment>
            <Container>
                <Cropper
                    image={avatar}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onMediaLoaded={(size) => {
                        const {width, height} = size;
                        if (width <= 50 || height <= 50) {
                            toast.error('Image is too small.');
                        }
                    }}
                />
            <CropperFooter>
                <ButtonDiv>
                  <RippleButton 
                      onClick={onCancel} 
                      style={{...ButtonStyle, backgroundColor: '#e02020'}}
                  >
                      Cancel
                  </RippleButton>
                  <RippleButton style={ButtonStyle} onClick={() => onSave(croppedImage)}>Save</RippleButton>
                </ButtonDiv>
            </CropperFooter>
            </Container>
        </Fragment>
      )
  };

  ImageCropper.propTypes = {
    onCancel: func,
    onSave: func,
    url: string,
  }
