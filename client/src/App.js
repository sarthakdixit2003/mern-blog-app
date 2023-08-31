import './App.css';
import Home from './pages/Home/Home';
import Single from './pages/Single/Single';
import Write from './pages/Write/Write';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/post/:id" element={<Single />}/>
          <Route path="/write" element={user ? <Write /> : <Register />}/>
          <Route path="/settings" element={user ? <Settings /> : <Register />}/>
          <Route path="/login" element={user ? <Home /> : <Login />}/>
          <Route path="/register" element={user ? <Home /> : <Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
