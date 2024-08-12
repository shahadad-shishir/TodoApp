  import { generateRandomId } from "./utils/number.js";

  export const taskData = JSON.parse(localStorage.getItem('taskData')) || [
    /*{
      id: '',
      name: '',
      description: '',
      deadline: '',
      emoji: '',
      color: '',
      category: [],
      done: false,
      pinned: false,
      createDate: '',
    },*/
  ];

  export const categoryData = [
    {
      id: 1,
      name: 'Home',
      emoji: '🏠️',
      color: '#4CFF69',    
    },
    {
      id: 2,
      name: 'Work',
      emoji: '🏢',
      color: '#50A5FF',    
    },
    {
      id: 3,
      name: 'Personal',
      emoji: '👤',
      color: '#ED69FE',    
    },
    {
      id: 4,
      name: 'Fitness',
      emoji: '💪',
      color: '#FFE564',    
    },
    {
      id: 5,
      name: 'Education',
      emoji: '📚️',
      color: '#FFA550',    
    },
  ];


  class task{
    constructor(emoji, name, description, deadline, category, color, id) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.deadline = deadline;
      this.emoji = emoji;
      this.color = color;
      this.category = category;
      this.done = false;
      this.pinned = false;
      this.createDate = new Date();
    }
  }

  export function addTask(emoji, name, description, deadline, category, color, id) {
    const taskObj = new task(emoji, name, description, deadline, category, color, id);
    taskData.push(taskObj);
    updateStorage();
  }

  export function getCategoryData(id) {
    let data;
    categoryData.forEach(category => {
      if (category.id == id) {
        data = category;
        return;
      }
    });

    return data;
  }

  export function deleteTask(taskId) {
    const {task, index} = getTaskData(taskId);
    taskData.splice(index, 1);
    updateStorage();
    return task;
  }

  export function markDone(taskId) {
    const {index} = getTaskData(taskId);
    taskData[index].done = true;
    updateStorage();
  }

  export function markNotDone(taskId) {
    const {index} = getTaskData(taskId);
    taskData[index].done = false;
    updateStorage();
  }

  export function makePinned(taskId) {
    const {index} = getTaskData(taskId);
    taskData[index].pinned = true;
    updateStorage();
  }

  export function makeNotPinned(taskId) {
    const {index} = getTaskData(taskId);
    taskData[index].pinned = false;
    updateStorage();
  }

  export function getTaskData(taskId) {
    let data = {};
    taskData.forEach((task, index) => {
      if (task.id == taskId) {
        data.task = task;
        data.index = index;
        return;
      }
    });

    return data;
  }

  export function updateTaskData(id, emoji, name, des, deadline, category, color) {
    const {index} = getTaskData(id);
    
    taskData[index].id = id;
    taskData[index].emoji = emoji;
    taskData[index].name = name;
    taskData[index].description = des;
    taskData[index].deadline = deadline;
    taskData[index].category = category;
    taskData[index].color = color;

    updateStorage();
  }

  export function dublicateAtask(taskId) {
    const {name, emoji, description, color, deadline, category} = getTaskData(taskId).task;
    const newId = generateRandomId();
    addTask(emoji, name, description, deadline, category, color, newId);
  }
  

  function updateStorage() {
    const data = JSON.stringify(taskData);
    localStorage.setItem('taskData', data);
  }