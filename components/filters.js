/**
 * Создаёт и возвращает блок фильтрации с сгенерированными select-элементами
 *
 * @param {Function} select - Функция, создающая элементы select
 * @returns {HTMLDivElement} - Блок фильтрации
 */

export default function (select) {
  // Данные для фильтров и сортировки 
  const data1 = ['Любой', 'Низкий', 'Средний', 'Высокий'];
  const data2 = ['Приоритет &#9650;', 'Приоритет &#9660;'];
  const data3 = ['Дата создания &#9650;', 'Дата создания &#9660;'];

  // Создание контейнера
  const container = document.createElement('div');
  container.className = 'filter_container';

  // Использование шаблона
  container.innerHTML = `
            <div class="filter_options">
                <div class="filter_priority_wrapper">
                    <label for="filter_by_options_select">Фильтр по приоритету:</label>
                </div>
                 <div class="filter_by_status_wrapper">
                    <label >Фильтр по статусу:</label>
                    <div class="filter_by_status_option">
                        <div class="option"><label for="active">активные</label>
                        <input type="checkbox" id="active" checked>
                        </div>
                        <div class="option"><label for="canceled">отмененные</label>
                            <input type="checkbox" id="canceled" checked>
                        </div>
                        <div class="option"><label for="done">завершенные</label>
                            <input type="checkbox" id="done" checked>
                        </div>
                    </div>
                    </div>
            </div>
            <div class="sort_options">
                <div class="sort_by_date">
                    <label for="sort_by_date_select">Сортировка по дате:</label>
                </div>
                <div class="sort_by_priorities opacity">
                    <label for="sort_by_priorities_select">Сортировка по приоритету:</label>
                </div>
            </div>
            <div class="text_options">
                <label for="search_text">
                    Поиск задачи по тексту
                </label>
                <input type="text" placeholder="Начните вводить текст задачи">
            </div>
        `;

  // Получаем родительские элементы выпадающий списков
  const filter_priority_wrapper = container.querySelector(
    '.filter_priority_wrapper'
  );
  const sort_by_date = container.querySelector('.sort_by_date');
  const sort_by_priorities = container.querySelector('.sort_by_priorities');

  // вставляем select-элементы с выбранными данными
  filter_priority_wrapper.appendChild(
    select('filter_by_options_select', data1)
  );
  sort_by_priorities.appendChild(select('sort_by_priorities', data2));
  sort_by_date.appendChild(select('sort_by_date_select', data3));
  return container;
}
