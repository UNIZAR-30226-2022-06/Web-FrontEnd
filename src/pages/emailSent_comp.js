import React, { Component } from "react";
import "../App.css";

export default class ResetPass extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Recuperación de contraseña</h3>

                        <div className="form-group">
                            <p align="justify">
                                Revise el correo electrónico para poder restaurar su contraseña a través del mensaje que ha recibido.
                            </p>
                        </div>
                        <div class="d-grid gap-2"> 
                            <a type="submit" className="btn btn-primary btn-block" href={"/sign-in"}>Volver</a>
                        </div>
                    </form>
                </div>
            </div>        
        );
    }
}