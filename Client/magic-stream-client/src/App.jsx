import { Route, Routes, useNavigate } from 'react-router-dom';
import axiosClient from './api/axiosConfig';
import useAuth from './hook/useAuth';
import Layout from './components/Layout';
import RequiredAuth from './components/RequiredAuth';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Recommended from './components/recommended/Recommended';
import Review from './components/review/Review';
import SreamMovie from './components/stream/StreamMovie';

function App() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const updateMovieReview = (imdb_id) => {
    navigate(`/review/${imdb_id}`);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosClient.post('/logout', {
        user_id: auth.user_id,
      });
      console.log(response.data);
      setAuth(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Routes path='/' element={<Layout />}>
        <Route
          path='/'
          element={<Home updateMovieReview={updateMovieReview} />}
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RequiredAuth />}>
          <Route path='/recommended' element={<Recommended />} />
          <Route path='/review/:imdb_id' element={<Review />} />
          <Route path='/stream/:yt_id' element={<SreamMovie />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
