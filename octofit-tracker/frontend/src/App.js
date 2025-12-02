import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="OctoFit Logo" className="navbar-logo" />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-people-fill me-2"></i>Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-activity me-2"></i>Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people me-2"></i>Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-trophy-fill me-2"></i>Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-heart-pulse-fill me-2"></i>Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-center mb-5 fade-in">
                  <h1 className="display-3 mb-4">Welcome to OctoFit Tracker 🏋️</h1>
                  <p className="lead text-muted mb-4">
                    Track your fitness activities, compete with your team, and achieve your goals!
                  </p>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-md-4">
                    <div className="card text-center fade-in">
                      <div className="card-body">
                        <div className="display-4 mb-3">📊</div>
                        <h5 className="card-title">Track Activities</h5>
                        <p className="card-text">Log your workouts and monitor your progress over time.</p>
                        <Link to="/activities" className="btn btn-primary">View Activities</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card text-center fade-in">
                      <div className="card-body">
                        <div className="display-4 mb-3">🏆</div>
                        <h5 className="card-title">Compete</h5>
                        <p className="card-text">Challenge your friends and climb the leaderboard.</p>
                        <Link to="/leaderboard" className="btn btn-success">View Leaderboard</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card text-center fade-in">
                      <div className="card-body">
                        <div className="display-4 mb-3">💪</div>
                        <h5 className="card-title">Get Inspired</h5>
                        <p className="card-text">Discover personalized workout suggestions.</p>
                        <Link to="/workouts" className="btn btn-info">View Workouts</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gradient-primary text-white fade-in">
                  <div className="card-body text-center py-5">
                    <h3 className="card-title mb-3">Join a Team Today!</h3>
                    <p className="card-text mb-4">Connect with others and achieve your fitness goals together.</p>
                    <Link to="/teams" className="btn btn-light btn-lg">
                      <i className="bi bi-people me-2"></i>Explore Teams
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;

