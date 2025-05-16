import { useNavigate, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../../assets/logo-no-background.png';

const Navbar = () => {
  const navigate = useNavigate();

  const showHomePage = (e) => {
    e.preventDefault();
    document.getElementById('home-link').classList.add('active');
    document.getElementById('search-results').classList.remove('active');
    document.getElementById('search-results').classList.add('hidden');
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <a 
            href="/" 
            id="home-link" 
            className="active"
            onClick={showHomePage}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="/search" 
            id="search-results" 
            className="hidden"
          >
            Search Results
          </a>
        </li>
        <li>
          <Link to="/favorites" className={styles.navLink}>
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

