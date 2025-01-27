export default function (id, data) {
  const event = new Event('change', { bubbles: true });

  const container = document.createElement('div');
  container.className = 'dropdown';
  container.innerHTML = `
   <div class="dropdown_btn arrow" >${data[0]}</div>
   <ul class="dropdown_list">
   </ul>
   <input type="text" class="dropdown_input_hidden" id=${id} value=${data[0]}>
`;
  const transformedData = data.map((item, index, arr) => {
    return `<li class="dropdown_item" data-value='${item}'>${item}</li>`;
  });
  const dropdown_list = container.querySelector('.dropdown_list');
  const dropdown_btn = container.querySelector('.arrow');
  dropdown_list.innerHTML = transformedData.join('');
  container.addEventListener('click', () => {
    dropdown_list.classList.toggle('dropdown_list-visible');
    dropdown_btn.classList.toggle('up');
  });

  container.querySelectorAll('.dropdown_item').forEach((item) => {
    item.addEventListener('click', function (e) {
      const dropdownBtn = container.querySelector('.dropdown_btn');
      dropdownBtn.innerText = this.innerText;
      dropdown_list.classList.remove('.dropdown_list-visible');
      container.querySelector('.dropdown_input_hidden').value =
        this.dataset.value;
      container.querySelector('.dropdown_input_hidden').dispatchEvent(event);
    });
  });
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      const dropdownList = container.querySelector('.dropdown_list');
      dropdownList.classList.remove('dropdown_list-visible');
    }
  });

  return container;
}
