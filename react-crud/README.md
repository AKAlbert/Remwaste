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

### Backend API Tests (Supertest + Jest)

```sh
cd backend
npm test
```

## Continuous Integration (GitHub Actions)

- The workflow in `.github/workflows/nodejs.yml` will:
  - Install dependencies
  - Start backend and frontend servers
  - Run Cypress tests and upload results
  - Run backend tests and upload results

## Project Structure

```
react-crud/
  backend/
    App.js
    api.test.js
    ...
  frontend/
    src/
    ...
  cypress/
    e2e/
      tests.cy.js
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

---
