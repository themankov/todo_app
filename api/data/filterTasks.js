import { fetchTasks } from '../index.js';

export default async function ( filter_priority,text, date, status) {
  console.log(arguments)
  const statusPriority = {
    Высокий: 1, 
    Средний: 2, 
    Низкий: 3  
  };

  const tasks = await fetchTasks();

  const filteredArr = tasks.filter((item) => {
    const matchPriority = !filter_priority || item.priority === filter_priority;
    const matchText = !text || item.text.toLowerCase().includes(text.toLowerCase());
    const matchStatus = !status || item.status === status;

    return matchPriority && matchText && matchStatus;
  });

  const sortedArr = filteredArr.sort((a, b) => {
    if (date) {
      return new Date(a.date) - new Date(b.date);
    }
    if (status) {
      return statusPriority[a.status] - statusPriority[b.status]
    }
    return 0;
  });

  return sortedArr;
}
