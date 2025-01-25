export default function(select){
    const data=[['Любой',''],['Низкий','low'],['Средний','middle'],['Высокий','high']]
    const container=document.createElement('div')
    container.className='task_setting';
    container.innerHTML=`
            <form action="" method="post">
                <div class="priority_wrapper">
                    <label for="priority_select">Приоритет:</label>
                </div>
                <div class="text_wrapper">
                    <label for="priority_select">Текст задачи:</label>
                     <input type="text" placeholder="Введите текст...">
                </div>
                <button type="submit">Отправить</button>
            </form>
        `
    const priority_wrapper=container.querySelector('.priority_wrapper');
    priority_wrapper.appendChild(select('priority_select',data))
    return container
}