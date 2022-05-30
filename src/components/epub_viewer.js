import React, { Component } from "react";
import axios from 'axios'
import { withRouter } from "react-router-dom";

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

                var element = document.getElementById("rate");
                node = document.createElement("p");
                textNode = document.createTextNode(libro.valoracion + "/5  El libro tiene " + libro.numValoraciones + " valoraciones");
                node.appendChild(textNode);
                element.appendChild(node);
                
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
                        if(texto[i] === palabra){     
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
                
                axios.get(baseUrl + '/Libros/').then(res =>{
                    console.log("hola")
                    var libro;
                    for(var i = 0; i < res.data.length; i++){
                        if(libroName === res.data[i].nombre){        
                            libro = res.data[i];
                            console.log(libro)
                        }                                                
                    }
    
                    var element = document.getElementById("rate");
                    node = document.createElement("p");
                    textNode = document.createTextNode(libro.valoracion + "/5  El libro tiene " + libro.numValoraciones + " valoraciones");
                    node.appendChild(textNode);
                    element.replaceChild(node, element.childNodes[0]);
                })
            }
        }
    }


    render() {
        return (
            <div className="auth-wrapper">
            <div onSubmit={this.handleSubmit}>
                <button onClick={this.changeSize}><h4>Size</h4></button><labael> </labael>
                <button type="button" onClick={this.changeFont}><h4>Font</h4></button><labael> </labael>
                <button type="button" onClick={this.changeColor}><h4>Background Color</h4></button><labael> </labael>
                <label>Word:</label>
                <input type="text" id="word" size="10"></input>
                <button type="button" onClick={this.searchWord}><h4>Search</h4></button><br/>

                <input type="text" id="mark"></input>
                <button type="button" onClick={this.saveMark}><h4>Save Mark</h4></button><labael> </labael>
                <button type="button" onClick={this.removeMark}><h4>Delete Mark</h4></button><br/><labael> </labael>

                <select name="Marks" id="marks"></select>
                <button onClick={this.jumpMark}><h4>Jump Mark</h4></button>
                
                <br/><br/>
                <div>
                    <nav>
                        <h2 id="contLib">{this.state.texto.libro}</h2>
                        <div id="contenidoLibro">{this.state.texto.contenido}</div>

                        <br/>
                        <h4 id="pag"></h4>
                        <button onClick={this.previouspage}><h4>Previous</h4></button><labael> </labael>
                        <button onClick={this.nextpage}><h4>Next</h4></button><br/>
                        <label>Ir a la pagina: </label>
                        <input type="text" id="num" size="10"></input>
                        <button type="button" onClick={this.changePag}><h4>Go</h4></button><br/>
                        <p>Rate</p>
                        <div id="rate" size="10"></div>
                        <label>My Rate</label>
                        <input id="myRate" size="5"></input>
                        <button type="button" onClick={this.sendRate}><h4>Send</h4></button>
                    </nav>
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