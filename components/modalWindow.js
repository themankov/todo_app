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
  <div class="modal-wrapper">
  <h1 class="modal__text">Вы уверены, что хотите удалить задачу?</h1>
      <div class="modal__buttons">
        <button class="modal__button modal__button-confirm">Да</button>
        <button class="modal__button modal__button-cancel">Нет</button>
      </div>
  </div>    
  `;

  // Получаем кнопки
  const btn_confirm = container.querySelector('.modal__button-confirm');
  const btn_cancel = container.querySelector('.modal__button-cancel');

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
