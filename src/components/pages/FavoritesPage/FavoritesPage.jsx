import { motion } from "framer-motion";
import { useFavorites } from "../../../context/FavoritesContext";
import MovieCard from "../../movies/MovieCard/MovieCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Favorite Movies
      </motion.h1>

      {favorites.length === 0 ? (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>No favorites yet</h2>
          <p>Start adding movies to your favorites!</p>
        </motion.div>
      ) : (
        <motion.div
          className={styles.movieGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isFavorite={true} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FavoritesPage;
