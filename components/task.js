import { updateTask } from '../api/index.js';
import { formatDate } from '../utils/formatDate.js';

/**
 * Создает и возвращает элемент задачи
 *
 * @param {Object} data - Данные о задаче(Идентификатор,Текст,Приоритет,Статус,Дата создания)
 * @returns {HTMLElement} Элемент задачи
 */
export default function (data) {
  const { id, text, priority, status, date } = data;
  //инициализация объекта для переопределения значения с сервера
  const statusPriority = {
    'high': 'Высокий',
    'middle': 'Средний',
    'low': 'Низкий',
  };
  // Создаём родительский элемент для задачи
  const container = document.createElement('div');
  container.className = 'task';
  container.id = id;
  // Вставляем разметку внутрь
  container.innerHTML = `
        <div class="${'task__priority ' + priority}">${statusPriority[priority]}</div>
          <div class="${'task__text ' + status}" data-status='${status}'>
        <textarea id='textarea_input' value=${text}>${text}</textarea>
        <div class="task__time">${formatDate(new Date(date))}</div>
         <div class="task__status">
            <img src="./icons/done.svg" alt="done" id='change_status_done'/>
            <img src="./icons/cross.svg" alt="canceled" id='change_status_cancel'/>
        </div>
    </div>
        <div class="task__delete">
          <img src="./icons/trash.svg" alt="trash" class='task__delete_btn'/>
        </div>
      `;

  //Получение элементов
  const textArea = container.querySelector('#textarea_input');
  const deleteBtn = container.querySelector('.task__delete_btn');
  const taskText = container.querySelector('.task__text');
  const changeStatusDone = container.querySelector('#change_status_done');
  const changeStatusCancel = container.querySelector('#change_status_cancel');

  /**
   * Обработчик обновления статуса задачи
   */
  [changeStatusDone, changeStatusCancel].forEach((button) => {
    button.addEventListener('click', (event) => {
      //проверка, на каком элементе всплыло нажатие
      if (event.target == changeStatusDone) {
        //обновление задачи на сервере
        updateTask(container.id, { status: 'done' }).then(() => {
          //динамическое обновление на странице
          taskText.style.backgroundColor = 'green';
          textArea.style.backgroundColor = 'green';
          changeStatusCancel.style.display = 'block';
          changeStatusDone.style.display = 'none';
        });
      } else {
        //обновление задачи на сервере
        updateTask(container.id, {
          status: 'canceled',
        }).then(() => {
          //динамическое обновление на странице
          taskText.style.backgroundColor = 'red';
          textArea.style.backgroundColor = 'red';
          changeStatusCancel.style.display = 'none';
          changeStatusDone.style.display = 'block';
        });
      }
    });
  });

  //расчитываем корректную высоту на следующем тике отрисовки
  setTimeout(() => {
    textArea.style.height = 'auto'; // Сбрасываем высоту
    textArea.style.height = `${textArea.scrollHeight}px`;
  }, 0);
  /**
   * Обработчик изменения размера textArea при увеличении текста
   */
  textArea.addEventListener('input', () => {
    textArea.style.height = `${textArea.scrollHeight / 10}rem`;
  });
  textArea.addEventListener('input', (event) => {
    updateTask(id, { text: event.target.value });
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
