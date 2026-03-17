import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from './_DATA';

describe('_DATA', () => {
  describe('_saveQuestion', () => {
    test('returns populated data with all expected fields for valid input', async () => {
      const input = {
        optionOneText: 'Build with React',
        optionTwoText: 'Build with Vue',
        author: 'sarahedo',
      };
      const result = await _saveQuestion(input);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('author', 'sarahedo');
      expect(result).toHaveProperty('optionOne');
      expect(result).toHaveProperty('optionTwo');
      expect(result).toHaveProperty('timestamp');
    });

    test('returns error for incorrect data format', async () => {
      const input = { optionOneText: 'Option One' };
      await expect(_saveQuestion(input)).rejects.toBe(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });
  });

  describe('_saveQuestionAnswer', () => {
    test('returns true for correctly formatted data', async () => {
      const input = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionTwo',
      };
      const result = await _saveQuestionAnswer(input);
      expect(result).toBe(true);
    });

    test('returns error for incorrect data format', async () => {
      const input = { authedUser: 'sarahedo' };
      await expect(_saveQuestionAnswer(input)).rejects.toBe(
        'Please provide authedUser, qid, and answer'
      );
    });
  });

  describe('_getUsers', () => {
    test('returns all users from database', async () => {
      const users = await _getUsers();
      expect(users).toHaveProperty('sarahedo');
      expect(users.sarahedo).toHaveProperty('name');
    });
  });

  describe('_getQuestions', () => {
    test('returns all questions from database', async () => {
      const questions = await _getQuestions();
      expect(Object.keys(questions).length).toBeGreaterThan(0);
    });
  });
});
