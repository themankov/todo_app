import taskService from './data/taskService.js';
import filterTasks from './data/filterTasks.js';

export const { fetchTasks, addTask, deleteTask, updateTask } = taskService;
export { filterTasks };
