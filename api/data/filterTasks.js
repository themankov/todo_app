import { fetchTasks } from '../index.js';

/**
 * Функция сравнения двух значений
 *
 * @param {number | Date} a - Первое значение для сравнения
 * @param {number | Date} b - Второе значение для сравнения
 * @param {string}  isAscending - Аналоговое значение  ключа для сравнения
 * @returns {number} - Результат сравнения(-1,0,1)
 */
const compareValues = (a, b, isAscending) => {
  return Math.sign(a - b) * (isAscending ? 1 : -1);
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
export default function (filterPriority, text, sortDate, sortStatus, filterStatus) {
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
      return !((statusPriority[filterPriority] && task.priority !== filterPriority)||
      (text && !task.text.toLowerCase().includes(text.toLowerCase())||
      (filterStatus && !filterStatus.some((status) => status === task.status)))) 
    });

    //сортировка задач
    filteredArr.sort((currentTask, nextTask) => {
      if (sortDate) {
        return compareValues(new Date(currentTask.date), new Date(nextTask.date), statusSort[sortDate]);
      }
      if (sortStatus) {
        return compareValues(statusPriority[currentTask.priority], statusPriority[nextTask.priority], statusSort[sortStatus]);
      }
      return 0;
    });
    return filteredArr;
  });
}
