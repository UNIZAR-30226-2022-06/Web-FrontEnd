import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import '../css/profile.css'
import { BrowserRouter as Link } from "react-router-dom";

import pencilIcon from '../icons8_pencil_drawing.ico';


const baseUrl = "https://precious2021.herokuapp.com";


class FormHome extends React.Component {

    cookie = new Cookies();

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickName: "",
            password: "",
            cpassword: "",
            nomUsuario: "",
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
                window.location.href = 'Login';
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

    check() {
        if ((document.getElementById("passwd").value === document.getElementById("cpasswd").value) && document.getElementById("passwd").value.length > 0) {
            document.getElementById('message').style.color = '#90ee90';
            document.getElementById('message').innerHTML = ' Matching passwords';
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = ' Not matching passwords';
        }
    }

    guardarCambios = async () => {

        await axios.post(baseUrl + "/home", { correo: this.state.email, nomUsuario: this.state.nickname, password: this.state.password })
            .then( () => {
                console.log("Exito en el registro");
            })
            .catch(error => {
                console.log(error);
            })

    }

    deleteAcount = async () => {

        await axios.post(baseUrl + "/home", {  })
            .then( () => {
                console.log("Exito al borrar");
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        return (
            <div> 
                <div>
                    <center>
                    </center>
                </div>
                <section>
                    <nav className="Menu">
                        <ul>
                            <a className="nav-link" href={"/edit-profile"}><img src={pencilIcon} className="item-Menu" alt="pencilIcon" /></a>
                        </ul>
                    </nav>
                    <form onSubmit={this.handleSubmit} id="info">
                        <h2>Perfil</h2>

                        <div className="form-group">
                            <label>Nombre de usuario</label>
                            <input disabled="true" type="text" className="form-control" id="nickName" placeholder={this.state.nickName} onChange={this.handleChange} />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input disabled="true" type="text" className="form-control" id="name" placeholder={this.state.name} onChange={this.handleChange} />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <label>Correo electrónico</label>
                            <input disabled="true" type="email" className="form-control" id="mail" placeholder={this.state.email} onChange={this.handleChange} />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input disabled="true" type="password" id="passwd" className="form-control" placeholder={this.state.password} onChange={this.handleChange} />
                        </div>
                        <p></p>
                        <br></br>
                        <div class="d-grid gap-2">
                            <a type="submit" className="btn btn-primary btn-block" href={"/home"}>Volver</a>
                        </div>
                        <h2></h2>
                        <div class="d-grid gap-2">
                            <a type="submit" className="btn btn-danger btn-block" href={"/sign-up"}>Borrar cuenta</a>
                        </div>
                    </form>
                </section>
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