import React, { Fragment, useContext } from 'react'
import ProyectoContext from '../../../context/Proyectos/ProyectoContext'
import TareasContext from '../../../context/Tareas/TareaContext'
import Tarea from '../Tarea'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ListadoTareas = () => {

    // Uso del Context
    const proyectosContext = useContext(ProyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext

    const tareasContext = useContext(TareasContext)
    const { tareasProyecto } = tareasContext

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>No hay un proyecto seleccionado</h2>

    // Destructuracion del proyecto 
    const [proyectoSeleccionado] = proyecto

    const handleEliminar = () => {
        eliminarProyecto(proyectoSeleccionado._id)
    }

    return(
        <Fragment>
            <h2>Proyecto: { proyectoSeleccionado.nombre }</h2>          
            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0 
                        ? (<li className="tarea"><p>No hay tareas</p></li>)
                        :   <TransitionGroup>
                                {tareasProyecto.map(item => (
                                    <CSSTransition
                                        key={item._id}
                                        timeout={200}
                                        classNames="tarea"
                                    >
                                        <Tarea 
                                            tarea={item}
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>    
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={handleEliminar}
            >Eliminar proyecto &times;</button>
        </Fragment>
    )
}

export default ListadoTareas