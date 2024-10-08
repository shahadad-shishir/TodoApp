import { taskData, ctgryData } from "../data.js";
import { scroll } from "../utils/shortcut.js";
import { popup } from "../utils/popup.js";
import { ripple } from "../ripple-effect.js";
import { createATask } from "./task.js";
import { dateTime } from "../utils/dateTime.js";
import { navigateTo } from "../route.js";
import { sidebar } from "../sidebar.js";
import { navbar } from "../navbar.js";

export const recievedTask = {
  taskData: undefined,
  userName: undefined,

  init() {
    const el = document.querySelector('.recieved-task');
    this.el = el;
    this.bg = document.querySelector('#recievedTask-bg');
    this.declineBtn = el.querySelector('#decline-btn');
    this.addBtn = el.querySelector('#add-btn');
    this.userNameEl = el.querySelector('.user-nm span');
    this.body = el.querySelector('.recieved-body');

    //Add ripple effect
    [this.declineBtn, this.addBtn].forEach(btn => {
      btn.addEventListener('click', e => {
        ripple.add(btn, e);
      });
    });

    //Handle click events
    [this.bg, this.declineBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        this.close();
      });
    });

    this.addBtn.addEventListener('click', () => {
      this.addTask();
    });
  },

  open(taskData, userName) {
    this.renderData(taskData, userName);

    this.el.classList.add('active');
    this.bg.style.display = 'block';
    scroll.disable();
  },

  close() {
    this.bg.style.removeProperty('display');
    this.el.classList.remove('active');
    this.body.querySelector('.task').remove();
    scroll.enable();
    navigateTo('/');
  },

  renderData(taskData, userName) {
    this.userNameEl.innerHTML = userName;

    //Create a task to show as a sample
    const {createDate, deadline} = taskData;
    const task = createATask(taskData);

    task.querySelector('.menu').remove();
    task.querySelector('.create-time').innerHTML = 
      dateTime.formateDateTime(new Date(createDate)).date;
    
    if (deadline) {
      task.querySelector('.deadline .date').innerHTML = 
      `${dateTime.formateDateTime(new Date(deadline)).date} • ${dateTime.formateDateTime(new Date(deadline)).time}`;
    }
 
    this.body.appendChild(task);
  },

  validateData() {
    //Get data from URL
    const urlParams = new URLSearchParams(window.location.search);

    //Validate data
    const taskParam = urlParams.get('task');
    const userNameParam = urlParams.get('user');
    let decodedTask, taskObj;

    if (!taskParam || !userNameParam) {
      navigateTo('/');
      popup.showError("The shared link isn't valid.");
      return;
    }

    try {
      decodedTask = decodeURIComponent(taskParam);
      taskObj = JSON.parse(decodedTask);
    } catch (err) {
      navigateTo('/');
      popup.showError("The shared link isn't valid.");
      return;
    }

    if (!validateJsonStructure(taskObj)) {
      navigateTo('/');
      popup.showError("The shared task structure does not match the expected format.");
      return;
    }

    this.taskData = taskObj;
    this.userName = userNameParam;
    this.open(taskObj, userNameParam);

    function validateJsonStructure(task) {
      const expectedStructure = {
          // id: 'string',
          done: 'boolean',
          pinned: 'boolean',
          name: 'string',
          emoji: 'string',
          color: 'string',
          description: 'string',
          createDate: 'string',
          deadline: 'string',
          category: 'object'
        };
      
      let result = true;

      for (const key in expectedStructure) {
        if (!(key in task) 
          || typeof(task[key]) !== expectedStructure[key]) {
            result = false;
            break;
        }
      };

      return result;
    }
  },

  addTask() {
    const {emoji, name, description, deadline, category, color} = this.taskData;

    category.forEach((ctgry, index) => {
      const matchId = ctgryData.match(ctgry);
      if (matchId) {
        category[index] = matchId;
      } else {
        const {name, emoji, color} = ctgry;
        const id = ctgryData.create(name, emoji, color);
        category[index] = id;
      }
    });

    const id = taskData.generateId();
    taskData.add(emoji, name, description, deadline, category, color, id);
    taskData.makeShared(id, this.userName);

    sidebar.showNotDoneTask();
    navbar.showNotDoneTask();
    this.close();

    const msg = `Added shared task - ${name}`;
    popup.showSuccess(msg);
  }
};