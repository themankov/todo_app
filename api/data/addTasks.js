const API_URL = 'http://localhost:4200/items';

async function addTask(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, date: new Date() }),
  });
  const task = await response.json();
  return task;
}
export default addTask;
