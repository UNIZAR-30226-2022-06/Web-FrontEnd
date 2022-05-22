import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../App.css"

function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 10;
  const pagesVisited = pageNumber * booksPerPage;

  useEffect(() => {
    const fetchBooks = async () => {
        const { data } = await axios.get("https://db-itreader-unizar.herokuapp.com/itreaderApp/Libros/")
        setBook(data);
      }; 
      fetchBooks();
      return () => {
        //
      };
    }, []);
    
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
                            src={book.linkPortada}
                            alt="book"
                          />
                        </div>
                        <div className="content">
                          <div className="header">
                            <Link to={'/product/' + book.id}></Link>
                          </div>
                          <div className="meta price">{book.autor}</div>
                          <div className="meta">{book.editorial}</div>
                          <div className="meta">{book.valoracion}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div class="d-grid gap-2">
                    <a type="submit" className="btn btn-primary btn-lock btn-lg" href={"/library"}>Añadir a la librería</a>
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
      {displayBooks}
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