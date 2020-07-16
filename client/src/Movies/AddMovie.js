import React, { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function AddMovie(props) {
  const [addMovie, setAddMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const {push} = useHistory();

  const changeHandler = (e) => {
     let addStars = [];
     let value = e.target.value;
     if(e.target.name === 'stars') {
         addStars.push(e.target.value);
         setAddMovie({
             ...addMovie,
             [e.target.name]: value,
             stars: addStars,
         });
     } else {
         setAddMovie({
             ...addMovie,
             [e.target.name] : value,
         });
     }
  };

  const starsHandler = (e, i) => {
      let actors = [...addMovie.stars];
      actors[i] = e.target.value;
      setAddMovie({
          ...addMovie,
          stars: actors,
      })
  }

  const handleAddMovie = (e) => {
      e.preventDefault();
      axios
        .post('http://localhost:5000/api/movies', addMovie)
        .then((res)=> {
            setAddMovie(res.data)
            push('/')
        })
        .catch((err) => console.log(err))
  }
  return (
      <div>
          <h2>Add Movie</h2>
          <form onSubmit={handleAddMovie}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={addMovie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={addMovie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={addMovie.metascore}
        />
        <h3>Actors</h3>
        {addMovie.stars.map((actor, i) => {
          return (
            <input
              key={i}
              type="text"
              name={actor}
              onChange={(e) => starsHandler(e, i)}
              placeholder="actor"
              value={addMovie.stars[i]}
            />
          );
        })}
        <button>Add</button>
      </form>
      </div>
  )
}
