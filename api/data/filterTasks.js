import { fetchTasks } from '../index.js';

export default async function (
  filter_priority,
  text,
  sort_date,
  sort_status,
  filter_status
) {
  console.log(arguments);
  const statusPriority = {
    Высокий: 1,
    Средний: 2,
    Низкий: 3,
  };

  const tasks = await fetchTasks();

  const filteredArr = tasks.filter((item) => {
    const matchPriority =
      filter_priority === 'Любой' ? true : item.priority === filter_priority;
    const matchText = !!text
      ? false
      : item.text.toLowerCase().includes(text.toLowerCase());
    const matchStatus = !filter_status
      ? false
      : filter_status.some((el) => el === item.status);

    return matchPriority && matchText && matchStatus;
  });

  filteredArr.sort((a, b) => {
    if (sort_date) {
      return new Date(a.date) - new Date(b.date);
    }
    if (sort_status) {
      debugger;
      return statusPriority[a.status] - statusPriority[b.status];
    }
    return 0;
  });
  return filteredArr;
}
