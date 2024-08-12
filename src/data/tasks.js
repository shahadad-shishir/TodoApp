import { generateRandomId } from "../utils/number.js";
const demoTasks = [
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

export const taskData = {
  tasks: JSON.parse(localStorage.getItem('taskData')) || demoTasks,

  updateStorage() {
    const data = JSON.stringify(this.tasks);
    localStorage.setItem('taskData', data);
  },

  add(emoji, name, description, deadline, category, color, id) {
    class task {
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
    const taskObj = new task(emoji, name, description, deadline, category, color, id);
    this.tasks.push(taskObj);
    this.updateStorage();
  }, 

  delete(taskId) {
    const index = this.getIndex(taskId);
    this.tasks.splice(index, 1);
    this.updateStorage();
    return this.getTask(taskId);
  },

  dublicate(taskId) {
    const {name, emoji, description, color, deadline, category} = this.getTask(taskId);
    const newId = generateRandomId();
    this.add(emoji, name, description, deadline, category, color, newId);
  },

  update(id, emoji, name, des, deadline, category, color) {
    const index = this.getIndex(id);
    
    taskData.tasks[index].id = id;
    taskData.tasks[index].emoji = emoji;
    taskData.tasks[index].name = name;
    taskData.tasks[index].description = des;
    taskData.tasks[index].deadline = deadline;
    taskData.tasks[index].category = category;
    taskData.tasks[index].color = color;

    this.updateStorage();
  },

  markDone(taskId) {
    this.tasks[this.getIndex(taskId)].done = true;
    this.updateStorage();
  },

  markNotDone(taskId) {
    this.tasks[this.getIndex(taskId)].done = false;
    this.updateStorage();
  },

  makePinned(taskId) {
    this.tasks[this.getIndex(taskId)].pinned = true;
    this.updateStorage();
  },

  makeNotPinned(taskId) {
    this.tasks[this.getIndex(taskId)].pinned = false;
    this.updateStorage();
  },

  getTask(taskId) {
    let data;
    this.tasks.forEach((task) => {
      if (task.id == taskId) {
        data = task;
        return;
      }
    }); 
    return data;                                                  
  },

  getIndex(taskId) {
    let data;
    this.tasks.forEach((task, index) => {
      if (task.id == taskId) {
        data = index;
        return;
      }
    }); 
    return data;
  },
  
  countNotDoneTask() {
    let count = 0;
    this.tasks.forEach(task => {
      if (!task.done) {
        count += 1;
      }
    });
    return count;
  },

  getCtgryInfo() {
    let allCtgryIds = [];
    let doneCtgryIds = [];
    this.tasks.forEach(task => {
      const ctgry = task.category;
      const combined = allCtgryIds.concat(ctgry);
      allCtgryIds = combined;

      if (task.done) {
        const combined = doneCtgryIds.concat(ctgry);
        doneCtgryIds = combined;
      }
    });

    let frequency = {};
    allCtgryIds.forEach(id => {
      if (frequency[id]) {
        frequency[id]++;
      } else {
        frequency[id] = 1;
      }
    });
    allCtgryIds = frequency;
    
    frequency = {};
    doneCtgryIds.forEach(id => {
      if (frequency[id]) {
        frequency[id]++;
      } else {
        frequency[id] = 1;
      }
    });
    doneCtgryIds = frequency;

    return {all: allCtgryIds, done: doneCtgryIds};
  },

  removeActgryFromTasks(index) {
    this.tasks.forEach(task => {
      if (task.category[index]) {
        task.category.splice(index, 1);
      }
    });

    this.updateStorage();
  }
}
