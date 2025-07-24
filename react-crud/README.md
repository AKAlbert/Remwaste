# Remwaste React CRUD Project

## Prerequisites

- Node.js (v18 recommended)
- npm

## Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd react-crud
   ```

2. **Install root dependencies:**
   ```sh
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd frontend
   npm install
   cd ..
   ```

4. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   cd ..
   ```

5. **Install Cypress (from project root):**
   ```sh
   npm install --save-dev cypress
   ```

6. **(Optional) Install start-server-and-test for CI:**
   ```sh
   npm install --save-dev start-server-and-test
   ```

7. **Install code coverage tools:**
   - For backend (Jest):  
     ```sh
     npm install --save-dev jest jest-junit
     ```
   - For frontend (React):  
     ```sh
     npm install --save-dev @testing-library/react @testing-library/jest-dom
     ```
   - For Cypress coverage:  
     ```sh
     npm install --save-dev @cypress/code-coverage nyc
     ```

8. **Install visual snapshot tool for Cypress:**
   ```sh
   npm install --save-dev cypress-image-snapshot
   ```

## Running the Application

### Start the Backend

```sh
cd backend
npm start
```
_Backend runs on [http://localhost:5050](http://localhost:5050)_

### Start the Frontend

```sh
cd frontend
npm start
```
_Frontend runs on [http://localhost:3000](http://localhost:3000)_

## Running Tests

### Cypress (End-to-End Tests)

1. **Make sure both backend and frontend are running.**
2. **Run Cypress from the project root:**
   ```sh
   npx cypress open
   ```
   or for headless mode:
   ```sh
   npx cypress run
   ```

#### Cypress Code Coverage

- Add the following to your `cypress/support/e2e.js`:
  ```js
  import '@cypress/code-coverage/support';
  ```
- Add the following to your `cypress/plugins/index.js`:
  ```js
  module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config);
    return config;
  };
  ```
- After running Cypress tests, coverage reports will be in `/coverage`.

#### Cypress Visual Snapshots

- Add to your `cypress/support/e2e.js`:
  ```js
  import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
  addMatchImageSnapshotCommand();
  ```
- Example usage in a test:
  ```js
  it('should match previous UI snapshot', () => {
    cy.visit('http://localhost:3000');
    cy.matchImageSnapshot();
  });
  ```

### Backend API Tests (Supertest + Jest)

```sh
cd backend
npm test
```

#### Backend Code Coverage

```sh
cd backend
npm test -- --coverage
```
_Coverage reports will be in `/backend/coverage`._

### Frontend Unit Tests (React)

```sh
cd frontend
npm test -- --coverage
```
_Coverage reports will be in `/frontend/coverage`._

## Continuous Integration (GitHub Actions)

- The workflow in `.github/workflows/nodejs.yml` will:
  - Install dependencies
  - Start backend and frontend servers
  - Run Cypress tests and upload results
  - Run backend tests and upload results
  - Collect code coverage reports
  - Save Cypress visual snapshots (if configured)

## Project Structure

```
react-crud/
  backend/
    App.js
    api.test.js
    coverage/
    ...
  frontend/
    src/
    coverage/
    ...
  cypress/
    e2e/
      tests.cy.js
    support/
      e2e.js
    plugins/
      index.js
    screenshots/
    ...
  .github/
    workflows/
      nodejs.yml
  .gitignore
  README.md
  package.json
```

## Notes

- Update API URLs in frontend to match backend port (`5050`).
- Cypress tests are in the `cypress/e2e/` folder.
- Backend tests are in `backend/api.test.js`.
- Code coverage reports are generated in `/coverage` folders.
- Visual snapshots are stored in `cypress/screenshots/`.

---
