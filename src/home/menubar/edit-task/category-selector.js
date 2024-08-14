import { ctgryData } from '../../../data/categories.js'
import { string } from '../../../utils/string.js';
import { editTask } from './edit-task.js';

let selector, selected, select, arrowIcon, selectP, selectUl, selectedUl;

export const ctgrySelector = {
  init() {
    selector = document.querySelector("#ctgry-selector");
    selected = document.querySelector('#ctgry-selector .selected');
    select = document.querySelector('#ctgry-selector .select');
    arrowIcon = document.querySelector("#ctgry-selector .arrow-icon")
    selectP = document.querySelector('.select p');
    selectUl = document.querySelector('.select ul');
    selectedUl = document.querySelector('#ctgry-selector .selected ul');

    selected.addEventListener('click', ()=> {   
      if (select.classList.contains('visible')) {
        this.close();
      } else {
        this.open();      
      }
    });

    document.body.addEventListener('click', e => {
      if (!selector.contains(e.target) && 
      select.classList.contains('visible')) {
        this.close();
      }
    })
  },

  open() {
    arrowIcon.classList.add('rotate');
    select.classList.add('visible');
    this.addBg();
  },

  close() {
    arrowIcon.classList.remove('rotate');
    select.classList.remove('visible');
    this.rmvBg();
  },

  addBg() {
    const bg = document.createElement('div');
    bg.id = 'ctgry-selector-bg';
    bg.addEventListener('click', ()=> {
      this.close();
    })
    document.querySelector('.edit-task').prepend(bg);
  },

  rmvBg() {
    document.querySelector('#ctgry-selector-bg').remove();
  },

  renderCategories(preSelected) {
    selectUl.innerHTML = '';
    selectedUl.innerHTML = '';

    ctgryData.categories.forEach(category => {
      const {id, name, emoji, color} = category;

      const i = document.createElement('i');
      i.classList.add('fa-regular', 'fa-circle-dot');
      const emojiSpan = document.createElement('span');
      emojiSpan.innerText = emoji;
      emojiSpan.classList.add('select-emoji');
      const nameSpan = document.createElement('span');
      nameSpan.innerText = name;
      const li = document.createElement('li');
      li.dataset.id = id;
      li.style.backgroundColor = color;
      li.appendChild(i);
      li.appendChild(emojiSpan);
      li.appendChild(nameSpan);
      selectUl.appendChild(li);

      li.addEventListener('click', () => {
        if (!i.classList.contains('initial')) {
          this.selectACategory(i, id);
          editTask.mngSaveBtn();
        } else {
          this.unselectACategory(i, id);
          editTask.mngSaveBtn();
        }
      });

      //When task has already selected-category.
      if (preSelected) {
        preSelected.forEach(ctgryId => {
        if (ctgryId == id) { 
          this.selectACategory(i, id);
        }
      })
      }
    });

    if (preSelected) {
      const totalSelected= document.querySelectorAll('#ctgry-selector .select i.initial').length;   
      if (totalSelected == 3) {
        this.disableCtgry();
      }  
    }
  },

  selectACategory(i, id) {
    const totalSelected= document.querySelectorAll('#ctgry-selector .select i.initial').length;   
    if (totalSelected == 3) {
      return;
    }  
    
    i.classList.add('initial');
    selectedUl.appendChild(this.createAselectedCtgry(id));
    this.updateSelectedText();
    if (totalSelected == 2) {
      this.disableCtgry();
    }
  },

  unselectACategory(i, id) {
    i.classList.remove('initial');
    document.querySelectorAll('#ctgry-selector .selected ul li')
      .forEach(ctgry => {
        if (ctgry.dataset.id == id) {
          ctgry.remove();
          return;
        }
      });
    this.updateSelectedText();
    this.enableCtgry();
  },

  createAselectedCtgry(id) {
    const {name, color, emoji} = ctgryData.getCtgry(id);
    const li = document.createElement('li');
    li.style.backgroundColor = color;
    li.dataset.id = id;
    const emojiSpan = document.createElement('span');
    emojiSpan.innerText = emoji;
    emojiSpan.classList.add('selected-emoji');
    const nameSpan = document.createElement('span');
    nameSpan.innerText = name;

    li.appendChild(emojiSpan);
    li.appendChild(nameSpan);

    return li;
  },

  updateSelectedText() {
    const text = [];

    for (let ctgry of selectedUl.children) {
      text.push(ctgry.children[1].innerText);
    }

    if (text.length === 0) {
      selectP.innerText = '';
    } else {
      selectP.innerText = `Selected ${string.combineStrings(text)}`;
    }
  },

  disableCtgry() {
    const allCtgry = document.querySelectorAll(".select ul li");
    allCtgry.forEach(ctgry => {
      if (!ctgry.children[0].classList.contains('initial')) {
        ctgry.style.opacity = '0.6';
        ctgry.style.cursor = 'no-drop';
      }
    });
  },

  enableCtgry() {
    const allCtgry = document.querySelectorAll(".select li");
    allCtgry.forEach(ctgry => {
      if (!ctgry.children[0].classList.contains('initial')) {
        ctgry.style.opacity = '1';
        ctgry.style.cursor = 'pointer';
      }
    });
  },

  getAllSelected() {
    const ids = [];
    const allSelected = document.querySelectorAll(".selected ul li");
    allSelected.forEach(ctgry => {
      const id = ctgry.dataset.id;
      ids.push(id);
    });
  
    return ids;
  }
};