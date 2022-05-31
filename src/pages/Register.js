import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
import "../css/profile.css";
import "../css/App.css";

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/"
const urlUsers = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Usuarios/"


// Expresión regular para validar formato de correo electrónico
const regExpMail = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

// Expresión regular para validar seguridad de la contraseña
const regExpPass = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/
)

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
}

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            email: "",
            password: "",
            cPassword: "", 
            nickName: "",
            esAdmin: false,
            isError: {
                name: '',
                email: '',
                password: '',
                cPassword: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = (evento) => {      
        document.getElementById('nombre').style.borderColor = '#f8f4e5'
        document.getElementById('nickName').style.borderColor = '#f8f4e5'
        document.getElementById('passwd').style.borderColor = '#f8f4e5'
        document.getElementById('mail').style.borderColor = '#f8f4e5'

        console.log(this.state.nickName);
        
        evento.preventDefault();
        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
        this.fetchUsers();
/*
        
    */}

    fetchUsers = async () => {
        const { data } = await axios.get(urlUsers)
        //console.log(data.length);
        for(let i = 0; i < data.length; i++){
            if(data[i].nomUsuario === this.state.nickName){
                //console.log("Nombre de usuario ya existente");
                swal({
                    title: "Error en el registro",
                    text: "Ya existe un usuario con ese nombre.",
                    icon: "error"
                })
            }
            else if(data[i].correo === this.state.email){
                //console.log("Correo asociado a una cuenta ya existente");
                swal({
                    title: "Error en el registro",
                    text: "Correo electrónico asociado a una cuenta existente.",
                    icon: "error"
                })
            }
            else{
                this.registrarse();
            }
        }
    }; 
    

    registrarse = async () => {
        await axios.post(baseUrl + "createUsuario/", { nombre: this.state.nombre, nomUsuario: this.state.nickName, password: this.state.password, correo: this.state.email, esAdmin: this.state.esAdmin })
            .then( () => {
                swal({
                    title: "Te has registrado correctamente.",
                    text: "Inicia sesión ahora!",
                    icon: "success",
                    button: "Ir a inicio de sesión",
                }).then( resp => {
                    window.location.href = 'sign-in';
                })
            })

    }


    //This function handles the changes on any datafield
    handleChange = (evento) => {
        evento.preventDefault();
        //Creamos un par con el nombre y el valor del target que este llamando a la funcion
        const { name, value } = evento.target;
        //Guardamos en el estado con el nombre correspondiente el valor correspondiente
        let isError = { ...this.state.isError };
        
        switch (name) {
            case "email":
                isError.email = regExpMail.test(value)
                    ? ""
                    : "Dirección de correo electrónica no válida.";
                break;
            case "password":
                isError.password = regExpPass.test(value)
                    ? ""
                    : "La contraseña debe tener mínimo 8 caracteres y al menos una mayúscula, una minúscula y un número.";
                break;
            default:
                break;
        }

        //this.checkPasswd();

        this.setState({
            isError,
            [name]: value
        });
    }

    //Check if password and confirm password are equal
    /*checkPasswd() {
        if (document.getElementById("passwd").value != ""){
            if ((document.getElementById("passwd").value === document.getElementById("cpasswd").value) && document.getElementById("passwd").value.length > 0) {
                document.getElementById('message').style.color = '#04981C';
                document.getElementById('message').innerHTML = 'Contraseña correcta.';
            } else {
                document.getElementById('message').style.color = 'red';
                document.getElementById('message').innerHTML = 'Las contraseñas no coinciden.';
            }
        }
        else{
            document.getElementById('message').innerHTML = '';
        }
    }*/
   
    render() {
        const { isError } = this.state;

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
                                <input type="email" className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"} id="mail" name="email" placeholder="Introduce tu correo electrónico" onChange={this.handleChange} />
                                {isError.email.length > 0 && (
                                    <span className="invalid-feedback">{isError.email}</span>
                                )}
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password" id="passwd" name="password" className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"} placeholder="Introduce tu contraseña" onChange={this.handleChange} />
                                {isError.password.length > 0 && (
                                    <span className="invalid-feedback">{isError.password}</span>
                                )}
                            </div>
                            <p></p>
                            <div>
                                <label>Confirmar contraseña</label>
                                <input type="password" id="cpasswd" name="cPassword" className={isError.cPassword.length > 0 ? "is-invalid form-control" : "form-control"} placeholder="Confirma tu contraseña" onChange={this.handleChange} />
                                <span id='message' ></span>
                                {isError.cPassword.length > 0 && (
                                    <span className="invalid-feedback">{isError.cPassword}</span>
                                )}
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