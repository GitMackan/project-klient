// Importera paket och bibliotek
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Home.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
    // Deklarera state "data"
    const [data, setData] = useState([]);

    // Hämta filmer med getMovies
    useEffect(() => {
        getMovies();
    }, [])

    // Funktion för att hämta filmer från webbtjänst
    const getMovies = async () => {
        // GET-request till webbtjänst
        const response = await axios.get("https://dt162g-test.herokuapp.com/movies");
        if(response.status === 200) {
            setData(response.data);
        }
    };

    // Funktion för att ta bort film från webbtjänst
    const deleteMovie = async (id) => {
        // Be användare bekräfta val
        if(window.confirm("Är du säker på att du vill ta bort denna film?")) {
            // DELETE-request till webbtjänst
            const response = await axios.delete(`https://dt162g-test.herokuapp.com/movies/${id}`);
            if (response.status === 200) {
                // Skriv ut meddelande till användare
                toast.success("Film bortagen!");
                // Uppdatera filmlistan efter borttagen film
                getMovies();
            }
        }
    }

    return (
        <div style={{ marginTop: "50px" }}>
            <table className='home-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Titel: </th>
                        <th style={{textAlign: "center"}}>Regissör: </th>
                        <th style={{textAlign: "center"}}>År: </th>
                        <th style={{textAlign: "center"}}>IMDB: </th>
                        <th style={{textAlign: "center"}}>Mer: </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.director}</td>
                                <td>{item.year}</td>
                                <td><a href={item.imdb} target="blank">Länk</a></td>
                                <td>
                                    <Link to={`/update/${item._id}`}>
                                        <button className='btn btn-edit'>Ändra</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteMovie(item._id)}>Radera</button>
                                    <Link to={`/view/${item._id}`}>
                                        <button className='btn btn-view'>Se mer</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home
