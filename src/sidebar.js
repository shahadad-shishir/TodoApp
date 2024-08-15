import { scroll } from "./utils/shortcut.js";
import { taskData } from "./data/tasks.js";
import { navigateTo } from "./route.js";

 export const sidebar = {
  init() {
    this.sidebarEl = document.querySelector('#sidebar');
    this.sidebarHeader = document.querySelector('.sidebar-header');
    this.sidebarBg = document.querySelector('#sidebar-bg');
    this.tasks = document.querySelector('.sidebar-tasks');
    this.taskCount = document.querySelector('#sidebar .task-count');
    this.countNum = document.querySelector('#sidebar .task-count-number');
    this.tooltipNum = document.querySelector('.sidebar-tooltip span');
    this.add = document.querySelector('.sidebar-add');
    this.purge = document.querySelector('.sidebar-purge');
    this.ctgry = document.querySelector('.sidebar-ctgry');
    this.transfer = document.querySelector('.sidebar-transfer');
    this.github = document.querySelector('.sidebar-github');
    this.issue = document.querySelector('.sidebar-issue');
    this.logout = document.querySelector('.sidebar-logout');
    this.settings = document.querySelector('.sidebar-settings');
    this.user = document.querySelector('.sidebar-user');

    this.sidebarBg.addEventListener('click', () => {
      this.close();
    });
    this.sidebarHeader.addEventListener('click', () => {
      this.close();
    });
    this.tasks.addEventListener('click', () => {
      if (location.pathname !== '/') {
        navigateTo('/');
      }
      this.close();
    });
    this.add.addEventListener('click', () => {
      if (location.pathname !== '/add-task') {
        navigateTo('/add-task');
      }
      this.close();
    });
    this.purge.addEventListener('click', () => {
      // if (location.pathname !== '/purge') {
      //   navigateTo('/purge');
      // }
      this.close();
    });
    this.ctgry.addEventListener('click', () => {
      if (location.pathname !== '/categories') {
        navigateTo('/categories');
      }
      this.close();
    });
    this.transfer.addEventListener('click', () => {
      if (location.pathname !== '/transfer') {
        navigateTo('/transfer');
      }
      this.close();
    });
    this.github.addEventListener('click', () => {
      window.open('https://github.com/shahadad-shishir/TodoApp');
    });
    this.issue.addEventListener('click', () => {
      window.open('https://github.com/shahadad-shishir/TodoApp/issues/new')
    });
    this.logout.addEventListener('click', () => {
      
    });
    this.settings.addEventListener('click', () => {
      
    });
    this.user.addEventListener('click', () => {
      if (location.pathname !== '/profile') {
        navigateTo('/profile');
      }
      this.close();
    });
  },

  open() {
    this.sidebarEl.classList.add('active');
    this.sidebarBg.style.height = screen.height + 10 + 'px';
    this.sidebarBg.style.opacity = 1;
    this.showNotDoneTask();
    scroll.disable();
  },

  close() {
    this.sidebarEl.classList.remove('active');
    this.sidebarBg.style.opacity = 0;

    const timeoutId = setTimeout(()=> {
      this.sidebarBg.style.height = 0;
      scroll.enable();
      clearTimeout(timeoutId);
    }, 300)
  },

  showNotDoneTask: function() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      this.taskCount.style.display = 'flex';
      this.countNum.innerHTML = num;
      this.tooltipNum.innerHTML = num;
    } else {
      this.taskCount.style.display = 'none';
    }
  }
}
