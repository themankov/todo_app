const API_URL = 'http://localhost:4200/items';

async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  const task = await response.json();
  return task;
}
export default deleteTask;
