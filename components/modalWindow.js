import { deleteTask } from '../api/index.js';

export default function () {
  const container = document.createElement('div');
  container.className = 'modal';
  container.innerHTML = `
  <div class="modal_wrapper">
  <h1 class="modal_text">Вы уверены, что хотите удалить задачу?</h1>
      <div class="modal_btns">
        <button class="btn_confirm">Да</button>
        <button class="btn_cancel">Нет</button>
      </div>
  </div>    
  `;
  const btn_confirm = container.querySelector('.btn_confirm');
  const btn_cancel = container.querySelector('.btn_cancel');
  btn_confirm.addEventListener('click', async () => {
    container.style.display = 'none';
    const task = await deleteTask(container.dataset.id);
    document.getElementById(task.id).remove();
  });
  btn_cancel.addEventListener('click', () => {
    container.style.display = 'none';
  });
  return container;
}
