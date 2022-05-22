import React, { Component } from "react";

export default class ResetPass extends Component {
    render() {
        return (
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
        );
    }
}