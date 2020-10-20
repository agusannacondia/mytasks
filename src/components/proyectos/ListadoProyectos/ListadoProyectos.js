import React, { useContext, useEffect } from 'react'
import Proyecto from '../Proyecto'
import ProyectoContext from '../../../context/Proyectos/ProyectoContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AlertaContext from '../../../context/Alertas/AlertaContext'

const ListadoProyectos = () => {
    
    // Uso del Context
    const proyectosContext = useContext(ProyectoContext)
    const { mensaje, listaProyectos, obtenerProyectos } = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    useEffect(() => {
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        console.log(listaProyectos);
        // eslint-disable-next-line
    }, [mensaje]);

    if(listaProyectos.length === 0) return <p className="label-sinproyectos">Aún no hay proyectos. Puedes comenzar creando uno.</p>

    return(
        <ul className="listado-proyectos">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div> ) : null }
            <TransitionGroup>
                {
                    listaProyectos.map(item => (
                        <CSSTransition
                            key={item._id}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Proyecto 
                                proyecto={item}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos