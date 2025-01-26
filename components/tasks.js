import { filterTasks } from '../api/index.js';

export default function () {
  const container = document.createElement('div');
  container.className = 'tasks';
  const filter_by_options_param = document.querySelector(
    '#filter_by_options_select'
  );
  const sort_by_priorities_param = document.querySelector(
    '#sort_by_priorities'
  );
  const sort_by_date_param = document.querySelector('#sort_by_date_select');
  [
    filter_by_options_param,
    sort_by_priorities_param,
    sort_by_date_param,
  ].forEach((item) => {
    item.addEventListener('change', () => {
      filterTasks(
        filter_by_options_param.value,
        sort_by_priorities_param.value,
        sort_by_date_param.value
      );
    });
  });
  return container;
}
