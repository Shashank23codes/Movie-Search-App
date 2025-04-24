import React from 'react'
import Search from './components/Search.jsx'
import { useEffect, useState } from 'react';
// debounce - a technique used in programming to delay the execution of a function until a certain amount of time has passed without any new function calls.
import { useDebounce } from 'react-use';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

// API - Application Programming Interface - a way for two applications to talk to each other
// API key - a string that uniquely identifies your application to the API
// API endpoint - the URL that you make your request to
// API request - the actual request that you make to the API
// API response - the response that the API sends back to you

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  // useState - a React hook that allows you to add state to your functional components
  // useState returns an array with two elements: the current state value and a function to update it
  // State variable for the search term
  const [debouncedSarchTerm, setDebouncedSarchTerm]  = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // State variables for the movies
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State variable for the trending movies
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingError, setTrendingError] = useState('');
  const [istrendingLoading, setIsTrendingLoading] = useState(false);

  // Debounce - the search term is debounced so that the API request is not made on every keystroke
  // by waiting for the user to stop typing for a certain amount of time in our case 500ms
  useDebounce(() => setDebouncedSarchTerm(searchTerm), 500, [searchTerm]);

// function to fetch movies from the API
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      // throw an error to test the error handling
      if (!response.ok) {
        throw new Error(`Failed to fetch movies.`);
      }
      
      const data = await response.json();
      // console.log(data);
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies.');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  // fetch trending movies
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingError(`Error fetching trending movies. Please try again later.: ${error}`);
    } finally {
      setIsTrendingLoading(false);
    }
  }

  // useEffect - a React hook that allows you to perform side effects in your functional components
  // useEffect runs after every render of your component
  // useEffect takes two arguments: a function to run and an array of dependencies
  // useEffect will run the function if the dependencies have changed
  useEffect(() => {
    fetchMovies(debouncedSarchTerm);
  }, [debouncedSarchTerm]);

  // useEffect to fetch trending movies
  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero-banner' />

          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {istrendingLoading ? (
          <section className='trending'>
            <h2>Tredning Movies</h2>
            <Spinner />
          </section>
        ) : trendingError? (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <p className='text-red-500'>{trendingError}</p>
          </section>
        ) : trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ?(
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movieList.map((movie) => (    
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) }

        </section>
      </div>
    </main>
  )
}

export default App
