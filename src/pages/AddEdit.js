// Importera paket och bibliotek
import React, {useState, useEffect } from 'react'
import { useNavigate, useParams} from "react-router-dom"
import "./AddEdit.css"
import { toast } from 'react-toastify';

// Initiala värden
let initialState = {
    title: "",
    director: "",
    year: "",
    imdb: "",
    review: ""
};

const AddEdit = () => {
    // Deklarera state till de initiala värdena
    const [state, setState] = useState(initialState);
    const { title, director, year, imdb, review } = state;
    // Objekt som kommer användas för att skapa och uppdatera filmer
    const newMovie = { "title": title, "director": director, "year": year, "imdb": imdb, "review": review }

    // Hämta medskickat ID från parameter i URL
    const { id } = useParams();

    // Kontrollera om det finns ett medskickat ID
    useEffect(() => {
        if(id) {
            getSingleMovie(id);
        }
    }, [id])

    // Funktion för att hämta data från en specifik film
    const getSingleMovie = async (id) => {
        // Get fetch-anrop till webbtjänsten
        fetch(`https://dt162g-test.herokuapp.com/movies/${id}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            // Applicera hämtad data till de initiala värdena (initial state)
            setState({ title: data.title, 
                director: data.director, 
                year: data.year, 
                imdb: data.imdb, 
                review: data.review});
        })
    };
    
    const navigate = useNavigate();

    // Funktion för att lägga till en film
    const addMovie = async (newMovie) => {
        // Fetch anrop med post-metod
        fetch('https://dt162g-test.herokuapp.com/movies', {
            method: 'POST',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Skriv ut meddelande till användare
        .then(toast.success("Film tillagd!"));
    };

    // Funktion för att uppdatera en film
    const updateMovie = async (newMovie, id) => {
        // Fetch anrop med patch-metod
        fetch('https://dt162g-test.herokuapp.com/movies/' + id, {
            method: 'PATCH',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Skriv ut meddelande till användare
        .then(toast.success("Film uppdaterad!"));
    };

    // Funktion som körs när formulär submit-knapp klickas i formulär
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kontrollera att inputfält inte är tomma
        if(!title || !director || !year || !imdb || !review) {
            toast.error("Vänligen fyll i alla fält!");
        } else {
            // Kontrollera att inputfält "ÅR" endast är siffror
            if (!/^\d+$/.test(year)) {
                toast.error("År får bara innehålla siffror");
            } else {
        if(!id) {
            // Lägg till film om inget ID är medskickat
            addMovie(newMovie);
        } else {
            // Uppdatera film om det finns medskickat ID
            updateMovie(newMovie, id);
        }
            // Navigera användaren tillbaka till startsidan efter en halv sekund. 
            setTimeout(() => navigate("/"), 500);
        }
    }
    };

    // Funktion för ändring av värden i inputfält
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div>
            {/* Formulär */ }
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
