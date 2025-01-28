import { fetchTasks } from '../index.js';

/**
 * Фильтрует и сортирует список задач
 *
 * @async
 * @function
 * @param {string} filter_priority - Фильтр по приоритету
 * @param {string} text - Фильтр по тексту 
 * @param {string} sort_date - Сортировка по дате 
 * @param {string} sort_status - Сортировка по приоритету
 * @param {Array<string>} filter_status - Список статусов
 * @returns {Array<Object>} Массив отфильтрованных и отсортированных задач
 */

export default async function (
  filter_priority,
  text,
  sort_date,
  sort_status,
  filter_status
) {
  //инициализация объекта для переопределение текстового значения в ранговый формат
  const statusPriority = {
    Высокий: 3,
    Средний: 2,
    Низкий: 1,
  };

  //получение всех задач
  const tasks = await fetchTasks();
  //фильтрация задач
  const filteredArr = tasks.filter((item) => {
    const matchPriority =
      filter_priority === 'Любой' ? true : item.priority === filter_priority;
    const matchText = text
      ? item.text.toLowerCase().includes(text.toLowerCase())
      : true;
    const matchStatus = !filter_status
      ? false
      : filter_status.some((el) => el === item.status);

    return matchPriority && matchText && matchStatus;
  });

  //сортировка задач
  filteredArr.sort((a, b) => {
    if (sort_date) {
      const direction = sort_date.split(' ')[2] == '▲' ? 1 : -1;
      return direction * (new Date(a.date) - new Date(b.date));
    }
    if (sort_status) {
      const direction = sort_status.split(' ')[1] == '▲' ? 1 : -1;
      return (
        direction * (statusPriority[a.priority] - statusPriority[b.priority])
      );
    }
    return 0;
  });
  return filteredArr;
}
