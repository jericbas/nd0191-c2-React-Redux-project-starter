import { useSelector } from 'react-redux';

function Leaderboard() {
  const users = useSelector((state) => state.users);

  const sortedUsers = Object.values(users)
    .map((user) => ({
      ...user,
      answeredCount: Object.keys(user.answers).length,
      createdCount: user.questions.length,
      totalScore: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table data-testid="leaderboard-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-cell">
                  <img src={user.avatarURL} alt={user.name} className="avatar-small" />
                  <div>
                    <p>{user.name}</p>
                    <p className="user-id">{user.id}</p>
                  </div>
                </div>
              </td>
              <td>{user.answeredCount}</td>
              <td>{user.createdCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
