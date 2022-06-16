import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import "../css/App.css";
import Rating from '@mui/material/Rating';

import goToPDF from "../bootstrap-icons/file-earmark-pdf.svg"
import goBackBtn from "../bootstrap-icons/arrow-left.svg"
import deleteIcon from "../bootstrap-icons/trash.svg";
import watchIcon from "../bootstrap-icons/eye.svg";
import shareIcon from "../bootstrap-icons/share.svg";

const urlEPUB = "https://db-itreader-unizar.herokuapp.com/itreaderApp/LibrosUser/"
const urlDelBook = "https://db-itreader-unizar.herokuapp.com/itreaderApp/deleteLibroUsuario/"

function HomeScreen (props) {

  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 20;
  const pagesVisited = pageNumber * booksPerPage;

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
        Swal.fire({
          title: '¿Deseas borrar el libro?',
          text: "Puedes volver a añadirlo en cualquier momento a tu biblioteca.",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, ¡bórralo!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.put(urlDelBook + nombreUser + "/", {nomLibro: book.nombre})
            Swal.fire(
              '¡Borrado!',
              'El libro ha sido eliminado de tu biblioteca.',
              'success'
              )
              window.location.href = '/library-epub';
            }
        })
      }
    }

    const handleLeerLibro = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      localStorage.setItem('nomLibro', book.nombre)
      const libro = localStorage.getItem('nomLibro')
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        window.location.href = '/epub-viewer';
      }
    }

    const handleShare = (book) => {
      const nombreUser = localStorage.getItem('nomUsuario')
      localStorage.setItem('nomLibro', book.nombre)
      const libro = localStorage.getItem('nomLibro')
      if(localStorage.length == 0){
        window.location.href = '/sign-in';
      }
      else{
        localStorage.setItem('nomLibro', book.nombre)
        const libro = localStorage.getItem('nomLibro')
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
                          <Rating 
                            name="read-only" 
                            defaultValue={book.valoracion} 
                            size="large" 
                            precision={0.25}
                            readOnly 
                          />({book.numValoraciones})
                        </div>
                      </div>
                    </div>
                  <div class="btn-button" role="group">
                    <button type="submit" className="small-btn" onClick={() => handleDeleteBook(book)}><img src={deleteIcon} width="30" height="30" ></img></button>
                    <button type="submit" className="small-btn" onClick={() => handleLeerLibro(book)}><img src={watchIcon} width="30" height="30" ></img></button>
                    <button type="submit" className="small-btn" onClick={() => handleShare(book)}><img src={shareIcon} width="30" height="30" ></img></button>
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
        <Link className="back-btn" to={"/catalogue"}><img src={goBackBtn}></img></Link>
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
