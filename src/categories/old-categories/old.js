import { ctgryData } from "../../data/categories.js";
import { taskData } from "../../data/tasks.js";
import { dltCnfrm } from "./dlt-confirmation.js";
import { editCtgry } from "./edit/edit.js";

const oldEl = document.querySelector('.old-categories');

export const oldCategories = {
  getReady() {
    this.render();
    editCtgry.getReady();
    dltCnfrm.getReady();
  },

  render() {
    let html = '';
    ctgryData.categories.forEach(ctgry => {
      const {id, name, emoji, color} = ctgry;      
      html +=
        `
        <div class="item" data-id="${id}"  style="background-color: ${color};">
          <div class="item-left">
            <span class="item-emoji">${emoji}
            </span>
            <span class="name">${name}</span>
            <span class="percent">${this.calculatePercent(id)}</span>
          </div>
          <div class="item-right">
            <span data-id="${id}" class="edit"><i class="fa-solid fa-pen"></i></span>
            <span data-id="${id}" class="delete"><i class="fa-solid fa-trash"></i></span>
          </div>
        </div>
      `
    });

    oldEl.innerHTML = html;

    document.querySelectorAll('.old-categories .item .edit')
      .forEach(el => {
        const id = el.dataset.id;
        el.addEventListener('click', () => {
          editCtgry.show(id);
        });
      });

    document.querySelectorAll('.old-categories .item .delete')
    .forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        dltCnfrm.open(id);
      });
    });

    oldEl.style.display = 'flex';
  },

  calculatePercent(id) {
    const allCtgryIds = taskData.getCtgryInfo().all;
    const doneCtgryIds = taskData.getCtgryInfo().done;

    if (!allCtgryIds[id]) {
      return '';
    }

    const total = allCtgryIds[id];
    const done = doneCtgryIds[id] || 0;
    const percent = (done / total) * 100;
    return `(${Math.round(percent)}%)`;
  }
};