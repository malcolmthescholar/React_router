import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Movielist from './components/Movielist';
import Filter from './components/Filter';


const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Fast x',
      description: 'Action, Family',
      posterURL: 'https://movies.universalpictures.com/media/fstx-montage1sheet2-rgb-1-64108e93e63dd-1.jpg',
      rating: 6,
      videoLink: 'https://www.youtube.com/embed/eoOaKN4qCKw'

    },
    // Add more movies here...
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilter = (filterType, filterValue) => {
    let filtered = movies;

    if (filterType === 'title') {
      filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterType === 'rating') {
      filtered = movies.filter((movie) => movie.rating >= filterValue);
    }

    setFilteredMovies(filtered);
  };

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    setFilteredMovies([...movies, newMovie]);
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 0,
    videoLink: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMovie(formData);
    setFormData({
      title: '',
      description: '',
      posterURL: '',
      rating: 0,
      videoLink: '',
    });
  };

  return (
    <div className="app" style={{textAlign: 'center'}}>
      <h1>My Movie App</h1>
      <Link to = '/'>Home</Link>
      <Outlet />
    
      <Filter handleFilter={handleFilter} />
      <Movielist movies={filteredMovies} />

      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <br />
        <label>
          Poster URL:
          <input
            type="text"
            name="posterURL"
            value={formData.posterURL}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleInputChange}
            required
          />
        </label>
        <br/>
        <label>
          Trailer-link:
          <input 
          type = 'string'
          name = 'videoLink'
          value = {formData.videoLink}
          onChange={handleInputChange}
          
          />
        </label>
        <br />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default App;