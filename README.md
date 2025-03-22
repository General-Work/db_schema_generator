# Database Schema Generator

This project is a web application that assists users in designing their own database schemas through an interactive AI-powered experience. Users answer a series of guided questions posed by an AI model, and based on their responses, the system generates a complete database schema for their project. Each generated schema is treated as an individual project, accessible via its own unique URL.

## Features

### 1. Interactive AI-Powered Q&A:

- Users interact with an AI model to define their database requirements.
- The AI asks relevant questions and generates a schema based on user responses.

### 2. Schema Generation:

- Supports both SQL and NoSQL schemas (currently implemented for SQL).
- Schemas are generated in JSON format and can be converted to SQL or other formats.

### 3. Conversation History:

- All interactions with the AI are stored as conversation history.
- Users can revisit and edit their schemas by continuing the conversation.

### 4. Project Management:

- Each schema is saved as a project with a unique URL.
- Users can view, edit, and save their schemas.

### 5. Backend Built with NestJS:

- Modular and scalable architecture.
- Integration with PostgreSQL for data storage.
- OpenAI API for AI-powered schema generation.

## Technology Stack

### Backend

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript, used to interact with the PostgreSQL database.
- **PostgreSQL**: A powerful, open-source relational database system for storing projects and conversations.
- **OpenAI API**: Used to power the AI-driven Q&A session and schema generation.

### Frontend

- **SvelteKit**: A modern Javascript framework for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.

### Package Manager

- **PNPM**: A fast, disk-space-efficient package manager for Node.js. It is preferred because:
  - **Faster Installations**: PNPM uses a content-addressable filesystem, which allows it to install packages faster than npm or Yarn.
  - **Disk Space Efficiency**: PNPM stores packages in a single global store, reducing disk space usage by avoiding duplicate installations.
  - **Strict Dependency Resolution**: PNPM ensures that dependencies are resolved strictly, reducing the risk of dependency conflicts.

## Design Decisions

### 1. AI Integration:

- The AI model (OpenAI's GPT-4o) is used to generate database schemas based on user input.
- The AI asks questions to understand the user's requirements and generates a schema in JSON format.
- Conversation history is stored to allow users to revisit and edit their schemas.

### 2. Schema Storage:

- Schemas are stored as JSONB in PostgreSQL for flexibility.
- This allows for easy retrieval and manipulation of schema data.

### 3. Modular Architecture:

The backend is divided into modules (ai, conversations, projects) for better maintainability and scalability.

## Setup Instructions

### Prerequisites

1. **Node.js**: Install Node.js (v16 or higher).
2. **PostgreSQL**: Install and set up PostgreSQL.
3. **OpenAI API Key**: Obtain an API key from OpenAI.

### Environment Variables

#### Backend

1. Navigate the backend directory

```bash
cd api
```

2. Install dependencies using PNPM:

```bash
pnpm install
```

Enough though any other package manage can be.

3. Set up environment variables:
   - Create a .env file in the root directory:

```env
OPENAI_API_KEY=
DATABASE_URL=
```

4. Start the backend server

```bash
pnpm run start:dev
```

#### Frontend

1. Navigate to the frontend directory

```bash
cd web
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables:
   - Create a .env file in the root directory:

```env
VITE_SERVER_URL=
```

4. Start frontend server

```bash
pnpm run dev
```
