import React, { useContext } from 'react'
import TareasContext from '../../../context/Tareas/TareaContext'
import ProyectosContext from '../../../context/Proyectos/ProyectoContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Tarea = ({ tarea }) => {

    const tareasContext = useContext(TareasContext)
    const { eliminarTarea, obtenerTareas, actualizarTarea, obtenerActual } = tareasContext

    const proyectosContext = useContext(ProyectosContext)
    const { proyecto } = proyectosContext
    const [ proyectoActual ] = proyecto;

    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    const handleEstado = () => {
        tarea.estado = !tarea.estado
        actualizarTarea(tarea)
    }

    const handleEditar = () => {
        obtenerActual(tarea._id)
    }

    return(
        <li className="tarea sombra">
            <p>{ tarea.nombre }</p>
            <div className="estado">
                { tarea.estado 
                    ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={handleEstado}
                            >Completo</button>
                        ) 
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={handleEstado}
                            >Incompleto</button>
                        )  
                }
            </div>
            <div className="acciones">
                <FontAwesomeIcon icon={faEdit} onClick={handleEditar} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => tareaEliminar(tarea._id)} />
            </div>
        </li>
    )
}

export default Tarea