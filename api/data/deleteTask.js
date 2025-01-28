const API_URL = 'http://localhost:4200/items';

/**
 * Удаляет задачу с указанным идентификатором с сервера
 *
 * @async
 * @function deleteTask
 * @param {number|string} id - Идентификатор задачи
 * @returns {Object} Возвращает объект с удаленной задачей
 * @throws {Error} Ошибка, если запрос не удался
 */

async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Ошибка при удалении задачи: ${response.statusText}`);
}
  const task = await response.json();
  return task;
}
export default deleteTask;
