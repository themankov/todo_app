import {
  taskList,
  taskSetting,
  filters,
  select,
  modal,
  validationModal,
} from './components/index.js';

//получение корневого  элемента для контента
const root = document.querySelector('.content_wrapper');
//добавление компонентов на страницу
root.appendChild(taskSetting(select));
root.appendChild(filters(select));
root.appendChild(await taskList());
root.appendChild(modal());
root.appendChild(validationModal());
