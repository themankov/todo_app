export default function () {
  const container = document.createElement('div');
  container.className = 'task';
  container.innerHTML = `
        <div class="task_priority">Высокий</div>
          <div class="task_text">
        <textarea id='textarea_input'>Написать конспект по ейронным сетям</textarea>
        <div class="task_time">20.05.2021</div>
    </div>
        <div class="task_delete">
          <img src="./icons/trash.svg" alt="trash" />
        </div>
      `;
  const textArea = container.querySelector('#textarea_input');
  textArea.addEventListener('input', () => {
    textArea.style.height = `${textArea.scrollHeight / 10}rem`;
  });
  return container;
}
