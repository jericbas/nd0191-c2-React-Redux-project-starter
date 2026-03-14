import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ANSWER_QUESTION,
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION: {
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    }
    case ANSWER_QUESTION: {
      const { qid, answer, authedUser } = action;
      const question = state[qid];
      const votesKey = answer;
      return {
        ...state,
        [qid]: {
          ...question,
          [votesKey]: {
            ...question[votesKey],
            votes: [...question[votesKey].votes, authedUser],
          },
        },
      };
    }
    default:
      return state;
  }
}
