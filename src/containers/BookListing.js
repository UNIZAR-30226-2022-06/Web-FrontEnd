import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import "../css/App.css";
import "../css/style.css";
import Rating from '@mui/material/Rating';

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Libros/";
const urlAddBook = "https://db-itreader-unizar.herokuapp.com/itreaderApp/addDocsUsuario/";

function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 20;
  const pagesVisited = pageNumber * booksPerPage;

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
        const { data } = await axios.get(baseUrl)
        setBook(data);
      }; 
      fetchBooks();
  }, []);

  const handleAdd2Lib = (book) => {
    const nombreUser = localStorage.getItem('nomUsuario')
    console.log(nombreUser)
    if(localStorage.length === 0){
      window.location.href = '/sign-in';
    }
    else{
      console.log(book.nombre)
      console.log(nombreUser)
      axios.put(urlAddBook + nombreUser + "/", {nomLibro: book.nombre}) 
      Swal.fire({
        title: '¡Añadido!',
        text: "Puedes leer el libro en cualquier momento accediendo a tu biblioteca.",
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Llévame a mi biblioteca!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/library-epub';
        }
      })
    }
  }

  console.log(filter)

  const displayBooks = book
          .filter((value) => { 
            if(filter === ""){
              return value;
            } else if (
              value.nombre.toLowerCase().includes(filter.toLocaleLowerCase()) ||
              value.autor.toLowerCase().includes(filter.toLocaleLowerCase()) ||
              value.editorial.toLowerCase().includes(filter.toLocaleLowerCase())
            ) {
              return value;
            }
          })
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
                          <Rating name="half-rating-read" defaultValue={book.valoracion} size="large" precision={0.25} readOnly />({book.numValoraciones})
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
      <p></p>
      <div>
        <input 
          type="search" 
          className="search-box" 
          placeholder="Busca un libro aquí..." 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
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
