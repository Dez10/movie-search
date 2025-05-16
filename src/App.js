import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SearchHistoryProvider } from "./context/SearchHistoryContext";
import Header from "./components/layout/Header/Header";
import Navbar from "./components/layout/Navigation/Navbar";
import MovieList from "./components/movies/MovieList/MovieList";
import FavoritesPage from "./components/pages/FavoritesPage/FavoritesPage";
import CinematicHeader from "./components/layout/CinematicHeader/CinematicHeader";
import "./styles/global.css";

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <SearchHistoryProvider>
      <FavoritesProvider>
        <div className="app">
          <Navbar />
          <CinematicHeader />
          <Header
            onSearch={handleSearch}
            selectedGenres={selectedGenres}
            onGenreSelect={setSelectedGenres}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MovieList
                  searchQuery=""
                  selectedGenres={selectedGenres}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              }
            />
            <Route
              path="/search"
              element={
                <MovieList
                  searchQuery={searchQuery}
                  selectedGenres={selectedGenres}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              }
            />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </SearchHistoryProvider>
  );
}

export default App;
