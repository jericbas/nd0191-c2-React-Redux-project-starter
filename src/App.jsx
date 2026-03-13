import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import QuestionDetail from './components/QuestionDetail';
import NewPoll from './components/NewPoll';
import Leaderboard from './components/Leaderboard';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div className="app">
      {authedUser && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <QuestionDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
