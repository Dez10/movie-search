import { motion } from "framer-motion";
import styles from "./AnimatedBanner.module.css";

const AnimatedBanner = () => {
  return (
    <motion.div
      className={styles.banner}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Discover Amazing Movies
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Explore the latest and greatest in cinema
      </motion.p>
      <motion.div
        className={styles.decorativeLine}
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default AnimatedBanner;
