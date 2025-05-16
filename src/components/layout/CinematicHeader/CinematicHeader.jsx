import { motion } from 'framer-motion';
import styles from './CinematicHeader.module.css';

const CinematicHeader = () => {
  return (
    <motion.div 
      className={styles.cinematicHeader}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.headerContent}>
        <motion.div 
          className={styles.titleContainer}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <h1 className={styles.title}>Cinema Search</h1>
          <div className={styles.underline}></div>
        </motion.div>
        
        <motion.div 
          className={styles.decorativeElements}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className={styles.cameraReel}>
            <div className={styles.reelCircle}></div>
            <div className={styles.filmStrip}></div>
            <div className={styles.reelCircle}></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CinematicHeader;
