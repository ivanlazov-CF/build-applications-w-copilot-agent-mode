import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'Beginner': 'bg-success',
      'Intermediate': 'bg-warning text-dark',
      'Advanced': 'bg-danger',
      'Expert': 'bg-dark'
    };
    return badges[difficulty] || 'bg-secondary';
  };

  const getActivityIcon = (type) => {
    const icons = {
      'Running': '🏃',
      'Cycling': '🚴',
      'Swimming': '🏊',
      'Walking': '🚶',
      'Yoga': '🧘',
      'Weightlifting': '🏋️',
      'HIIT': '💪'
    };
    return icons[type] || '⚡';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading workouts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-custom" role="alert">
          <h4 className="alert-heading"><i className="bi bi-exclamation-triangle-fill me-2"></i>Error!</h4>
          <p className="mb-0">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="bi bi-heart-pulse-fill me-3"></i>Suggested Workouts</h2>
        <span className="badge bg-gradient-primary fs-6">
          {workouts.length} {workouts.length === 1 ? 'Workout' : 'Workouts'}
        </span>
      </div>

      <div className="row g-4">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div key={workout.id} className="col-md-6 col-lg-4">
              <div className="card shadow-custom h-100">
                <div className="card-header bg-gradient-primary text-white">
                  <h5 className="card-title mb-0">
                    <span className="me-2">{getActivityIcon(workout.activity_type)}</span>
                    {workout.name}
                  </h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text flex-grow-1 mb-3">{workout.description}</p>
                  
                  <div className="mb-3">
                    <span className={`badge ${getDifficultyBadge(workout.difficulty_level)} mb-2 me-2`}>
                      <i className="bi bi-speedometer me-1"></i>
                      {workout.difficulty_level}
                    </span>
                    <span className="badge bg-info text-dark mb-2">
                      <i className="bi bi-lightning-fill me-1"></i>
                      {workout.activity_type}
                    </span>
                  </div>

                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-clock-fill me-2 text-primary"></i>Duration</span>
                      <span className="badge bg-primary rounded-pill">{workout.duration} min</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-fire me-2 text-danger"></i>Calories Target</span>
                      <span className="badge bg-warning text-dark rounded-pill">{workout.calories_target} cal</span>
                    </li>
                  </ul>

                  <div className="d-grid gap-2 mt-auto">
                    <button className="btn btn-primary">
                      <i className="bi bi-play-circle-fill me-2"></i>
                      Start Workout
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-bookmark-plus me-2"></i>
                      Save for Later
                    </button>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-2"></i>
                    Workout ID: {workout.id}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card shadow-custom text-center py-5">
              <div className="card-body">
                <i className="bi bi-inbox display-1 text-muted d-block mb-3"></i>
                <p className="text-muted mb-0">No workouts found</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {workouts.length > 0 && (
        <div className="alert alert-success mt-4 shadow-custom" role="alert">
          <i className="bi bi-lightbulb-fill me-2"></i>
          <strong>Pro Tip:</strong> Mix different workout types throughout the week for best results!
        </div>
      )}
    </div>
  );
}

export default Workouts;
