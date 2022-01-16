import React, {useState, useEffect } from 'react'
import { useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css"
import { toast } from 'react-toastify';

let initialState = {
    title: "",
    director: "",
    year: "",
    imdb: "",
    review: ""
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { title, director, year, imdb, review } = state;
    const newMovie = { "title": title, "director": director, "year": year, "imdb": imdb, "review": review }

    const { id } = useParams();

    useEffect(() => {
        if(id) {
            getSingleMovie(id);
        }
    }, [id])

    const getSingleMovie = async (id) => {
        fetch(`https://dt162g-test.herokuapp.com/movies/${id}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setState({ title: data.title, 
                director: data.director, 
                year: data.year, 
                imdb: data.imdb, 
                review: data.review});
        })
    };
    
    const navigate = useNavigate();

    const addMovie = async (newMovie) => {
        fetch('https://dt162g-test.herokuapp.com/movies', {
            method: 'POST',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(toast.success("Film tillagd!"));
    };

    const updateMovie = async (newMovie, id) => {
        fetch('https://dt162g-test.herokuapp.com/movies/' + id, {
            method: 'PATCH',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(toast.success("Film uppdaterad!"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !director || !year || !imdb || !review) {
            toast.error("Vänligen fyll i alla fält!");
        } else {
            if (!/^\d+$/.test(year)) {
                toast.error("År får bara innehålla siffror");
            } else {
        if(!id) {
            addMovie(newMovie);
        } else {
            updateMovie(newMovie, id);
        }
            setTimeout(() => navigate("/"), 500);
        }
    }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    return (
        <div>
            <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
                <label htmlFor='title'>Titel</label>
                <input type="text" id="title" name="title" placeholder="Fyll i titel..." onChange={handleInputChange} defaultValue={title}/>

                <label htmlFor='director'>Regisör</label>
                <input type="text" id="director" name="director" placeholder="Fyll i regisör..." onChange={handleInputChange} defaultValue={director}/>

                <label htmlFor='year'>År</label>
                <input type="text" id="year" name="year" placeholder="Fyll i år..." onChange={handleInputChange} defaultValue={year}/>

                <label htmlFor='imdb'>IMDB</label>
                <input type="text" id="imdb" name="imdb" placeholder="Fyll i imdb..." onChange={handleInputChange} defaultValue={imdb}/>

                <label htmlFor='review'>Recension</label>
                <input type="text" id="review" name="review" placeholder="Fyll i review..." onChange={handleInputChange} defaultValue={review}/> 

                <input type="submit" value={id ? "Uppdatera" : "Lägg till"} />
            </form>
        </div>
    )
}

export default AddEdit
