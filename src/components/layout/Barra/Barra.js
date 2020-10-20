import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../context/Autenticacion/AuthContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Barra = () => {

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return(
        <header className="app-header">
            { usuario ? (<p className="nombre-usuario">Hola <span>{ usuario.nombre }</span></p>) : null }
            <nav className="nav-principal">
                <FontAwesomeIcon icon={faPowerOff} onClick={() => cerrarSesion() }/>
            </nav>
        </header>
    )
}

export default Barra