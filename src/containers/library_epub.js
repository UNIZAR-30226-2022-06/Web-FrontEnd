import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../css/App.css";

import goToPDF from "../bootstrap-icons/file-earmark-pdf.svg"
import goBackBtn from "../bootstrap-icons/arrow-left.svg"

const urlEPUB = "https://db-itreader-unizar.herokuapp.com/itreaderApp/LibrosUser/"
const leerLibro = "https://db-itreader-unizar.herokuapp.com/itreaderApp/leerLibro/"
const urlDelBook = "https://db-itreader-unizar.herokuapp.com/itreaderApp/deleteLibroUsuario/"

function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 20;
  const pagesVisited = pageNumber * booksPerPage;

  let history = useHistory();
  useEffect(() => {
    const fetchBooks = async () => {
        const nombreusuario = localStorage.getItem('nomUsuario')
        const { data } = await axios.get(urlEPUB + nombreusuario)
        setBook(data);
      }; 
      fetchBooks();
      return () => {
        //
      };
    }, []);
    
    const handleDeleteBook = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      console.log(nombreUser)
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        console.log(book.nombre)
        console.log(nombreUser)
        axios.put(urlDelBook + nombreUser + "/", {nomLibro: book.nombre})
        window.location.href = '/library-epub';
      }
    }

    const handleLeerLibro = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      console.log(nombreUser)
      localStorage.setItem('nomLibro', book.nombre)
      const libro = localStorage.getItem('nomLibro')
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        console.log(libro)
        console.log(nombreUser)
        //axios.get(leerLibro + book.nombre + ".pdf" + "/1")
        window.location.href = '/epub-viewer';
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
                    <div className="ui link cards">
                      <div className="card">
                        <div className="image">
                          <img
                            width="20" 
                            height="20"
                            className="book-image"
                            src={book.linkPortada}
                            alt="book"
                          />
                        </div>
                        <div className="content">
                          <div className="header">
                          </div>
                          <div className="meta price">{book.nombre}</div>
                          <div className="meta autor">{book.autor}</div>
                          <div className="meta edit">{book.editorial}</div>
                        </div>
                      </div>
                    </div>
                  <div class="d-grid gap-2">
                    <button type="submit" onClick={() => handleDeleteBook(book)} className="btn btn-danger btn-lock btn-lg">Eliminar de la librería</button>
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" onClick={() => handleLeerLibro(book)} className="btn btn-success btn-lock btn-lg">Leer</button>
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
      <h1>MIS LIBROS</h1>
      <div>
        <button className="back-btn" onClick={() => history.goBack()}><img src={goBackBtn}></img></button>
      </div>
      <div>
        <br></br>
        <h5><Link className="pdf-btn" to={"/library-pdf"}><img src={goToPDF} width="30" height="30"></img>Ir a mis documentos</Link></h5>
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
