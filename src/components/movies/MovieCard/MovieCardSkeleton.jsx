import { motion } from "framer-motion";
import styles from "./MovieCardSkeleton.module.css";

const MovieCardSkeleton = () => {
  return (
    <motion.div
      className={styles.skeleton}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.rating} />
      </div>
    </motion.div>
  );
};

export default MovieCardSkeleton;
