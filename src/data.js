import { generateRandomId } from "./utils/number.js";

function getDataFormat() {
  const dataFormat = {
    name: '',
    createdAt: new Date(),
    profilePic: null,
    theme: 0,
  
    tasks: [
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
    ],
  
    categories: [
      {
        id: '1',
        name: 'Home',
        emoji: '🏠️',
        color: '#b624ff',    
      },
      {
        id: '2',
        name: 'Work',
        emoji: '🏢',
        color: '#5061ff',    
      },
      {
        id: '3',
        name: 'Personal',
        emoji: '👤',
        color: '#fb34ff',    
      },
      {
        id: '4',
        name: 'Fitness',
        emoji: '💪',
        color: '#ffea28',    
      },
      {
        id: '5',
        name: 'Education',
        emoji: '📚️',
        color: '#ff9518',    
      },
    ],
  };

  return dataFormat;
}

let appData = JSON.parse(localStorage.getItem('todoAppData')) || getDataFormat();

export const taskData = {
  items: appData.tasks,

  updateStorage: updateStorage,

  loadFromStorage() {
    this.items = appData.tasks;
  },

  add(emoji, name, description, deadline, category, color, id) {
    class Task {
      constructor(emoji, name, description, deadline, category, color, id) {
        this.id = id || taskData.generateId();
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
    const task = new Task(emoji, name, description, deadline, category, color, id);
    this.items.push(task);
    this.updateStorage();
  }, 

  generateId() {
    const id = String(generateRandomId());
    
    taskData.items.forEach(item => {
      if (item.id === id) {
        this.generateId();
        return;
      }
    });

    return id;
  },

  makeShared(id, userName) {
    this.getTask(id).sharedBy = userName;
    this.updateStorage();
  },

  delete(taskId) {
    const index = this.getIndex(taskId);
    this.items.splice(index, 1);
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
    
    this.items[index].id = id;
    this.items[index].emoji = emoji;
    this.items[index].name = name;
    this.items[index].description = des;
    this.items[index].deadline = deadline;
    this.items[index].category = category;
    this.items[index].color = color;

    this.updateStorage();
  },

  toggleDone(taskId) {
    this.items[this.getIndex(taskId)].done = 
    !this.items[this.getIndex(taskId)].done;

    this.updateStorage();
  },

  togglePin(taskId) {
    this.items[this.getIndex(taskId)].pinned = 
    !this.items[this.getIndex(taskId)].pinned;

    this.updateStorage();
  },

  removeActgryFromTasks(ctgryId) {
    this.items.forEach(task => {
      task.category.forEach((id, index) => {
        if (id === ctgryId) {
          task.category.splice(index, 1);
          return;
        }
      })
    });

    this.updateStorage();
  },

  getTask(taskId) {
    let data;
    this.items.forEach((task) => {
      if (task.id == taskId) {
        data = task;
        return;
      }
    }); 
    return data;                                                  
  },

  getIndex(taskId) {
    let data;
    this.items.forEach((task, index) => {
      if (task.id == taskId) {
        data = index;
        return;
      }
    }); 
    return data;
  },
  
  countNotDoneTask() {
    let count = 0;
    this.items.forEach(task => {
      if (!task.done) {
        count += 1;
      }
    });
    return count;
  },

  getCtgryInfo() {
    let allCtgryIds = [];
    let doneCtgryIds = [];
    this.items.forEach(task => {
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
}

export const ctgryData = {
  items: appData.categories,

  updateStorage: updateStorage,

  loadFromStorage() {
    this.items = appData.categories;
  },

  getCtgry(ctgryId) {
    let data;
    this.items.forEach(category => {
      if (category.id == ctgryId) {
        data = category;
        return;
      }
    }); 
    return data;
  },

  getIndex(ctgryId) {
    let data;
    this.items.forEach((category, index) => {
      if (category.id == ctgryId) {
        data = index;
        return;
      }
    }); 
    return data;
  },

  update(id, name, emoji, color) {
    const index = this.getIndex(id);
    this.items[index].name = name;
    this.items[index].emoji = emoji;
    this.items[index].color = color;
    this.updateStorage();
  },

  delete(id) {
    const index = this.getIndex(id);
    this.items.splice(index, 1);
    this.updateStorage();
  },

  create(name, emoji, color) {
    const id =  String(generateRandomId(8));
    const newCtgry = {id: id, name: name, emoji: emoji, color: color};
    this.items.push(newCtgry);
    this.updateStorage();

    return id;
  },

  match(ctgry) {
    const {name, emoji, color} = ctgry;
    let matchId;

    this.items.forEach(ctgry => {
      if (name === ctgry.name && emoji === ctgry.emoji 
        && color === ctgry.color ) {
        matchId = ctgry.id;
        return;
      }
    });

    return matchId;
  }
}

export const userData = {
  updateStorage: updateStorage,

  loadFromStorage() {
    this.name = appData.name;
    this.createdAt = appData.createdAt;
    this.theme = appData.theme;
    this.profilePic = appData.profilePic;
  },

  cngTheme(themeId) {
    if (themeId === this.theme) return;
    this.theme = themeId;
    this.updateStorage();
  },

  cngProfile(profileLink) {
    this.profilePic = profileLink;
    this.updateStorage();
  },

  deleteProfile() {
    this.profilePic = null;
    this.updateStorage();
  },

  setUserName(nm) {
    this.name = nm;
    this.updateStorage();
  },
}

userData.loadFromStorage();

function updateStorage() {
  appData.tasks = taskData.items;
  appData.categories = ctgryData.items;
  appData.name = userData.name;
  appData.createdAt = userData.createdAt;
  appData.theme = userData.theme;
  appData.profilePic = userData.profilePic;

  const jsonObj = JSON.stringify(appData);
  localStorage.setItem('todoAppData', jsonObj);
}

function loadFromStorage() {
  appData = JSON.parse(localStorage.getItem('todoAppData')) || getDataFormat();
}

export function removeAppData() {
  localStorage.removeItem('todoAppData');
  loadFromStorage();
  taskData.loadFromStorage();
  ctgryData.loadFromStorage();
  userData.loadFromStorage();
}