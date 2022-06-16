import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
import "../css/profile.css";
import "../css/App.css";
import { ButtonUnstyled } from "@mui/base";

import ShowIcon from '@material-ui/icons/Visibility'
import ShowOffIcon from '@material-ui/icons/VisibilityOff'

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Login/";

class SignIn extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            username: "",
            password: "",
            showPassword: false,
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
        await axios.get(baseUrl + this.state.username)
        .then (response=>{
            console.log(response.data.nomUsuario);
            console.log(response.data.password);
            console.log(response.data.esAdmin);
            if(response.data.nomUsuario == this.state.username && response.data.password == this.state.password){
                localStorage.setItem('nomUsuario',this.state.username)
                localStorage.setItem('password',this.state.password)
                localStorage.setItem('esAdmin',response.data.esAdmin)
                if(response.data.esAdmin == false){
                    window.location.href= '/catalogue';
                }
                else{
                    window.location.href= '/admin-catalogue';
                }
            }
            else{
                swal({
                    title: "Usuario o contraseña incorrecto!",
                    text: "Inténtalo de nuevo",
                    icon: "error"
                })
            }
        }).catch(error => {
            swal({
                title: "Usuario o contraseña incorrecto!",
                text: "Inténtalo de nuevo",
                icon: "error"
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
                            <h3>Inicia sesión con tu cuenta</h3>

                            <div className="form-group">
                                <label>Nombre de usuario</label>
                                <input type="text" className="form-control" id="username" name="username" placeholder="Introduce tu nombre de usuario" onChange={this.handleChange}/>
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <div className="input-group mb-3">
                                    <input type={this.state.showPassword ? "text" : "password"} className="form-control" id="password" name="password" placeholder="Introduce tu contraseña" onChange={this.handleChange}/>
                                    <ButtonUnstyled className="show-btn" onClick={() => this.setState({showPassword: !this.state.showPassword})}>
                                        {this.state.showPassword ? <ShowIcon/> : <ShowOffIcon/>}
                                    </ButtonUnstyled>
                                </div>
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

class Login extends Component{
    
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
