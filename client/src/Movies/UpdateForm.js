import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateForm(props) {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (e) => {
    let newStars = [];
    let value = e.target.value;
    if (e.target.name === "stars") {
      newStars.push(e.target.value);
      setMovie({
        ...movie,
        [e.target.name]: value,
        stars: newStars,
      });
    } else {
      setMovie({
        ...movie,
        [e.target.name]: value,
      });
    }
  };

  const starsHandler = (e, i) => {
    let actors = [...movie.stars];
    actors[i] = e.target.value;
    setMovie({
      ...movie,
      stars: actors,
    });
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        props.setMovies(res.data);
        props.getMovieList();
        push("/");
      })
      .catch((err) => console.log(err));
  };
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
        <h3>Actors</h3>
        {movie.stars.map((actor, i) => {
          return (
            <input
              key={i}
              type="text"
              name={actor}
              onChange={(e) => starsHandler(e, i)}
              placeholder="actor"
              value={movie.stars[i]}
            />
          );
        })}
        <button className="home-button">Update</button>
      </form>
    </div>
  );
}
