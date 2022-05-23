import React from "react";

import axios from 'axios'
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";

var pag = 0;
var node, node2;
var textNode, textNode2;
var textopag = "", textopag2;
var size = 0, font = 0, color = 0, primera = 0;

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp";

class SignIn extends React.Component {

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
        if(primera === 0){
            var pagina = 0;
            primera = 1;
        }else{
            pagina = textopag.pagina;
        }
       textopag2 = textopag;
        console.log("Pagina " + pagina);
        axios.get(baseUrl + '/leerLibro/libro.epub/' + (pagina+1)).then(res=>{
            //this.state.texto.contenido = res.data.contenido;
            textopag = res.data;
        })
        //console.log(textopag);
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
    }

    previouspage(){
        if(textopag.pagina === 0){
            return
        }
        textopag2 = textopag;
        var pagina = textopag.pagina;
        console.log(pag)
        axios.get(baseUrl + '/leerLibro/libro.epub/' + (pagina-1))
        .then(res=>{
            textopag = res.data;
        })
        console.log(textopag);
        var element = document.getElementById("contenidoLibro");
        console.log(element);
        node = document.createElement("div");
        textNode = document.createTextNode(textopag.contenido);
        node.appendChild(textNode);
        element.replaceChild(node, element.childNodes[0]);

        element = document.getElementById("pag");
        console.log(element);
        node2 = document.createElement("h4");
        textNode2 = document.createTextNode("Pagina " + textopag.pagina);
        node2.appendChild(textNode2);
        element.replaceChild(node2, element.childNodes[0]);
    }


    componentDidMount(){
        if(pag == undefined){
            pag = 1;
        }
        axios.get(baseUrl + '/leerLibro/libro.epub/' + (pag+1))
        .then(res=>{
            const texto = res.data;
            this.setState({texto});
            var element = document.getElementById("contenidoLibro");
            node = document.createElement("div");
            textNode = document.createTextNode(res.data.contenido);
            node.appendChild(textNode);
            element.appendChild.appendChild(node)
            textopag = res.data;

            element = document.getElementById("pag");
            console.log(element);
            node2 = document.createElement("h4");
            textNode2 = document.createTextNode("Pagina " + res.data.pagina);
            node2.appendChild(textNode2);
            element.appendChild(node2)
        })
        
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

        axios.get(baseUrl + '/leerLibro/libro.epub/' + pagina).then(res=>{
            //this.state.texto.contenido = res.data.contenido;
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
    }

    savePage(){
        const marca = {nombre: document.getElementById("mark").value, pagina: textopag.pagina, offset:"0 ", esUltimaLeida:false, usuario:"", libro: textopag.libro}
        axios.post(baseUrl + '/createMarca/', pag)
        .then(response => this.setState({ status: true }));
        this.updateMarks();
    }

    removePage(){
        // axios.post(baseUrl + '/deleteMarca/' + pag, pag)
        // .then(response => this.setState({ status: true }));
        // this.updateMarks();
    }

    updateMarks(){
        axios.post(baseUrl + '/deleteMarca/' + pag, pag)
        .then(response => this.setState({ status: true }));
    }

    searchWord(){
        var palabra = document.getElementById("word").value;
        //console.log(textopag.contenido.search(pagina));
        var texto = textopag2.contenido.split(" ");
        var coincidencia = [], j = 0, txt = "";
        
        for(var i = 0; i < texto.length; i++){
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


    render() {
        return (
            <div onSubmit={this.handleSubmit} className="space">
                <button className="boton" onClick={this.changeSize}><h4>Letter size </h4></button>
                <button type="button" onClick={this.changeFont}><h4> Font </h4></button>
                <button type="button" onClick={this.changeColor}><h4> Background Color </h4></button>
                <input type="text" className="borde" id="word" value="Palabra a buscar"></input>
                <button type="button" onClick={this.searchWord}>Buscar</button><br/>

                <input type="text" className="borde" id="mark" value="Nombre de la marca"></input>
                <button type="button" onClick={this.savePage}><h4>Save Mark</h4></button>
                <button type="button" onClick={this.removePage}><h4>Delete Mark</h4></button>
                <select name="Marks" id="marks"></select>
                <br/><br/>
                <div className="scroll">
                    <nav>
                        <h2>{this.state.texto.libro}</h2>
                        <div id="contenidoLibro">{this.state.texto.contenido}</div>
                        
                        <br/>
                        <h4 id="pag">Pagina </h4>
                        <button onClick={this.nextpage}><h4>Next</h4></button>
                        <button onClick={this.previouspage}><h4>Previous</h4></button><br/>
                        <label>Ir a la pagina: </label>
                        <input type="text" className="borde" id="num"></input>
                        <button type="button" onClick={this.changePag}>Saltar</button>
                    </nav>
                </div>
            </div>
            
        );
    }
}

class Login extends React.Component{
    
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
