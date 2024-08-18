import { ctgryData } from "../../../data/categories.js";
import { popup } from "../../../utils/popup.js";
import { scroll } from "../../../utils/shortcut.js";
import { ColorPicker } from "../../../color-picker/color-picker.js";
import { EmojiPicker } from "../../../emoji-picker/emoji-picker.js";
import { oldCategories } from "../old.js";

let editEl, bg, cancelBtn, saveBtn, nm, nmLabel, nmInput, nmCount;

export const editCtgry = {
  ctgryId: undefined,
  oldData: undefined,
  
  init() {
    editEl = document.querySelector('.edit-category');
    bg = document.querySelector('#editCtgry-bg');
    cancelBtn = document.querySelector('#edit-cancel-btn');
    saveBtn = document.querySelector('#edit-save-btn');
    nm = document.querySelector('.edit-name');
    nmLabel = document.querySelector('.edit-label1');
    nmInput = document.querySelector('.edit-category input');
    nmCount = document.querySelector('.edit-nm-count');
    this.formEmojiIcon = document.querySelector('.EP2 .emoji');

    bg.addEventListener('click', () => {
      this.hide();
    });
    
    nmInput.addEventListener('input', () => {
      this.mngNmCount();
      this.updateSaveBtnState();
    });

    cancelBtn.addEventListener('click', () => {
      this.hide();
    });

    saveBtn.addEventListener('click', () => {
      if (saveBtn.classList.contains('enable')) {
        this.saveEditedData();
      }
    });

    this.colorPicker = new ColorPicker('#color-picker.CP2', (clr) => {
      this.formEmojiIcon.style.backgroundColor = clr;
      this.updateSaveBtnState();
    });
    this.emojiPicker = new EmojiPicker('#emoji-picker.EP2', () => {
      this.updateSaveBtnState();
    });
  },

  show(id) {
    this.ctgryId = id;
    this.oldData = ctgryData.getCtgry(this.ctgryId);
    editEl.classList.add('active');
    bg.style.height = document.body.scrollHeight + 10 + 'px';
    bg.style.opacity = 1;
    scroll.disable();
    this.showEditableData();
    this.updateSaveBtnState();
  },

  hide() {
    this.colorPicker.close();
    this.emojiPicker.close();

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

    this.colorPicker.selectThisClr(color);
    if (emoji) {
      this.emojiPicker.selectEmoji(emoji);
    } else {
      this.emojiPicker.removeEmoji();
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
    const emoji = this.emojiPicker.getEmoji();
    const name = nmInput.value;
    const color = this.colorPicker.getSelectedClr();
  
    ctgryData.update(this.ctgryId, name, emoji, color);
    this.hide();
    oldCategories.render();
    const msg = `Updated category - <b>${name}</b>`;
    popup.showSuccess(msg)
  },

  updateSaveBtnState() {
    const oldNm = this.oldData.name;
    const oldEmj = this.oldData.emoji;
    const oldClr = this.oldData.color;

    const emoji = this.emojiPicker.getEmoji();
    const name = nmInput.value;
    const color = this.colorPicker.getSelectedClr();

    if ((oldNm !== name || oldEmj !== emoji || oldClr !== color) & name.length < 21) {
      saveBtn.classList.add('enable');
    } else {
      saveBtn.classList.remove('enable');
    }
  }
};