const express = require('express');
const app = express();
app.use(express.json()); // Parse JSON bodies

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All – Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// Bonus (Array Filtering)
// GET /todos/active - Return only todos that are not completed
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter((t) => t.completed === false);
  res.status(200).json(activeTodos);
});

// GET /todos/completed
app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.status(200).json(completed);
});

// GET /todos/:id - Retrieve a single todo item by its ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.status(200).json(todo);
});

// POST New – Create
// POST /todos endpoint must require a task field
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task field is required' });
  }

  // Better ID generation to avoid duplicates after deletion
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

  const newTodo = {
    id: newId,
    task,
    completed: req.body.completed || false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});

// PUT Update – Replace/Update
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { task, completed } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task field is required' });
  }

  todos[index] = { id, task, completed: completed ?? todos[index].completed };
  res.status(200).json(todos[index]);
});

// PATCH Update – Partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  if (req.body.task !== undefined) todo.task = req.body.task;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.status(200).json(todo);
});

// DELETE Remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // Silent success
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error!' });
});

const PORT = 3002;
// Export for testing if needed, but for now just listen
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

module.exports = app;
