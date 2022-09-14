import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Saloons from './pages/admin/Saloons/Saloons'
import NewSaloon from './pages/admin/Saloons/New'
import EditSaloon from './pages/admin/Saloons/Edit'
import Services from './pages/admin/Services/Services'
import NewService from './pages/admin/Services/New'
import Workers from './pages/admin/Workers/Workers'
import MainContext from './context/MainContext'
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
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
          <Alert />
          <Routes>
            <Route path="admin">
              <Route index element={<Saloons />} />
              <Route path="saloons/new" element={<NewSaloon />} />
              <Route path="saloons/edit/:id" element={<EditSaloon />} />
              <Route path="services" element={<Services />} />
              <Route path="services/new" element={<NewService />} />
              <Route path="workers" element={<Workers />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
