import { useSelector } from 'react-redux';
import QuestionList from './QuestionList';

function Home() {
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
      <div className="content-sections">
        <section className="section">
          <h3 className="section-title">New Questions</h3>
          <p className="section-subtitle">Pending Tasks</p>
          <QuestionList questions={unanswered} users={users} />
        </section>
        <section className="section">
          <h3 className="section-title">Done</h3>
          <p className="section-subtitle">Completed Tasks</p>
          <QuestionList questions={answered} users={users} />
        </section>
      </div>
    </div>
  );
}

export default Home;
