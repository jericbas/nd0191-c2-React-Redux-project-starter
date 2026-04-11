import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleLogin } from '../actions/auth';

function Login() {
  const [selectedUser, setSelectedUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(handleLogin(selectedUser));
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-container">
      <h2>Employee Polls</h2>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          data-testid="user-select"
        >
          <option value="">Select a user</option>
          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!selectedUser}
          data-testid="login-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
