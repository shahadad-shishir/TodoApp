import { taskData } from "../data/tasks.js";

const tasks = document.querySelector('#navbar .tasks');
const categories = document.querySelector('#navbar .categories');
const addBtn = document.querySelector('#navbar .add');
const transfer = document.querySelector('#navbar .transfer');
const profile = document.querySelector('#navbar .profile');
const count = document.querySelector('#navbar .count');

export const navbar = {
  getReady: function() {
    tasks.addEventListener('click', () => {
      this.scrollToTop();
    });

    categories.addEventListener('click', () => {
      window.location.href = './pages/categories.html';
    });
    
    addBtn.addEventListener('click', () => {
      window.location.href = './pages/add-task.html';
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