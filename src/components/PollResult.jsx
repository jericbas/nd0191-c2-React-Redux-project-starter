function PollResult({ question, authedUser }) {
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const optionOnePercent = totalVotes === 0 ? 0 : Math.round((optionOneVotes / totalVotes) * 100);
  const optionTwoPercent = totalVotes === 0 ? 0 : Math.round((optionTwoVotes / totalVotes) * 100);

  const userVotedOptionOne = question.optionOne.votes.includes(authedUser);
  const userVotedOptionTwo = question.optionTwo.votes.includes(authedUser);

  return (
    <div className="poll-result">
      <h3>Results</h3>
      <div className={`option-result ${userVotedOptionOne ? 'voted' : ''}`}>
        {userVotedOptionOne && <span className="voted-badge">Your vote</span>}
        <p>{question.optionOne.text}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${optionOnePercent}%` }}>
            {optionOnePercent}%
          </div>
        </div>
        <p>{optionOneVotes} out of {totalVotes} votes ({optionOnePercent}%)</p>
      </div>
      <div className={`option-result ${userVotedOptionTwo ? 'voted' : ''}`}>
        {userVotedOptionTwo && <span className="voted-badge">Your vote</span>}
        <p>{question.optionTwo.text}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${optionTwoPercent}%` }}>
            {optionTwoPercent}%
          </div>
        </div>
        <p>{optionTwoVotes} out of {totalVotes} votes ({optionTwoPercent}%)</p>
      </div>
    </div>
  );
}

export default PollResult;
