import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PredictForm from './pages/PredictForm';
import ResultPage from './pages/ResultPage';
import CropDetailPage from "./pages/CropDetailPage";


function App() {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predict" element={isAuthenticated ? <PredictForm /> : <Navigate to="/login" />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/crop/:cropName" element={<CropDetailPage />} />

      </Routes>
    </Router>
  );
}

export default App;
