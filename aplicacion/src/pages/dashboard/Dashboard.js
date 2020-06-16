import React, { useState, useEffect } from "react";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
//import { Typography } from "../../components/Wrappers/Wrappers";
import { useInfoUserState, useUserState } from "../../context/UserContext";
import { getLaboratorios } from "../../services/dashboardServices";
import LaboratorioList from "./laboratorioList";

/**
 * Página inicial donde se muestran los laboratorios que puede acceder, esta se utiliza en todos los roles menos estudiantes
 */
export default function Dashboard(props) {
  //global
  var user = useUserState();
  var userInfo = useInfoUserState();

  //local
  const [laboratorios, setLaboratorios] = useState(null);

  useEffect(() => {
    if (laboratorios === null) {
      getLaboratorios(user.email).then((res) => {
        setLaboratorios(res.data);
      });
    }
  });

  return (
    <>
      <PageTitle
        title="Laboratorios"
        button={
          userInfo.rol === "visitante" ? "Habilitar más laboratorios" : null
        }
        goToUrl="/app/info"
      />

      <LaboratorioList laboratorios={laboratorios} />
    </>
  );
}
