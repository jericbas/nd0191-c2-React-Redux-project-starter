import { Link } from 'react-router-dom';

function QuestionCard({ question, author }) {
  const timestamp = new Date(question.timestamp).toLocaleString();

  return (
    <div className="question-card" data-testid="question-card">
      <div className="card-header">
        <img src={author?.avatarURL} alt={author?.name} className="avatar" />
        <div>
          <p>{author?.name}</p>
          <p className="timestamp">{timestamp}</p>
        </div>
      </div>
      <div className="card-body">
        <p>Would you rather...</p>
        <p className="preview">{question.optionOne.text} <strong>or</strong> {question.optionTwo.text}?</p>
      </div>
      <div className="card-footer">
        <Link to={`/questions/${question.id}`} className="btn-show" data-testid="show-button">
          Show
        </Link>
      </div>
    </div>
  );
}

export default QuestionCard;
