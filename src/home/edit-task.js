import { arraysEqual, scroll } from "../utils/shortcut.js";
import { taskData } from "../data/tasks.js";
import { CategorySelector } from "../category-selector/category-selector.js";
import { ColorPicker } from "../color-picker/color-picker.js";
import { EmojiPicker } from "../emoji-picker/emoji-picker.js";
import { taskContainer, renderTask } from "./task.js";
import { search } from "./search.js";
import { mngCategoryFilter } from "./category-filter.js";
import { popup } from "../utils/popup.js";

export const editTask = {
  taskId: undefined,

  init() {
    const el = document.querySelector('.edit-task');
    this.el = el;
    this.saveBtn = document.querySelector('#save-btn');
    this.editTaskBg = document.querySelector('#editTask-bg');
    this.cancelBtn = el.querySelector('#cancel-btn');
    this.nameInput = el.querySelector('#name-input');
    this.desInput = el.querySelector('#description');
    this.dateInput = el.querySelector('#date-input');
    this.nm = el.querySelector('.name');
    this.des = el.querySelector('.description');
    this.nmLabel = el.querySelector('.name label');
    this.desLabel = el.querySelector('.description label');
    this.nmCount = el.querySelector('span.nm-count');
    this.desCount = el.querySelector('span.des-count');
    this.formEmojiIcon = document.querySelector('#emoji-picker .emoji');

    this.editTaskBg.addEventListener('click', () => {
      this.hideEditTask();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });

    this.nameInput.addEventListener('input', () => {
      this.mngNmCount();
      this.updateSaveBtnState();
    });

    this.desInput.addEventListener('input', () => {
      this.mngDesCount();
      this.updateSaveBtnState();
    });

    this.dateInput.addEventListener('input', () => {
      this.updateSaveBtnState();
    });

    this.cancelBtn.addEventListener('click', () => {
      this.hideEditTask();
    });

    this.saveBtn.addEventListener('click', () => {
      if (this.saveBtn.classList.contains('enable')) {
        this.saveEditedData();
      }
    });

    this.emojiPicker = new EmojiPicker('#emoji-picker', () => {
      this.updateSaveBtnState();
    });

    this.ctgrySelector = new CategorySelector('#ctgry-selector', () => {
      this.updateSaveBtnState();
    });

    this.colorPicker = new ColorPicker('#color-picker', (clr) => {
      this.formEmojiIcon.style.backgroundColor = clr;
      this.updateSaveBtnState();
    });
  },

  showEditTask(taskId) {
    this.taskId = taskId;
    this.oldData = taskData.getTask(this.taskId);
    this.resize();
    this.el.classList.add('active');
    this.editTaskBg.style.height = document.body.scrollHeight + 10 + 'px';
    this.editTaskBg.style.opacity = 1;
    scroll.disable();
    this.showEditableData();
    this.updateSaveBtnState();
  },

  hideEditTask() {
    this.ctgrySelector.clearText();
    this.colorPicker.close();
    this.emojiPicker.close();

    this.editTaskBg.style.height = 0;
    this.el.classList.remove('active');
    scroll.enable();
  },

  showEditableData() {
    const data = taskData.getTask(this.taskId);
    const {name, emoji, description, color, deadline, category} = data;
    
    this.nameInput.value = name;
    this.nmCount.style.display = 'block';
    this.nmCount.innerHTML = `${this.nameInput.value.length}/40`;
    this.desInput.value = description;
    if (description !== '') {
      this.desCount.style.display = 'block';
      this.desCount.innerHTML = `${this.desInput.value.length}/250`;
    } else {
      this.desCount.style.display = 'none';
    }
    this.dateInput.value = deadline;

    this.colorPicker.selectThisClr(color);
    this.ctgrySelector.renderCategories(category);

    if (emoji) {
      this.emojiPicker.selectEmoji(emoji);
    } else {
      this.emojiPicker.removeEmoji();
    }
  },

  saveEditedData() {
    const {name, emoji, description, color, deadline, category} = this.getNewData();
    taskData.update(this.taskId, emoji, name, description, deadline, category, color);
    this.hideEditTask();
    renderTask();
    mngCategoryFilter();
    search.dismiss();
    const msg = `Task <b>${name}</b> updated.`;
    popup.showSuccess(msg);
  },

  getNewData() {
    const data = {};
    data.emoji = this.emojiPicker.getEmoji();
    data.name = this.nameInput.value;
    data.description = this.desInput.value;
    data.deadline = this.dateInput.value;
    data.category = this.ctgrySelector.getAllSelected();
    data.color = this.colorPicker.getSelectedClr();
    return data;
  },

  mngNmCount() {
    const value = this.nameInput.value;
    if (value !== '') {
      this.nmCount.style.display = 'block';
    } else {
      this.nmCount.style.display = 'none';
      return;
    }

    const length = value.length;
    if (length < 41) {
      this.nmCount.style.color = 'var(--text-color)';
      this.nm.style.borderColor = '#ddd';
      this.nmLabel.style.color = 'rgba(0, 0, 0, 0.6)';
      this.nmCount.innerHTML = `${length}/40`;
    } else {
      this.nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      this.nm.style.borderColor = 'rgb(255, 49, 49)';
      this.nmLabel.style.color = 'rgb(255, 49, 49)';
      this.nmCount.innerHTML = 'Name is too long (maximum 40 characters)';
    }
  },

  mngDesCount() {
    const value = this.desInput.value;
    if (value !== '') {
      this.desCount.style.display = 'block';
    } else {
      this.desCount.style.display = 'none';
      return;
    }

    const length = value.length;
    if (length < 251) {
      this.desCount.style.color = 'var(--text-color)';
      this.des.style.borderColor = '#ddd';
      this.desLabel.style.color = 'rgba(0, 0, 0, 0.6)';
      this.desCount.innerHTML = `${length}/250`;
    } else {
      this.desCount.style.color = 'rgba(255, 49, 49, 0.8)';
      des.style.borderColor = 'rgb(255, 49, 49)';
      this.desLabel.style.color = 'rgb(255, 49, 49)';
      this.desCount.innerHTML = 'Description is too long (maximum 250 characters)';
    }
  },

  updateSaveBtnState() {
    const {name, emoji, description, color, deadline, category} = this.getNewData();

    const oldnm = this.oldData.name;
    const oldEmj = this.oldData.emoji;
    const oldClr = this.oldData.color;
    const oldDes = this.oldData.description;
    const oldDdl = this.oldData.deadline;
    const oldCtgry = this.oldData.category;

    if ((oldnm !== name || oldEmj !== emoji || oldClr !== color || oldDes !== description || oldDdl !== deadline || !arraysEqual(oldCtgry, category)) && (this.nameInput.value.length < 41 && this.desInput.value.length < 251)) {
      this.saveBtn.classList.add('enable');
    } else {
      this.saveBtn.classList.remove('enable');
    }
  },

  resize() {
    const width = taskContainer.offsetWidth;
    this.el.style.width = (width - 64) + 'px';
  },
};