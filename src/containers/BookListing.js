import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import "../css/App.css";

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Libros/";
const urlAddBook = "https://db-itreader-unizar.herokuapp.com/itreaderApp/addDocsUsuario/";

function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 12;
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

    const handleAdd2Lib = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      console.log(nombreUser)
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        console.log(book.nombre)
        console.log(nombreUser)
        axios.put(urlAddBook + nombreUser + "/", {nomLibro: book.nombre}) 
        window.location.href = '/library-epub';
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
                    <button type="submit" onClick={() => handleAdd2Lib(book)} className="btn btn-primary btn-lock btn-lg">Añadir a la librería</button>
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