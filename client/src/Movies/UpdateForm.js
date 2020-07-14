import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

export default function UpdateForm(props) {

    const {push} = useHistory();
    const {id} = useParams();
    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = e => {
        e.persist()
        setMovie({
            ...movie,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitUpdate = e => {
        e.preventDefault();
        axios
            .put(`/api/movies/${id}`, movie)
            .then(res => {
                console.log(res)
                props.setMovieList(res.data)
                push(`/movies/`)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
           <h2>Update Movie</h2>
           <form onSubmit={handleSubmitUpdate}>
               <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                    />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                    />
                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                    />
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={movie.stars}
                    />
                <button>Update</button>
           </form>
        </div>
    )
}
