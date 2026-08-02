# React Testing Tool

A robust Next.js application designed to act as a Software Template for multiple testing purposes. It provides a comprehensive testing surface with mock endpoints and frontend components.

## Features
- **Software Template**: Configured to be used as a base template to quickly spin up testing applications across your developer portals.
- **Next.js App Router**: Serving both a React frontend and multiple backend API endpoints.
- **Testing Surface**: Includes `GET`, `POST`, `PUT`, `DELETE`, error simulation, and delay endpoints.
- **Premium UI**: Uses custom CSS (Vanilla CSS) for a modern, sleek appearance.
- **Dockerized**: Includes a multi-stage Dockerfile for optimized production builds.
- **Unit Tests**: Includes Jest and React Testing Library setup with basic component testing.

## Endpoints
This application exposes several endpoints for testing purposes:
- `GET /api/users` - Fetch a list of users.
- `POST /api/users` - Create a new user.
- `GET /api/users/[id]` - Fetch a specific user.
- `PUT /api/users/[id]` - Replace a user.
- `PATCH /api/users/[id]` - Partially update a user.
- `DELETE /api/users/[id]` - Delete a user.
- `GET /api/error` - Simulates a 500 Internal Server Error.
- `GET /api/delay` - Simulates a slow network request (2 seconds delay).

## Project Structure
For new developers navigating the codebase, here is a quick overview of where things live:
- **`src/app/page.tsx`**: The main frontend React dashboard.
- **`src/app/globals.css` / `page.module.css`**: Vanilla CSS files used for styling the frontend.
- **`src/app/api/`**: Contains all the backend mock endpoints. If you need to add a new endpoint, create a new folder here with a `route.ts` file.
- **`__tests__/`**: Jest unit tests for React components and utility functions.
- **`NAMING_CONVENTIONS.md`**: ⚠️ **Important**: Please read our [Naming Conventions Guide](./NAMING_CONVENTIONS.md) before contributing to ensure consistency across the codebase!

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Navigate to the project directory:
   ```bash
   cd react-testing-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
To execute the unit tests:
```bash
npm run test
```

## Docker Build

To build and run the Docker image locally:
```bash
docker build -t react-testing-app .
docker run -p 3000:3000 react-testing-app
```
