import React, { Component } from "react";
import Usuario from "./usuario";

export default class Login extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: "",
            password: ""
        }
    }

    state = {
        usuario: ""
      }

    componentDidMount() {
        fetch('https://db-itreader-unizar.herokuapp.com/itreaderApp/Usuarios')
        .then(res => res.json())
        .then((data) => {
          this.setState({ usuario: data })
        })
        .catch(console.log)
    }

    render() {
        return (
            <form>
                <h3>Inicia sesión con tu cuenta</h3>

                <div className="form-group">
                    <label>Correo electrónico o cuenta</label>
                    <input type="email" className="form-control" placeholder="Introduce tu correo electrónico o usuario" />
                </div>
                <p></p>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" placeholder="Introduce tu contraseña" />
                </div>
                <p></p>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Recuérdame</label>
                    </div>
                </div>
                <br></br>
                <div class="d-grid gap-2"> 
                    <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                </div>
                <p className="forgot-password text-right">
                    ¿Has olvidado tu contraseña? <a href={"/reset"}>Recuperar</a>
                </p>
            </form>
        );
    }
}
