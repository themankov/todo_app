/**
 * Создаёт и возвращает блок фильтрации с сгенерированными select-элементами
 *
 * @param {Function} select - Функция, создающая элементы select
 * @returns {HTMLDivElement} - Блок фильтрации
 */

export default function (select) {
  // Данные для фильтров и сортировки
  const filterPriorityData = [
    ['Любой', 'any'],
    ['Низкий', 'low'],
    ['Средний', 'middle'],
    ['Высокий', 'high'],
  ];
  const sortPriorityData = [
    ['Приоритет &#9650;', 'up'],
    ['Приоритет &#9660;', 'down'],
  ];
  const sortDateData = [
    ['Дата создания &#9650;', 'up'],
    ['Дата создания &#9660;', 'down'],
  ];

  // Создание контейнера
  const container = document.createElement('div');
  container.className = 'filter__container';

  // Использование шаблона
  container.innerHTML = `
            <div class="filter__options">
                <div class="filter__priority">
                    <label for="filter_by_options_select">Фильтр по приоритету:</label>
                </div>
                 <div class="filter__status">
                    <label >Фильтр по статусу:</label>
                    <div class="filter__status_options">
                        <div class="filter__status_option">
                            <label for="active">активные</label>
                            <input type="checkbox" id="active" checked>
                        </div>
                        <div class="filter__status_option">
                            <label for="canceled">отмененные</label>
                            <input type="checkbox" id="canceled" checked>
                        </div>
                        <div class="filter__status_option">
                            <label for="done">завершенные</label>
                            <input type="checkbox" id="done" checked>
                        </div>
                    </div>
                    </div>
            </div>
            <div class="filter__sort">
                <div class="filter__sort-date">
                    <label for="filter__sort-date-select">Сортировка по дате:</label>
                </div>
                <div class="filter__sort-priority opacity">
                    <label for="filter__sort-priority-select">Сортировка по приоритету:</label>
                </div>
            </div>
            <div class="filter__search">
                <label for="search_text" >
                    Поиск задачи по тексту
                </label>
                <input type="text" placeholder="Начните вводить текст задачи" class="filter__search-input">
            </div>
        `;

  // Получаем родительские элементы выпадающий списков
  const filterPriorityWrapper = container.querySelector('.filter__priority');
  const sortByDate = container.querySelector('.filter__sort-date');
  const sortByPriorities = container.querySelector('.filter__sort-priority');

  // вставляем select-элементы с выбранными данными
  filterPriorityWrapper.appendChild(select('filter_by_options_select', filterPriorityData));
  sortByPriorities.appendChild(select('sort_by_priorities', sortPriorityData));
  sortByDate.appendChild(select('sort_by_date_select', sortDateData));
  return container;
}
