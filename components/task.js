import { formatDate } from '../utils/formatDate.js';

export default function (data) {
  const { id, text, priority, status, date } = data;
  const container = document.createElement('div');
  container.className = 'task';
  container.id = id;
  container.innerHTML = `
        <div class="task_priority" data-priority="${priority}">${priority}</div>
          <div class="task_text">
        <textarea id='textarea_input'>${text}</textarea>
        <div class="task_time">${formatDate(new Date(date))}</div>
    </div>
        <div class="task_delete">
          <img src="./icons/trash.svg" alt="trash" class='task_delete_btn'/>
        </div>
      `;
  const textArea = container.querySelector('#textarea_input');
  const deleteBtn = container.querySelector('.task_delete_btn');

  textArea.addEventListener('input', () => {
    textArea.style.height = `${textArea.scrollHeight / 10}rem`;
  });

  deleteBtn.addEventListener('click', () => {
    const modalWindow = document.querySelector('.modal');
    modalWindow.style.display = 'flex';
    modalWindow.setAttribute('data-id', container.id);
  });
  return container;
}
