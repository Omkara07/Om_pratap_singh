import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/moviePage';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ActorPage from './pages/ActorPage';
import Navbar from './components/Navbar';
import AddMoviePage from './pages/AddMoviePage';
import GridView from './components/gridView';
import SearchPage from './pages/SearchPage';

type UserType = {
  email: string;
  name: string;
  token: string;
};

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userSessionData = localStorage.getItem('user');
    if (userSessionData) {
      try {
        const parsedData = JSON.parse(userSessionData) as UserType;
        setUser(parsedData);
      } catch (error) {
        console.error('Error parsing user session from localStorage:', error);
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/movie/:id" element={<MoviePage isMovie={true} />} />
          <Route path="/tv/:id" element={<MoviePage isMovie={false} />} />
          <Route path="/ogmovie/:id" element={<MoviePage isMovie={false} isOgMovie={true} />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/movies" element={<GridView type="movie" />} />
          <Route path="/og-movies" element={<GridView type="ogMovie" />} />
          <Route path="/tv-shows" element={<GridView type="tv" />} />
          <Route path="/people" element={<GridView type="people" />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route
            path="*"
            element={
              <div className="w-full h-screen flex justify-center items-center font-mono">
                404 Page Not Found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
