import { useState, useEffect } from "react";
import { API_URL, searchURL } from "../../../services/api";
import MovieCard from "../MovieCard/MovieCard";
import MovieCardSkeleton from "../MovieCard/MovieCardSkeleton";
import styles from "./MovieList.module.css";

const MovieList = ({
  searchQuery,
  selectedGenres,
  currentPage,
  onPageChange,
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = searchQuery
          ? `${searchURL}&query=${searchQuery}&page=${currentPage}`
          : `${API_URL}&page=${currentPage}`;

        if (selectedGenres.length > 0) {
          const genreParam = selectedGenres.join(",");
          url += `&with_genres=${genreParam}`;
        }

        const [response] = await Promise.all([
          fetch(url),
          new Promise((resolve) => setTimeout(resolve, 950)),
        ]);

        const data = await response.json();

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenres, currentPage]);

  return (
    <div className={styles.container}>
      <main className={styles.movieGrid}>
        {loading
          ? // Show 12 skeleton cards while loading
            [...Array(12)].map((_, index) => (
              <MovieCardSkeleton key={`skeleton-${index}`} />
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </main>

      {!loading && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className={styles.currentPage}>{currentPage}</span>
          <button
            className={styles.pageButton}
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
