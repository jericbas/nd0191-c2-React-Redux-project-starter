import { useDispatch } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';

function PollUnanswered({ question }) {
  const dispatch = useDispatch();

  const handleVote = (option) => {
    dispatch(handleAnswerQuestion(question.id, option));
  };

  return (
    <div className="poll-unanswered">
      <h3>Would You Rather</h3>
      <div className="options">
        <div className="option">
          <p>{question.optionOne.text}</p>
          <button
            onClick={() => handleVote('optionOne')}
            data-testid="vote-option-one"
          >
            Click
          </button>
        </div>
        <div className="option">
          <p>{question.optionTwo.text}</p>
          <button
            onClick={() => handleVote('optionTwo')}
            data-testid="vote-option-two"
          >
            Click
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollUnanswered;
