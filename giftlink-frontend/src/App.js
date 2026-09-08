import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<MainPage />} />
          <Route path="/app/login" element={<LoginPage />} />
          <Route path="/app/register" element={<RegisterPage />} />
          <Route path="/app/gift/:id" element={<DetailsPage />} />
          <Route path="/app/search" element={<SearchPage />} />
        </Routes>
      </main>
      <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary">
        <div className="container text-center">
          <p className="mb-1 fw-semibold">🎁 GiftLink - Sharing Joy, Connecting Communities</p>
          <p className="small text-white-50 mb-0">Coursera Full-Stack Developer Capstone Project</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
