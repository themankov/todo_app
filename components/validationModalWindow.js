export default function () {
  const container = document.createElement('div');
  container.className = 'validation_modal';
  container.innerHTML = `
  <div class='validation_modal_btn'><img src='../icons/cross.svg' alt='close'></div>
  <p>Необходимо заполнить текст задачи</p>
  `;
  const validation_modal_btn = container.querySelector('.validation_modal_btn');
  validation_modal_btn.addEventListener('click', () => {
    container.style.display = 'none';
  });
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.style.display = 'none';
    }
  });
  return container;
}
