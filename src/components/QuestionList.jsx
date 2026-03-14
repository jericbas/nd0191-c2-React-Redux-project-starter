import QuestionCard from './QuestionCard';

function QuestionList({ questions, users }) {
  return (
    <div className="question-list">
      {questions.length === 0 ? (
        <p>No polls to display</p>
      ) : (
        questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            author={users[question.author]}
          />
        ))
      )}
    </div>
  );
}

export default QuestionList;
