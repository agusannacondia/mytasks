import React from 'react'
import NuevoProyecto from '../../proyectos/NuevoProyecto'
import ListadoProyectos from '../../proyectos/ListadoProyectos'

const Sidebar = () => {

    return(
        <aside className="Sidebar">
            <h1 className="Sidebar__Titulo">My Tasks</h1>
            <NuevoProyecto />
            <div className="Sidebar__Proyectos">
                <h2>Proyectos</h2>
                <ListadoProyectos />
            </div>
        </aside>
    )
}

export default Sidebar