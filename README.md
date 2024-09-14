# DataRace AI

DataRace AI is a cutting-edge platform designed for data scientists and AI enthusiasts to compete in data-driven challenges.

## Table of Contents
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

## Installation
To get started, clone the repository and install dependencies:

```bash
git clone git@github.com:aaicenter/datarace-web-client.git
cd datarace-web-client
npm install
```

## Scripts
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Run linter checks.
- **`npm run test`**: Run unit tests using Jest.
- **`npm run test:watch`**: Run tests in watch mode.

## Dependencies
- **React**: UI library.
- **Next.js**: React framework.
- **Redux Toolkit**: State management.
- **React Hook Form**: Form handling.
- **Tailwind CSS**: Utility-first CSS framework.

## Development
Run the development server:

```bash
npm run dev
```

## Testing
Jest is used for unit testing. To run tests:

```bash
npm run test
```

## Environment Variables
Set up your environment variables in `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```
---

🎉 **Happy Coding!** 😊
