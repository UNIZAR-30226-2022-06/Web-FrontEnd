import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../App.css"

const baseUrl = "https://db-itreader-unizar.herokuapp.com/itreaderApp/Usuarios/";

function HomeScreen (props) {

  const [user, setUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    const fetchUsers = async () => {
        const { data } = await axios.get(baseUrl)
        setUser(data);
      }; 
      fetchUsers();
      return () => {
        //
      };
    }, []);
    
    const nombreusuario = localStorage.getItem('nomUsuario')
    console.log(nombreusuario)
    const displayUsers = user
          .slice(pagesVisited, pagesVisited + usersPerPage)
          .map((user) => {
            if(user.nomUsuario == nombreusuario){
            return (
              <div className="contenido">
                <div className="ui grid container" key={user.id}>
                  <Link to={'/user/' + user.id}>
                    <div className="ui link cards">
                      <div className="card">
                        <div className="image">
                        </div>
                        <div className="content">
                          <div className="header">
                            <Link to={'/product/' + user.id}></Link>
                          </div>
                          <div className="meta price">{user.nombre}</div>
                          <div className="meta autor">{user.nomUsuario}</div>
                          <div className="meta edit">{user.correo}</div>
                          <div className="meta edit">{user.password}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
            }
        });
    const pageCount = Math.ceil(user.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
      <div className="ui grid container">
      <h1>CATÁLOGO DE LIBROS</h1>
      <grid-section>
        {displayUsers}
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
