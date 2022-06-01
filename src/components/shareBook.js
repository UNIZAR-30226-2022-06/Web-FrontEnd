import React, { Component } from "react";
import axios from 'axios'
import swal from 'sweetalert';
import { Link, withRouter, useHistory } from "react-router-dom";
import "../css/profile.css";
import "../css/App.css";
import goBackBtn from "../bootstrap-icons/arrow-left.svg"

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/compartirLibro/";
const userName = localStorage.getItem('nomUsuario')
const bookName = localStorage.getItem('nomLibro')

class SignIn extends Component {
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
        this.share();
        event.preventDefault(); 
    }
    
    share = async() => {
        console.log(this.state.email)
        if(this.state.email !== ""){
            await axios.get(baseUrl + userName + '/' + bookName + '/' + this.state.email + "/")
            .catch( () => {
                swal({
                    title: "Correo enviado correctamente!",
                    text: "Vuelve a iniciar sesión con tus credenciales",
                    icon: "success",
                    button: "Ir al catálogo",
                }).then( () => {
                        window.location.href = '/catalogue';
                })
            })
        }
        else{
            swal({
                title: "Error al compartir",
                text: "Debes introducir un correo electrónico válido",
                icon: "error",
            })
        }
    }

    render() {
        console.log(userName)
        console.log(bookName)

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <center>
                        </center>
                    </div>
                    <section>
                        <form onSubmit={this.handleSubmit}>
                            <h3>¡Comparte el libro con tus amigos!</h3>

                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="text" className="form-control" id="email" name="email" placeholder="Introduce tu correo electrónico" onChange={this.handleChange}/>
                            </div>
                            <p></p>
                            <br></br>
                            <div class="d-grid gap-2"> 
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Compartir</button>
                            </div>
                            <br></br>
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
