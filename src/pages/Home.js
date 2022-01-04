import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Home.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        const response = await axios.get("https://dt162g-test.herokuapp.com/movies");
        if(response.status === 200) {
            setData(response.data);
        }
    };

    const deleteMovie = async (id) => {
        if(window.confirm("Är du säker på att du vill ta bort denna film?")) {
            const response = await axios.delete(`https://dt162g-test.herokuapp.com/movies/${id}`);
            if (response.status === 200) {
                toast.success("Film bortagen!");
                getMovies();
            }
        }
    }

    return (
        <div>
            <table className='home-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Title: </th>
                        <th style={{textAlign: "center"}}>Regisör: </th>
                        <th style={{textAlign: "center"}}>År: </th>
                        <th style={{textAlign: "center"}}>IMDB: </th>
                        <th style={{textAlign: "center"}}>Action: </th>
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
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteMovie(item._id)}>Delete</button>
                                    <Link to={`/view/${item._id}`}>
                                        <button className='btn btn-view'>View</button>
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
