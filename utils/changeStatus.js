/**
 * Изменение статуса
 *
 * @param {HTMLElement[]} options - Массив элементов option
 * @returns {string[]} status - Массив выбранных идентификаторов
 */
export function changeStatus(options) {
  return options.reduce((acc, checkbox) => {
    if (checkbox.checked) {
      acc.push(checkbox.id);
    }
    return acc;
  }, []);
}
