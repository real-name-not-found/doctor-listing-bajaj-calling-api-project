# Doctor Listing Page

This project is a React application that displays a list of doctors with filtering, sorting, and search functionality.

## Features

- Search doctors by name with autocomplete suggestions
- Filter doctors by consultation type (Video Consult, In Clinic)
- Filter doctors by specialties (multiple selections)
- Sort doctors by fees (low to high) or experience (high to low)
- Responsive design for all screen sizes
- URL query params for saving filter state

## Tech Stack

- React with TypeScript
- React Router for URL query params
- Axios for API requests
- CSS for styling

## Setup and Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Start the development server:
```
npm start
```
4. The application will be available at http://localhost:3000

## API

The application uses the following API to fetch doctor data:
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```

All filtering, searching, and sorting is done on the frontend.

## Project Structure

- `src/components`: React components
- `src/hooks`: Custom hooks
- `src/services`: API service
- `src/types`: TypeScript types

## Build for Production

To build the application for production, run:
```
npm run build
```

This will create an optimized build in the `build` folder.
