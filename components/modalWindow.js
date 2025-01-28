import { deleteTask } from '../api/index.js';

/**
 * Создаёт и возвращает модальное окно удаления задачи.
 *
 * @returns {HTMLDivElement} - Блок модального окна.
 */

export default function () {
  // Создаём корневой контейнер для модального окна
  const container = document.createElement('div');
  container.className = 'modal';

  // Вставляем разметку
  container.innerHTML = `
  <div class="modal_wrapper">
  <h1 class="modal_text">Вы уверены, что хотите удалить задачу?</h1>
      <div class="modal_btns">
        <button class="btn_confirm">Да</button>
        <button class="btn_cancel">Нет</button>
      </div>
  </div>    
  `;

  // Получаем кнопки
  const btn_confirm = container.querySelector('.btn_confirm');
  const btn_cancel = container.querySelector('.btn_cancel');

  /**
   * Обработчик удаления задачи по клику.
   */
  btn_confirm.addEventListener('click', async () => {
    container.style.display = 'none';

    // Удаление задачи с сервера
    const task = await deleteTask(container.dataset.id);

    // Удаление элемента из DOM
    document.getElementById(task.id)?.remove();
  });

  /**
   * Обработчик отмены удаления.
   */

  btn_cancel.addEventListener('click', () => {
    container.style.display = 'none';
  });
  return container;
}
