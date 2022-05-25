import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/subirLibro/";

function App() {

	let history = useHistory();
	const [ cover, setCover ] = useState();	
	const nomUser = localStorage.getItem('nomUsuario');

	const newBook = () => {
	  const uploadData = new FormData();
	  uploadData.append('usuario', nomUser);
	  uploadData.append('cover', cover, cover.name);
	  
	  fetch(baseUrl, {
		method: 'POST',
		body: uploadData
	  })
	  .then ( () => {
	  	swal({
		title: "Archivo subido con éxito",
		text: "Comienza a leer!",
		icon: "success"
		}) 	
	  })
	  .catch( () => {
		swal({
		title: "Vaya... ha habido un error.",
		text: "Inténtalo de nuevo",
		icon: "error"
		})
	  })
	}
  
	return (
	  <div className="auth-wrapper">
		<div className="auth-inner">
			<h1>Subir un documento PDF</h1>
			<br/>
			<label>
				<h2>Archivo: </h2>
				<input className="btn-dark" type="file" onChange={(evt) => setCover(evt.target.files[0])}/>
			</label>
			<br/>
			<div  class="d-grid gap-2">
				<button className="btn btn-success btn-lock btn-lg" onClick={() => newBook()}>Importar</button>
			</div>
			<div class="d-grid gap-2">
				<a onClick={() => history.goBack()} className="btn btn-danger btn-lock btn-lg">Volver</a>
			</div>
		</div>
	  </div>
	);
  }
  
  export default App;