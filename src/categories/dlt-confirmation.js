import { scroll } from "../utils/shortcut.js";
import { ctgryData } from "../data/categories.js";
import { taskData } from "../data/tasks.js";
import { oldCategories } from "./old.js";
import { popup } from "../utils/popup.js";

export const dltCnfrm = {
  ctgryId: undefined,

  init() {
    this.dltConfirm = document.querySelector('.delete-confirm');
    this.cnclBtn = document.querySelector('.delete-confirm #cncl-btn');
    this.dltBtn = document.querySelector('.delete-confirm #dlt-btn');
    this.nm = document.querySelector('.delete-confirm h3 b');
    this.bg = document.querySelector('#dlt-bg');

    this.bg.addEventListener('click', () => {
      this.close();
    });

    this.cnclBtn.addEventListener('click', () => {
      this.close();
    });

    this.dltBtn.addEventListener('click', () => {
      this.close();      
      this.dltCtgry();
    });
  },

  open(ctgryId) {
    this.ctgryId = ctgryId;
    this.nm.innerHTML = ctgryData.getCtgry(ctgryId).name;
    this.dltConfirm.classList.add('active');
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();
  },

  close() {
    this.bg.style.removeProperty('bottom');
    this.bg.style.opacity = 0;
    this.dltConfirm.classList.remove('active');
    scroll.enable();
  },

  dltCtgry() {
    const nm = ctgryData.getCtgry(this.ctgryId).name;
    const index = ctgryData.getIndex(this.ctgryId);
    taskData.removeActgryFromTasks(index);
    ctgryData.delete(this.ctgryId);
    oldCategories.render();

    const msg = `Deleted category - <b>${nm}</b>`;
    popup.showSuccess(msg);
  }
}