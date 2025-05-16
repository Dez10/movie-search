import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { genres } from "../../../services/api";
import { useSearchHistory } from "../../../context/SearchHistoryContext";
import SearchHistory from "../../search/SearchHistory/SearchHistory";
import styles from "./Header.module.css";

const Header = ({ onSearch, selectedGenres, onGenreSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { addToHistory } = useSearchHistory();

  const showHomePage = () => {
    document.getElementById("home-link").classList.add("active");
    document.getElementById("search-results").classList.remove("active");
    document.getElementById("search-results").classList.add("hidden");
    setSearchTerm("");
    onGenreSelect([]);
    navigate("/");
  };

  const showSearchResults = (searchTerm) => {
    document.getElementById("home-link").classList.remove("active");
    document.getElementById("search-results").classList.remove("hidden");
    document.getElementById("search-results").classList.add("active");
    document.getElementById(
      "search-results"
    ).textContent = `Search Results: "${searchTerm}"`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      // Save search to history with current genres
      addToHistory(searchTerm, { genres: selectedGenres });
      showSearchResults(searchTerm);
      navigate("/search");
    } else {
      showHomePage();
    }
  };

  const handleGenreClick = (genreId) => {
    onGenreSelect((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }
      return [...prev, genreId];
    });
  };

  const clearGenres = () => {
    onGenreSelect([]);
    showHomePage();
  };

  const handleSearchHistorySelect = (query) => {
    setSearchTerm(query);
    onSearch(query);
    showSearchResults(query);
    navigate("/search");
  };

  return (
    <header className={styles.header}>
      <form id="form" onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          autoComplete="off"
        />
      </form>
      <SearchHistory onSelectSearch={handleSearchHistorySelect} />
      <div id="tags" className={styles.tags}>
        {genres.map((genre) => (
          <motion.div
            key={genre.id}
            id={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`${styles.tag} ${
              selectedGenres.includes(genre.id) ? styles.highlight : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {genre.name}
          </motion.div>
        ))}
        {selectedGenres.length > 0 && (
          <motion.div
            id="clear"
            className={`${styles.tag} ${styles.highlight}`}
            onClick={clearGenres}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Clear ×
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
