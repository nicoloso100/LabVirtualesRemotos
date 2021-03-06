import React, { useEffect, useState, useMemo } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "@material-ui/core";
import {
  getPeticiones,
  acceptPeticiones,
} from "../../services/peticionesServices";
import DataTableComponent from "../../components/DataTable/DataTable";
// styles
import useStyles from "./styles";
import PeticionesModals from "../../components/PeticionesModals/peticionesModals";
import { rejectPeticiones } from "../../services/peticionesServices";

const defaultStateModal = {
  open: false,
  option: 0,
  list: [],
};

/**
 * Página para visualizar, aceptar o rechazar peticiones de visitantes que quieran tener una cuenta de director, esta página solo es accedida desde el rol de administrador
 */
const Peticiones = () => {
  var classes = useStyles();
  const [peticionesArray, setPeticionesArray] = useState(null);
  const [openModal, setOpenModal] = useState(defaultStateModal);

  const cols = [
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => <p className={classes.wrapText}>{row.email}</p>,
    },
    {
      name: "Nombres",
      selector: "visitante.usuario.name",
      sortable: true,
      cell: (row) => (
        <p className={classes.wrapText}>{row.visitante.usuario.name}</p>
      ),
    },
    {
      name: "Apellidos",
      selector: "visitante.usuario.surname",
      sortable: true,
      cell: (row) => (
        <p className={classes.wrapText}>{row.visitante.usuario.surname}</p>
      ),
    },
    {
      name: "Institución",
      selector: "institucion",
      sortable: true,
      cell: (row) => <p className={classes.wrapText}>{row.institucion}</p>,
    },
    {
      name: "Mensaje",
      selector: "mensaje",
      sortable: false,
      grow: 2,
      cell: (row) => <p className={classes.wrapText}>{row.mensaje}</p>,
    },
  ];

  const columns = useMemo(() => cols, [cols]);

  const getPeticionesRequest = () => {
    getPeticiones().then((result) => {
      setPeticionesArray(result);
    });
  };

  useEffect(() => {
    if (peticionesArray === null) {
      getPeticionesRequest();
    }
  }, [peticionesArray]);

  const peticionesSelected = (list, option) => {
    setOpenModal({ open: true, option, list });
  };

  const rejectPeticionesEvt = (list, option) => {
    let petition;
    if (option === 0) {
      petition = rejectPeticiones(list);
    } else {
      petition = acceptPeticiones(list);
    }
    petition.then(() => {
      setOpenModal(defaultStateModal);
      getPeticionesRequest();
    });
  };

  return (
    <React.Fragment>
      <PeticionesModals
        data={peticionesArray}
        params={openModal}
        setOpen={setOpenModal}
        request={rejectPeticionesEvt}
      />

      <PageTitle title="Peticiones para director" />
      <Typography>
        A continuación se mostrará la lista de peticiones pendientes por aprobar
        o rechazar para promover cuentas al rol de Director
      </Typography>
      <br />
      {peticionesArray !== null && (
        <DataTableComponent
          title="Lista de peticiones para director"
          data={peticionesArray}
          columns={columns}
          selectedEvent={peticionesSelected}
          acceptButton={true}
        />
      )}
    </React.Fragment>
  );
};

export default Peticiones;
