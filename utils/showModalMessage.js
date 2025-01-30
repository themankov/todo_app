/**
 * Показ модального окна
 *
 * @param {HTMLElement[]} options - Массив элементов option
 * @returns {string[]} status - Массив выбранных идентификаторов
 */
export function showModalMessage(text){
    document.querySelector('.validation-modal .validation-modal__text').innerText = text;
    document.querySelector('.validation-modal').style.display = 'grid';
}