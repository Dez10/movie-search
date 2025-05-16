import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { movieAPI, IMG_URL } from '../../../services/api';
import styles from './MovieOverlay.module.css';

const MovieOverlay = ({ movieId, onClose }) => {
  const [movieData, setMovieData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(movieId);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        
        const [detailsResponse, videosResponse, recommendationsResponse] = await Promise.all([
          fetch(movieAPI.getDetails(selectedMovieId)),
          fetch(movieAPI.getVideos(selectedMovieId)),
          fetch(movieAPI.getRecommendations(selectedMovieId))
        ]);

        const [details, videosData, recommendationsData] = await Promise.all([
          detailsResponse.json(),
          videosResponse.json(),
          recommendationsResponse.json()
        ]);

        const youtubeVideos = videosData.results
          .filter(video => video.site === "YouTube")
          .slice(0, 5);

        setMovieData(details);
        setVideos(youtubeVideos);
        setRecommendations(recommendationsData.results.slice(0, 6));
        setActiveSlide(0);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [selectedMovieId]);

  const handlePrevVideo = () => {
    setActiveSlide(prev => prev === 0 ? videos.length - 1 : prev - 1);
  };

  const handleNextVideo = () => {
    setActiveSlide(prev => prev === videos.length - 1 ? 0 : prev + 1);
  };

  const handleMovieClick = (newMovieId) => {
    setSelectedMovieId(newMovieId);
    const content = document.querySelector(`.${styles.content}`);
    if (content) {
      content.scrollTop = 0;
    }
  };

  if (!selectedMovieId) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className={styles.closeBtn} onClick={onClose}>
        &times;
      </button>
      
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            {movieData && (
              <div className={styles.movieDetails}>
                <h1>{movieData.title}</h1>
                <div className={styles.movieInfo}>
                  <span className={styles.year}>
                    {new Date(movieData.release_date).getFullYear()}
                  </span>
                  <span className={styles.runtime}>
                    {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}m
                  </span>
                  <span className={styles.rating}>
                    ⭐ {movieData.vote_average.toFixed(1)}
                  </span>
                </div>
                <p className={styles.overview}>{movieData.overview}</p>
                
                {movieData.credits?.cast?.length > 0 && (
                  <div className={styles.cast}>
                    <h3>Cast</h3>
                    <div className={styles.castList}>
                      {movieData.credits.cast.slice(0, 5).map(actor => (
                        <div key={actor.id} className={styles.castMember}>
                          <div className={styles.castImage}>
                            <img 
                              src={actor.profile_path 
                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                : 'https://via.placeholder.com/185x185'
                              }
                              alt={actor.name}
                            />
                          </div>
                          <span className={styles.castName}>{actor.name}</span>
                          <span className={styles.character}>{actor.character}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {videos.length > 0 && (
              <div className={styles.videoSection}>
                <h2>{videos[activeSlide]?.name}</h2>
                <div className={styles.videoContainer}>
                  {videos.map((video, index) => (
                    <iframe
                      key={video.id}
                      className={`${styles.embed} ${
                        index === activeSlide ? styles.show : styles.hide
                      }`}
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ))}
                </div>

                <div className={styles.navigation}>
                  <button 
                    className={`${styles.arrow} ${styles.leftArrow}`}
                    onClick={handlePrevVideo}
                  >
                    &#8656;
                  </button>
                  <div className={styles.dots}>
                    {videos.map((_, index) => (
                      <span
                        key={index}
                        className={`${styles.dot} ${
                          index === activeSlide ? styles.active : ''
                        }`}
                        onClick={() => setActiveSlide(index)}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                  <button 
                    className={`${styles.arrow} ${styles.rightArrow}`}
                    onClick={handleNextVideo}
                  >
                    &#8658;
                  </button>
                </div>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className={styles.recommendationsSection}>
                <h3>Recommended Movies</h3>
                <motion.div 
                  className={styles.recommendationsGrid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {recommendations.map(movie => (
                    <motion.div
                      key={movie.id}
                      className={styles.recommendedMovie}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleMovieClick(movie.id)}
                    >
                      <img
                        src={`${IMG_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                      />
                      <div className={styles.recommendedInfo}>
                        <h4>{movie.title}</h4>
                        <span className={styles.rating}>
                          ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MovieOverlay;







