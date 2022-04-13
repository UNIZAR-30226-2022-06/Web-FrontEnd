

const baseUrl = "https://precious2021.herokuapp.com";


class FormHBookInformation extends React.Component {

    cookie = new Cookies();

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickName: "",
            password: "",
            cpassword: "",
            nomUsuario: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit = (evento) => {
        //Eliminar libro de la base de datos
        //Enviar puntuación
       
    }

    deleteBook(){
        //Contactar con la base de datos para eliminar libro
    }

    RateBook(){
        //Contactar con la base de datos para puntuar
    }
   

    render() {
        return (
            <div> 
                <div className="contenedor" id="contenedor">
                    <div classNameName="Imagen">
                        <img src="https://i.ibb.co/F3cshp5/portada.png" alt="portada" border="0"/> 
                        <h5>Editorial</h5>
                    </div>

                    <div className="Information">
                        <h2>Titulo libro</h2>
                        <br/>
                        <h4>Autor libro</h4>
                        <br/><br/><br/>
                        <h2>Genero libros</h2>
                        <br/>
                        
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <a href={baseUrl + "libro"} class="save-button">Read it</a>
                    </div>
                </div>

                <div onSubmit={this.handleSubmit}>
                    <h3>Rate it</h3>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    </div>
                    <br/>

                    <a type="submit" className="delete-button" href={""} onClick={this.deleteBook()} >Delete from your library</a>
                </div>
                


            </div>
        )
    }
}

  

class BookInformation extends React.Component {
    render() {
        
        const history = this.props.history;
        return (
            <div classNameName="BookInformation">

                <FormHome history={history}/>
            </div>
        )
    }
}

export default withRouter(home);