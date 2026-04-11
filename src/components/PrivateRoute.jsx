import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  if (!authedUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
