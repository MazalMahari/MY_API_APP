//src/components/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';
import LobbyPage from './LobbyPage';
import CodeBlockPage from './CodeBlockPage';


function App() {
  return (
       <Router>
        <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/codeblock/:id" element={<CodeBlockPage />} />
        
</Routes>
    </Router>
  )
}

export default App


