const API_URL = 'http://localhost:4200/items';

/**
 * Получение списка задач с сервера
 *
 * @async
 * @function fetchTasks
 * @returns {Object[]} Массив объектов задач
 * @throws {Error} Ошибка, если запрос не удался
 */

async function fetchTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Ошибка при получении задач: ${response.statusText}`);
}

  const tasks = await response.json();

  return tasks;
}
export default fetchTasks;
