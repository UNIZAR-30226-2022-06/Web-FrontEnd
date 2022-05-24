import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/App.css";
import pencilIcon from "../images/icons8_pencil_drawing.ico";

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Usuarios/";

function HomeScreen (props) {

  const handleLogout = () => {
    localStorage.clear();
  }

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        const { data } = await axios.get(baseUrl)
        setUser(data);
      }; 
      fetchUsers();
      return () => {
        //
      };
    }, []);
    
    const nombreusuario = localStorage.getItem('nomUsuario')
    const displayUsers = user
          .map((user) => {
            if(user.nomUsuario == nombreusuario){
            return (
              <div className="auth-wrapper">
                <div className="auth-inner" key={user.id}>
                  <div>
                    <center>
                    </center>
                  </div>
                    <section>
                    <nav className="Menu">
                            <ul>
                                <a className="nav-link" href={"/edit-profile"}><img src={pencilIcon} className="item-Menu" alt="pencilIcon" /></a>
                            </ul>
                        </nav>
                        <form id="info">
                            <h2>Perfil</h2>

                            <div className="form-group">
                                <label>Nombre de usuario</label>
                                <label disabled="true" type="text" className="form-control" id="nickName">{user.nomUsuario}</label>
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Nombre</label>
                                <label disabled="true" type="text" className="form-control" id="nickName">{user.nombre}</label>                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <label disabled="true" type="text" className="form-control" id="nickName">{user.correo}</label>                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <label disabled="true" type="password" className="form-control" id="nickName">{user.password}</label>                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2">
                                <a type="submit" href="/catalogue" className="btn btn-primary btn-lock btn-lg">Volver</a>
                            </div>
                            <div class="d-grid gap-2">
                                <a onClick={handleLogout} type="submit" className="danger-btn btn-warning btn-lock btn-lg" href={"/sign-in"}>Cerrar sesión</a>
                            </div>
                        </form>
                    </section>
                </div>
              </div>
            );
            }
        });

    return (
    <div>
        {displayUsers}
    </div>  
  );
};

export default HomeScreen;
