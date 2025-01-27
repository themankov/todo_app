import { fetchTasks, filterTasks } from '../api/index.js';
import task from './task.js';

export default async function () {
  const container = document.createElement('div');
  container.className = 'tasks';
  const tasks = await fetchTasks();
  tasks.forEach((item) => {
    container.appendChild(task(item));
  });
  const filter_by_priority_param = document.querySelector(
    '#filter_by_options_select'
  );
  const sort_by_priorities_param = document.querySelector(
    '#sort_by_priorities'
  );
  const status_options = Array.from(
    document.querySelectorAll(
      '.filter_by_status_option >.option > input:checked'
    )
  );

  // Изначально массив для статусов
  let status = status_options
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

  // Навешиваем обработчик на каждый checkbox
  status_options.forEach((checkbox) => {
    checkbox.addEventListener('change', async () => {
      status = status_options
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id);

      // Вызываем фильтрацию с новым массивом статусов
      const filteredArr = await filterTasks(
        filter_by_priority_param.value,
        input_text.value,
        sort_by_date_param.value,
        sort_by_priorities_param.value,
        status
      );

      container.innerHTML = '';
      filteredArr.forEach((item) => {
        container.appendChild(task(item));
      });
    });
  });

  const input_text = document.querySelector('.text_options > input');
  const sort_by_date_param = document.querySelector('#sort_by_date_select');
  [
    filter_by_priority_param,
    sort_by_priorities_param,
    sort_by_date_param,
  ].forEach((item) => {
    item.addEventListener('change', async (event) => {
      let sortByDate = sort_by_date_param.value;
      let sortByPriority = sort_by_priorities_param.value;

      if (event.target === sort_by_priorities_param) {
        sortByDate = '';
      } else if (event.target === sort_by_date_param) {
        sortByPriority = '';
      }

      const filteredArr = await filterTasks(
        filter_by_priority_param.value,
        input_text.value,
        sortByDate,
        sortByPriority,
        status
      );

      container.innerHTML = '';
      filteredArr.forEach((item) => {
        container.appendChild(task(item));
      });
    });
  });
  return container;
}
