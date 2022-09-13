import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Saloons from './pages/admin/Saloons'

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Saloons />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
