import React, { Component } from "react";
import "../App.css";

export default class ResetPass extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Recupera tu contraseña</h3>

                        <div className="form-group">
                            <label>Correo electrónico</label>
                            <input type="email" className="form-control" placeholder="ejemplo@email.com" />
                        </div>
                        <p></p>
                        <div class="d-grid gap-2">    
                            <a type="submit" className="btn btn-primary btn-block" href={"/email-sent"}>Enviar</a>
                        </div>
                    </form>
                </div>
            </div>    
        );
    }
}
