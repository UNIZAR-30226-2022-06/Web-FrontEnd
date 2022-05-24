import React from "react";

import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";

var pag = 0;
var node, node2;
var textNode, textNode2;
var textopag = "", textopag2;
var size = 0, font = 0, color = 0, primera = 0, accion = 0;

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp";

class Epub extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            texto: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleChange = this.handleChange.bind(this)
    }



    handleSubmit = () => {

        console.log("He pulsado boton de registrar");

        this.Next();
    }

    nextpage(){                         
        var marcpag
        axios.get(baseUrl + '/MarcasUsuario/Alvaro')                //storage usuario
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

            textopag2 = textopag;
            axios.get(baseUrl + '/leerLibro/libro1.epub/' + pagina).then(res=>{         //storage libro
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

            const marca = {pagina: textopag.pagina};
            axios.put(baseUrl + '/updateMarcaAndroid/Alvaro/' + textopag.libro + '/', marca);     //storage libro y usuario
            accion = 1;
        });
    }

    previouspage(){                         //Cambiar libro1.epub por storage
        var marcpag
        axios.get(baseUrl + '/MarcasUsuario/Alvaro')            //storage usuario
        .then(res =>{
            for(var i = 0; i < res.data.length; i++){
                if(res.data[i].esUltimaLeida === true){
                    marcpag = res.data[i];
                }
            }

            if(primera === 0){
                console.log(marcpag)
                var pagina = marcpag.pagina;
                primera = 1;
            }else{
                console.log(textopag.pagina);
                pagina = textopag.pagina+1;
            }

            console.log(pagina)
            if(textopag.pagina === 0){
                return
            }
            textopag2 = textopag;
            var pagina = textopag.pagina;
            axios.get(baseUrl + '/leerLibro/libro1.epub/' + (pagina-1))             //storage libro
            .then(res=>{
                textopag = res.data;
            })
            console.log(textopag);
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
            axios.put(baseUrl + '/updateMarcaAndroid/Alvaro/' + textopag.libro + '/', marca);         //storage libro y usuario
            accion = 2;
        });
    }


    componentDidMount(){                
        if(pag == undefined){
            pag = 1;
        }
        axios.get(baseUrl + '/MarcasUsuario/Alvaro/')                //storage usuario y libro
        .then(res =>{
            var marcas = res.data;

            axios.get(baseUrl + '/Libros/').then(res =>{
                var libro;
                for(var i = 0; i < res.data.length; i++){
                    if("libro1.epub" == res.data[i].nombre){        //storage libro
                        libro = res.data[i];
                        console.log(libro);
                    }                                                
                }
                
                axios.get(baseUrl + '/Usuarios/').then(res =>{
                    var usuario;
                    for(var i = 0; i < res.data.length; i++){
                        if("Alvaro" == res.data[i].nomUsuario){             //storage usuario
                            usuario = res.data[i];
                            console.log(usuario)
                        }
                    }

                    var leido = false, marcpag;
                    for(var i = 0; i < marcas.length; i++){
                        console.log(i)
                        if(marcas[i].esUltimaLeida === false && libro.id == marcas[i].libro && usuario.id == marcas[i].usuario){              
                            var element = document.getElementById("marks");
                            node = document.createElement("option");
                            textNode = document.createTextNode(marcas[i].nombre);
                            node.appendChild(textNode);
                            element.appendChild(node);
                            console.log("1")
                        }else{
                            console.log(leido);
                            leido = true;
                        }
                    }

                    if(!leido){
                        //storage usuario y libro, nombre
                        const marca = {nombre: "MarcaPaginaslibro1.epub", pagina: 1, esUltimaLeida: 1, usuario:"Alvaro", libro: "libro1.epub"}  
                        axios.post(baseUrl + '/createMarca/', marca);
                    }

                    for(var i = 0; i < marcas.length; i++){
                        if(marcas[i].esUltimaLeida === true){
                            marcpag = marcas[i];
                        }
                    }

                    axios.get(baseUrl + '/leerLibro/libro1.epub/' + marcpag.pagina)         //storage libro
                    .then(res=>{
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
                var element = document.getElementById("contenidoLibro");
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
        console.log(pagina)

        axios.get(baseUrl + '/leerLibro/libro1.epub/' + pagina).then(res=>{             //storage libro
            textopag = res.data;
        })
        console.log(textopag);
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

        console.log(textopag.pagina);
        console.log(textopag.libro);
        const marca = {pagina: textopag.pagina};
        console.log(marca)
        axios.put(baseUrl + '/updateMarcaAndroid/Alvaro/' + textopag.libro + '/', marca);         //storage libro y usuario
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
        const marca = {nombre: document.getElementById("mark").value, pagina: page, esUlt:0, usuario:"Alvaro", libro: textopag.libro}
        //storage usuario, libro
        axios.post(baseUrl + '/createMarca/', marca);
        // console.log(marca);

        var element = document.getElementById("marks");
        node = document.createElement("option");
        textNode = document.createTextNode(document.getElementById("mark").value);
        node.appendChild(textNode);
        element.appendChild(node);
    }

    removeMark(){
        var element = document.getElementById("marks");
        while(element.length !== 0){
            console.log(element.childNodes[0])
            element.removeChild(element.childNodes[0]);
        }

        var marca = document.getElementById("mark").value;
        axios.delete(baseUrl + '/deleteMarca/Alvaro/1/' + marca + '/');    //storage usuario, libro

        axios.get(baseUrl + '/MarcasUsuario/Alvaro')                //storage usuario
        .then(res =>{
            var marcas = res.data;
            
            axios.get(baseUrl + '/Libros/').then(res =>{
                var libro;
                for(var i = 0; i < res.data.length; i++){
                    if("libro1.epub" == res.data[i].nombre){            //storage libro
                        libro = res.data[i];
                    }                                                
                }

                axios.get(baseUrl + '/Usuarios/').then(res =>{
                    var usuario;
                    for(var i = 0; i < res.data.length; i++){
                        if("Alvaro" == res.data[i].nomUsuario){             //storage usuario
                            usuario = res.data[i];
                        }
                    }

                    for(var i = 0; i < marcas.length; i++){
                        if(marcas[i].nombre !== marca && libro.id === marcas[i].libro && usuario.id == marcas[i].usuario && marcas[i].esUltimaLeida === false){                 ///storage comprobar libro
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
        var palabra = document.getElementById("word").value;
        //console.log(textopag.contenido.search(pagina));
        var texto = textopag2.contenido.split(" ");
        var coincidencia = [], j = 0, txt = "";

        for(var i = 0; i < texto.length; i++){
            //Tiene que ser con doble igual, no triple
            if(texto[i] == palabra){                    
                coincidencia[j] = i;
                j = j + 1;
            }
        }



        console.log(coincidencia)
        if(coincidencia === undefined){
            swal({
                title: "No se ha encontrado la palabra: " + palabra,
                button: "Accept",
            })
        }else{
            for(j = 0; j < coincidencia.length; j++){
                txt = txt + coincidencia[j] + ", ";
            }

            swal({
                title: "Se ha encontrado la palabra: " + palabra,
                text: "Esta en las posiciones " + txt + " del texto",
                button: "Accept",
            })
        }
    }

    jumpMark(){
        var marca = document.getElementById("marks");
        var mark;


        axios.get(baseUrl + '/MarcasUsuario/Alvaro')            //storage usuario
        .then(res =>{
            for(var i = 0; i < res.data.length; i++){
                if(res.data[i].nombre === marca.value){
                    mark = res.data[i];
                    console.log(mark)
                }
            }

            textopag2 = textopag;

        axios.get(baseUrl + '/leerLibro/libro1.epub/' + mark.pagina).then(res=>{      //storage libro
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


    render() {
        return (
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
                        <button onClick={this.nextpage}><h4>Next</h4></button><labael> </labael>
                        <button onClick={this.previouspage}><h4>Previous</h4></button><br/>
                        <label>Ir a la pagina: </label>
                        <input type="text" id="num"></input>
                        <button type="button" onClick={this.changePag}><h4>Go</h4></button>
                    </nav>
                </div>
            </div>

        );
    }
}

class EpubViewer extends React.Component{

    render(){
        const history = this.props.history;
        return(
            <div className="Epub">
                <Epub history={history} />
            </div>
        );
    }
}

export default withRouter(Epub);
