import { fetchTasks, filterTasks } from '../api/index.js';
import debounce from '../utils/debounce.js';
import task from './task.js';

/**
 * Фильтрация задач
 *
 * @async
 * @function displayFilter
 * @param {HTMLElement} container - Контейнер для отображения задач
 * @param {string} filter_by_priority - Фильтр по приоритету
 * @param {string} input_value - Фильтр по тексту
 * @param {string} sortByDate - Сортировка по дате
 * @param {string} sortByPriority - Сортировка по приоритету
 * @param {string[]} status - Список статусов
 */

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

  //очистка прошлого содержимого контейнера
  container.innerHTML = '';

  //добавление новых отфильтрованных элементов
  filteredArr.forEach((item) => {
    container.appendChild(task(item));
  });
}

/**
 * Создание блока задач
 *
 * @async
 * @function
 * @returns {HTMLElement} - Блок с загруженными задачами
 */

export default async function () {
  // Создаём родительский элемент для задач
  const container = document.createElement('div');
  container.className = 'tasks';

  //Получение элементов формы фильтрации
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
  const sort_by_date_param = document.querySelector('#sort_by_date_select');

//инициализация первичного массива status
  let status = status_options
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

 // Подгрузка задач с сервера и отображение их внутри родительского элемента

 await displayFilter(
  container,
  filter_by_priority_param.value,
  input_text.value,
  sort_by_date_param.value,
  '',
  status
);

//задержка вызова функции на 1сек при частом вводе в input
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

  
 /**
   * Обработчик фильтрации задач по строке
   */
  input_text.addEventListener('input', (e) => {
    if(!!e.target.value.trim() & e.target.value.length<2)return
    debouncedTextInput(e.target.value);
  });

//навешивание обработчика изменения состояния на каждый option
  status_options.forEach((checkbox) => {
    checkbox.addEventListener('change', async () => {

      //меняем начальный массив
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

 //навешивание обработчиков изменения состояния на каждый select
  [
    filter_by_priority_param,
    sort_by_priorities_param,
    sort_by_date_param,
  ].forEach((item) => {
    item.addEventListener('change', async (event) => {
      let sortByDate = sort_by_date_param.value;
      let sortByPriority = sort_by_priorities_param.value;

      //проверка всплытия на конкретном элементе сортировки
      if (event.target === sort_by_priorities_param) {
        sortByDate = '';
        //default style для активной сортировки
        document
          .querySelector('.sort_by_priorities')
          .classList.remove('opacity');
          //затемнение неактивной сортировки
        document.querySelector('.sort_by_date').classList.add('opacity');
      } else if (event.target === sort_by_date_param) {
        sortByPriority = '';
        document.querySelector('.sort_by_date').classList.remove('opacity');
        document.querySelector('.sort_by_priorities').classList.add('opacity');
      }
      debugger
      await displayFilter(
        container,
        filter_by_priority_param.value,
        input_text.value,
        sortByDate,
        sortByPriority,
        status
      );
    });
  });
  return container;
}
