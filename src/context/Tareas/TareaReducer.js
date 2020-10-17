import { 
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    VALIDAR_FORMULARIO,
    ELIMINAR_TAREA,
    ACTUALIZAR_TAREA,
    TAREA_ACTUAL,
    LIMPIAR_TAREA
} from '../../types'

export default (state, action) => {
    switch(action.type){
        case OBTENER_TAREAS:
            return {
                ...state,
                tareasProyecto: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto: [ action.payload, ...state.tareasProyecto ],
                errorTarea: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaActual: action.payload
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaActual: null
            }
        default: 
            return state;
    }
}