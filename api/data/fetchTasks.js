const API_URL = 'https://localhost:4200/items';

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await data.json();
  return tasks;
}
export default fetchTasks;
