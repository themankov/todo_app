/**
 * Создает и возвращает модальное окно валидации формы
 *
 * @returns {HTMLElement} Элемент модального окна
 */
export default function () {
  //создание корневого элемента модального окна
  const container = document.createElement('div');
  container.className = 'validation-modal';
  //внедрение в корневой элемент разметки
  container.innerHTML = `
  <div class='validation-modal__close'><img src='../icons/cross.svg' alt='close'></div>
  <p class="validation-modal__text"></p>
  `;
  //получение кнопки отмены
  const validation_modal_btn = container.querySelector('.validation-modal__close');

  /**
   * Обработчик скрытие результатов валидации при нажатии на кнопку
   */
  validation_modal_btn.addEventListener('click', () => {
    container.style.display = 'none';
  });

  /**
   * Обработчик скрытие результатов валидации вне модального окна
   */
  document.addEventListener('click', (event) => {
    if (!container.contains(evennt.target)) {
      container.style.display = 'none';
    }
  });
  return container;
}
