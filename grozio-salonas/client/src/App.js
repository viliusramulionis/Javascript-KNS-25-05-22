import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Saloons from './pages/admin/Saloons/Saloons'
import NewSaloon from './pages/admin/Saloons/New'
import EditSaloon from './pages/admin/Saloons/Edit'
import MainContext from './context/MainContext'
import Header from './components/Header/Header'
import './App.css';

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })

  const contextValues = { alert, setAlert }

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="admin">
              <Route index element={<Saloons />} />
              <Route path="saloons/new" element={<NewSaloon />} />
              <Route path="saloons/edit/:id" element={<EditSaloon />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
