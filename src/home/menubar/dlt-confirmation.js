import { scroll } from "../../utils/shortcut.js";
import { taskData } from "../../data/tasks.js";
import { ctgryData } from "../../data/categories.js";
import { mngAnim } from "../../utils/shortcut.js";
import { string } from "../../utils/string.js";
import { menubar } from "./menubar.js";

let dltConfirm, cnclBtn, dltBtn, nmEl, desEl, ctgryEl, blurBg;

export const dltCnfrm = {
  taskId: undefined,

  getReady() {
    dltConfirm = document.querySelector('.delete-confirm');
    cnclBtn = document.querySelector('.delete-confirm #cncl-btn');
    dltBtn = document.querySelector('.delete-confirm #dlt-btn');
    nmEl = document.querySelector('.delete-confirm .nm');
    desEl = document.querySelector('.delete-confirm .des');
    ctgryEl = document.querySelector('.delete-confirm .ctgry');
    blurBg = document.querySelector('.blur-bg');

    blurBg.addEventListener('click', () => {
      this.close();
    });

    cnclBtn.addEventListener('click', () => {
      this.close();
    });

    dltBtn.addEventListener('click', () => {
      this.close();      
      menubar.dltTask();
    });
  },

  open(taskId) {
    this.taskId = taskId;
    this.updateData(taskId)
    dltConfirm.style.display = 'block';
    mngAnim(dltConfirm, 'opacityAnim', 0.3);
    blurBg.style.height = document.body.scrollHeight + 10 + 'px';
    blurBg.style.opacity = 1;
    scroll.disable();
  },

  close() {
      blurBg.style.height = 0;
      dltConfirm.style.display = 'none';
      scroll.enable();
  },

  updateData(taskId) {
    const {name, description, category} = taskData.getTask(taskId);

    nmEl.innerHTML = '';
    desEl.innerHTML = '';
    ctgryEl.innerHTML = '';

    if (name) {
      nmEl.innerHTML = `<b>Task Name: </b><span>${name}</span>`;
    }

    if (description !== '') {
      desEl.innerHTML = `<b>Task Description: </b><span>${description}</span>`;
    }

    if (category.length > 0) {
      const array = [];
      category.forEach(id => {
        array.push(ctgryData.getCtgry(id).name);
      });
      const ctgry = string.combineStrings(array);
      ctgryEl.innerHTML = `<b>Categories: </b><span>${ctgry}</span>`;
    }
  }
}