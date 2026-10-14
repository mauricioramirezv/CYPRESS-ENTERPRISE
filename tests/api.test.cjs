const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createDemoApi } = require('../server/demo-api.cjs');
test('API: login, validación, persistencia y reinicio', async () => {
  const api = createDemoApi();
  const server = http.createServer((req, res) => api(req, res, () => { res.writeHead(404); res.end(); }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body) => fetch(url + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    let response = await post('/api/login', { username: 'admin', password: 'admin123' });
    assert.equal(response.status, 200); assert.deepEqual((await response.json()).user, { username: 'admin' });
    response = await post('/api/login', { username: 'otro', password: 'admin123' });
    assert.equal(response.status, 401); assert.equal((await response.json()).error, 'Credenciales inválidas');
    assert.equal((await post('/api/login', {})).status, 400);
    assert.equal((await post('/api/users', { name: 'C', email: 'mal' })).status, 400);
    response = await post('/api/users', { name: 'Carla', email: 'carla@example.com' });
    assert.equal(response.status, 201); const created = await response.json();
    response = await fetch(url + '/api/users');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    const users = await response.json(); assert.equal(users.length, 3); assert.deepEqual(users[2], created);
    assert.equal((await post('/api/reset', {})).status, 200);
    assert.equal((await (await fetch(url + '/api/users')).json()).length, 2);
    assert.equal((await fetch(url + '/api/login', { method: 'POST', body: '{' })).status, 400);
    assert.equal((await fetch(url + '/api/unknown')).status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
