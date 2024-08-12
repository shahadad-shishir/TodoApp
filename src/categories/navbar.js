import { taskData } from "../data/tasks.js";

const tasks = document.querySelector('#navbar .tasks');
const categories = document.querySelector('#navbar .categories');
const addBtn = document.querySelector('#navbar .add');
const transfer = document.querySelector('#navbar .transfer');
const profile = document.querySelector('#navbar .profile');
const count = document.querySelector('#navbar .count');

export const navbar = {
  getReady() {
    this.showNotDoneTask();
    tasks.addEventListener('click', () => {
      window.location.href = '../index.html';
    });

    categories.addEventListener('click', () => {
      this.scrollToTop();
    });
    
    addBtn.addEventListener('click', () => {
      window.location.href = './add-task.html';
    });

    transfer.addEventListener('click', () => {
      window.location.href = './transfer.html';
    });

    profile.addEventListener('click', () => {
      window.location.href = './profile.html';
    });
  },
  
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },

  showNotDoneTask() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      count.style.display = 'flex';
      count.innerHTML = num;
    } else {
      count.style.display = 'none';
    }
  }
};