import React, { Fragment, useState, useContext } from 'react'
import ProyectoContext from '../../../context/Proyectos/ProyectoContext'

const NuevoProyecto = () => {

    // Uso del Context
    const proyectosContext = useContext(ProyectoContext)
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext
    
    // States del componente
    const [ proyecto, setProyecto ] = useState({
        nombre: ''
    })

    const { nombre } = proyecto

    const handleInput = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Valido nombre vacio
        if(nombre === ''){
            mostrarError(true)
        } else {

            // Cargo datos
            agregarProyecto(proyecto)

            // Vacio formulario
            setProyecto({
                nombre: ''
            })
        }
    }

    return(
        <Fragment>
            <button className="btn btn-block btn-primario" onClick={mostrarFormulario}>
                Nuevo proyecto
            </button>
            { formulario
            ?
                (<form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={handleInput}
                    />
                    <button className="btn btn-primario btn-block">Crear</button>
                </form>)
            :
                null
            }
            { errorFormulario ? <p className="mensaje error">El nombre es obligatorio</p> : null }
        </Fragment>
    )
}

export default NuevoProyecto