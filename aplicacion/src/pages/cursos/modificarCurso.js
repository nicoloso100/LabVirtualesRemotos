import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import InformacionCurso from "./InformacionCurso";

const ModificarCurso = ({ informacionCurso }) => {
  const modificaInformacionCurso = () => {};

  return (
    <PageTitle title="Modificar Cursos" onButtonClick={() => {}}>
      <InformacionCurso
        setConfig={modificaInformacionCurso}
        config={informacionCurso}
      />
    </PageTitle>
  );
};

export default ModificarCurso;
