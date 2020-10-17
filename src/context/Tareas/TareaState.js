import React, { useReducer } from 'react'
import TareaContext from './TareaContext'
import TareaReducer from './TareaReducer'
import { 
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    VALIDAR_FORMULARIO,
    ELIMINAR_TAREA,
    ACTUALIZAR_TAREA,
    TAREA_ACTUAL,
    LIMPIAR_TAREA
 } from '../../types'
 import clienteAxios from '../../config/axios'

const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaActual: null
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(TareaReducer, initialState)

    // Obtener tareas por proyecto
    const obtenerTareas = async proyecto => {
        try {
            const respuesta = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            dispatch({
                type: OBTENER_TAREAS,
                payload: respuesta.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Crear una nueva tarea para un proyecto
    const agregarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Validar el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Eliminar una tarea
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })            
        } catch (error) {
            console.log(error);
        }
    }

    // Cambiar el estado de una tarea
    const actualizarTarea = async tarea => {
        try {
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(respuesta);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Cambiar el estado de una tarea
    const obtenerActual = (id) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: id
        })
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaActual: state.tareaActual,
                obtenerTareas,
                agregarTarea,
                mostrarError,
                eliminarTarea,
                actualizarTarea,
                obtenerActual,
                limpiarTarea
            }}
        >
            { props.children }
        </TareaContext.Provider>
    )
}

export default  TareaState