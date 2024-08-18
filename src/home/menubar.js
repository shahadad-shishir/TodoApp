import { taskData } from "../data/tasks.js";
import { scroll, mngAnim } from "../utils/shortcut.js";
import { mngCategoryFilter } from "./category-filter.js";
import { handleProgress } from "./progress.js";
import { search } from "./search.js";
import { renderTask } from "./task.js";
import { editTask } from "./edit-task.js";
import { popup } from "../utils/popup.js";
import { dltCnfrm } from "./dlt-confirmation.js";
import { navigateTo, routes } from "../route.js";

export const menubar = {
  taskId: undefined,
  distanceFromTop: undefined,

  init() {   
    this.el = document.querySelector('.menubar');
    this.SmenubarBg = document.querySelector('#s-menubar-bg');
    this.lMenubarBg = document.querySelector('#l-menubar-bg');
    this.doneBtn = document.querySelector('#mark-done');
    this.pinBtn = document.querySelector('#pin');
    this.detailsBtn = document.querySelector('#details');
    this.editBtn = document.querySelector('#edit');
    this.dublicate = document.querySelector('#dublicate');
    this.deleteBtn = document.querySelector('#delete');

    editTask.init();
    dltCnfrm.init();
    popup.init();

    this.SmenubarBg.addEventListener('click', () => {
      this.hideSmenu();
    });

    this.doneBtn.addEventListener('click', () => {
      if (!taskData.getTask(this.taskId).done) {
        taskData.markDone(this.taskId);
      } else {
        taskData.markNotDone(this.taskId);
      }
      this.renderChanges();
    });

    this.pinBtn.addEventListener('click', () => {
      if (!taskData.getTask(this.taskId).pinned) {
        taskData.makePinned(this.taskId);
      } else {
        taskData.makeNotPinned(this.taskId);
      }
      this.renderChanges();
    });

    this.detailsBtn.addEventListener('click', () => {
      this.hideMenu();
      routes['/task'].data.taskId = this.taskId;
      navigateTo('/task');
    });

    this.editBtn.addEventListener('click', () => {   
      this.hideMenu();
      editTask.showEditTask(this.taskId);
    });
    
    this.dublicate.addEventListener('click', () => {
      taskData.dublicate(this.taskId);
      this.renderChanges();
      const msg = `Dublicated task - <b>${taskData.getTask(this.taskId).name}</b>`;
      popup.showSuccess(msg);
    });

    this.deleteBtn.addEventListener('click', () => {
      this.hideMenu();
      dltCnfrm.open(this.taskId);
    });

    this.lMenubarBg.addEventListener('click', () => {
      this.hideLmenu();
    });

    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 761 && this.el.classList.contains('small')) {
        this.hideSmenu();
      } else if (screenWidth > 761 && this.el.classList.contains('large')) {
        this.hideLmenu();
      }
    });

    //Large-menubar up-down functionality
    const isMobile = navigator.userAgentData.mobile;
    let isMouseDown = false;
    let clickPosition;
    let difference;

    if (!isMobile) {
      this.el.addEventListener('mousedown', e => {
        if (this.el.classList.contains('large')) {
          difference = 0;
          isMouseDown = true;
          clickPosition = e.pageY;
        }
      });
      this.el.addEventListener('mousemove', e => {
        if (isMouseDown) {
          difference = (e.pageY - clickPosition);
          if (difference > -1) {
            this.el.style.top = difference + this.distanceFromTop + 'px';
          }
        }
      }); 
      document.addEventListener('mouseup', () => {
        isMouseDown = false;
        const screenWidth = window.innerWidth;
        if(screenWidth < 761 && difference > 2 && this.el.classList.contains('large')) {
          release();
          difference = 0;
        }
      })      
    } else {
      this.el.addEventListener('touchstart', e => {
        if (this.el.classList.contains('large')) {
          difference = 0;
          isMouseDown = true;
          clickPosition = e.touches[0].pageY;
        }
      });

      this.el.addEventListener('touchmove', e => {
        if (isMouseDown) {
          difference = e.touches[0].pageY - clickPosition + 10;
          if (difference > -1) {
            this.el.style.top = difference + this.distanceFromTop + 'px';
          }
        }
      });

      document.addEventListener('touchend', () => {
        const screenWidth = window.innerWidth;
        if(screenWidth < 761 && difference > 2 && this.el.classList.contains('large')) {
          release();
          difference = 0;
        }
      })
    }

    function release() {
      if (difference > 250) {
        menubar.hideLmenu();
      } else if (difference <= 250) {
        menubar.el.animate(
          [
            {
              top: menubar.distanceFromTop + 'px',
            }
          ],

          400
        );

        const timeoutId = setTimeout(()=> {
          menubar.el.style.removeProperty('top');
          clearTimeout(timeoutId);
        }, 400);
      }
    }
  },

  showMenu(taskId) {
    const screenWidth = window.innerWidth;
    this.taskId = taskId;
    this.updateData(taskId);

    if (screenWidth > 760) {
      this.showSmenu(taskId);
    } else {
      this.showLmenu(taskId);
    }
  },

  hideMenu() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 760) {
      this.hideSmenu();
    } else {
      this.hideLmenu();
    }
  },

  showSmenu(taskId) {
    const allTask = document.querySelectorAll('.task');

    allTask.forEach(task => {
      if (task.dataset.id != taskId) {
        task.classList.add('blur');
      }
    });

    this.el.classList.add('active', 'small');
    this.el.style.opacity = 1;
    this.SmenubarBg.style.bottom = 0;
    scroll.disable();
  },

  hideSmenu() {
    const allTask = document.querySelectorAll('.task');
    allTask.forEach(task => {
        task.classList.remove('blur');
    });

    this.el.style.opacity = 0;
    this.el.style.transform = 'scale(0.5)';
    scroll.enable();
    const timeoutId = setTimeout(()=> {
      this.el.classList.remove('active', 'small');
      this.el.style.removeProperty('transform');
      this.SmenubarBg.style.removeProperty('bottom');
      clearTimeout(timeoutId);
    }, 200);
  },

  showLmenu() {
    this.el.classList.add('active', 'large');
    this.distanceFromTop = this.el.getBoundingClientRect().top;
    this.el.style.top = this.distanceFromTop;
    this.el.style.opacity = 1;
    mngAnim(this.el, 'largeMenuOpen', 0.6);
    this.lMenubarBg.style.bottom = 0;
    this.lMenubarBg.style.opacity = 1;
    scroll.disable();
  },

  hideLmenu() {
    scroll.enable();
    this.el.style.animation = 'largeMenuDown .4s ease';
    this.lMenubarBg.style.animation = 'opacityAnimRvrs .4s ease';
    const timeoutId = setTimeout(()=> {
      this.el.style.removeProperty('top')
      this.el.style.removeProperty('animation');
      this.el.classList.remove('active', 'large');
      this.el.style.opacity = 0;
      this.lMenubarBg.style.removeProperty('bottom');
      this.lMenubarBg.style.opacity = 0;
      this.lMenubarBg.style.removeProperty('animation');
      clearTimeout(timeoutId);
    }, 400);
  },

  updateData(taskId) {
    const taskName = document.querySelector('.menubar .task-name');
    const markDoneText = document.querySelector('#mark-done span');
    const pinText = document.querySelector('#pin span');

    if (taskData.getTask(taskId).done) {
      markDoneText.innerText = 'Mark as not done';
    } else {
      markDoneText.innerText = 'Mark as done';
    }

    if (taskData.getTask(taskId).pinned) {
      pinText.innerText = 'Unpin';
    } else {
      pinText.innerText = 'Pin';
    }

    const name = taskData.getTask(taskId).name;
    taskName.innerHTML = name; //for full size menubar
  },

  dltTask() {
    const name = taskData.getTask(this.taskId).name;
    taskData.delete(this.taskId);
    this.renderChanges();
    const msg = `Deleted Task - <b>${name}</b>`;
    popup.showSuccess(msg);
  },

  renderChanges() {
    this.hideMenu();
    renderTask();
    handleProgress();
    mngCategoryFilter();
    search.dismiss();
  }
};