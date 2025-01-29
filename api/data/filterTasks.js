import { fetchTasks } from '../index.js';

/**
 * Функция сравнения двух значений
 *
 * @param {number | Date} a - Первое значение для сравнения
 * @param {number | Date} b - Второе значение для сравнения
 * @param {string} key - Ключ, определяющий направление сортировки
 * @param {Object} sortOrder - Объект, содержащий аналоговые значения для сортировки
 * @returns {number} - Результат сравнения
 */
const compareValues = (a, b, isAscending) => {
  if (a > b) return isAscending ? 1 : -1;
  if (a < b) return isAscending ? -1 : 1;
  return 0;
};

/**
 * Фильтрует и сортирует список задач
 *
 * @param {string} filter_priority - Фильтр по приоритету
 * @param {string} text - Фильтр по тексту
 * @param {string} sort_date - Сортировка по дате
 * @param {string} sort_status - Сортировка по приоритету
 * @param {Array<string>} filter_status - Список статусов
 * @returns {Array<Object>} Массив отфильтрованных и отсортированных задач
 */

export default function (filter_priority, text, sort_date, sort_status, filter_status) {
  //инициализация объектов для переопределения текстовых значений в ранговый формат
  const statusPriority = {
    'high': 3,
    'middle': 2,
    'low': 1,
    'any': 0,
  };

  const statusSort = {
    'up': 1,
    'down': 0,
  };

  //получение всех задач
  return fetchTasks().then((tasks) => {
    //фильтрация задач
    const filteredArr = tasks.filter((task) => {
      if (statusPriority[filter_priority] && task.priority !== filter_priority) {
        return false;
      }
      if (text && !task.text.toLowerCase().includes(text.toLowerCase())) {
        return false;
      }
      if (filter_status && !filter_status.some((status) => status === task.status)) {
        return false;
      }
      return true;
    });

    //сортировка задач
    filteredArr.sort((a, b) => {
      if (sort_date) {
        return compareValues(new Date(a.date), new Date(b.date), statusSort[sort_date]);
      }
      if (sort_status) {
        return compareValues(statusPriority[a.priority], statusPriority[b.priority], statusSort[sort_status]);
      }
      return 0;
    });
    return filteredArr;
  });
}
