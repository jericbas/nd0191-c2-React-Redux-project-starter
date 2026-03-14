import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PollUnanswered from './PollUnanswered';
import PollResult from './PollResult';

function QuestionDetail() {
  const { id } = useParams();
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const question = questions[id];
  const user = users[authedUser];

  if (!question) {
    return <Navigate to="/404" />;
  }

  const author = users[question.author];
  const hasVoted = user?.answers?.[id];

  return (
    <div className="question-detail">
      <div className="poll-header">
        <img src={author?.avatarURL} alt={author?.name} className="avatar" />
        <h2>Poll by {author?.name}</h2>
      </div>
      {hasVoted ? (
        <PollResult question={question} authedUser={authedUser} />
      ) : (
        <PollUnanswered question={question} />
      )}
    </div>
  );
}

export default QuestionDetail;
