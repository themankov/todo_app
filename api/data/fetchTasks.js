const API_URL = 'http://localhost:4200/items';

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  return tasks;
}
export default fetchTasks;
