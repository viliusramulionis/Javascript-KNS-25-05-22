import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import NotFound from './pages/404'
import EditPost from './pages/EditPost'
import SinglePost from './pages/SinglePost'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Header from './components/Header/Header'
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
     if(localStorage.getItem('loggedin') === 'true') 
      setLoggedIn(true)
  }, [])

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
        {loggedIn && 
          <>
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </>
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App;
