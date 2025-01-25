export default function (select){
    const data1=[['Любой',''],['Низкий','low'],['Средний','middle'],['Высокий','high']]
    const data2=[['Приоритет','up'],['Приоритет','down']]
    const data3=[['Дата создания','up'],['Дата создания','down']]
    const container=document.createElement('div')
    container.className='filter_container'
    container.innerHTML=`
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
                            <input type="checkbox" id="canceled">
                        </div>
                        <div class="option"><label for="done">завершенные</label>
                            <input type="checkbox" id="done">
                        </div>
                    </div>
                    </div>
            </div>
            <div class="sort_options">
                <div class="sort_by_date">
                    <label for="sort_by_date_select">Сортировка по дате:</label>
                </div>
                <div class="sort_by_priorities">
                    <label for="sort_by_priorities_select">Сортировка по приоритету:</label>
                </div>
            </div>
            <div class="text_options">
                <label for="search_text">
                    Поиск задачи по тексту
                </label>
                <input type="text" placeholder="Начните вводить текст задачи">
            </div>
        `
        const filter_priority_wrapper=container.querySelector('.filter_priority_wrapper')
        const sort_by_date=container.querySelector('.sort_by_date')
        const sort_by_priorities=container.querySelector('.sort_by_priorities')
        filter_priority_wrapper.appendChild(select('filter_by_options_select',data1))
        sort_by_priorities.appendChild(select('sort_by_priorities', data2))
        sort_by_date.appendChild(select('sort_by_date_select',data3))
        return container
}