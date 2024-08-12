import { scroll } from "./utils/shortcut.js";
import { taskData } from "./data/tasks.js";

const sidebarEl = document.querySelector('#sidebar');
const sidebarHeader = document.querySelector('.sidebar-header');
const sidebarBg = document.querySelector('#sidebar-bg');
const tasks = document.querySelector('.sidebar-tasks');
const taskCount = document.querySelector('#sidebar .task-count');
const countNum = document.querySelector('#sidebar .task-count-number');
const tooltipNum = document.querySelector('.sidebar-tooltip span');
const add = document.querySelector('.sidebar-add');
const purge = document.querySelector('.sidebar-purge');
const ctgry = document.querySelector('.sidebar-ctgry');
const transfer = document.querySelector('.sidebar-transfer');
const github = document.querySelector('.sidebar-github');
const issue = document.querySelector('.sidebar-issue');
const logout = document.querySelector('.sidebar-logout');
const settings = document.querySelector('.sidebar-settings');
const user = document.querySelector('.sidebar-user');

 export const sidebar = {
  getReady() {
    sidebarBg.addEventListener('click', () => {
      this.close();
    });
    sidebarHeader.addEventListener('click', () => {
      this.close();
    });

    tasks.addEventListener('click', () => {
      this.close();
    });
    add.addEventListener('click', () => {
      window.location.href = '../pages/add-task.html';
    });
    purge.addEventListener('click', () => {
      window.location.href = '../pages/purge.html';
    });
    ctgry.addEventListener('click', () => {
      window.location.href = '../pages/categories.html';
    });
    transfer.addEventListener('click', () => {
      window.location.href = '../pages/transfer.html';
    });
    github.addEventListener('click', () => {
      window.location.href = '#';
    });
    issue.addEventListener('click', () => {
      window.location.href = '#';
    });
    logout.addEventListener('click', () => {
      
    });
    settings.addEventListener('click', () => {
      
    });
    user.addEventListener('click', () => {
      window.location.href = '../pages/profile.html';
    });
  },

  open() {
    sidebarEl.classList.add('active');
    sidebarBg.style.height = screen.height + 10 + 'px';
    sidebarBg.style.opacity = 1;
    this.showNotDoneTask();
    scroll.disable();
  },

  close() {
    sidebarEl.classList.remove('active');
    sidebarBg.style.opacity = 0;

    const timeoutId = setTimeout(()=> {
      sidebarBg.style.height = 0;
      scroll.enable();
      clearTimeout(timeoutId);
    }, 300)
  },

  showNotDoneTask: function() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      taskCount.style.display = 'flex';
      countNum.innerHTML = num;
      tooltipNum.innerHTML = num;
    } else {
      taskCount.style.display = 'none';
    }
  }
}
