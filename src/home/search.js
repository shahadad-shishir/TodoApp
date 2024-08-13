import { taskData } from "../data/tasks.js";
import { mngCategoryFilter } from "./category-filter.js";
import { mngAnim } from "../utils/shortcut.js";
import { renderTask } from "./task.js";

let searchInput, searchBtn, srcRsltCount, srcRsltEmpty;
export let searchResult;

export const search = {
  getReady() {
    searchInput = document.querySelector('#search-input');
    searchBtn = document.querySelector('.search-bar button');
    searchResult = document.querySelector('.search-result');
    srcRsltCount = document.querySelector('.search-result .count');
    srcRsltEmpty = document.querySelector('.search-result .empty');

    searchInput.addEventListener('keyup', e => {
      const searchTxt = searchInput.value;
      searchBtn.style.display = 'flex';
      this.mngHighliting(searchTxt);
      mngCategoryFilter();
    });

    searchBtn.addEventListener('click', () => {
      renderTask();
      mngCategoryFilter();
      this.dismiss();
    });
  },

  mngHighliting(searchTxt) {
    let foundTasks = 0;

    if (searchTxt === '') {
      searchResult.style.display = 'none';
      searchBtn.style.display = 'none';
      renderTask();
      return;
    }

    taskData.tasks.forEach(task => {
      const id = task.id;
      const name = task.name;
      const des = task.description;

      const highlightedNm = this.highlightText(name, searchTxt);
      const highlightedDes = this.highlightText(des, searchTxt);

      const taskEl = document.querySelector(`.task[data-id='${id}']`);
      const nameEl = document.querySelector(`.task[data-id='${id}'] .top-left h3`);
      const desEl = document.querySelector(`.task[data-id='${id}'] .bottom-area p`);

      if (!highlightedNm && !highlightedDes) {
        taskEl.style.display = 'none';
      } else {
        if (taskEl.style.display === 'none') {
          taskEl.style.display = 'flex';
          mngAnim(taskEl, 'opacityAnim', 1);
        }
      }

      if (highlightedNm) {
        nameEl.innerHTML = highlightedNm;
      } else {
        nameEl.innerHTML = name;
      }

      if (highlightedDes) {
        if (desEl) {
          desEl.innerHTML = highlightedDes;
        }
      } else {
        if (desEl) {
          desEl.innerHTML = des;
        }
      }

      if (highlightedNm || highlightedDes) {
        foundTasks += 1;
      }
    });

    if (foundTasks > 0) {
      searchResult.style.display = 'flex';
      srcRsltCount.style.display = 'flex';
      srcRsltEmpty.style.display = 'none';
      searchBtn.style.color = 'white';
    } else if (foundTasks == 0) {
      srcRsltCount.style.display = 'none';
      searchResult.style.display = 'flex';
      srcRsltEmpty.style.display = 'flex';
      mngAnim(srcRsltEmpty, 'opacityAnim', 1);
      searchBtn.style.color = 'red';
    }

    if (foundTasks == 1) {
      srcRsltCount.innerText = 'Found 1 task'
    } else {
      srcRsltCount.innerText = `Found ${foundTasks} tasks`;
    }
  },

  highlightText(originalTxt, searchTxt) {
    const regex = new RegExp(searchTxt, 'gi');
    const highlightedTxt = originalTxt.replace(regex, match => {
      return `<span class ="highlighted-text">${match}</span>`;
    });
  
    if (highlightedTxt === originalTxt) {
      return false;
    }
  
    return highlightedTxt;
  },

  dismiss() {
    searchInput.value = '';
    searchResult.style.display = 'none';
    searchBtn.style.display = 'none';
  }
};