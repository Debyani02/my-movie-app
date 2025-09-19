import React, { useState, useEffect } from "react";
import Header from "../../component/Header/header";
import Footer from "../../component/Footer/footer";
import "./dashboard_styles.css";
import Sidebar from "../../component/Sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import Gototop from "../../component/GoToTop/gototop";
import SearchBar from "../../component/SearchBar/searchbar";
import CardList from "../../component/CardList/cardlist";
import MovieCard from "../../component/MovieCard/moviecard";
import { getMovies, getMoviesByGenre } from "../../api/movies";
import { getLatestMovies, getTopRatedMovies } from "../../api/movies";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState();

  const product = (product) => {
    navigate(`/product?id=${product.id}`, { state: { product } });
  };

  const user = JSON.parse(localStorage.getItem("userData"));
  const [search, setSearch] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response?.data || []);
        console.log("This is movies response", response?.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

  }, [])


  const handleLatest = async () => {
    try {
      setIsLoading(true)
      const res = await getLatestMovies();
      setMovies(res?.data || []);

    } catch (error) {
      console.error(error);
    }
    finally{
      setIsLoading(false)
    }

  }

  const handleGenreChange = async (e) => {
    const selectedGenre = e.target.value;
    setGenre(selectedGenre)
    console.log("---genre---",selectedGenre)
    try{
      setIsLoading(true)
      const res = await getMoviesByGenre(selectedGenre);
      setMovies(res?.data || [])
    }catch (error) {
      console.error(error);
    }
    finally{
      setIsLoading(false)
    }
  }

  const handleTopRated = async () => {
    try {
      setIsLoading(true)
      const res = await getTopRatedMovies();
      setMovies(res?.data || []);

    } catch (error) {

    }
    finally{
      setIsLoading(false)
    }
  }


  if (isloading) return <div className="text-center mt-4">Loading movies...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div>
      <Header />

      <div className="dashboard-container my-4">

        <Sidebar />
        <div className="dashboard-content container mt-4">
          <br></br><br></br>
          <div className="row">
            <div className="col-md-6">
              <SearchBar search={search} setSearch={setSearch} style={{"width":"100%"}}/>
            </div>
            <div className="col-md-6">
              <button className="btn btn-danger  me-2" onClick={handleTopRated}>
                Top rated
              </button>


              <button className="btn btn-danger me-2" onClick={handleLatest}>
                Latest
              </button>


              <select className="form-select-sm" name="genre" value={genre} onChange={handleGenreChange}>
                <option value={""} >Select genre</option>
                <option value={"Drama"}>Drama</option>
                <option value={"Horror"}>Horror</option>
                <option value={"Comedy"}>Comedy</option>
                <option value={"Sci-fi"}>Sci-fi</option>
                <option value={"Romance"}>Romance</option>
                <option value={"Teen"}>Teen</option>
              </select>
            </div>
          </div>
          {search ? (
            <CardList search={search} />
          ) : (
            <div>
              <div className="row">
                {movies.map((movie) => (
                  <div key={movie._id} className="col-md-6 col-lg-4 mb-4">
                    <MovieCard
                      movie={movie}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Gototop />
        </div>
      </div>

      <Footer />
    </div>
  );
}
