import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp";
const cookies = new Cookies();

class SignIn extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        //alert("Usuario: " + this.state.email + " passwrod: " + this.state.password)
        this.login();
        event.preventDefault(); 
    }

    login = async() => {
        await axios.post(baseUrl + "/Usuarios/", {correo: this.state.email, password: this.state.password})
        .then (response=>{
                if(response.status === 200){
                    cookies.set("correo",response.data.result.rows[0].correo, { path: '/' });
                    cookies.set("nomUsuario",response.data.result.rows[0].nomUsuario, { path: '/' });
                    //Llevamos al usuario a la página perfil
                    window.location.href= 'profile/' + response.data.result.rows[0].correo;
                }
        }).catch(error => {
            if (error.response.status === 400){
                swal({
                    title: "Bad login",
                    text: "Username or password incorrect.",
                    icon: "error"
                })
            }
            
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Inicia sesión con tu cuenta</h3>

                <div className="form-group">
                    <label>Correo electrónico o cuenta</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Introduce tu correo electrónico o usuario" onChange={this.handleChange}/>
                </div>
                <p></p>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Introduce tu contraseña" onChange={this.handleChange}/>
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
                    <a type="submit" className="btn btn-primary btn-block" href={"/profile"}>Iniciar sesión</a>
                </div>
                <p className="forgot-password text-right">
                    ¿Has olvidado tu contraseña? <a href={"/reset"}>Recuperar</a>
                </p>
            </form>
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
