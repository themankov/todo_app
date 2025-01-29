import { addTask, fetchTasks } from '../api/index.js';
import { taskItem } from './index.js';
import { displayFilter } from '../utils/displayFilter.js';
/**
 * Изменение статуса
 *
 * @param {HTMLElement[]} options - Массив элементов option
 * @returns {string[]} status - Массив выбранных идентификаторов
 */
function changeStatus(options) {
  return options.reduce((acc, checkbox) => {
    if (checkbox.checked) {
      acc.push(checkbox.id);
    }
    return acc;
  }, []);
}

/**
 * Создание формы для добавления задачи
 *
 * @param {Function} select - Функция для генерации кастомного select.
 * @returns {HTMLElement} - Форма добавления задачи
 */
export default function (select) {
  // Данные для select
  const filterPriorityData = [
    ['Низкий', 'low'],
    ['Средний', 'middle'],
    ['Высокий', 'high'],
  ];
  // Данные для проверки на наличие фильтрации
  const notRefreshableValues = new Set(['any', 'up']);
  // Создаём родительский элемент для формы
  const container = document.createElement('div');
  container.className = 'task_setting';

  // Внедрение разметки в форму
  container.innerHTML = `
            <form method="post" id='task_form' class='task-setting__form'>
                <div class="task-setting__priority">
                    <label for="priority_select">Приоритет:</label>
                </div>
                <div class="task-setting__text">
                    <label for="priority_select">Текст задачи:</label>
                     <input type="text" placeholder="Введите текст..." id='text_input' value=''>
                </div>
                <button>Отправить</button>
            </form>
        `;

  //внедрение кастомного select в разметку
  const priorityWrapper = container.querySelector('.task-setting__priority');
  priorityWrapper.appendChild(select('priority_select', filterPriorityData));

  //получение элементов формы
  const form = container.querySelector('#task_form');
  const inputText = container.querySelector('#text_input');
  const inputDropdown = container.querySelector('.dropdown_input_hidden');

  /**
   * Обработчик отправки формы
   */

  form.addEventListener('submit', (event) => {
    //отмена redirect
    event.preventDefault();
    //получение элементов блока фильтрации
    const tasksBlock = document.querySelector('.tasks');
    const filterInput = document.querySelector('.filter__search-input');
    const filterByPriorityParam = document.querySelector('#filter_by_options_select');
    const sortByPrioritiesParam = document.querySelector('#sort_by_priorities');
    const sortByDateParam = document.querySelector('#sort_by_date_select');
    const statusOptions = Array.from(document.querySelectorAll('.filter__status_options >.filter__status_option > input:checked'));

    //проверка на пустую строку в input
    if (!inputText.value.trim()) {
      document.querySelector('.validation-modal').style.display = 'grid';
      return;
    }
    // Данные новой задачи
    const taskData = {
      text: inputText.value,
      priority: inputDropdown.value,
      status: 'active',
    };
    // Отправка данных и отображение новой задачи
    addTask(taskData).then((res) => {
      //проверка на наличие фильтрации при добавлении нового элемента
      if (filterInput.value || statusOptions.length < 3 || !notRefreshableValues.has(filterByPriorityParam.value) || !notRefreshableValues.has(sortByDateParam.value)) {
        debugger;
        //очистка поля поиска
        filterInput.value = '';
        //возвращение статусов в исходное состояние
        let status = changeStatus(statusOptions);
        //удаление ранее отфильтрованного массива
        tasksBlock.innerHTML = '';
        displayFilter(tasksBlock, filterByPriorityParam.value, filterInput.value, sortByDateParam.value, sortByPrioritiesParam, status);
      } else {
        tasksBlock.appendChild(taskItem(res));
      }

      // Очистка поля ввода
      inputText.value = '';
    });
  });
  return container;
}
