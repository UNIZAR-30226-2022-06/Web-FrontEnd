import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
import "../css/profile.css";
import "../App.css";


const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp"

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            email: "",
            password: "",
            cPassword: "", 
            nickName: "",
            esAdmin: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = (evento) => {
        
        console.log("He pulsado boton de registrar");
        
        document.getElementById('nombre').style.borderColor = '#f8f4e5'
        document.getElementById('nickName').style.borderColor = '#f8f4e5'
        document.getElementById('passwd').style.borderColor = '#f8f4e5'
        document.getElementById('mail').style.borderColor = '#f8f4e5'
        
        evento.preventDefault();
        if (this.state.password !== this.state.cPassword) {
            alert("Passwords are not equal")
            return;
        }
        if( this.state.email.length === 0 || this.state.nickName.length === 0 ){
            
            var valorMail = document.getElementById('mail').value;
            var valorNick = document.getElementById('nickName').value;
            if(valorMail === ''){
                document.getElementById('mail').style.borderColor = 'red'
            }else{
                if(valorNick === ''){
                    document.getElementById('nickName').style.borderColor = 'red'
                }
            }
            return;
        }

        this.registrarse().then( r =>{
            swal({
                title: "You have successfully registed.",
                text: "Log-in just now!",
                icon: "success",
                button: "Go to Log-In",
            }).then( resp => {
                window.location.href = 'sign-in';
            })
        }).catch( err =>{
            swal({
                title: "Something went wrong",
                text: "Try to register again in a few minutes",
                icon: "error"
            })
        });
    }

    registrarse = async () => {
        /*const user = {
            nombre: this.state.name, nomUsuario: this.state.nickName, password: this.state.password, correo: this.state.email, esAdmin: this.state.esAdmin
        };*/

        await axios.post(baseUrl + "/createUsuario/", { nombre: this.state.nombre, nomUsuario: this.state.nickName, password: this.state.password, correo: this.state.email, esAdmin: this.state.esAdmin })
            .then( () => {
                console.log("Exito en el registro");
            })
            .catch(error => {
                console.log(error);
            })

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

    //Check if password and confirm password are equal
    checkPasswd() {
        if ((document.getElementById("passwd").value === document.getElementById("cpasswd").value) && document.getElementById("passwd").value.length > 0) {
            document.getElementById('message').style.color = '#04981C';
            document.getElementById('message').innerHTML = 'Contraseña correcta';
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Las contraseñas no coinciden';
        }
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
                        <form onSubmit={this.handleSubmit} id="info">
                            <h3>Registra tu cuenta</h3>

                            <div className="form-group">
                                <label>Nombre de usuario</label>
                                <input type="text" className="form-control" id="nickName" name="nickName" placeholder="Introduce tu nombre de usuario" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Introduce tu nombre y apellido" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="email" className="form-control" id="mail" name="email" placeholder="Introduce tu correo electrónico" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password" id="passwd" name="password" className="form-control" placeholder="Introduce tu contraseña" onChange={this.handleChange} onKeyUp={this.checkPasswd} />
                            </div>
                            <p></p>
                            <div>
                                <label>Confirmar contraseña</label>
                                <input type="password" id="cpasswd" name="cPassword" className="form-control" placeholder="Confirma tu contraseña" onChange={this.handleChange} onKeyUp={this.checkPasswd} />
                                <span id='message' ></span>
                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2"> 
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Registrar</button>
                            </div>
                            <br></br>
                            <p className="forgot-password" type="button">
                                ¿Ya te has registrado? <a href={"/sign-in"}>Inicia sesión</a>
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}

class Register extends Component {

    render() {
        const history = this.props.history;
        return (
            <div className="Registrarse">
                <SignUp history={history} />
            </div>
        );
    }
}

export default withRouter(Register);