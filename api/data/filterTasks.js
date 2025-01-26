import { fetchTasks } from '../index.js';

export default async function (options, priorities, date, status, text) {
  const tasks = await fetchTasks();
}
