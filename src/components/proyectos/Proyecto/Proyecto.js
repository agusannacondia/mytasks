import React, { useContext } from "react";
import ProyectoContext from "../../../context/Proyectos/ProyectoContext";
import TareasContext from "../../../context/Tareas/TareaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Proyecto = ({ proyecto }) => {
  // Uso del Context
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContext;
  const tareasContext = useContext(TareasContext);
  const { obtenerTareas } = tareasContext;

  const handleClick = (id) => {
    proyectoActual(id);
    obtenerTareas(id);
  };

  return (
    <li>
      <FontAwesomeIcon icon={faAngleRight} />
      <span>
        <button
          type="button"
          className="btn btn-blank"
          onClick={() => {
            handleClick(proyecto._id);
          }}
        >
          {proyecto.nombre}
        </button>
      </span>
    </li>
  );
};

export default Proyecto;
