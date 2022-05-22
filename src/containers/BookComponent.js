import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BookComponent = () => {
  const Books = useSelector((state) => state.allBooks.Books);
  const renderList = Books.map((Book) => {
    const { id, autor, editorial } = Book;
    return (
      <div className="four wide column" key={id}>
        <Link to={`/Book/${id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image"></div>
              <div className="content">
                <div className="meta price">$ {autor}</div>
                <div className="meta">{editorial}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default BookComponent;
