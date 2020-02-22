import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useStyles from "./styles";
import { getLaboratorios } from "../../services/dashboardServices";
import { useUserState } from "../../context/UserContext";
import { baseURL } from "../../constants/URLs";
import { ShowNotification } from "../../utils/utils";
import { SELECT_ONE_LAB } from "../../constants/notificationConstanst";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

const VincularLaboratorios = ({
  setStep,
  nextStep,
  previousStep,
  setConfig,
}) => {
  var classes = useStyles();
  var user = useUserState();
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (items === null) {
      getLaboratorios(user.email).then(res => {
        setItems(res.data);
      });
    }
  });

  const onBackClick = () => {
    setStep(1);
    previousStep();
  };

  const onNextClick = () => {
    if (selected.length > 0) {
      setConfig(selected);
      setStep(3);
      nextStep();
    } else {
      ShowNotification(SELECT_ONE_LAB);
    }
  };

  const id2List = {
    droppable: items,
    droppable2: selected,
  };

  const getList = id => id2List[id];

  const onDragEnd = result => {
    const { source, destination } = result;
    if (destination && source.droppableId === destination.droppableId) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const newItems = reorder(
        getList(source.droppableId),
        source.index,
        destination.index,
      );

      setItems(newItems);
      if (source.droppableId === "droppable2") {
        setSelected(newItems);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
      );

      setItems(result.droppable);
      setSelected(result.droppable2);
    }
  };

  return (
    <React.Fragment>
      <Typography className={classes.StepTitle}>
        Vincular laboratorios al curso
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
      {items !== null && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.LabsContainer}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className={classes.LabsDroppable}
                >
                  {items.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={classes.CardContainer}
                          >
                            <div className={classes.card}>
                              <div
                                className={classes.widgetImage}
                                style={{
                                  backgroundImage: `url(${baseURL +
                                    item.imagen})`,
                                }}
                              />
                              <Typography
                                className={classes.titleCard}
                                variant="h5"
                                color="textSecondary"
                              >
                                {item.nombre}
                              </Typography>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className={classes.LabsDroppable}
                >
                  {selected.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={classes.CardContainer}
                        >
                          <div className={classes.card}>
                            <div
                              className={classes.widgetImage}
                              style={{
                                backgroundImage: `url(${baseURL +
                                  item.imagen})`,
                              }}
                            />
                            <Typography
                              className={classes.titleCard}
                              variant="h5"
                              color="textSecondary"
                            >
                              {item.nombre}
                            </Typography>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      )}
    </React.Fragment>
  );
};

export default VincularLaboratorios;
