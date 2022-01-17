// Importera paket och bibliotek
import React, { useState, useEffect }from 'react'
import { useParams, Link} from 'react-router-dom'
import axios from 'axios'
import './View.css'

// Initiala värden
let initialState = {
    title: "",
    director: "",
    year: "",
    imdb: "",
    review: ""
};

const View = () => {
    // Deklarera state "movie" till de initiala värdena
    const [movie, setMovie] = useState(initialState);

    // Hämta medskickat ID från parametrar i URLen
    const { id } = useParams();

    // Hämta specifik film från webbtjänst om det finns medskickat ID
    useEffect(() => {
        if(id) {
            getSingleMovie(id);
        }
    }, [id])

    // Funktion för att hämta specifik post från webbtjänsten
    const getSingleMovie = async (id) => {
        // Get-request till webbtjänst
        const response = await axios.get(`https://dt162g-test.herokuapp.com/movies/${id}`);
        if(response.status === 200) {
            // Ge nya värden till state "movie"
            setMovie({ title: response.data.title, director: response.data.director, year: response.data.year, imdb: response.data.imdb, review: response.data.review});
        }
    }; 

    return (
        <div>
            <div className='card'>
                <div className='card-header'>
                    <p>Filmdetaljer</p>
                </div>
                <div className='container'>
                    <strong>Titel: </strong>
                    <strong>{movie.title}</strong>
                    <br />
                    <br />
                    <strong>Regisör: </strong>
                    <strong>{movie.director}</strong>
                    <br />
                    <br />
                    <strong>År: </strong>
                    <strong>{movie.year}</strong>
                    <br />
                    <br />
                    <strong>IMDB: </strong>
                    <strong>{movie.imdb}</strong>
                    <br />
                    <br />
                    <strong>Recension: </strong>
                    <strong>{movie.review}</strong>
                    <br />
                    <br />
                    <Link to="/">
                        <button className='btn btn-edit'>Gå tillbaka</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View
