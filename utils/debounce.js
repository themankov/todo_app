/**Функция-задержка частых вызовов функции,
 *
 * @param {Function} callback - Функция, вызов которой нужно задержать
 * @param {number} delay - Время задержки
 * @returns {Function} - возвращает функцию, обернутую в задержку
 */
export default function debounce(callback, delay) {
  return function (...args) {
    let timeout = debounce.timeouts.get(callback);
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback.apply(this, args);
      debounce.timeouts.delete(callback);
    }, delay);

    debounce.timeouts.set(callback, timeout);
  };
}

debounce.timeouts = new WeakMap();
