import { taskData } from "./data/tasks.js";
import { navigateTo } from "./route.js";

export const navbar = {
  init() {
    const el = document.querySelector('#navbar');
    this.tasks = el.querySelector('.tasks');
    this.categories = el.querySelector('.categories');
    this.addBtn = el.querySelector('.add');
    this.transfer = el.querySelector('.transfer');
    this.profile = el.querySelector('.profile');
    this.count = el.querySelector('.count');
    
    this.tasks.addEventListener('click', () => {
      if (location.pathname === '/') {
        this.scrollToTop();
      } else {
        navigateTo('/');
      }
    });

    this.categories.addEventListener('click', () => {
      if (location.pathname === '/categories') {
        this.scrollToTop();
      } else {
        navigateTo('/categories');
      }
    });
    
    this.addBtn.addEventListener('click', () => {
      if (location.pathname === '/add-task') {
        this.scrollToTop();
      } else {
        navigateTo('/add-task');
      }
    });

    this.transfer.addEventListener('click', () => {
      if (location.pathname === '/transfer') {
        this.scrollToTop();
      } else {
        navigateTo('/transfer');
      }
    });

    this.profile.addEventListener('click', () => {
      if (location.pathname === '/profile') {
        this.scrollToTop();
      } else {
        navigateTo('/profile');
      }
    });
  },
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },

  showNotDoneTask() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      this.count.style.display = 'flex';
      this.count.innerHTML = num;
    } else {
      this.count.style.display = 'none';
    }
  },

  hideNotDoneTask() {
    this.count.style.display = 'none';
  },

  selectPage(pathname) {
    if (document.querySelector('#navbar .selected')) {
      document.querySelectorAll('#navbar .selected')
      .forEach(el => {
        el.classList.remove('selected');
      });
    }

    if (pathname === '/') {
      this.tasks.classList.add('selected');
    } else if (pathname === '/add-task') {
      this.addBtn.classList.add('selected');
    } else if (pathname === '/categories') {
      this.categories.classList.add('selected');
    } else if (pathname === '/transfer') {
      this.transfer.classList.add('selected');
    } else if (pathname === '/profile') {
      this.profile.classList.add('selected');
    }
  }
};