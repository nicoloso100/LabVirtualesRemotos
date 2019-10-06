import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import useStyles from "./styles";

const ImagenCurso = ({ setStep, nextStep, previousStep }) => {
  var classes = useStyles();
  const [picture, setPicture] = useState([]);

  const onDrop = picture => {
    if (picture.length > 1) {
    } else {
      setPicture(picture);
    }
  };

  return (
    <ImageUploader
      withIcon={true}
      withPreview={true}
      buttonText="Buscar..."
      label="Imagen del curso"
      imgExtension={[".jpg", ".png"]}
      maxFileSize={5242880}
      onChange={onDrop}
      buttonStyles={{ display: picture.length === 1 ? "none" : "block" }}
    />
  );
};

export default ImagenCurso;
