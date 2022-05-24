import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import "../css/profile.css";
import "../css/App.css";

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/enviarCorreo/";
const cookies = new Cookies();

class SignIn extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: ""
        }
    }
    
    
    //This function handles the changes on any datafield
    handleChange = (evento) => {
        //Creamos un par con el nombre y el valor del target que este llamando a la funcion
        const { name, value } = evento.target;
        //Guardamos en el estado con el nombre correspondiente el valor correspondiente
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = (event) => {
        this.reset();
        event.preventDefault(); 
    }
    
    reset = async() => {
        await axios.get(baseUrl + this.state.email + "/")
        .catch( () => {
            swal({
                title: "Correo enviado correctamente!",
                text: "Vuelve a iniciar sesión con tus credenciales",
                icon: "success",
                button: "Ir a inicio de sesión",
            }).then( () => {
                    window.location.href = 'sign-in';
            })
        })
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <center>
                        </center>
                    </div>
                    <section>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Recupera tu contraseña</h3>

                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="text" className="form-control" id="email" name="email" placeholder="Introduce tu correo electrónico" onChange={this.handleChange}/>
                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2"> 
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Recuperar</button>
                            </div>
                            <br></br>
                        </form>
                    </section>
                </div> 
            </div>   
        );
    }
}

class Login extends React.Component{
    
    render(){
        const history = this.props.history;
        return(
            <div className="Login">
                <SignIn history={history} />
            </div>
        );
    }
}

export default withRouter(Login);
