import { scroll } from "./utils/shortcut.js";
import { taskData } from "./data/tasks.js";
import { navigateTo } from "./route.js";

let sidebarEl, sidebarHeader, sidebarBg, tasks, taskCount, countNum, tooltipNum, add, purge, ctgry, transfer, github, issue, logout, settings, user;


 export const sidebar = {
  init() {
    sidebarEl = document.querySelector('#sidebar');
    sidebarHeader = document.querySelector('.sidebar-header');
    sidebarBg = document.querySelector('#sidebar-bg');
    tasks = document.querySelector('.sidebar-tasks');
    taskCount = document.querySelector('#sidebar .task-count');
    countNum = document.querySelector('#sidebar .task-count-number');
    tooltipNum = document.querySelector('.sidebar-tooltip span');
    add = document.querySelector('.sidebar-add');
    purge = document.querySelector('.sidebar-purge');
    ctgry = document.querySelector('.sidebar-ctgry');
    transfer = document.querySelector('.sidebar-transfer');
    github = document.querySelector('.sidebar-github');
    issue = document.querySelector('.sidebar-issue');
    logout = document.querySelector('.sidebar-logout');
    settings = document.querySelector('.sidebar-settings');
    user = document.querySelector('.sidebar-user');

    sidebarBg.addEventListener('click', () => {
      this.close();
    });
    sidebarHeader.addEventListener('click', () => {
      this.close();
    });
    tasks.addEventListener('click', () => {
      if (location.pathname !== '/') {
        navigateTo('/');
      }
      this.close();
    });
    add.addEventListener('click', () => {
      if (location.pathname !== '/add-task') {
        navigateTo('/add-task');
      }
      this.close();
    });
    purge.addEventListener('click', () => {
      // if (location.pathname !== '/purge') {
      //   navigateTo('/purge');
      // }
      this.close();
    });
    ctgry.addEventListener('click', () => {
      if (location.pathname !== '/categories') {
        navigateTo('/categories');
      }
      this.close();
    });
    transfer.addEventListener('click', () => {
      if (location.pathname !== '/transfer') {
        navigateTo('/transfer');
      }
      this.close();
    });
    github.addEventListener('click', () => {
      window.open('https://github.com/shahadad-shishir/TodoApp');
    });
    issue.addEventListener('click', () => {
      window.open('https://github.com/shahadad-shishir/TodoApp/issues/new')
    });
    logout.addEventListener('click', () => {
      
    });
    settings.addEventListener('click', () => {
      
    });
    user.addEventListener('click', () => {
      if (location.pathname !== '/profile') {
        navigateTo('/profile');
      }
      this.close();
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
