# AI Prompt Library Project

## Overview

This project is a modern web application designed to showcase AI prompts for team productivity. It's built with React on the frontend and Express on the backend, with a PostgreSQL database managed through Drizzle ORM. The application follows a client-server architecture with shared schema types.

The frontend uses a comprehensive UI component library (shadcn/ui) based on Radix UI primitives with Tailwind CSS for styling. The application includes interactive prompt cards, category filtering, and modal views for prompt details with copy-to-clipboard functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **React**: Single-page application with client-side routing using Wouter
- **UI Components**: Built with shadcn/ui (based on Radix UI primitives)
- **Styling**: Tailwind CSS with a custom theme configuration
- **State Management**: React Query for server state
- **Animation**: Framer Motion for UI animations
- **TypeScript**: For type safety throughout the application

### Backend

- **Express.js**: Handles API requests and serves the static frontend
- **Drizzle ORM**: Database query builder with PostgreSQL adapter
- **Storage Interface**: Abstraction for data access with in-memory implementation for development

### Data Flow

1. Client makes requests to the server's API endpoints (prefixed with `/api`)
2. Server processes requests through appropriate route handlers
3. Route handlers use the storage interface to interact with the database
4. Server returns JSON responses to the client
5. React Query on the client manages caching and refetching of data

## Key Components

### Client Components

- **App.tsx**: Main application component with routing setup
- **Pages**: Home and NotFound pages
- **UI Components**: Comprehensive set of reusable components (buttons, cards, modals, etc.)
- **Hooks**: Custom hooks for data fetching and UI state management
- **Utilities**: Helper functions for common tasks

### Server Components

- **index.ts**: Express server setup with middleware configuration
- **routes.ts**: API route definitions
- **storage.ts**: Data access interface with memory implementation
- **vite.ts**: Development server configuration

### Shared Components

- **schema.ts**: Database schema definitions with Drizzle and validation with Zod

## Data Flow

1. Frontend components render prompt data either from local state or from API calls
2. User interactions (filtering, viewing prompts) trigger state changes or API requests
3. The backend API processes requests and interacts with the database via the storage interface
4. Responses flow back to the frontend where React Query manages the data cache

## External Dependencies

### Frontend Libraries

- Radix UI primitives for accessible UI components
- TanStack React Query for data fetching and caching
- Tailwind CSS for styling
- Framer Motion for animations
- Wouter for routing

### Backend Libraries

- Express for HTTP server and API routes
- Drizzle ORM for database operations
- Zod for schema validation

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**: `npm run dev` runs the Vite dev server with hot module replacement
2. **Build Process**: `npm run build` compiles the frontend with Vite and backend with esbuild
3. **Production Mode**: `npm run start` serves the compiled application from the `dist` directory

The deployment target is set to "autoscale" with port 5000 mapped to external port 80. The database uses Drizzle ORM with a PostgreSQL connection.

## Development Workflow

1. Start the development server: `npm run dev`
2. Make changes to frontend or backend code
3. For database schema changes, update `shared/schema.ts` and run `npm run db:push`
4. Build for production: `npm run build`
5. Deploy the application: automatically handled by Replit

## Future Considerations

- Implementation of authentication using the user schema already defined
- Expanding the API routes for full CRUD operations on prompts
- Implementing server-side filtering and pagination for prompts
- Adding user-specific collections or favorites