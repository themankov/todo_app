import task from '../components/task.js';
import { filterTasks } from '../api/index.js';
/**
 * Фильтрация задач
 *
 * @param {HTMLElement} container - Контейнер для отображения задач
 * @param {string} filter_by_priority - Фильтр по приоритету
 * @param {string} input_value - Фильтр по тексту
 * @param {string} sortByDate - Сортировка по дате
 * @param {string} sortByPriority - Сортировка по приоритету
 * @param {string[]} status - Список статусов
 */
export function displayFilter(container, filterByPriority, inputValue, sortByDate, sortByPriority, status) {
  filterTasks(filterByPriority, inputValue, sortByDate, sortByPriority, status).then((filteredArr) => {
    //очистка прошлого содержимого контейнера
    container.innerHTML = '';

    //добавление новых отфильтрованных элементов
    filteredArr.forEach((item) => {
      container.appendChild(task(item));
    });
  });
}
