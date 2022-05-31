import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/App.css";

import bookAdd from "../bootstrap-icons/plus-circle.svg"

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Libros/";
const urlDelBook = "https://db-itreader-unizar.herokuapp.com/itreaderApp/deleteLibro/";

function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 20;
  const pagesVisited = pageNumber * booksPerPage;

  useEffect(() => {
    const fetchBooks = async () => {
        const { data } = await axios.get(baseUrl)
        setBook(data);
      }; 
      fetchBooks();
      return () => {
        //
      };
  }, []);

  const handleDelBook = (book) => {
    const nombreUser = localStorage.getItem('nomUsuario')
    console.log(nombreUser)
    if(localStorage.length == 0){
      window.location.href = '/sign-in';
    }
    else{
      console.log(book.nombre)
      console.log(nombreUser)
      Swal.fire({
        title: '¿Deseas borrar el libro?',
        text: "¡Los cambios serán irreversibles!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(urlDelBook + book.nombre + "/")
          Swal.fire(
            '¡Borrado!',
            'El libro ha sido eliminado del catálogo.',
            'success'
            )
            window.location.href = '/admin-catalogue';
          }
      })      
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
                    <button type="submit" onClick={() => handleDelBook(book)} className="btn btn-danger btn-lock btn-lg">Eliminar del catálogo</button>
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
      <h1>CATÁLOGO DE LIBROS</h1>
      <h5><Link className="pdf-btn" to={"/book-add"}><img src={bookAdd} width="30" height="30"></img>Añadir libro al catálogo</Link></h5>
      <grid-section>
        {displayBooks}
      </grid-section>
      <br></br>
      <br></br>
      <div className="pagination-grid">
        <ReactPaginate
          previousLabel={"<<<"}
          nextLabel={">>>"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
