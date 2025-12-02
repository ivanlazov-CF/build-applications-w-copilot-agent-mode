import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading activities...</p>
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
        <h2><i className="bi bi-activity me-3"></i>Activities</h2>
        <span className="badge bg-gradient-primary fs-6">
          {activities.length} {activities.length === 1 ? 'Activity' : 'Activities'}
        </span>
      </div>

      <div className="card shadow-custom">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col"><i className="bi bi-hash me-2"></i>ID</th>
                  <th scope="col"><i className="bi bi-person-circle me-2"></i>User</th>
                  <th scope="col"><i className="bi bi-lightning-fill me-2"></i>Type</th>
                  <th scope="col"><i className="bi bi-clock-fill me-2"></i>Duration</th>
                  <th scope="col"><i className="bi bi-speedometer2 me-2"></i>Distance</th>
                  <th scope="col"><i className="bi bi-fire me-2"></i>Calories</th>
                  <th scope="col"><i className="bi bi-calendar-event me-2"></i>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map(activity => (
                    <tr key={activity.id}>
                      <td className="fw-bold">{activity.id}</td>
                      <td>
                        <span className="badge badge-gradient me-2">
                          {activity.user}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {activity.activity_type}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {activity.duration} min
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success">
                          {activity.distance} km
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {activity.calories_burned} cal
                        </span>
                      </td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="text-muted">
                        <i className="bi bi-inbox display-4 d-block mb-3"></i>
                        <p>No activities found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
