import imageCompression from 'browser-image-compression';

export const compressImage = (imageFile) => {

    var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
    
     const compressedFile = imageCompression(imageFile, options).then(function (compressedFile) {
   
        return compressedFile; 
      })

      return compressedFile
  }