import { useState } from 'react';
import { useSelector } from 'react-redux';
import QuestionList from './QuestionList';

function Home() {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);

  const user = users[authedUser];

  const answeredIds = Object.keys(user?.answers || {});
  const questionList = Object.values(questions);

  const answered = questionList
    .filter((q) => answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unanswered = questionList
    .filter((q) => !answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const displayedQuestions = showAnswered ? answered : unanswered;
  const displayTitle = showAnswered ? 'Answered Polls' : 'Unanswered Polls';

  return (
    <div className="home">
      <h2>Polls</h2>
      <div className="poll-toggle">
        <button
          className={`toggle-btn ${!showAnswered ? 'active' : ''}`}
          onClick={() => setShowAnswered(false)}
        >
          Unanswered
        </button>
        <button
          className={`toggle-btn ${showAnswered ? 'active' : ''}`}
          onClick={() => setShowAnswered(true)}
        >
          Answered
        </button>
      </div>
      <section className="section">
        <h3 className="section-title">{displayTitle}</h3>
        <QuestionList questions={displayedQuestions} users={users} />
      </section>
    </div>
  );
}

export default Home;
