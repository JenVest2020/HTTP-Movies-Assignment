import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [dependency, setDependency] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    setDependency(false)
  }, [dependency]);

  return (
    <>

      <SavedList list={savedList} />

      <Route exact path="/movies">
        <MovieList movies={movieList} setDependency={setDependency} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movies={movieList} dependency={dependency} setDependency={setDependency} />
      </Route>
      <Route path='/update-movie/:id'
        render={() => {
          return <UpdateForm movie={movieList} dependency={dependency} setDependency={setDependency} />
        }} />
    </>
  );
};

export default App;
