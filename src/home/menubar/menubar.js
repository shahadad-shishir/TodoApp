import { taskData } from "../../data/tasks.js";
import { scroll, mngAnim } from "../../utils/shortcut.js";
import { mngCategoryFilter } from "../category-filter.js";
import { handleProgress } from "../progress.js";
import { search, searchResult } from "../search.js";
import { renderTask } from "../task.js";
import { editTask } from "./edit-task/edit-task.js";
import { popup } from "../../utils/popup.js";
import { dltCnfrm } from "./dlt-confirmation.js";
import { navigateTo, routes } from "../../route.js";

let menubarEl, SmenubarBg, lMenubarBg, doneBtn, pinBtn, detailsBtn, editBtn, dublicate, deleteBtn;

export const menubar = {
  taskId: undefined,
  distanceFromTop: undefined,

  getReady() {   
    menubarEl = document.querySelector('.menubar');
    SmenubarBg = document.querySelector('#s-menubar-bg');
    lMenubarBg = document.querySelector('#l-menubar-bg');
    doneBtn = document.querySelector('#mark-done');
    pinBtn = document.querySelector('#pin');
    detailsBtn = document.querySelector('#details');
    editBtn = document.querySelector('#edit');
    dublicate = document.querySelector('#dublicate');
    deleteBtn = document.querySelector('#delete');

    editTask.getReady();
    dltCnfrm.getReady();
    popup.getReady();

    SmenubarBg.addEventListener('click', () => {
      this.hideSmenu();
    });

    doneBtn.addEventListener('click', () => {
      if (!taskData.getTask(this.taskId).done) {
        taskData.markDone(this.taskId);
      } else {
        taskData.markNotDone(this.taskId);
      }
      this.renderChanges();
    });

    pinBtn.addEventListener('click', () => {
      if (!taskData.getTask(this.taskId).pinned) {
        taskData.makePinned(this.taskId);
      } else {
        taskData.makeNotPinned(this.taskId);
      }
      this.renderChanges();
    });

    detailsBtn.addEventListener('click', () => {
      this.hideMenu();
      routes['/task'].data.taskId = this.taskId;
      navigateTo('/task');
    });

    editBtn.addEventListener('click', () => {   
      this.hideMenu();
      editTask.showEditTask(this.taskId);
    });
    
    dublicate.addEventListener('click', () => {
      taskData.dublicate(this.taskId);
      this.renderChanges();
      const msg = `Dublicated task - <b>${taskData.getTask(this.taskId).name}</b>`;
      popup.showSuccess(msg);
    });

    deleteBtn.addEventListener('click', () => {
      this.hideMenu();
      dltCnfrm.open(this.taskId);
    });

    lMenubarBg.addEventListener('click', () => {
      this.hideLmenu();
    });

    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 761 && menubarEl.classList.contains('small')) {
        this.hideSmenu();
      } else if (screenWidth > 761 && menubarEl.classList.contains('large')) {
        this.hideLmenu();
      }
    });

    //Large-menubar up-down functionality
    const isMobile = navigator.userAgentData.mobile;
    let isMouseDown = false;
    let clickPosition;
    let difference;

    if (!isMobile) {
      menubarEl.addEventListener('mousedown', e => {
        if (menubarEl.classList.contains('large')) {
          difference = 0;
          isMouseDown = true;
          clickPosition = e.pageY;
        }
      });
      menubarEl.addEventListener('mousemove', e => {
        if (isMouseDown) {
          difference = (e.pageY - clickPosition);
          if (difference > -1) {
            menubarEl.style.top = difference + this.distanceFromTop + 'px';
          }
        }
      }); 
      document.addEventListener('mouseup', () => {
        isMouseDown = false;
        const screenWidth = window.innerWidth;
        if(screenWidth < 761 && difference > 2 && menubarEl.classList.contains('large')) {
          release();
          difference = 0;
        }
      })      
    } else {
      menubarEl.addEventListener('touchstart', e => {
        if (menubarEl.classList.contains('large')) {
          difference = 0;
          isMouseDown = true;
          clickPosition = e.touches[0].pageY;
        }
      });

      menubarEl.addEventListener('touchmove', e => {
        if (isMouseDown) {
          difference = e.touches[0].pageY - clickPosition + 10;
          if (difference > -1) {
            menubarEl.style.top = difference + this.distanceFromTop + 'px';
          }
        }
      });

      document.addEventListener('touchend', () => {
        const screenWidth = window.innerWidth;
        if(screenWidth < 761 && difference > 2 && menubarEl.classList.contains('large')) {
          release();
          difference = 0;
        }
      })
    }

    function release() {
      if (difference > 250) {
        menubar.hideLmenu();
      } else if (difference <= 250) {
        menubarEl.animate(
          [
            {
              top: menubar.distanceFromTop + 'px',
            }
          ],

          400
        );

        const timeoutId = setTimeout(()=> {
          menubarEl.style.removeProperty('top');
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

    menubarEl.classList.add('active', 'small');
    menubarEl.style.opacity = 1;
    SmenubarBg.style.height = document.body.scrollHeight + 10 + 'px';
    scroll.disable();
  },

  hideSmenu() {
    const allTask = document.querySelectorAll('.task');
    allTask.forEach(task => {
        task.classList.remove('blur');
    });

    menubarEl.style.opacity = 0;
    menubarEl.style.transform = 'scale(0.5)';
    scroll.enable();
    const timeoutId = setTimeout(()=> {
      menubarEl.classList.remove('active', 'small');
      menubarEl.style.removeProperty('transform');
      SmenubarBg.style.height = 0;
      clearTimeout(timeoutId);
    }, 200);
  },

  showLmenu() {
    menubarEl.classList.add('active', 'large');
    this.distanceFromTop = menubarEl.getBoundingClientRect().top;
    menubarEl.style.top = this.distanceFromTop;
    menubarEl.style.opacity = 1;
    mngAnim(menubarEl, 'largeMenuOpen', 0.6);
    lMenubarBg.style.height = document.body.scrollHeight + 10 + 'px';
    lMenubarBg.style.opacity = 1;
    scroll.disable();
  },

  hideLmenu() {
    scroll.enable();
    menubarEl.style.animation = 'largeMenuDown .4s ease';
    lMenubarBg.style.animation = 'opacityAnimRvrs .4s ease';
    const timeoutId = setTimeout(()=> {
      menubarEl.style.removeProperty('top')
      menubarEl.style.removeProperty('animation');
      menubarEl.classList.remove('active', 'large');
      menubarEl.style.opacity = 0;
      lMenubarBg.style.height = 0;
      lMenubarBg.style.opacity = 0;
      lMenubarBg.style.removeProperty('animation');
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
    if (searchResult.style.display === 'flex') {
      search.dismiss();
    }
  }
};