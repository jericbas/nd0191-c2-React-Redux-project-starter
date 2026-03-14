import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../actions/auth';

function Nav() {
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = users[authedUser];

  const onLogout = () => {
    dispatch(handleLogout());
    navigate('/login');
  };

  return (
    <nav className="nav">
      <ul>
        <li><Link data-testid="nav-home" to="/">Home</Link></li>
        <li><Link data-testid="nav-leaderboard" to="/leaderboard">Leaderboard</Link></li>
        <li><Link data-testid="nav-new" to="/add">New</Link></li>
      </ul>
      {user && (
        <div className="user-info">
          <span>{user.name}</span>
          <img src={user.avatarURL} alt={user.name} className="avatar-small" />
          <button onClick={onLogout} data-testid="logout-button">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
