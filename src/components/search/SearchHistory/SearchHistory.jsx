import { motion, AnimatePresence } from "framer-motion";
import { useSearchHistory } from "../../../context/SearchHistoryContext";
import styles from "./SearchHistory.module.css";

const SearchHistory = ({ onSelectSearch }) => {
  const { searchHistory, removeFromHistory, clearHistory } = useSearchHistory();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (searchHistory.length === 0) return null;

  return (
    <motion.div
      className={styles.searchHistory}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.header}>
        <h3>Recent Searches</h3>
        <motion.button
          className={styles.clearButton}
          onClick={clearHistory}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear History
        </motion.button>
      </div>

      <div className={styles.historyList}>
        <AnimatePresence>
          {searchHistory.map((item) => (
            <motion.div
              key={item.id}
              className={styles.historyItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.searchInfo}>
                <button
                  className={styles.searchQuery}
                  onClick={() => onSelectSearch(item.query)}
                >
                  {item.query}
                </button>
                <span className={styles.timestamp}>
                  {formatDate(item.timestamp)}
                </span>
              </div>
              <motion.button
                className={styles.removeButton}
                onClick={() => removeFromHistory(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchHistory;
