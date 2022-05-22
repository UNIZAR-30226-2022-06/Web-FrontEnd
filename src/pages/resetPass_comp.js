import React, { Component } from "react";

export default class ResetPass extends Component {
    render() {
        return (
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
        );
    }
}
