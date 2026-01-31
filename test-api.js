const request = require('supertest');
const app = require('./app');

async function runTests() {
  console.log('Starting tests...');
  let failed = false;

  const check = (condition, message, ...details) => {
    if (condition) {
      console.log(`✅ ${message} passed`);
    } else {
      console.error(`❌ ${message} failed`, ...details);
      failed = true;
    }
  };

  // Test GET /todos
  let res = await request(app).get('/todos');
  check(res.status === 200 && Array.isArray(res.body), 'GET /todos');

  // Test POST /todos (Success)
  res = await request(app)
    .post('/todos')
    .send({ task: 'Test Task' });
  check(res.status === 201 && res.body.task === 'Test Task' && res.body.id === 3, 'POST /todos (Success)', res.body);

  // Test POST /todos (Failure - missing task)
  res = await request(app)
    .post('/todos')
    .send({ completed: true });
  check(res.status === 400 && res.body.error === 'Task field is required', 'POST /todos (Validation)', res.status, res.body);

  // Test GET /todos/:id
  res = await request(app).get('/todos/1');
  check(res.status === 200 && res.body.id === 1, 'GET /todos/:id');

  // Test GET /todos/:id (Not Found)
  res = await request(app).get('/todos/999');
  check(res.status === 404, 'GET /todos/:id (404)');

  // Test GET /todos/active
  res = await request(app).get('/todos/active');
  const allActive = res.body.every(t => t.completed === false);
  check(res.status === 200 && allActive, 'GET /todos/active');

  // Test PUT /todos/:id
  res = await request(app)
    .put('/todos/1')
    .send({ task: 'Updated Task', completed: true });
  check(res.status === 200 && res.body.task === 'Updated Task' && res.body.completed === true, 'PUT /todos/:id', res.body);

  // Test DELETE /todos/:id
  res = await request(app).delete('/todos/1');
  check(res.status === 204, 'DELETE /todos/:id');

  // Test ID Generation after delete
  res = await request(app)
    .post('/todos')
    .send({ task: 'New Task After Delete' });
  // ID should be 4 (max of 2, 3 + 1)
  check(res.status === 201 && res.body.id === 4, 'ID Generation after delete', res.body);

  if (failed) {
    console.log('Some tests failed.');
    process.exit(1);
  } else {
    console.log('All tests passed.');
  }
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
