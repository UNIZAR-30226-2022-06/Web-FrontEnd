import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from "sweetalert2";
import '../css/profile.css';

import ShowIcon from '@material-ui/icons/Visibility'
import ShowOffIcon from '@material-ui/icons/VisibilityOff'
import { ButtonUnstyled } from "@mui/base";

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp"
const baseUrlUPT = "https://db-itreader-unizar.herokuapp.com/itreaderApp/updateUsuario/"
const baseUrlDEL = "https://db-itreader-unizar.herokuapp.com/itreaderApp/deleteUsuario/"

const userName = localStorage.getItem('nomUsuario')

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

class EditProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            email: "",
            password: "",
            cPassword: "", 
            nickName: "",
            esAdmin: false,
            showPassword: false,
            showCPassword: false,
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
        
        console.log(this.state.nickName)
        console.log("He pulsado boton de actualizar");
        
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

        this.updateUser().then( r =>{
            swal({
                title: "Datos cambiados con éxito",
                text: "Vuelve a tu perfil",
                icon: "success",
            }).then( resp => {
                window.location.href = '/profile';
            })
        }).catch( err =>{
            swal({
                title: "Algo ha ido mal...",
                text: "Inténtalo de nuevo más tarde",
                icon: "error"
            })
        });
    }

    updateUser = async () => {
        console.log("llego al put de axios");
        await axios.put(baseUrlUPT + userName + "/", { nombre: this.state.nombre, nomUsuario: this.state.nickName, password: this.state.password, correo: this.state.email })
            .then( () => {
                console.log("Exito al actualizar los datos");
            })
            .catch(error => {
                console.log(error);
            })
        localStorage.setItem('nomUsuario', this.state.nickName);
        var usuario = localStorage.getItem('nomUsuario');
        console.log(usuario);
        console.log("he hecho el put de axios");
    }

    //This function handles the changes on any datafield
    handleChange = (evento) => {
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
                    : "La contraseña debe tener mínimo 8 caracteres y al menos una mayúscula, una minúscula, un número y un caracter no alfanumérico.";
                break;
            default:
                break;
        }
        
        this.setState({
            isError,
            [name]: value
        });
    }

    handleDelete = (evento) => {
        evento.preventDefault();
        Swal.fire({
            title: '¿Deseas eliminar tu cuenta?',
            text: "¡Los cambios serán irreversibles!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡elimínala!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseUrlDEL + userName + "/")
                console.log("he hecho el delete del usuario");
                localStorage.clear();
                Swal.fire(
                '¡Borrado!',
                'La cuenta ha sido eliminada.',
                'success'
                )
                window.location.href = '/sign-in';
            }
        })     
    }

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
                            <h2>Editar perfil</h2>
                            <p></p>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Introduce tu nombre y apellido" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Nombre de usuario</label>
                                <input type="text" className="form-control" id="nickName" name="nickName" placeholder="Introduce tu nombre de usuario" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="email" className="form-control" id="mail" name="email" placeholder="Introduce tu correo electrónico" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <div className="input-group mb-3">
                                    <input type={this.state.showPassword ? "text" : "password"} id="passwd" name="password" className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"} placeholder="Introduce tu contraseña" onChange={this.handleChange} />
                                    <ButtonUnstyled className="show-btn2" onClick={() => this.setState({showPassword: !this.state.showPassword})}>
                                        {this.state.showPassword ? <ShowIcon/> : <ShowOffIcon/>}
                                    </ButtonUnstyled>
                                    {isError.password.length > 0 && (
                                        <span className="invalid-feedback">{isError.password}</span>
                                    )}
                                </div>
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Confirmar contraseña</label>
                                <div className="input-group mb-3">
                                    <input type={this.state.showCPassword ? "text" : "password"} id="cpasswd" name="cPassword" className={isError.cPassword.length > 0 ? "is-invalid form-control" : "form-control"} placeholder="Confirma tu contraseña" onChange={this.handleChange} onKeyUp={this.checkPasswd}/>
                                    <ButtonUnstyled style={{color: 'black'}} className="show-btn2" onClick={() => this.setState({showCPassword: !this.state.showCPassword})}>
                                        {this.state.showCPassword ? <ShowIcon/> : <ShowOffIcon/>}
                                    </ButtonUnstyled>
                                    {isError.cPassword.length > 0 && (
                                        <span className="invalid-feedback">{isError.cPassword}</span>
                                    )}
                                </div>
                                <span id='message' ></span>
                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2">
                                <a onClick={this.handleSubmit} type="submit" className="success-btn btn-success btn-block" href={"/profile"}>Guardar cambios</a>
                            </div>
                            <h2></h2>
                            <div class="d-grid gap-2">
                                <a onClick={this.handleDelete} className="danger-btn btn-danger btn-lock btn-lg" href={"/sign-up"}>Borrar cuenta</a>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}
  

class Edit extends Component {
    render() {
        
        const history = this.props.history;
        return (
            <div classNameName="perfilusuario">

                <EditProfile history={history}/>
            </div>
        )
    }
}

export default withRouter(Edit);