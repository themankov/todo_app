import { updateTask } from '../api/index.js';
import { formatDate } from '../utils/formatDate.js';

/**
 * Создает и возвращает элемент задачи
 *
 * @param {Object} data - Данные о задаче
 * @param {number} data.id - Идентификатор 
 * @param {string} data.text - Текст 
 * @param {string} data.priority - Приоритет 
 * @param {string} data.status - Статус 
 * @param {string} data.date - Дата создания
 * @returns {HTMLElement} Элемент задачи
 */

export default function (data) {
  const { id, text, priority, status, date } = data;

  // Создаём родительский элемент для задачи
  const container = document.createElement('div');
  container.className = 'task';
  container.id = id;
  // Вставляем разметку внутрь
  container.innerHTML = `
        <div class="task_priority" data-priority="${priority}">${priority}</div>
          <div class="task_text" data-status='${status}'>
        <textarea id='textarea_input'>${text}</textarea>
        <div class="task_time">${formatDate(new Date(date))}</div>
         <div class="change_status_block">
            <img src="./icons/done.svg" alt="done" id='change_status_done'/>
            <img src="./icons/cross.svg" alt="canceled" id='change_status_cancel'/>
        </div>
    </div>
        <div class="task_delete">
          <img src="./icons/trash.svg" alt="trash" class='task_delete_btn'/>
        </div>
      `;
  
  //Получение элементов 
  const textArea = container.querySelector('#textarea_input');
  const deleteBtn = container.querySelector('.task_delete_btn');
  const taskText = container.querySelector('.task_text');
  const change_status_done = container.querySelector('#change_status_done');
  const change_status_cancel = container.querySelector('#change_status_cancel');

   /**
   * Обработчик обновления статуса задачи
   */
  [change_status_done, change_status_cancel].forEach((item) => {
    item.addEventListener('click', async (e) => {

      //проверка, на каком элементе всплыло нажатие
      if (e.target == change_status_done) {

        //обновление задачи на сервере
        await updateTask(container.id, { status: 'done' });

        //динамическое обновление на странице
        taskText.style.backgroundColor = 'green';
        textArea.style.backgroundColor = 'green';
        change_status_cancel.style.display = 'block';
        change_status_done.style.display = 'none';
      } else {
        //обновление задачи на сервере
        await updateTask(container.id, {
          status: 'canceled',
        });

        //динамическое обновление на странице
        taskText.style.backgroundColor = 'red';
        textArea.style.backgroundColor = 'red';
        change_status_cancel.style.display = 'none';
        change_status_done.style.display = 'block';
      }
    });
  });

  /**
   * Обработчик изменения размера textArea при увеличении текста
   */
  textArea.addEventListener('input', () => {
    textArea.style.height = `${textArea.scrollHeight / 10}rem`;
  });

  /**
   * Обработчик подтверждения удаления задачи
   */
  deleteBtn.addEventListener('click', () => {
    const modalWindow = document.querySelector('.modal');
    modalWindow.style.display = 'flex';

    //передача в data-атрибут идентификатор задачи для возможного удаления
    modalWindow.setAttribute('data-id', container.id);
  });
  return container;
}
