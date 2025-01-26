import { addTask } from '../api/index.js';
import { task } from './index.js';
export default function (select) {
  const priority_data = ['Низкий', 'Средний', 'Высокий'];
  const container = document.createElement('div');
  container.className = 'task_setting';
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
  const priority_wrapper = container.querySelector('.priority_wrapper');
  priority_wrapper.appendChild(select('priority_select', priority_data));

  const form = container.querySelector('#task_form');
  const input_text = container.querySelector('#text_input');
  const input_dropdown = container.querySelector('.dropdown_input_hidden');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task_data = {
      text: input_text.value,
      priority: input_dropdown.value,
      status: 'active',
    };
    const res = await addTask(task_data);
    const tasks_block = document.querySelector('.tasks');
    tasks_block.appendChild(task(res));
    input_text.value = '';
  });
  return container;
}
