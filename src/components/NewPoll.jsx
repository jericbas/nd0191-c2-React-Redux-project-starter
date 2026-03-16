import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

function NewPoll() {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo)).then(() => {
      navigate('/');
    });
  };

  const isDisabled = optionOne.trim() === '' || optionTwo.trim() === '';

  return (
    <div className="new-poll">
      <h2>Would You Rather</h2>
      <h3>Create Your Own Poll</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="optionOne">First Option</label>
          <input
            type="text"
            id="optionOne"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            placeholder="Option One"
            data-testid="option-one-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="optionTwo">Second Option</label>
          <input
            type="text"
            id="optionTwo"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            placeholder="Option Two"
            data-testid="option-two-input"
          />
        </div>
        <button type="submit" disabled={isDisabled} data-testid="submit-poll">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPoll;
