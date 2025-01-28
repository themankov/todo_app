/**
 * Создаёт и возвращает кастомный select.
 *
 * @param {string} id - идентификатор select.
 * @param {Array<string>} data - Массив данных для списка.
 * @returns {HTMLDivElement} - кастомный select.
 */

export default function (id, data) {
  // Создаём кастомное событие для обновления значения input
  const event = new Event('change', { bubbles: true });
  
  // Создаём родительский элемент для select
  const container = document.createElement('div');
  container.className = 'dropdown';

  // Вставляем разметку внутрь
  container.innerHTML = `
   <div class="dropdown_btn arrow" >${id==='priority_select'?data[1]:data[0]}</div>
   <ul class="dropdown_list">
   </ul>
   <input type="text" class="dropdown_input_hidden" id=${id} value='${id==='priority_select'?data[1]:data[0]}'>
`;

  // Заполняем select элементами списка
  const transformedData = data.map((item, index, arr) => {
    return `<li class="dropdown_item" data-value='${item}'>${item}</li>`;
  });

  // Получаем элементы списка
  const dropdown_list = container.querySelector('.dropdown_list');
  const dropdown_btn = container.querySelector('.arrow');
  dropdown_list.innerHTML = transformedData.join('');

  /**
   * Обработчик открытия списка
   */
  container.addEventListener('click', () => {
    dropdown_list.classList.toggle('dropdown_list-visible');
    dropdown_btn.classList.toggle('up');
  });

  /**
   * Обработчик выбора элемента списка
   */
  container.querySelectorAll('.dropdown_item').forEach((item) => {
    item.addEventListener('click', function (e) {
      const dropdownBtn = container.querySelector('.dropdown_btn');
      dropdownBtn.innerText = this.innerText;
      dropdown_list.classList.remove('.dropdown_list-visible');

      // Обновляем скрытый input значением выбранного элемента
      container.querySelector('.dropdown_input_hidden').value =
        this.dataset.value;
      container.querySelector('.dropdown_input_hidden').dispatchEvent(event);
    });
  });
  // Закрытие select при клике вне самого select
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      const dropdownList = container.querySelector('.dropdown_list');
      dropdownList.classList.remove('dropdown_list-visible');
    }
  });

  return container;
}
