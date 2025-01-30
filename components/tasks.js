import debounce from '../utils/debounce.js';
import { displayFilter } from '../utils/displayFilter.js';
import { changeStatus } from '../utils/changeStatus.js';

/**
 * Создание блока задач
 *
 * @returns {HTMLElement} - Блок с загруженными задачами
 */
export default function () {
  // Создаём родительский элемент для задач
  const container = document.createElement('div');
  container.className = 'tasks';

  //Получение элементов формы фильтрации
  const inputText = document.querySelector('.filter__search > input');
  const filterByPriorityParam = document.querySelector('#filter_by_options_select');
  const sortByPrioritiesParam = document.querySelector('#sort_by_priorities');
  const statusOptions = Array.from(document.querySelectorAll('.filter__status_options >.filter__status_option > input:checked'));
  const sortByDateParam = document.querySelector('#sort_by_date_select');

  //инициализация первичного массива status
  let status = changeStatus(statusOptions);

  // Подгрузка задач с сервера и отображение их внутри родительского элемента
  displayFilter(container, filterByPriorityParam.value, inputText.value, sortByDateParam.value, '', status);

  //задержка вызова функции на 1сек при частом вводе в input
  const debouncedTextInput = debounce((value) => {
    displayFilter(container, filterByPriorityParam.value, value, sortByDateParam.value, sortByPrioritiesParam.value, status);
  }, 1000);

  /**
   * Обработчик фильтрации задач по строке
   */
  inputText.addEventListener('input', (event) => {
    if (!!event.target.value.trim() & (event.target.value.length < 2)) 
    return;
    debouncedTextInput(event.target.value);
  });

  //навешивание обработчика изменения состояния на каждый option
  statusOptions.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      //меняем начальный массив
      status = changeStatus(statusOptions);

      displayFilter(container, filterByPriorityParam.value, inputText.value, sortByDateParam.value, sortByPrioritiesParam.value, status);
    });
  });

  //навешивание обработчиков изменения состояния на каждый select
  [filterByPriorityParam, sortByPrioritiesParam, sortByDateParam].forEach((item) => {
    item.addEventListener('change', (event) => {
      //проверка всплытия на конкретном элементе сортировки
      if (event.target === sortByPrioritiesParam) {
        sortByDateParam.value = '';
        //default style для активной сортировки
        document.querySelector('.filter__sort-priority').classList.remove('opacity');
        //затемнение неактивной сортировки
        document.querySelector('.filter__sort-date').classList.add('opacity');
      } else if (event.target === sortByDateParam) {
        sortByPrioritiesParam.value = '';
        document.querySelector('.filter__sort-date').classList.remove('opacity');
        document.querySelector('.filter__sort-priority').classList.add('opacity');
      }
      displayFilter(container, filterByPriorityParam.value, inputText.value, sortByDateParam.value, sortByPrioritiesParam.value, status);
    });
  });
  return container;
}
