import React, { useState, useEffect }from 'react'
import { useParams, Link} from 'react-router-dom'
import axios from 'axios'
import './View.css'

let initialState = {
    title: "",
    director: "",
    year: "",
    imdb: "",
    review: ""
};

const View = () => {
    const [movie, setMovie] = useState(initialState);

    const { id } = useParams();

    useEffect(() => {
        if(id) {
            getSingleMovie(id);
        }
    }, [id])

    const getSingleMovie = async (id) => {
        const response = await axios.get(`https://dt162g-test.herokuapp.com/movies/${id}`);
        if(response.status === 200) {
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
