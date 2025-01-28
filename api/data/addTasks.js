const API_URL = 'http://localhost:4200/items';

/**
 * Отправляет новую задачу на сервер и добавляет дату
 *
 * @async
 * @function addTask
 * @param {Object} data - Данные задачи
 * @param {string} data.text - Текст 
 * @param {string} data.priority - Приоритет 
 * @param {string} data.status - Статус 
 * @returns {Object} Возвращает объект с созданной задачей.
 * @throws {Error} Ошибка, если запрос не удался.
 */

async function addTask(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, date: new Date() }),
  });
  if (!response.ok) {
    throw new Error(`Ошибка при добавлении задачи: ${response.statusText}`);
}
  const task = await response.json();
  return task;
}
export default addTask;
