import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import useStyles from "./styles";
import { ShowNotification, dataURLtoFile } from "../../utils/utils";
import {
  IMAGE_NOT_SELECTED,
  JUST_SINGLE_IMAGE,
} from "../../constants/notificationConstanst";
import { Button, Typography } from "@material-ui/core";

/**
 * Sección para seleccionar una imagen para el curso que se está creando
 */
const ImagenCurso = ({
  setStep,
  nextStep,
  previousStep,
  setConfig,
  config,
  saveAllConfig,
}) => {
  var classes = useStyles();
  const [picture, setPicture] = useState([]);
  const [defaultPicture, setDefaultPicture] = useState(undefined);

  useEffect(() => {
    if (config !== "") {
      setDefaultPicture([config]);
      let pictureFIle = dataURLtoFile(config, "Imagen");
      setPicture([pictureFIle]);
    }
  }, [config]);

  const onDrop = (picture) => {
    if (picture.length > 1) {
      ShowNotification(JUST_SINGLE_IMAGE);
    }
    setDefaultPicture(undefined);
    setPicture(picture);
  };

  const onBackClick = () => {
    setStep(0);
    previousStep();
  };

  const onNextClick = async () => {
    if (picture.length === 1) {
      let pic = await toBase64(picture[0]);
      setConfig(pic);
      if (saveAllConfig) {
        saveAllConfig();
      } else {
        setStep(2);
        nextStep();
      }
    } else if (picture.length > 1) {
      ShowNotification(JUST_SINGLE_IMAGE);
    } else {
      ShowNotification(IMAGE_NOT_SELECTED);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <React.Fragment>
      <Typography className={classes.StepTitle}>
        Selecciona la imagen del curso
      </Typography>
      <div className={classes.ImgButtonContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onBackClick}
        >
          Regresar
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onNextClick}
        >
          Continuar
        </Button>
      </div>
      <ImageUploader
        defaultImages={defaultPicture}
        withIcon={true}
        withPreview={true}
        buttonText="Buscar..."
        label="Imagen del curso"
        imgExtension={[".jpg", ".png", ".jpeg"]}
        maxFileSize={4242880}
        onChange={onDrop}
        buttonStyles={{ display: picture.length >= 1 ? "none" : "block" }}
      />
    </React.Fragment>
  );
};

export default ImagenCurso;
