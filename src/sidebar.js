import { scroll } from "./utils/shortcut.js";
import { taskData } from "./data/tasks.js";
import { navigateTo } from "./route.js";

 export const sidebar = {
  init() {
    const el = document.querySelector('#sidebar');
    this.el = el;
    this.sidebarBg = document.querySelector('#sidebar-bg');
    this.sidebarHeader = el.querySelector('.sidebar-header');
    this.tasks = el.querySelector('.sidebar-tasks');
    this.taskCount = el.querySelector('.task-count');
    this.countNum = el.querySelector('.task-count-number');
    this.tooltipNum = el.querySelector('.sidebar-tooltip span');
    this.add = el.querySelector('.sidebar-add');
    this.purge = el.querySelector('.sidebar-purge');
    this.ctgry = el.querySelector('.sidebar-ctgry');
    this.transfer = el.querySelector('.sidebar-transfer');
    this.github = el.querySelector('.sidebar-github');
    this.issue = el.querySelector('.sidebar-issue');
    this.logout = el.querySelector('.sidebar-logout');
    this.settings = el.querySelector('.sidebar-settings');
    this.user = el.querySelector('.sidebar-user');

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
    this.el.classList.add('active');
    this.sidebarBg.style.height = screen.height + 10 + 'px';
    this.sidebarBg.style.opacity = 1;
    this.showNotDoneTask();
    scroll.disable();
  },

  close() {
    this.el.classList.remove('active');
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
