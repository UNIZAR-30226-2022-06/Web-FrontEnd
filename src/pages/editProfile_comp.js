import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import '../css/profile.css';
import { BrowserRouter as Link } from "react-router-dom";

const baseUrlDEL = "https://db-itreader-unizar.herokuapp.com/itreaderApp/deleteUsuario/";
const baseUrlUPD = "https://db-itreader-unizar.herokuapp.com/itreaderApp/updateUsuario/";


class FormHome extends React.Component {

    cookie = new Cookies();

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickName: "",
            password: "",
            cpassword: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleSubmit = (evento) => {
        document.getElementById('mail').style.borderColor = '#f8f4e5'
        document.getElementById('nickName').style.borderColor = '#f8f4e5'
        
        evento.preventDefault();
        if (this.state.password !== this.state.cpassword) {
            alert("Passwords are not equal")
            return;
        }
        if( this.state.email.length === 0 || this.state.nickname.length === 0 ){
                
            var valorMail = document.getElementById('mail').value;
            var valorNick = document.getElementById('nick').value;
            if(valorMail == ''){
                document.getElementById('mail').style.borderColor = 'red'
            }else if(valorNick == ''){
                document.getElementById('nick').style.borderColor = 'red'
            }else{
            }
            return;
        }

        this.guardarCambios().then( r =>{
            swal({
                title: "You have successfully change your data.",
                text: "Now read a book!",
                icon: "success",
                button: "Go to Menu",
            }).then( resp => {
                window.location.href = '/profile';
            })
            }).catch( err =>{
            swal({
                title: "Something went wrong",
                text: "Try to register again in a few minutes",
                icon: "error"
                })
            });

        //Reiniciamos el campo de los formularios
        //document.getElementById("info").reset()
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

    checkPasswd() {
        if ((document.getElementById("passwd").value === document.getElementById("cpasswd").value) && document.getElementById("passwd").value.length > 0) {
            document.getElementById('message').style.color = '#04981C';
            document.getElementById('message').innerHTML = 'Contraseña correcta';
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Las contraseñas no coinciden';
        }
    }

    /*guardarCambios = async () => {

        await axios.post(baseUrl + "/home", { correo: this.state.email, nomUsuario: this.state.nickname, password: this.state.password })
            .then( () => {
                console.log("Exito en el registro");
            })
            .catch(error => {
                console.log(error);
            })

    }*/

    handleDelete = (evento) => {
        localStorage.clear();
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
        return (
            <div className="auth-wrapper">
                <div className="auth-inner"> 
                    <div>
                        <center>
                        </center>
                    </div>
                    <section>
                        <form>
                            <h2>Editar perfil</h2>

                            <div className="form-group">
                                <label>Nombre de usuario</label>
                                <input type="text" className="form-control" id="nickName" placeholder="Introduce tu nombre de usuario" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" className="form-control" id="name" placeholder="Introduce tu nombre y apellido" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="email" className="form-control" id="mail" placeholder="Introduce tu correo electrónico" onChange={this.handleChange} />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password" id="passwd" className="form-control" placeholder="Introduce tu contraseña" onChange={this.handleChange} onKeyUp={this.checkPasswd} />
                            </div>
                            <p></p>
                            <div>
                                <label>Confirmar contraseña</label>
                                <input type="password" id="cpasswd" className="form-control" placeholder="Confirma tu contraseña" onChange={this.handleChange} onKeyUp={this.checkPasswd} />
                                <span id='message' ></span>
                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2">
                                <a onClick={this.guardarCambios} className="success-btn btn-success btn-block" href={"/profile"}>Guardar cambios</a>
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
  

class home extends React.Component {
    render() {
        
        const history = this.props.history;
        return (
            <div classNameName="perfilusuario">

                <FormHome history={history}/>
            </div>
        )
    }
}

export default withRouter(home);