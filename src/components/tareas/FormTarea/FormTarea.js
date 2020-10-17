import React, { useContext, useState, useEffect } from 'react'
import ProyectoContext from '../../../context/Proyectos/ProyectoContext'
import TareaContext from '../../../context/Tareas/TareaContext'

const FormTarea = () => {

    // Uso del Context Proyecto
    const proyectosContext = useContext(ProyectoContext)
    const { proyecto } = proyectosContext

    // Uso del Context Tarea
    const tareasContext = useContext(TareaContext)
    const { errorTarea, agregarTarea, mostrarError, obtenerTareas, tareaActual, actualizarTarea, limpiarTarea } = tareasContext

    useEffect(()=>{
        if(tareaActual){
            setTarea(tareaActual)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaActual])

    // Uso del state
    const [ tarea, setTarea ] = useState({
        nombre: ''
    })
    const { nombre } = tarea

    // Si no hay proyecto seleccionado
    if(!proyecto) return null

    // Destructuracion del proyecto 
    const [proyectoActual] = proyecto

    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(nombre.trim() === ''){
            mostrarError()
            return;
        } 
            
        if(tareaActual){
            // Edito tarea
            actualizarTarea({
                ...tareaActual,
                nombre
            });
            limpiarTarea();
        } else {
            // Agrego tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }

        obtenerTareas(proyectoActual._id);

        setTarea({
            nombre: ''
        })
    }

    return(
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    {
                        tareaActual 
                        ? (<input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Editar"
                        />)
                        : (<input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar"
                        />)
                    }
                    
                </div>
            </form>
            { errorTarea ? <p className="mensaje error">El nombre es obligatorio</p> : null }
        </div>
    )
}

export default FormTarea