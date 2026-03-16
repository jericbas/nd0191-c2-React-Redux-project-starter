import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
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
      <div className="nav-left">
        <NavLink data-testid="nav-home" to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
        <NavLink data-testid="nav-leaderboard" to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Leaderboard</NavLink>
        <NavLink data-testid="nav-new" to="/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>New</NavLink>
      </div>
      {user && (
        <div className="nav-right">
          <img src={user.avatarURL} alt={user.name} className="avatar-small" />
          <span className="user-name">{user.name}</span>
          <button onClick={onLogout} data-testid="logout-button" className="logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
