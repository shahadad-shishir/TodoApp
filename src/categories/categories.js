import { EmojiPicker } from "../emoji-picker/emoji-picker.js";
import { ColorPicker } from "../color-picker/color-picker.js";
import { oldCategories } from "./old.js";
import { popup } from "../utils/popup.js";
import { ctgryData } from "../data/categories.js";

export function loadCategories() {
  const nmEl = document.querySelector('.new-ctgry .category-name');
  const nmLabel = document.querySelector('.new-ctgry .label1');
  const nmInput = document.querySelector('.new-ctgry #name-input');
  const nmCount = document.querySelector('.new-ctgry .nm-count');
  const createBtn = document.querySelector('.new-ctgry #create-btn');
  const formEmojiIcon = document.querySelector('.EP1 .emoji');

  const emojiPicker = new EmojiPicker('#emoji-picker.EP1');
  const handleClrCng = (clr) => {
    formEmojiIcon.style.backgroundColor = clr;
  }
  const colorPicker = new ColorPicker('#color-picker.CP1', handleClrCng);
  colorPicker.selectThisClr('#7e30e1');
  oldCategories.init();

  createBtn.addEventListener('click', () => {
    if (createBtn.classList.contains('enable')) {
      createCtgry();
    }
  });

  function createCtgry() {
    const nm = nmInput.value;

    if (nm === '') {
      popup.showError('Category name is required.');
      return;
    }

    const emoji = emojiPicker.getEmoji();
    const color = colorPicker.getSelectedClr();
    ctgryData.create(nm, emoji, color);
    oldCategories.render();
    emojiPicker.removeEmoji();
    emojiPicker.close();
    colorPicker.selectThisClr('#7e30e1');
    nmInput.value = '';
    if (nmCount.style.display === 'block') {
      nmCount.style.display = 'none';
      nmEl.style.borderColor = 'var(--secondary-color)';
      nmLabel.style.color = 'var(--secondary-color)';
    }

    const msg = `Added category - <b>${nm}</b>`;
    popup.showSuccess(msg);
  }

  nmInput.addEventListener('input', () => {
    mngNmCount();
  });


  function mngNmCount() {
    const value = nmInput.value;
    if (value !== '') {
      nmCount.style.display = 'block';
    } else {
      nmCount.style.display = 'none';
    }

    const length = value.length;
    if (length < 21) {
      nmCount.style.color = 'var(--text-color)';
      nmEl.style.borderColor = 'var(--secondary-color)';
      nmLabel.style.color = 'var(--secondary-color)';
      nmCount.innerHTML = `${length}/20`;
      createBtn.classList.add('enable');
    } else {
      nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      nmEl.style.borderColor = 'rgb(255, 49, 49)';
      nmLabel.style.color = 'rgb(255, 49, 49)';
      nmCount.innerHTML = 'Name is too long (maximum 20 characters)';
      createBtn.classList.remove('enable');
    }
  }
}