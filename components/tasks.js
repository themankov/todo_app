import { task } from './index.js';
export default function () {
  const container = document.createElement('div');
  container.className = 'tasks';
  container.appendChild(task());
  container.appendChild(task());
  container.appendChild(task());
  container.appendChild(task());
  container.appendChild(task());
  container.appendChild(task());
  return container;
}
