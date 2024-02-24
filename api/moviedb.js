import axios from "axios";
import { apiKey } from "../constants";
import { err } from "react-native-svg";
const fetch = require('node-fetch');

const baseUrl='https://api.themoviedb.org/3';
//api end points
const trendingMoviesEndpoint=`${baseUrl}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingEndpoint=`${baseUrl}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
const topRatedEndpoint=`${baseUrl}/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;
const searchMovieEndpoint=`${baseUrl}/search/movie?include_adult=false&language=en-US&page=1&api_key=${apiKey}`

const movieDetailEndpoint=id=>`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`;
const creditDetail=id=>`${baseUrl}/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
const personDetail=id=>`${baseUrl}/person/${id}?api_key=${apiKey}&language=en-US`;
const personMovieDetail=id=>`${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}&language=en-US';`
export const fallBackMovie="https://myloview.com/wall-mural-movie-and-film-modern-retro-vintage-poster-background-no-79D339C";
export const fallBackPerson="https://img.myloview.com/murals/monochrome-icon-400-28749300.jpg";

export const image500=path=>path?`https://image.tmdb.org/t/p/w500${path}`:null;
export const image342=path=>path?`https://image.tmdb.org/t/p/w342${path}`:null;
export const image185=path=>path?`https://image.tmdb.org/t/p/w185${path}`:null;

const apiCall=async(endpoint)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2UyY2M5MDFlZWRmMTVjMmEyOTFlZTMzNjQ5NDZiNyIsInN1YiI6IjY1ZDlkNzBmOWQ4OTM5MDE4NWRiNTkxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ay3Sn6lYaeVxK3BurzZ_PIKRLqcd4bkFJ3iI5ISafuw'
        }
      };
      
      try {
        const response = await fetch(endpoint, options);
        const data = await response.json();
        // console.log(data);
        return data; // Returning the JSON data
    } catch (error) {
        console.error('error', error);
        return {}; // Returning an empty object in case of an error
    }
}

export const fetchTrendingMovies=()=>{
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies=()=>{
    return apiCall(upcomingEndpoint);
}

export const fetchTopRatedMovies=()=>{
    return apiCall(topRatedEndpoint)
}


export const fetchMovieDetail=(id)=>{
    return apiCall(movieDetailEndpoint(id));
}

export const fetchMovieCredit=(id)=>{
    return apiCall(creditDetail(id));
}

export const fetchPersonDetails=(id)=>{
    return apiCall(personDetail(id));
}

export const fetchPersonMovies=(id)=>{
    return apiCall(personMovieDetail(id));
}

export const searchMovies=params=>{
    const str=searchMovieEndpoint+`&query=${params}`;
     return apiCall(str);

}