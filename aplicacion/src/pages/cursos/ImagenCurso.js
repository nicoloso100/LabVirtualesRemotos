import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import useStyles from "./styles";
import { ShowNotification } from "../../utils/utils";
import {
  IMAGE_NOT_SELECTED,
  JUST_SINGLE_IMAGE,
} from "../../constants/notificationConstanst";
import { Button, Typography } from "@material-ui/core";

const ImagenCurso = ({ setStep, nextStep, previousStep }) => {
  var classes = useStyles();
  const [picture, setPicture] = useState([]);

  const onDrop = picture => {
    if (picture.length > 1) {
      ShowNotification(JUST_SINGLE_IMAGE);
    }
    setPicture(picture);
  };

  const onBackClick = () => {
    setStep(0);
    previousStep();
  };

  const onNextClick = () => {
    if (picture.length === 1) {
      setStep(2);
      nextStep();
    } else if (picture.length > 1) {
      ShowNotification(JUST_SINGLE_IMAGE);
    } else {
      ShowNotification(IMAGE_NOT_SELECTED);
    }
  };

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
        withIcon={true}
        withPreview={true}
        buttonText="Buscar..."
        label="Imagen del curso"
        imgExtension={[".jpg", ".png"]}
        maxFileSize={5242880}
        onChange={onDrop}
        buttonStyles={{ display: picture.length >= 1 ? "none" : "block" }}
      />
    </React.Fragment>
  );
};

export default ImagenCurso;
