import { scroll } from "../utils/shortcut.js";
import { taskData } from "../data/tasks.js";
import { ctgryData } from "../data/categories.js";
import { mngAnim } from "../utils/shortcut.js";
import { string } from "../utils/string.js";
import { menubar } from "./menubar.js";

export const dltCnfrm = {
  taskId: undefined,

  init() {
    const el = document.querySelector('.delete-confirm');
    this.el = el;
    this.cnclBtn = el.querySelector('#cncl-btn');
    this.dltBtn = el.querySelector('#dlt-btn');
    this.nmEl = el.querySelector('.nm');
    this.desEl = el.querySelector('.des');
    this.ctgryEl = el.querySelector('.ctgry');
    this.bg = document.querySelector('.dlt-bg');

    this.bg.addEventListener('click', () => {
      this.close();
    });

    this.cnclBtn.addEventListener('click', () => {
      this.close();
    });

    this.dltBtn.addEventListener('click', () => {
      this.close();      
      menubar.dltTask();
    });
  },

  open(taskId) {
    this.taskId = taskId;
    this.updateData(taskId)
    this.el.style.display = 'block';
    mngAnim(this.el, 'opacityAnim', 0.3);
    this.bg.style.height = document.body.scrollHeight + 10 + 'px';
    this.bg.style.opacity = 1;
    scroll.disable();
  },

  close() {
      this.bg.style.height = 0;
      this.el.style.display = 'none';
      scroll.enable();
  },

  updateData(taskId) {
    const {name, description, category} = taskData.getTask(taskId);

    this.nmEl.innerHTML = '';
    this.desEl.innerHTML = '';
    this.ctgryEl.innerHTML = '';

    if (name) {
      this.nmEl.innerHTML = `<b>Task Name: </b><span>${name}</span>`;
    }

    if (description !== '') {
      this.desEl.innerHTML = `<b>Task Description: </b><span>${description}</span>`;
    }

    if (category.length > 0) {
      const array = [];
      category.forEach(id => {
        array.push(ctgryData.getCtgry(id).name);
      });
      const ctgry = string.combineStrings(array);
      this.ctgryEl.innerHTML = `<b>Categories: </b><span>${ctgry}</span>`;
    }
  }
}