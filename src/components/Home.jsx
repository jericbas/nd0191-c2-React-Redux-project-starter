import { useState } from 'react';
import { useSelector } from 'react-redux';
import QuestionList from './QuestionList';

function Home() {
  const [activeTab, setActiveTab] = useState('unanswered');
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

  return (
    <div className="home">
      <h2>Polls</h2>
      <div className="tabs">
        <button
          className={activeTab === 'unanswered' ? 'active' : ''}
          onClick={() => setActiveTab('unanswered')}
          data-testid="tab-unanswered"
        >
          Unanswered
        </button>
        <button
          className={activeTab === 'answered' ? 'active' : ''}
          onClick={() => setActiveTab('answered')}
          data-testid="tab-answered"
        >
          Answered
        </button>
      </div>
      <QuestionList
        questions={activeTab === 'unanswered' ? unanswered : answered}
        users={users}
      />
    </div>
  );
}

export default Home;
