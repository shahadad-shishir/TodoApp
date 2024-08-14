import { arraysEqual, scroll } from "../../../utils/shortcut.js";
import { taskData } from "../../../data/tasks.js";
import { ctgrySelector } from "./category-selector.js";
import { colorPicker } from "./color-picker.js";
import { emojiPicker } from "./emoji-picker.js";
import { taskContainer, renderTask } from "../../task.js";
import { searchResult, search } from "../../search.js";
import { mngCategoryFilter } from "../../category-filter.js";
import { popup } from "../../../utils/popup.js";

let saveBtn, editTaskEl, editTaskBg, cancelBtn, nameInput, desInput, dateInput, nm, des, nmLabel, desLabel, nmCount, desCount, ctgrySelectedTxt;

export const editTask = {
  taskId: undefined,
  oldData: undefined,

  init() {
    saveBtn = document.querySelector('.edit-task #save-btn');
    editTaskEl = document.querySelector('.edit-task');
    editTaskBg = document.querySelector('#editTask-bg');
    cancelBtn = document.querySelector('.edit-task #cancel-btn');
    nameInput = document.querySelector('#name-input');
    desInput = document.querySelector('#description');
    dateInput = document.querySelector('#date-input');
    nm = document.querySelector('.edit-task .name');
    des = document.querySelector('.edit-task .description');
    nmLabel = document.querySelector('.name label');
    desLabel = document.querySelector('.description label');
    nmCount = document.querySelector('span.nm-count');
    desCount = document.querySelector('span.des-count');
    ctgrySelectedTxt = document.querySelector('.select p');

    editTaskBg.addEventListener('click', () => {
      this.hideEditTask();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });

    nameInput.addEventListener('input', () => {
      this.mngNmCount();
      this.mngSaveBtn();
    });

    desInput.addEventListener('input', () => {
      this.mngDesCount();
      this.mngSaveBtn();
    });

    dateInput.addEventListener('input', () => {
      this.mngSaveBtn();
    });

    cancelBtn.addEventListener('click', () => {
      this.hideEditTask();
    });

    saveBtn.addEventListener('click', () => {
      if (saveBtn.classList.contains('enable')) {
        this.saveEditedData();
      }
    });

    emojiPicker.init();
    ctgrySelector.init();
    colorPicker.init();
  },

  showEditTask(taskId) {
    this.taskId = taskId;
    this.oldData = taskData.getTask(this.taskId);
    this.resize();
    editTaskEl.classList.add('active');
    editTaskBg.style.height = document.body.scrollHeight + 10 + 'px';
    editTaskBg.style.opacity = 1;
    scroll.disable();
    this.showEditableData();
    this.mngSaveBtn();
  },

  hideEditTask() {
    ctgrySelectedTxt.innerHTML = '';
    colorPicker.close();
    emojiPicker.close();

    editTaskBg.style.height = 0;
    editTaskEl.classList.remove('active');
    scroll.enable();
  },

  showEditableData() {
    const data = taskData.getTask(this.taskId);
    const {name, emoji, description, color, deadline, category} = data;
    
    nameInput.value = name;
    nmCount.style.display = 'block';
    nmCount.innerHTML = `${nameInput.value.length}/40`;
    desInput.value = description;
    if (description !== '') {
      desCount.style.display = 'block';
      desCount.innerHTML = `${desInput.value.length}/250`;
    } else {
      desCount.style.display = 'none';
    }
    dateInput.value = deadline;

    colorPicker.selectThisClr(color);
    ctgrySelector.renderCategories(category);

    if (emoji) {
      emojiPicker.selectEmoji(emoji);
    } else {
      emojiPicker.removeEmoji();
    }
  },

  saveEditedData() {
    const {name, emoji, description, color, deadline, category} = this.getNewData();
    taskData.update(this.taskId, emoji, name, description, deadline, category, color);
    this.hideEditTask();
    renderTask();
    mngCategoryFilter();
    if (searchResult.style.display === 'flex') {
      search.dismiss();
    }

    const msg = `Task <b>${name}</b> updated.`;
    popup.showSuccess(msg);
  },

  getNewData() {
    const data = {};
    data.emoji = emojiPicker.getEmoji();
    data.name = nameInput.value;
    data.description = desInput.value;
    data.deadline = dateInput.value;
    data.category = ctgrySelector.getAllSelected();
    data.color = colorPicker.getSelectedClr();
    return data;
  },

  mngNmCount() {
    const value = nameInput.value;
    if (value !== '') {
      nmCount.style.display = 'block';
    } else {
      nmCount.style.display = 'none';
      return;
    }

    const length = value.length;
    if (length < 41) {
      nmCount.style.color = 'var(--text-color)';
      nm.style.borderColor = '#ddd';
      nmLabel.style.color = 'rgba(0, 0, 0, 0.6)';
      nmCount.innerHTML = `${length}/40`;
    } else {
      nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      nm.style.borderColor = 'rgb(255, 49, 49)';
      nmLabel.style.color = 'rgb(255, 49, 49)';
      nmCount.innerHTML = 'Name is too long (maximum 40 characters)';
    }
  },

  mngDesCount() {
    const value = desInput.value;
    if (value !== '') {
      desCount.style.display = 'block';
    } else {
      desCount.style.display = 'none';
      return;
    }

    const length = value.length;
    if (length < 251) {
      desCount.style.color = 'var(--text-color)';
      des.style.borderColor = '#ddd';
      desLabel.style.color = 'rgba(0, 0, 0, 0.6)';
      desCount.innerHTML = `${length}/250`;
    } else {
      desCount.style.color = 'rgba(255, 49, 49, 0.8)';
      des.style.borderColor = 'rgb(255, 49, 49)';
      desLabel.style.color = 'rgb(255, 49, 49)';
      desCount.innerHTML = 'Description is too long (maximum 250 characters)';
    }
  },

  mngSaveBtn() {
    const {name, emoji, description, color, deadline, category} = this.getNewData();

    const oldNm = this.oldData.name;
    const oldEmj = this.oldData.emoji;
    const oldClr = this.oldData.color;
    const oldDes = this.oldData.description;
    const oldDdl = this.oldData.deadline;
    const oldCtgry = this.oldData.category;

    if ((oldNm !== name || oldEmj !== emoji || oldClr !== color || oldDes !== description || oldDdl !== deadline || !arraysEqual(oldCtgry, category)) && (nameInput.value.length < 41 && desInput.value.length < 251)) {
      saveBtn.classList.add('enable');
    } else {
      saveBtn.classList.remove('enable');
    }
  },

  resize() {
    const width = taskContainer.offsetWidth;
    editTaskEl.style.width = (width - 64) + 'px';
  },
};