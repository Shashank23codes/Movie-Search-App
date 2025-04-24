# Movie Search App

A modern React application that allows users to search and discover movies using TMDB API and Appwrite backend. Built with React, Vite, and TailwindCSS.

## Features

- Search through thousands of movies
- View trending movie searches
- Real-time search with debouncing
- Responsive grid layout
- Movie details including ratings, language, and release year
- Trending movies tracking using Appwrite backend

## Tech Stack

- React 19
- Vite 6
- TailwindCSS 4
- Appwrite (Backend as a Service)
- TMDB API for movie data

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a .env.local file in the root directory with your API keys:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```
4. Start the development server:
```bash
npm run dev
```

## Scripts
- npm run dev - Start development server
- npm run build - Build for production
- npm run lint - Run ESLint
- npm run preview - Preview production build

## Project Structure

Movie-Search-App/
├── public/              # Static assets
├── src/
│   ├── components/     # React components
│   ├── appwrite.js     # Appwrite configuration
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
└── package.json        # Project dependencies and scripts

## Contributing
Feel free to submit issues and pull requests.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Development Notes
For production applications, consider using TypeScript and enabling type-aware lint rules. The project can be easily migrated to TypeScript using the official Vite TypeScript template.

Key improvements made:
1. Corrected version numbers to match package.json
2. Removed duplicate headers
3. Added backticks around npm commands for better readability
4. Reorganized the ESLint section into a more general "Development Notes" section
5. Improved code block formatting with proper language identifiers
6. Maintained all existing functionality while improving organization and accuracy

## Author

- Github - [Shashank Gupta](https://github.com/Shashank23codes)
- Linkdin - [Shashank Gupta](https://www.linkedin.com/in/shashank-gupta-238a96209)