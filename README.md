# S4RB On Premise Technical Interview

## Getting Started

Install the dependencies for the [web](/web) application.

`cd web && npm i`

Install the dependencies for the [API](/api).

`cd api && npm i`

## Running from the command line

### Web

- `npm start` will serve the web application on http://localhost:4200 in watch mode
- `npm test` will execute the Jest tests
- `npm run test:watch` will execute the Jest tests in watch mode

### API

- `npm start` will serve the API on http://localhost:8080 in watch mode
- `npm test` will execute the Jest tests
- `npm run test:watch` will execute the Jest tests in watch mode

## Task

Your task is to implement the required acceptance criteria described below.

**In Order To** manage users authorised to access the internal S4RB systems\
**As A** System Administrator\
**I Want** the ability to add new users to the list

**Given** I am on the Add User page\
**And** I have entered a Name and Email\
**When** I click Save\
**Then** I am redirected to the Users page\
**And** the new user is displayed in the list of users

**Given** I have previously added Users to the list\
**When** I navigate to the Web application\
**Then** I see a list of users each displaying their names and email addresses
