import { taskData } from "../data/tasks.js";
import { navigateTo } from "../route.js";

let tasks, categories, addBtn, transfer, profile, count;

export const navbar = {
  getReady: function() {
    tasks = document.querySelector('#navbar .tasks');
    categories = document.querySelector('#navbar .categories');
    addBtn = document.querySelector('#navbar .add');
    transfer = document.querySelector('#navbar .transfer');
    profile = document.querySelector('#navbar .profile');
    count = document.querySelector('#navbar .count');

    tasks.addEventListener('click', () => {
      this.scrollToTop();
    });

    categories.addEventListener('click', () => {
      window.location.href = './pages/categories.html';
    });
    
    addBtn.addEventListener('click', () => {
      navigateTo('/add-task');
    });

    transfer.addEventListener('click', () => {
      window.location.href = './pages/transfer.html';
    });

    profile.addEventListener('click', () => {
      window.location.href = './pages/profile.html';
    });
  },
  
  scrollToTop: function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },

  showNotDoneTask: function() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      count.style.display = 'flex';
      count.innerHTML = num;
    } else {
      count.style.display = 'none';
    }
  }
};