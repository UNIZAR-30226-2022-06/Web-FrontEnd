import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import '../css/profile.css';

import pencilIcon from '../icons8_pencil_drawing.ico';

class FormHome extends Component {

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

    handleLogout = (evento) => {
        localStorage.clear();
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
                                <button type="submit" className="btn btn-primary btn-lock btn-lg">Volver</button>
                            </div>
                            <div class="d-grid gap-2">
                                <a onClick={this.handleLogout} type="submit" className="danger-btn btn-warning btn-lock btn-lg" href={"/sign-in"}>Cerrar sesión</a>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}
 

class home extends Component {
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