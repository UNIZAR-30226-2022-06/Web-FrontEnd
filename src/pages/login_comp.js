import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import "../css/profile.css";
import "../App.css";

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp";
const cookies = new Cookies();

class SignIn extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            username: "",
            password: ""
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
        //alert("Usuario: " + this.state.email + " passwrod: " + this.state.password)
        this.login();
        event.preventDefault(); 
    }

    login = async() => {
        await axios.get(baseUrl + "/Login/" + this.state.username, {params: {
                password: this.state.password,
            } 
        })
        .then (response=>{
            console.log(response.data);
                if(response.status === 200){
                    //cookies.set("nomUsuario", response.data.result.rows[0].nomUsuario, { path: '/' });
                    window.location.href = '/profile/';
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
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <center>
                        </center>
                    </div>
                    <section>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Inicia sesión con tu cuenta</h3>

                            <div className="form-group">
                                <label>Nombre de usuario</label>
                                <input type="username" className="form-control" id="username" name="username" placeholder="Introduce tu nombre de usuario" onChange={this.handleChange}/>
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Introduce tu contraseña" onChange={this.handleChange}/>
                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2"> 
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Iniciar sesión</button>
                            </div>
                            <br></br>
                            <p className="forgot-password" type="button">
                                ¿Has olvidado tu contraseña? <a href={"/reset"}>Recuperar</a>
                            </p>
                            <p className="forgot-password" type="button">
                                ¿Todavía no tienes cuenta? <a href={"/sign-up"}>Registrar</a>
                            </p>
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
