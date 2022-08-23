import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import App from './App';
import NewPost from './pages/NewPost'
import NotFound from './pages/404.js'
import EditPost from './pages/EditPost.js'
import SinglePost from './pages/SinglePost.js'
import Header from './components/Header/Header'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new-post" element={<NewPost />} />
      {/* <Route path="/edit">
        <Route path=":id" element={<EditPost />} />
      </Route> */}
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
