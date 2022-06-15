import React, { Component } from "react";
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";
import goBackBtn from "../bootstrap-icons/arrow-left.svg"

var pag = 0;
var node, node2;
var textNode, textNode2;
var textopag = "", textopag2;
var size = 0, font = 0, color = 0, primera = 0, accion = 0;

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp";
const libroName = localStorage.getItem('nomLibro')
const userName = localStorage.getItem('nomUsuario')

class Epub extends Component {

    constructor(props) {
        super(props)

        this.state={
            texto: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleSubmit = () => {
        this.Next();
    }

    nextpage(){                         
        var marcpag
        axios.get(baseUrl + '/MarcasUsuario/' + userName + '/')
        .then(res =>{
            var marcas = res.data;

            axios.get(baseUrl + '/Libros/').then(res =>{
                var libro;
                for(var i = 0; i < res.data.length; i++){
                    if(libroName === res.data[i].nombre){
                        libro = res.data[i];
                    }                                                
                }
                
                axios.get(baseUrl + '/Usuarios/').then(res =>{
                    var usuario;
                    for(i = 0; i < res.data.length; i++){
                        if(userName === res.data[i].nomUsuario){
                            usuario = res.data[i];
                        }
                    }
                
                    for(i = 0; i < marcas.length; i++){
                        if(marcas[i].esUltimaLeida === true && libro.id === marcas[i].libro && usuario.id === marcas[i].usuario){
                            marcpag = marcas[i];
                            
                        }
                    }

                    var pagina;
                    if(primera === 0){
                        pagina = marcpag.pagina;
                        primera = 1;
                    }else{
                        pagina = textopag.pagina+1;
                    }

                    textopag2 = textopag;
                    axios.get(baseUrl + '/leerLibro/' + libroName + '/' + pagina).then(res=>{
                        if(res.data.contenido === ''){
                            textopag = textopag2;
                        }else{
                            textopag = res.data;
                        }
                    })

                    var element = document.getElementById("contenidoLibro");
                    node = document.createElement("div");
                    textNode = document.createTextNode(textopag.contenido);
                    node.appendChild(textNode);
                    element.replaceChild(node, element.childNodes[0]);

                    element = document.getElementById("pag");
                    node2 = document.createElement("h4");
                    textNode2 = document.createTextNode("Pagina " + textopag.pagina);
                    node2.appendChild(textNode2);
                    element.replaceChild(node2, element.childNodes[0]);

                    const marca = {pagina: textopag.pagina};
                    axios.put(baseUrl + '/updateMarcaAndroid/' + userName + '/' + libroName + '/', marca);
                    accion = 1;
                });
            });
        });
    }

    previouspage(){
        var marcpag
        axios.get(baseUrl + '/MarcasUsuario/' + userName + '/')
        .then(res =>{
            for(var i = 0; i < res.data.length; i++){
                if(res.data[i].esUltimaLeida === true){
                    marcpag = res.data[i];
                }
            }

            if(primera === 0){
                var pagina = marcpag.pagina;
                primera = 1;
            }else{
                pagina = textopag.pagina+1;
            }

            if(textopag.pagina === 0){
                return
            }

            textopag2 = textopag;
            pagina = textopag.pagina;
            axios.get(baseUrl + '/leerLibro/' + libroName + '/' + (pagina-1))
            .then(res=>{
                textopag = res.data;
            });

            var element = document.getElementById("contenidoLibro");
            node = document.createElement("div");
            textNode = document.createTextNode(textopag.contenido);
            node.appendChild(textNode);
            element.replaceChild(node, element.childNodes[0]);
    
            element = document.getElementById("pag");
            node2 = document.createElement("h4");
            textNode2 = document.createTextNode("Pagina " + textopag.pagina);
            node2.appendChild(textNode2);
            element.replaceChild(node2, element.childNodes[0]);
    
            const marca = {pagina: textopag.pagina};
            axios.put(baseUrl + '/updateMarcaAndroid/' + userName + '/' + libroName + '/', marca);
            accion = 2;
        });
    }

    
    componentDidMount(){                
        if(pag === undefined){
            pag = 1;
        }
        axios.get(baseUrl + '/MarcasUsuario/' + userName + '/')
        .then(res =>{
            var marcas = res.data;

            axios.get(baseUrl + '/Libros/').then(res =>{
                var libro;
                for(var i = 0; i < res.data.length; i++){
                    if(libroName === res.data[i].nombre){        
                        libro = res.data[i];
                    }                                                
                }
                
                axios.get(baseUrl + '/Usuarios/').then(res =>{
                    var usuario;
                    for(var i = 0; i < res.data.length; i++){
                        if(userName === res.data[i].nomUsuario){
                            usuario = res.data[i];
                        }
                    }

                    var leido = false, marcpag;
                    for(i = 0; i < marcas.length; i++){
                        if(marcas[i].esUltimaLeida === false && libro.id === marcas[i].libro && usuario.id === marcas[i].usuario){             
                            var element = document.getElementById("marks");
                            node = document.createElement("option");
                            textNode = document.createTextNode(marcas[i].nombre);
                            node.appendChild(textNode);
                            element.appendChild(node);
                        }else if(marcas[i].esUltimaLeida === true && libro.id === marcas[i].libro && usuario.id === marcas[i].usuario){
                            leido = true;
                        }
                    }

                    if(!leido){
                        const marca = {nombre: "MarcaPaginas"+libroName, pagina: 1, esUlt: 1, usuario: userName, libro: libroName}  
                        axios.post(baseUrl + '/createMarca/', marca);
                    }

                    for(i = 0; i < marcas.length; i++){
                        if(marcas[i].esUltimaLeida === true && libro.id === marcas[i].libro && usuario.id === marcas[i].usuario){
                            marcpag = marcas[i];
                            console.log(marcpag)
                        }
                    }

                    axios.get(baseUrl + '/leerLibro/' + libroName + '/' + marcpag.pagina)
                    .then(res=>{
                        console.log(res.data)
                        textopag = res.data;
                        const texto = res.data;
                        this.setState({texto});

                        var element = document.getElementById("pag");
                        node2 = document.createElement("h4");
                        textNode2 = document.createTextNode("Pagina " + res.data.pagina);
                        node2.appendChild(textNode2);
                        element.appendChild(node2)
                        
                    });
                });
            });
        });
    }

    changeSize(){
        if(size === 0){
            var element = document.getElementById("contenidoLibro");
            element.style.fontSize = "120%";
            size = 1;
        }else if(size === 1){
            element = document.getElementById("contenidoLibro");
            element.style.fontSize = "100%";
            size = 2;
        }else{
            element = document.getElementById("contenidoLibro");
            element.style.fontSize = "80%";
            size = 0;
        }
    }

    changeFont(){
        if(primera === 0){
            if(font === 0){
                var element = document.getElementById("contenidoLibro");
                element.style.fontFamily = "verdana";
                font = 1;
            }else if(font === 1){
                element = document.getElementById("contenidoLibro");
                element.style.fontFamily = "Arial";
                font = 2;
            }else{
                element = document.getElementById("contenidoLibro");
                element.style.fontFamily = "Times New Roman";
                font = 0;
            }
        }else{
            if(font === 0){
                element = document.getElementById("contenidoLibro");
                element.childNodes[0].style.fontFamily = "verdana";
                font = 1;
            }else if(font === 1){
                element = document.getElementById("contenidoLibro");
                element.childNodes[0].style.fontFamily = "Arial";
                font = 2;
            }else{
                element = document.getElementById("contenidoLibro");
                element.childNodes[0].style.fontFamily = "Times New Roman";
                font = 0;
            }
        }
    }

    changeColor(){
        if(color === 0){
            var element = document.getElementById("contenidoLibro");
            element.style.backgroundColor = "gray";
            color = 1;
        }else if(color === 1){
            element = document.getElementById("contenidoLibro");
            element.style.color = "white";
            element.style.backgroundColor = "black";
            color = 2;
        }else{
            element = document.getElementById("contenidoLibro");
            element.style.color = "black";
            element.style.backgroundColor = "";
            color = 0;
        }
    }

    changePag(){
        textopag2 = textopag;
        var pagina = document.getElementById("num").value;

        axios.get(baseUrl + '/leerLibro/' + libroName + '/' + pagina).then(res=>{
            textopag = res.data;
        })
        
        var element = document.getElementById("contenidoLibro");
        node = document.createElement("div");
        textNode = document.createTextNode(textopag.contenido);
        node.appendChild(textNode);
        element.replaceChild(node, element.childNodes[0]);

        element = document.getElementById("pag");
        node2 = document.createElement("h4");
        textNode2 = document.createTextNode("Pagina " + textopag.pagina);
        node2.appendChild(textNode2);
        element.replaceChild(node2, element.childNodes[0]);
        pag = textopag.pagina;

        const marca = {pagina: textopag.pagina};
        axios.put(baseUrl + '/updateMarcaAndroid/' + userName + '/' + libroName + '/', marca);
        accion = 3;
    }

    saveMark(){
        if(accion === 1){
            var page = textopag.pagina-1;
        }else if(accion === 2){
            page = textopag.pagina+1;
        }else{
            page = textopag.pagina;
        }
        if(document.getElementById("mark").value === ''){
            alert("The mark field is empty")
        }else{
            const marca = {nombre: document.getElementById("mark").value, pagina: page, esUlt:0, usuario:userName, libro: libroName}
            axios.get(baseUrl + '/MarcasUsuario/' + userName + '/')
            .then(res =>{
                var existe = 0;
                for(var i = 0; i < res.data.length; i++){
                    if(marca.nombre === res.data[i].nombre){
                        existe = 1;
                        alert("El nombre de la marca ya existe");
                    }
                }

                if(existe === 0){
                    axios.post(baseUrl + '/createMarca/', marca);
                    var element = document.getElementById("marks");
                    node = document.createElement("option");
                    textNode = document.createTextNode(document.getElementById("mark").value);
                    node.appendChild(textNode);
                    element.appendChild(node);
                }
            });  
        }
    }

    removeMark(){
        var element = document.getElementById("marks");
        while(element.length !== 0){
            element.removeChild(element.childNodes[0]);
        }

        axios.get(baseUrl + '/MarcasUsuario/' + userName + '/')
        .then(res =>{
            var marcas = res.data;
            
            axios.get(baseUrl + '/Libros/').then(res =>{
                var libro;
                for(var i = 0; i < res.data.length; i++){
                    if(libroName === res.data[i].nombre){
                        libro = res.data[i];
                    }                                                
                }

                var marca = document.getElementById("mark").value;
                axios.delete(baseUrl + '/deleteMarca/' + userName + '/' + libro.id + '/' + marca + '/');

                axios.get(baseUrl + '/Usuarios/').then(res =>{
                    var usuario;
                    for(var i = 0; i < res.data.length; i++){
                        if(userName === res.data[i].nomUsuario){
                            usuario = res.data[i];
                        }
                    }

                    for(i = 0; i < marcas.length; i++){
                        if(marcas[i].nombre !== marca && libro.id === marcas[i].libro && usuario.id === marcas[i].usuario && marcas[i].esUltimaLeida === false){
                            var element = document.getElementById("marks");
                            node = document.createElement("option");
                            textNode = document.createTextNode(marcas[i].nombre);
                            node.appendChild(textNode);
                            element.appendChild(node);
                        }
                    }
                });
            });
        });
    }


    searchWord(){
        if(accion === 1){
            var page = textopag.pagina-1;
        }else if(accion === 2){
            page = textopag.pagina+1;
        }else{
            page = textopag.pagina;
        }
        var palabra = document.getElementById("word").value;
        if(palabra === ''){
            alert("The search field is empty")
        }else{
            axios.get(baseUrl + '/leerLibro/' + libroName + '/' + page).then(res=>{  
                var texto = res.data.contenido.split(" ");
                var texto2 = "", element, node2, textNode2;

                element = document.getElementById("contenidoLibro");
                node = document.createElement("p"); 
                element.removeChild(element.childNodes[0])
                for(var i = 0; i < texto.length; i++){
                        //Tiene que ser con doble igual, no triple
                        if(texto[i].toLowerCase() === palabra.toLowerCase()){     
                            textNode = document.createTextNode(texto2);
                            node2 = document.createElement("mark");
                            textNode2 = document.createTextNode(texto[i])
                            node.appendChild(textNode);
                            node2.appendChild(textNode2);
                            node.appendChild(node2);
                            texto2 = "";
                        }else{
                            texto2 = texto2 + " " + texto[i];
                        }
                        
                    }
                    textNode = document.createTextNode(texto2);
                    node.appendChild(textNode);
                    element.appendChild(node);
            })
        }
    }

    jumpMark(){
        var marca = document.getElementById("marks");
        var mark;


        axios.get(baseUrl + '/MarcasUsuario/' + userName + '/')
        .then(res =>{
            for(var i = 0; i < res.data.length; i++){
                if(res.data[i].nombre === marca.value){
                    mark = res.data[i];
                }
            }

            textopag2 = textopag;

        axios.get(baseUrl + '/leerLibro/' + libroName + '/' + mark.pagina).then(res=>{
            textopag = res.data;
        })
        var element = document.getElementById("contenidoLibro");
        node = document.createElement("div");
        textNode = document.createTextNode(textopag.contenido);
        node.appendChild(textNode);
        element.replaceChild(node, element.childNodes[0]);

        element = document.getElementById("pag");
        node2 = document.createElement("h4");
        textNode2 = document.createTextNode("Pagina " + textopag.pagina);
        node2.appendChild(textNode2);
        element.replaceChild(node2, element.childNodes[0]);
        pag = textopag.pagina;
        });
        
    }

    sendRate(){
        let rate = {valoracion: parseInt(document.getElementById("myRate").value)};
        if(rate.valoracion == ''){
            alert("The rate field is empty")
        }else{
            if(rate.valoracion >= 0 && rate.valoracion <= 5){
                axios.put(baseUrl + "/valorarLibro/" + libroName + "/", rate)
            }
        }
    }


    render() {
        return (
            <div>
                <Link className="back-btn-book" to={"/library-epub"}><img src={goBackBtn}></img></Link>
                <br></br>
            <div className="book-grid">
            <div onSubmit={this.handleSubmit}>
                <div class="btn-group btn-group-lg center-buttons" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-primary" onClick={this.changeSize}>Tamaño</button>
                    <button type="button" class="btn btn-outline-primary" onClick={this.changeFont}>Fuente</button>
                    <button type="button" class="btn btn-outline-primary" onClick={this.changeColor}>Color de fondo</button>
                </div>
                <p></p>
                <div className="inline-block">
                    <div className="inline-block-child">
                        <input className="form-input" type="text" id="word" size="20" placeholder="Busca una palabra..."></input>
                    </div>
                    <div className="inline-block-child">    
                        <button type="button" className="basic-btn2" onClick={this.searchWord}>Buscar</button>
                    </div>
                    <div class="inline-block-child">
                        <input className="form-input" type="text" id="mark" size="20" placeholder="Marca"></input>
                    </div>
                    <div className="inline-block-child">    
                        <button type="button" class="basic-btn" onClick={this.saveMark}>Guardar</button>
                        <button type="button" class="basic-btn-del" onClick={this.removeMark}>Borrar</button>
                    </div>
                </div>
                <p></p>
                <div className="inline-block">
                    <div class="inline-block-child">
                        <select class="form-input" name="Marks" id="marks"></select>
                    </div>
                    <div className="inline-block-child">
                        <button type="button" className="basic-btn-mark" onClick={this.jumpMark}>Ir a la marca</button>
                    </div>
                </div>
                
                <br/><br/>
                <div>
                    <nav>
                        <h2 id="contLib">{this.state.texto.libro}</h2>
                        <div id="contenidoLibro">{this.state.texto.contenido}</div>

                        <br/>
                        <div class="btn-group btn-group-lg center-buttons" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={this.previouspage}>Anterior</button>
                            <button disabled="true" type="button" class="btn btn-outline-primary btn-sm" id="pag"></button>
                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={this.nextpage}>Siguiente</button>
                        </div>
                        <p></p>
                        <div class="inline-block">
                            <div class="inline-block-child">
                                <input className="form-input" type="text" id="mark" size="20" placeholder="Ir a la página..."></input>
                            </div>
                            <div className="inline-block-child">    
                                <button type="button" class="basic-btn2" onClick={this.changePag}>Ir</button>
                            </div>
                            <div class="inline-block-child">
                                <input className="form-input" type="text" id="mark" size="20" placeholder="Introducir valoración (mín 1, máx 5)"></input>
                            </div>
                            <div className="inline-block-child">    
                                <button type="button" class="basic-btn-rating" onClick={this.sendRate}>Enviar</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

class EpubViewer extends Component{

    render(){
        const history = this.props.history;
        return(
            <div className="Epub">
                <Epub history={history} />
            </div>
        );
    }
}

export default withRouter(EpubViewer);