import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ERROR,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types'

export default (state, action) => {
    switch(action.type){
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                listaProyectos: state.listaProyectos.filter(proyecto=>proyecto._id !== action.payload),
                proyecto: null
            };
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.listaProyectos.filter(proyecto=>proyecto._id === action.payload)
            };
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            };
        case AGREGAR_PROYECTO:
            return {
                ...state,
                listaProyectos: [...state.listaProyectos, action.payload],
                formulario: false,
                errorFormulario: false
            };
        case OBTENER_PROYECTOS:
            return {
                ...state,
                listaProyectos: action.payload
            };
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true 
            };
        case PROYECTO_ERROR:
            return {
               ...state,
               mensaje: action.payload 
            }
        default: 
            return state;
    }
}