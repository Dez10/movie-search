import { useState } from "react";
import { motion } from "framer-motion";
import { IMG_URL } from "../../../services/api";
import { useFavorites } from "../../../context/FavoritesContext";
import MovieOverlay from "../MovieOverlay/MovieOverlay";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const { title, poster_path, vote_average, overview, release_date } = movie;

  const getColor = (vote) => {
    if (vote >= 8) return styles.green;
    if (vote >= 5) return styles.orange;
    return styles.red;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <>
      <motion.div
        className={styles.movie}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          className={`${styles.favoriteButton} ${
            isMovieFavorite ? styles.favorited : ""
          }`}
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMovieFavorite ? "❤️" : "🤍"}
        </motion.button>

        <img
          src={
            poster_path
              ? `${IMG_URL}${poster_path}`
              : "https://placehold.co/400x600/png"
          }
          alt={title}
          loading="lazy"
        />
        <div className={styles.movieInfo}>
          <div className={styles.titleContainer}>
            <h3>{title}</h3>
            <span className={styles.releaseDate}>
              {formatDate(release_date)}
            </span>
          </div>
          <motion.span
            className={getColor(vote_average)}
            whileHover={{ scale: 1.1 }}
          >
            {vote_average.toFixed(1)}
          </motion.span>
        </div>
        <div className={styles.overview}>
          <h3>Overview</h3>
          <p>{overview}</p>
          <motion.button
            className={styles.knowMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOverlay(true)}
          >
            Know More
          </motion.button>
        </div>
      </motion.div>
      {showOverlay && (
        <MovieOverlay
          movieId={movie.id}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
