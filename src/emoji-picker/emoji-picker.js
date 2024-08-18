import 'https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js';

export class EmojiPicker {
  constructor(elSelector, handleEmojiCng) {
    if(handleEmojiCng) {
      this.handleEmojiCng = handleEmojiCng;
    }
    this.init(elSelector);
  }

  init(elSelector) {
    const el = document.querySelector(elSelector);
    this.emojiIcon = el.querySelector('.emoji');
    this.picker = el.querySelector('.picker');
    this.removeEmojiEl = el.querySelector('.remove-emoji');

    this.emojiIcon.addEventListener('click', () => {
      if (this.picker.classList.contains('active')) {
        this.close();
      } else {
        this.open();
      }
    });

    el.querySelector('emoji-picker').addEventListener('emoji-click', e => {
      const emojiCode = e.detail.unicode;
      this.selectEmoji(emojiCode);
      if (this.handleEmojiCng) this.handleEmojiCng();
    });

    this.removeEmojiEl.addEventListener('click', () => {
      this.removeEmoji();
      if (this.handleEmojiCng) this.handleEmojiCng();
    });
  }

  open() {
    this.picker.classList.add('active');
  }

  close() {
    this.picker.classList.remove('active');
  }

  selectEmoji(emoji) {
    this.emojiIcon.children[1].innerText = emoji;
    this.emojiIcon.children[1].style.opacity = 1;
    this.emojiIcon.children[0].style.display = 'none';
    this.close(); 
    this.removeEmojiEl.style.display = 'flex';
  }

  removeEmoji() {
    this.emojiIcon.children[1].innerText = '';
    this.emojiIcon.children[1].style.opacity = 0;
    this.emojiIcon.children[0].style.display = 'block';
    this.removeEmojiEl.style.display = 'none';
    this.close();
  }

  getEmoji() {
    const emoji = this.emojiIcon.children[1].innerText;
    return emoji;
  }
}