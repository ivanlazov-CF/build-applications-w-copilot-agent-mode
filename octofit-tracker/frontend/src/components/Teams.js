import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
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
            <p className="text-muted">Loading teams...</p>
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
        <h2><i className="bi bi-people me-3"></i>Teams</h2>
        <span className="badge bg-gradient-primary fs-6">
          {teams.length} {teams.length === 1 ? 'Team' : 'Teams'}
        </span>
      </div>

      <div className="row g-4">
        {teams.length > 0 ? (
          teams.map(team => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card shadow-custom h-100">
                <div className="card-header bg-gradient-primary text-white">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-shield-fill-check me-2"></i>
                    {team.name}
                  </h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text flex-grow-1">{team.description}</p>
                  <div className="mt-3">
                    <p className="card-text mb-2">
                      <small className="text-muted">
                        <i className="bi bi-calendar-plus me-2"></i>
                        Created: {new Date(team.created_at).toLocaleDateString()}
                      </small>
                    </p>
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Join Team
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-info-circle me-2"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <small className="text-muted">
                    <i className="bi bi-people-fill me-2"></i>
                    Team ID: {team.id}
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
                <p className="text-muted mb-0">No teams found</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
