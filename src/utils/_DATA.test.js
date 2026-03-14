import { describe, it, expect } from 'vitest';
import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from './_DATA';

describe('_DATA', () => {
  describe('_saveQuestion', () => {
    it('returns populated data for correctly formatted input', async () => {
      const input = {
        optionOneText: 'Build with React',
        optionTwoText: 'Build with Vue',
        author: 'sarahedo',
      };
      const result = await _saveQuestion(input);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('author', 'sarahedo');
      expect(result.optionOne.text).toBe('Build with React');
      expect(result.optionTwo.text).toBe('Build with Vue');
    });

    it('returns error for incorrect input', async () => {
      const input = { optionOneText: 'Option One' };
      await expect(_saveQuestion(input)).rejects.toBe(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });
  });

  describe('_saveQuestionAnswer', () => {
    it('returns success for correctly formatted input', async () => {
      const input = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionTwo',
      };
      const result = await _saveQuestionAnswer(input);
      expect(result).toBe(true);
    });

    it('returns error for incorrect input', async () => {
      const input = { authedUser: 'sarahedo' };
      await expect(_saveQuestionAnswer(input)).rejects.toBe(
        'Please provide authedUser, qid, and answer'
      );
    });
  });

  describe('_getUsers', () => {
    it('returns users object', async () => {
      const users = await _getUsers();
      expect(users).toHaveProperty('sarahedo');
      expect(users.sarahedo).toHaveProperty('name');
      expect(users.sarahedo).toHaveProperty('avatarURL');
    });

    it('matches snapshot of users structure', async () => {
      const users = await _getUsers();
      expect(users).toMatchSnapshot();
    });
  });

  describe('_getQuestions', () => {
    it('returns questions object', async () => {
      const questions = await _getQuestions();
      expect(Object.keys(questions).length).toBeGreaterThan(0);
      const first = Object.values(questions)[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('optionOne');
      expect(first).toHaveProperty('optionTwo');
    });

    it('matches snapshot of questions structure', async () => {
      const questions = await _getQuestions();
      expect(questions).toMatchSnapshot();
    });
  });
});
