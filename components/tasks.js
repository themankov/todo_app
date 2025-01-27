import { filterTasks } from '../api/index.js';

export default function () {
  const container = document.createElement('div');
  container.className = 'tasks';
  const filter_by_priority_param = document.querySelector(
    '#filter_by_options_select'
  );
  const sort_by_priorities_param = document.querySelector(
    '#sort_by_priorities'
  );
  const status_options=Array.from(document.querySelectorAll('.filter_by_status_option >.option > input:checked'))
  const input_text=document.querySelector('.text_options > input')
  const sort_by_date_param = document.querySelector('#sort_by_date_select');
  [
    filter_by_priority_param,
    sort_by_priorities_param,
    sort_by_date_param,
    
  ].forEach((item) => {
    item.addEventListener('change', async() => {
      await filterTasks(
        filter_by_priority_param.value,
        input_text.value,
        sort_by_date_param.value,
        sort_by_priorities_param.value,
        status
      );
    });
  });
  return container;
}
