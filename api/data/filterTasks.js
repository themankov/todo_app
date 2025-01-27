import { fetchTasks } from '../index.js';

export default async function (
  filter_priority,
  text,
  sort_date,
  sort_status,
  filter_status
) {
  const statusPriority = {
    Высокий: 3,
    Средний: 2,
    Низкий: 1,
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
      const direction = sort_date.split(' ')[2] == '▲' ? 1 : -1;
      return direction * (new Date(a.date) - new Date(b.date));
    }
    if (sort_status) {
      const direction = sort_status.split(' ')[2] == '▲' ? 1 : -1;
      return (
        direction * (statusPriority[a.priority] - statusPriority[b.priority])
      );
    }
    return 0;
  });
  return filteredArr;
}
