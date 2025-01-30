/**
 * Форматирование даты
 *
 * @param {Date} date - Дата
 * @returns {string} - Отформатированная дата
 */
export function formatDate(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const num_date = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}.${month < 9 ? '0' + (month + 1) : month + 1}.${num_date} ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  return '';
}
