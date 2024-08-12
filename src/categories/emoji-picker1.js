const emojiIcon = document.querySelector('.EP1 .emoji');
const picker = document.querySelector('.EP1 .picker');
const removeEmoji = document.querySelector('.EP1 .remove-emoji');

export const emojiPicker1 = {
  getReady() {
    emojiIcon.addEventListener('click', () => {
      if (picker.classList.contains('active')) {
        this.close();
      } else {
        this.open();
      }
    });

    document.querySelector('.EP1 emoji-picker').addEventListener('emoji-click', e => {
      const emojiCode = e.detail.unicode;
      this.selectEmoji(emojiCode);
    });

    removeEmoji.addEventListener('click', () => {
      this.removeEmoji();
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