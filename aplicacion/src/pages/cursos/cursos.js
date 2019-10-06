import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";

// styles
import useStyles from "./styles";

const Cursos = () => {
  var classes = useStyles();

  const onCrearCurso = () => {
    console.log("crear curso");
  };

  return (
    <React.Fragment>
      <PageTitle
        title="Cursos"
        button="Crear curso"
        onButtonClick={onCrearCurso}
      />
    </React.Fragment>
  );
};

export default Cursos;
