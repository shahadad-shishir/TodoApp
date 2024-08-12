import { ctgryData } from "../../../data/categories.js";
import { popup } from "../../../utils/popup.js";
import { scroll } from "../../../utils/shortcut.js";
import { colorPicker2 } from "../../color-picker2.js";
import { emojiPicker2 } from "../../emoji-picker2.js";
import { oldCategories } from "../old.js";


const editEl = document.querySelector('.edit-category');
const bg = document.querySelector('#editCtgry-bg');
const cancelBtn = document.querySelector('#edit-cancel-btn');
const saveBtn = document.querySelector('#edit-save-btn');
const nm = document.querySelector('.edit-name');
const nmLabel = document.querySelector('.edit-label1');
const nmInput = document.querySelector('.edit-category input');
const nmCount = document.querySelector('.edit-nm-count');

export const editCtgry = {
  ctgryId: undefined,
  oldData: undefined,
  
  getReady() {
    bg.addEventListener('click', () => {
      this.hide();
    });
    
    nmInput.addEventListener('input', () => {
      this.mngNmCount();
      this.mngSaveBtn();
    });

    cancelBtn.addEventListener('click', () => {
      this.hide();
    });

    saveBtn.addEventListener('click', () => {
      if (saveBtn.classList.contains('enable')) {
        this.saveEditedData();
      }
    });

    colorPicker2.getReady();
    emojiPicker2.getReady();
  },

  show(id) {
    this.ctgryId = id;
    this.oldData = ctgryData.getCtgry(this.ctgryId);
    editEl.classList.add('active');
    bg.style.height = document.body.scrollHeight + 10 + 'px';
    bg.style.opacity = 1;
    scroll.disable();
    this.showEditableData();
    this.mngSaveBtn();
  },

  hide() {
    colorPicker2.close();
    emojiPicker2.close();

    bg.style.height = 0;
    editEl.classList.remove('active');
    scroll.enable();
  },

  showEditableData() {
    const data = ctgryData.getCtgry(this.ctgryId);
    const {name, emoji, color} = data;
    
    nmInput.value = name;
    nmCount.style.display = 'block';
    nmCount.innerHTML = `${nmInput.value.length}/20`;

    colorPicker2.selectThisClr(color);
    if (emoji) {
      emojiPicker2.selectEmoji(emoji);
    } else {
      emojiPicker2.removeEmoji();
    }
  },

  mngNmCount() {
    const value = nmInput.value;
    if (value !== '') {
      nmCount.style.display = 'block';
    } else {
      nmCount.style.display = 'none';
    }

    const length = value.length;
    if (length < 21) {
      nmCount.style.color = 'var(--text-color)';
      nm.style.borderColor = '#ddd';
      nmLabel.style.color = 'rgba(0, 0, 0, 0.6)';
      nmCount.innerHTML = `${length}/20`;
    } else {
      nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      nm.style.borderColor = 'rgb(255, 49, 49)';
      nmLabel.style.color = 'rgb(255, 49, 49)';
      nmCount.innerHTML = 'Name is too long (maximum 20 characters)';
    }
  },

  saveEditedData() {
    const emoji = emojiPicker2.getEmoji();
    const name = nmInput.value;
    const color = colorPicker2.getSelectedClr();
  
    ctgryData.update(this.ctgryId, name, emoji, color);
    this.hide();
    oldCategories.render();
    const msg = `Updated category - <b>${name}</b>`;
    popup.showSuccess(msg)
  },

  mngSaveBtn() {
    const oldNm = this.oldData.name;
    const oldEmj = this.oldData.emoji;
    const oldClr = this.oldData.color;

    const emoji = emojiPicker2.getEmoji();
    const name = nmInput.value;
    const color = colorPicker2.getSelectedClr();

    if ((oldNm !== name || oldEmj !== emoji || oldClr !== color) & name.length < 21) {
      saveBtn.classList.add('enable');
    } else {
      saveBtn.classList.remove('enable');
    }
  }
};