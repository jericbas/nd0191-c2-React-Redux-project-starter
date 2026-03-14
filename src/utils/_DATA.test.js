import { _saveQuestion, _saveQuestionAnswer } from './_DATA';

describe('_DATA', () => {
  describe('_saveQuestion', () => {
    test('returns populated data for correctly formatted input', async () => {
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
      expect(result.optionOne.text).toBe('Build with React');
      expect(result.optionTwo.text).toBe('Build with Vue');
    });

    test('returns error for incorrect input', async () => {
      const input = {
        optionOneText: 'Option One',
      };

      await expect(_saveQuestion(input)).rejects.toBe(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });
  });

  describe('_saveQuestionAnswer', () => {
    test('returns success for correctly formatted input', async () => {
      const input = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionTwo',
      };

      const result = await _saveQuestionAnswer(input);

      expect(result).toBe(true);
    });

    test('returns error for incorrect input', async () => {
      const input = {
        authedUser: 'sarahedo',
      };

      await expect(_saveQuestionAnswer(input)).rejects.toBe(
        'Please provide authedUser, qid, and answer'
      );
    });
  });
});

describe('_getUsers', () => {
  test.skip('_getUsers returns all users', async () => {
    // TODO: Import and test _getUsers
  });
});

describe('_getQuestions', () => {
  test.skip('_getQuestions returns all questions', async () => {
    // TODO: Import and test _getQuestions
  });
});
