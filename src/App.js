import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './pages/Signin/signin';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from './pages/Signup/signup';
import NextSignUp from './pages/Signup/nextsignup';
import Dashboard from './pages/Dashboard/dashboard';
import Profile from './pages/Profile/profile';
import ChangePassword from './pages/ChangePassword/changepassword';
import Product from './pages/Product/product';
import AddMovies from './pages/Add Movies/addmovies';
import "bootstrap-icons/font/bootstrap-icons.css";
import MovieDetails from './pages/MovieDetails/moviedetails';
import UpdateMovie from './pages/UpdateMovie/updateMovie';




function App() {
  return (
    <div className="App">
      <div>
      <Router>
        <Routes>
        <Route path='/' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/nextsignup' element={<NextSignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/addmovies' element={<AddMovies/>}></Route>
        <Route path='/changepassword' element={<ChangePassword/>}></Route>
        <Route path='/movie/:id' element={<MovieDetails/>}></Route>
        <Route path='/updatemovie/:id' element={<UpdateMovie/>}></Route>
      </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
