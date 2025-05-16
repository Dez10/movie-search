import { motion } from 'framer-motion';
import styles from './MovieReel.module.css';

const MovieReel = () => {
  return (
    <motion.div 
      className={styles.reelContainer}
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ 
        type: "spring",
        duration: 1.5,
        bounce: 0.3
      }}
    >
      <div className={styles.reel}>
        <div className={styles.filmStrip}>
          {[...Array(5)].map((_, index) => (
            <motion.div 
              key={index} 
              className={styles.frame}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className={styles.sprocket}></div>
            </motion.div>
          ))}
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={styles.title}
        >
          Movie Search
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default MovieReel;
