import React, { useContext, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import Barra from "../../layout/Barra";
import FormTarea from "../../tareas/FormTarea";
import ListadoTareas from "../../tareas/ListadoTareas";
import AuthContext from "../../../context/Autenticacion/AuthContext";

const Proyectos = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="background">
      <div className="contenedor-app">
        <Sidebar />
        <div className="seccion-principal">
          <Barra />
          <main className="main">
            <FormTarea />
            <div className="contenedor-tareas">
              <ListadoTareas />
            </div>
          </main>
        </div>
      </div>
      <div className="Footer__Signature">
          <p>
            Hecho con{" "}
            <span role="img" aria-label="Red heart emoji">
              ❤️
            </span>{" "}
            por{" "}
            <a href="https://annacondia.ar" target="_blank" rel="noopener noreferrer">
              Agustin Annacondia
            </a>
          </p>
        </div>
    </div>
  );
};

export default Proyectos;
