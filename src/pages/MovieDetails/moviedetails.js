import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import Sidebar from "../../component/Sidebar/sidebar";
import Header from "../../component/Header/header";
import Footer from "../../component/Footer/footer";
import { ToastContainer,toast } from "react-toastify";
import { deleteMovie } from "../../api/movies";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response?.data);
      } catch (err) {
        console.error("Failed to load movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      const res = await deleteMovie(id);  
      toast.success("Movie deleted successfully!");
      navigate(-1);    
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error("Failed to delete movie.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!movie) return <div className="alert alert-danger mt-5">Movie not found</div>;

  return (
   <div className="container-fluid">
    <div className="row">
        <Header/>
    </div>
    <div className="row">
        <Sidebar/>
        <div className="col-md-9 mt-4">
         <div className="container my-5">
      <div className="row g-4">
        {/* Poster */}
        <div className="col-md-4">
          <img
            src={movie.posterUrl || "https://via.placeholder.com/400x600?text=No+Poster"}
            alt={`Poster of ${movie.title}`}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Main Info */}
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <button
                  className="btn btn-primary mb-3 me-2"
                  onClick={() => navigate(`/updatemovie/${id}`)}
                >
                  ✏️ Edit Movie
                </button>
                <button
        type="button"
        className="btn btn-danger mb-3 me-2"
        onClick={handleDelete}
      >
        🗑 Delete Movie
      </button>
          <p className="text-muted">
            Directed by <strong>{movie.director}</strong>
          </p>
          <p>
            <strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}
          </p>
          <p>
            <strong>Language:</strong> {movie.language} | <strong>Country:</strong>{" "}
            {movie.country}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration} min
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {movie.rating}/10
          </p>

          <div className="mb-3">
            {movie.genre?.map((g, idx) => (
              <span key={idx} className="badge bg-secondary me-1">
                {g}
              </span>
            ))}
          </div>

          <p>{movie.description}</p>

          {movie.trailerUrl && (
            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger"
            >
              🎬 Watch Trailer
            </a>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Extra Info */}
      <div className="row">
        <div className="col-md-6">
          <h4>Cast</h4>
          <ul>
            {movie.cast?.map((c, idx) => (
              <li key={idx}>
                {c.name}{" "}
                {c.role && <span className="text-muted">({c.role})</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h4>Awards</h4>
          {movie.awards?.length > 0 ? (
            <ul>
              {movie.awards.map((a, idx) => (
                <li key={idx}>
                  {a.year} - {a.name} ({a.category})
                </li>
              ))}
            </ul>
          ) : (
            <p>No awards listed</p>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Financial Info */}
      <div className="row">
        <div className="col-md-6">
          <h5>Budget:</h5>
          <p>${movie.budget?.toLocaleString()}</p>
        </div>
        <div className="col-md-6">
          <h5>Box Office:</h5>
          <p>${movie.boxOffice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
    <div className="row">
        <Footer/>
    </div>
    <ToastContainer position="top-right" autoClose={3500} />
   </div>
  );
}
