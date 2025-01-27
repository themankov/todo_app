import {
  tasks,
  taskSetting,
  filters,
  select,
  modal,
} from './components/index.js';
const root = document.querySelector('.content_wrapper');
root.appendChild(taskSetting(select));
root.appendChild(filters(select));
root.appendChild(await tasks());
root.appendChild(modal());
