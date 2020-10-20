import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../../context/Proyectos/ProyectoContext";
import TareaContext from "../../../context/Tareas/TareaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const FormTarea = () => {
  // Uso del Context Proyecto
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  // Uso del Context Tarea
  const tareasContext = useContext(TareaContext);
  const {
    errorTarea,
    agregarTarea,
    mostrarError,
    obtenerTareas,
    tareaActual,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  useEffect(() => {
    if (tareaActual) {
      setTarea(tareaActual);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaActual]);

  // Uso del state
  const [tarea, setTarea] = useState({
    nombre: "",
  });
  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Destructuracion del proyecto
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || nombre.trim() === "") {
      mostrarError();
      return;
    }

    if (tareaActual) {
      // Edito tarea
      actualizarTarea({
        ...tareaActual,
        nombre,
      });
      limpiarTarea();
    } else {
      // Agrego tarea
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    }

    obtenerTareas(proyectoActual._id);

    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <label>{tareaActual ? "Edita la tarea:" : "Agrega una tarea:"}</label>
          <input
            type="text"
            className="input-text"
            placeholder={tareaActual ? nombre : "Nombre"}
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          {tareaActual ? (
            <div>
              <button className="boton-nuevatarea" onClick={(e) => {
                  e.preventDefault();
                  limpiarTarea();}}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button className="boton-nuevatarea">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          ) : (
            <button className="boton-nuevatarea">
              <FontAwesomeIcon icon={faPlusSquare} />
            </button>
          )}
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
