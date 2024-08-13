import { editTask } from "./edit-task.js";

let emojiIcon, picker, removeEmoji;

export const emojiPicker = {
  getReady() {
    emojiIcon = document.querySelector('#emoji-picker .emoji');
    picker = document.querySelector('#emoji-picker .picker');
    removeEmoji = document.querySelector('.remove-emoji');

    emojiIcon.addEventListener('click', () => {
      if (picker.classList.contains('active')) {
        this.close();
      } else {
        this.open();
      }
    });

    document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
      const emojiCode = e.detail.unicode;
      this.selectEmoji(emojiCode);
      editTask.mngSaveBtn();
    });

    removeEmoji.addEventListener('click', () => {
      this.removeEmoji();
      editTask.mngSaveBtn();
    });
  },

  open() {
    picker.classList.add('active');
  },

  close() {
    picker.classList.remove('active');
  },

  selectEmoji(emoji) {
    emojiIcon.children[1].innerText = emoji;
    emojiIcon.children[1].style.opacity = 1;
    emojiIcon.children[0].style.display = 'none';
    this.close(); 
    removeEmoji.style.display = 'flex';
  },

  removeEmoji() {
    emojiIcon.children[1].innerText = '';
    emojiIcon.children[1].style.opacity = 0;
    emojiIcon.children[0].style.display = 'block';
    removeEmoji.style.display = 'none';
    this.close();
  },

  getEmoji() {
    const emoji = emojiIcon.children[1].innerText;
    return emoji;
  }
};