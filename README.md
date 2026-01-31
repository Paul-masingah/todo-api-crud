# Todo API CRUD - Enhanced

This is an enhanced version of the Week 3 Todo API, featuring full CRUD functionality and additional filtering capabilities.

## Features

- **Full CRUD**: Create, Read, Update, and Delete todo items.
- **GET /todos/:id**: Retrieve a single todo item by its unique ID.
- **POST Validation**: Ensures that new todo items include a `task` field.
- **Array Filtering**:
  - `GET /todos/active`: Retrieve todos that are not yet completed (`completed === false`).
  - `GET /todos/completed`: Retrieve todos that are completed.
- **Improved ID Generation**: Automatically assigns the next available unique ID.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/todos` | Fetch all todo items |
| GET    | `/todos/active` | Fetch only active (incomplete) todo items |
| GET    | `/todos/completed` | Fetch only completed todo items |
| GET    | `/todos/:id` | Fetch a single todo item by ID |
| POST   | `/todos` | Create a new todo item (Requires `task`) |
| PUT    | `/todos/:id` | Update/Replace an existing todo item |
| PATCH  | `/todos/:id` | Partially update an existing todo item |
| DELETE | `/todos/:id` | Remove a todo item |

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the server:
```bash
npm start
```
The server will run on `http://localhost:3002`.

### Running Tests

Execute the test suite to verify functionality:
```bash
npm test
```

## License

This project is licensed under the MIT License.
