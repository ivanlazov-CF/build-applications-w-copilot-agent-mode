import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'table-warning';
    if (rank === 2) return 'table-info';
    if (rank === 3) return 'table-success';
    return '';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading leaderboard...</p>
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
        <h2><i className="bi bi-trophy-fill me-3"></i>Leaderboard</h2>
        <span className="badge bg-gradient-primary fs-6">
          {leaderboard.length} {leaderboard.length === 1 ? 'Participant' : 'Participants'}
        </span>
      </div>

      <div className="card shadow-custom">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col" className="text-center" style={{width: '100px'}}>
                    <i className="bi bi-award-fill me-2"></i>Rank
                  </th>
                  <th scope="col"><i className="bi bi-person-circle me-2"></i>User</th>
                  <th scope="col"><i className="bi bi-people me-2"></i>Team</th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-star-fill me-2"></i>Points
                  </th>
                  <th scope="col" className="text-center">
                    <i className="bi bi-lightning-fill me-2"></i>Activities
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index} className={getRankClass(rank)}>
                        <td className="text-center">
                          <span className="fs-4 fw-bold">
                            {getRankBadge(rank)}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-gradient fs-6">
                            {entry.user}
                          </span>
                        </td>
                        <td>
                          {entry.team ? (
                            <span className="badge bg-info text-dark fs-6">{entry.team}</span>
                          ) : (
                            <span className="text-muted fst-italic">No Team</span>
                          )}
                        </td>
                        <td className="text-center">
                          <span className="badge bg-warning text-dark fs-6">
                            {entry.total_points} pts
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-success fs-6">
                            {entry.activities_count}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="text-muted">
                        <i className="bi bi-inbox display-4 d-block mb-3"></i>
                        <p>No leaderboard data found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {leaderboard.length > 0 && (
        <div className="alert alert-info mt-4 shadow-custom" role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          <strong>Competition is fierce!</strong> Keep logging your activities to climb the leaderboard!
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
