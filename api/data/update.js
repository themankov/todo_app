const API_URL = 'http://localhost:4200/items';

/**
 * Обновление задачи по id
 *
 * @async
 * @function
 * @param {number|string} itemId - Идентификатор задачи
 * @param {Object} updateData - Объект с данными для обновления
 * @param {string} [updateData.text] - Новый текст
 * @param {string} [updateData.priority] - Новый приоритет 
 * @param {string} [updateData.status] - Новый статус 
 * @returns {Object} -Обновлённый объект задачи
 * @throws {Error} Выбрасывает ошибку, если запрос не удался
 */

async function updateItem(itemId, updateData) {
  try {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}
export default updateItem;
