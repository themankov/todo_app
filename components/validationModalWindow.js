/**
 * Создает и возвращает модальное окно валидации формы
 *
 * @returns {HTMLElement} Элемент модального окна
 */

export default function () {
  //создание корневого элемента модального окна
  const container = document.createElement('div');
  container.className = 'validation_modal';
  //внедрение в корневой элемент разметки
  container.innerHTML = `
  <div class='validation_modal_btn'><img src='../icons/cross.svg' alt='close'></div>
  <p>Необходимо заполнить текст задачи</p>
  `;
  //получение кнопки отмены
  const validation_modal_btn = container.querySelector('.validation_modal_btn');

  /**
   * Обработчик скрытие результатов валидации при нажатии на кнопку
   */
  validation_modal_btn.addEventListener('click', () => {
    container.style.display = 'none';
  });

   /**
   * Обработчик скрытие результатов валидации вне модального окна
   */
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.style.display = 'none';
    }
  });
  return container;
}
