import { fetchTasks, filterTasks } from '../api/index.js';
import debounce from '../utils/debounce.js';
import task from './task.js';

async function displayFilter(
  container,
  filter_by_priority,
  input_value,
  sortByDate,
  sortByPriority,
  status
) {
  const filteredArr = await filterTasks(
    filter_by_priority,
    input_value,
    sortByDate,
    sortByPriority,
    status
  );

  container.innerHTML = '';
  filteredArr.forEach((item) => {
    container.appendChild(task(item));
  });
}

export default async function () {
  const container = document.createElement('div');
  container.className = 'tasks';
  const tasks = await fetchTasks();
  tasks.forEach((item) => {
    container.appendChild(task(item));
  });

  const input_text = document.querySelector('.text_options > input');

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

  let status = status_options
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);
  const debouncedTextInput = debounce((value) => {
    displayFilter(
      container,
      filter_by_priority_param.value,
      value,
      sort_by_date_param.value,
      sort_by_priorities_param.value,
      status
    );
  }, 1000);
  input_text.addEventListener('input', (e) => {
    debouncedTextInput(e.target.value);
  });

  status_options.forEach((checkbox) => {
    checkbox.addEventListener('change', async () => {
      status = status_options
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id);

      await displayFilter(
        container,
        filter_by_priority_param.value,
        input_text.value,
        sort_by_date_param.value,
        sort_by_priorities_param.value,
        status
      );
    });
  });

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
        document
          .querySelector('.sort_by_priorities')
          .classList.remove('opacity');
        document.querySelector('.sort_by_date').classList.add('opacity');
      } else if (event.target === sort_by_date_param) {
        sortByPriority = '';
        document.querySelector('.sort_by_date').classList.remove('opacity');
        document.querySelector('.sort_by_priorities').classList.add('opacity');
      }
      await displayFilter(
        container,
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
