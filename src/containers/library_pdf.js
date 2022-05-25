import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../css/App.css";
import uploadPDF from "../bootstrap-icons/file-earmark-arrow-up.svg"
import goToBooks from "../bootstrap-icons/book.svg"
import pdfIcon from "../images/pdf_icon.png"
import goBackBtn from "../bootstrap-icons/arrow-left.svg"

const urlPDF = "https://db-itreader-unizar.herokuapp.com/itreaderApp/DocumentosUser/"
const leerPDF = "https://db-itreader-unizar.herokuapp.com/itreaderApp/leerLibro/"
const urlDelDoc = "https://db-itreader-unizar.herokuapp.com/itreaderApp/deleteDocUsuario/"


function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 12;
  const pagesVisited = pageNumber * booksPerPage;
  
  let history = useHistory();
  useEffect(() => {
    const nombreusuario = localStorage.getItem('nomUsuario')
    const fetchBooks = async () => {
        const { data } = await axios.get(urlPDF + nombreusuario)
        setBook(data);
      }; 
      fetchBooks();
      return () => {
        //
      };
    }, []);
    
    const handleDeleteDoc = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      console.log(nombreUser)
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        console.log(book.nombre)
        console.log(nombreUser)
        axios.put(urlDelDoc + nombreUser + "/", {nomLibro: book.nombre})
        window.location.href = '/library-pdf';
      }
    }

    const handleLeerDoc = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      console.log(nombreUser)
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        const libro = localStorage.setItem('nomLibro', book.nombre)
        console.log(libro)
        console.log(nombreUser)
        axios.get(leerPDF + book.nombre + ".pdf" + "/1")
        //window.location.href = '/library-pdf';
        .then (response=>{
          console.log(response.data.libro);
          console.log(response.data.pagina);
          console.log(response.data.contenido);
          window.location.href = response.data.contenido;
        })
        .catch(error => {
            alert("Libro imposible de leer.")
        })
      }
    }

    const handleShare = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      console.log(nombreUser)
      localStorage.setItem('nomLibro', book.nombre)
      const libro = localStorage.getItem('nomLibro')
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        localStorage.setItem('nomLibro', book.nombre)
        const libro = localStorage.getItem('nomLibro')
        console.log(libro)
        console.log(nombreUser)
        //axios.get(leerLibro + book.nombre + ".pdf" + "/1")
        window.location.href = '/share';
      }
    }

    const displayBooks = book
          .slice(pagesVisited, pagesVisited + booksPerPage)
          .map((book) => {
            return (
              <div className="contenido">
                <div className="ui grid container" key={book.id}>
                  <Link to={'/book/' + book.id}>
                    <div className="ui link cards">
                      <div className="card">
                        <div className="image">
                          <img
                            width="20" 
                            height="20"
                            className="book-image"
                            src={pdfIcon}
                            alt="book"
                          />
                        </div>
                        <div className="content">
                          <div className="header">
                            <Link to={'/book/' + book.id}></Link>
                          </div>
                          <div className="meta price">{book.nombre}</div>
                          <div className="meta autor">{book.formato}</div>
                          <div className="meta edit">{book.linkDocumento}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div class="d-grid gap-2">
                    <button type="submit" onClick={() => handleDeleteDoc(book)} className="btn btn-danger btn-lock btn-lg">Eliminar de la librería</button>
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" onClick={() => handleLeerDoc(book)} className="btn btn-success btn-lock btn-lg">Leer</button>
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" onClick={() => handleShare(book)} className="btn btn-warning btn-lock btn-lg">Compartir</button>
                  </div>
                </div>
              </div>
            );
          });
    const pageCount = Math.ceil(book.length / booksPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
      <div className="ui grid container">
      <h1>MIS DOCUMENTOS</h1>
      <div>
        <button className="back-btn" onClick={() => history.goBack()}><img src={goBackBtn}></img></button>
      </div>
      <div>
        <br></br>
        <h5><Link className="pdf-btn" to={"/book-upload"}><img src={uploadPDF} width="30" height="30"></img>Subir documento</Link></h5>
        <h5><Link className="pdf-btn" to={"/library-epub"}><img src={goToBooks} width="30" height="30"></img>Ir a mis libros</Link></h5>
      </div> 
      <grid-section>
        {displayBooks}
      </grid-section>
      <br></br>
      <br></br>
        <ReactPaginate
          previousLabel={"<--"}
          nextLabel={"-->"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
    </div>
  );
};

export default HomeScreen;
