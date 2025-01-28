import { addTask, fetchTasks } from '../api/index.js';
import { taskItem } from './index.js';

/**
 * Создание формы для добавления задачи
 *
 * @param {Function} select - Функция для генерации кастомного select.
 * @returns {HTMLElement} - Форма добавления задачи
 */
export default function (select) {
  // Данные для select
  const priority_data = ['Низкий', 'Средний', 'Высокий'];

  // Создаём родительский элемент для формы
  const container = document.createElement('div');
  container.className = 'task_setting';

  // Внедрение разметки в форму
  container.innerHTML = `
            <form method="post" id='task_form'>
                <div class="priority_wrapper">
                    <label for="priority_select">Приоритет:</label>
                </div>
                <div class="text_wrapper">
                    <label for="priority_select">Текст задачи:</label>
                     <input type="text" placeholder="Введите текст..." id='text_input' value=''>
                </div>
                <button>Отправить</button>
            </form>
        `;

  //внедрение кастомного select в разметку
  const priority_wrapper = container.querySelector('.priority_wrapper');
  priority_wrapper.appendChild(select('priority_select', priority_data));

  //получение элементов формы
  const form = container.querySelector('#task_form');
  const input_text = container.querySelector('#text_input');
  const input_dropdown = container.querySelector('.dropdown_input_hidden');

  

 /**
   * Обработчик отправки формы
   */

  form.addEventListener('submit', async (e) => {
    //отмена redirect
    e.preventDefault();
    //проверка на пустую строку в input
    if (!input_text.value.trim()) {
      document.querySelector('.validation_modal').style.display = 'grid';
      return;
    }
    // Данные новой задачи
    const task_data = {
      text: input_text.value,
      priority: input_dropdown.value,
      status: 'active',
    };
    // Отправка данных и отображение новой задачи
    const res = await addTask(task_data);
    const tasks_block = document.querySelector('.tasks');
    //получение поля input блока фильтрации
    const filter_input=document.querySelector('.text_options > input')
    if(filter_input.value){
      console.log(filter_input)
      filter_input.value='';
      tasks_block.innerHTML='';
      const tasks=await fetchTasks();
      tasks.forEach((item)=>tasks_block.appendChild(taskItem(item)))
    }
    tasks_block.appendChild(taskItem(res));
    // Очистка поля ввода
    input_text.value = '';
  });
  return container;
}
