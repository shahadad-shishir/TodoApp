import { scroll } from "../../utils/shortcut.js";
import { ctgryData } from "../../data/categories.js";
import { taskData } from "../../data/tasks.js";
import { oldCategories } from "./old.js";
import { popup } from "../../utils/popup.js";

let dltConfirm, cnclBtn, dltBtn, nm, bg;

export const dltCnfrm = {
  ctgryId: undefined,

  init() {
    dltConfirm = document.querySelector('.delete-confirm');
    cnclBtn = document.querySelector('.delete-confirm #cncl-btn');
    dltBtn = document.querySelector('.delete-confirm #dlt-btn');
    nm = document.querySelector('.delete-confirm h3 b');
    bg = document.querySelector('#dlt-bg');

    bg.addEventListener('click', () => {
      this.close();
    });

    cnclBtn.addEventListener('click', () => {
      this.close();
    });

    dltBtn.addEventListener('click', () => {
      this.close();      
      this.dltCtgry();
    });
  },

  open(ctgryId) {
    this.ctgryId = ctgryId;
    nm.innerHTML = ctgryData.getCtgry(ctgryId).name;
    dltConfirm.classList.add('active');
    bg.style.height = document.body.scrollHeight + 10 + 'px';
    bg.style.opacity = 1;
    scroll.disable();
  },

  close() {
    bg.style.height = 0;
    bg.style.opacity = 0;
    dltConfirm.classList.remove('active');
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