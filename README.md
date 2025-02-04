# Fetch Application

This is a React application for Fetch.

## Requirements

Node.js >= 14.x

npm

## Installation

To run just the frontend

### Install Dependencies:

npm install

### Start the Development Server:

npm start

## Available Scripts

In the project directory, you can run:

- `npm run start` Runs the frontend in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  The page will reload if you make edits. You will also see any lint errors in the console.

- `npm test` Launches the test runner in the interactive watch mode.
  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build` Builds the app for production to the `build` folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.  
  The build is minified and the filenames include the hashes.
  Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure

```sh
|-- public
|   |-- fetchIcon.png
|   |-- index.html
|   |-- manifest.json
|   |-- robots.txt
|-- src
|   |-- components
|   |   |-- layout
|   |   |   |-- footer
|   |   |   |   |-- Footer.tsx
|   |   |   |-- header
|   |   |   |   |-- Header.tsx
|   |   |   |-- index.ts
|   |   |   |-- layout.tsx
|   |   |-- protectedRoutes
|   |   |   |-- protectedRoutes.tsx
|   |-- hooks
|   |   |-- __test__
|   |   |   |-- useFetcher.spec.tsx
|   |   |   |-- useForm.spec.tsx
|   |   |-- useFetcher.ts
|   |   |-- useForm.ts
|   |-- index.tsx
|   |-- pages
|   |   |-- NotFound.tsx
|   |   |-- __test__
|   |   |   |-- NotFound.spec.tsx
|   |-- setupTests.ts
|   |-- types
|   |   |-- Login.types.ts
|   |   |-- UseFetcher.types.ts
|   |   |-- UseForm.types.ts
|-- .eslintrc.cjs
|-- .prettierrc.cjs
|-- package.json
|-- package-lock.json
|-- tsconfig.json
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
