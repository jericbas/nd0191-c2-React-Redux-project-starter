# Employee Polls

This is the starter code for the final assessment project for Udacity's React & Redux course.

## Installation

To get started:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. The application will run on http://localhost:3000/

## Testing

Run tests with `npm test`

---

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you'll need to add the path to each user's avatar.

Using the provided starter code, you'll build a React/Redux front end for the application.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute | Type | Description |
|-----------------|------------------|------------------- |
| id | String | The user's unique identifier |
| password| String | The user's password in order to log in the application |
| name | String | The user's first name and last name |
| avatarURL | String | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The question's unique identifier |
| author | String | The author's unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes | Array | A list that contains the id of each user who voted for that option|
| text | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer({ authedUser, qid, answer })`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user's id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question's id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save a new polling question to the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`
*Return Value*: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`.

4) `_saveQuestionAnswer({ authedUser, qid, answer })` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: the `authedUser`, the `qid` (question id), and the `answer` (which is either `optionOne` or `optionTwo`).
