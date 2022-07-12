import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Click from './Click'
import Input from './Input'
import Form from './Form'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Click />
    <Input />
    <Form />
  </React.StrictMode>
)
