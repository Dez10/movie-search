export const API_KEY = "dea5019f7f916a679bd081c6903a37e1";
export const BASE_URL = "https://api.themoviedb.org/3";
export const API_URL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&api_key=" + API_KEY;
export const IMG_URL = "https://image.tmdb.org/t/p/w500";
export const searchURL = BASE_URL + "/search/movie?api_key=" + API_KEY;

export const movieAPI = {
  getDetails: (movieId) =>
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,reviews,release_dates`,

  getVideos: (movieId) =>
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,

  getRecommendations: (movieId) =>
    `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`,

  getCast: (movieId) =>
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,

  getReviews: (movieId) =>
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
};

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
