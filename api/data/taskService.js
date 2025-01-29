const API_URL = 'http://localhost:4200/items';

const taskService = {
  /**
   * Получение списка задач с сервера
   *
   * @returns {Object[]} Массив объектов задач
   * @throws {Error} Ошибка, если запрос не удался
   */
  fetchTasks() {
    return fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при получении задач: ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  },

  /**
   * Отправляет новую задачу на сервер и добавляет дату
   *
   * @param {Object} data - Данные задачи {текст, приоритет, статус}
   * @returns {Object} Возвращает объект с созданной задачей.
   * @throws {Error} Ошибка, если запрос не удался.
   */
  addTask(data) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        date: new Date(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при добавлении задачи: ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  },

  /**
   * Удаляет задачу с указанным идентификатором с сервера
   *
   * @param {number|string} id - Идентификатор задачи
   * @returns {Object} Возвращает объект с удаленной задачей
   * @throws {Error} Ошибка, если запрос не удался
   */

  deleteTask(id) {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при удалении задачи: ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  },

  /**
   * Обновление задачи по id
   *
   * @param {number|string} itemId - Идентификатор задачи
   * @param {Object} updateData - Объект с данными для обновления
   * @returns {Object} -Обновлённый объект задачи
   * @throws {Error} Выбрасывает ошибку, если запрос не удался
   */

  updateTask(itemId, updateData) {
    return fetch(`${API_URL}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  },
};

export default taskService;
