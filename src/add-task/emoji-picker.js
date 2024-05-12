  const emoji = document.querySelector('.emoji');
  const emojiIcon = document.querySelector('.emoji .icon');
  const emojiPicker = document.querySelector('.emoji-picker');
  const removeEmoji = document.querySelector('.remove-emoji');

  export function handleEmoji() {
    addListeners();
  }

  function addListeners() {
    emoji.addEventListener('click', () => {
      emojiPicker.classList.toggle('picker-active');
    });
    
    document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
      const emojiCode = e.detail.unicode;
      emojiIcon.children[1].innerText = emojiCode;
      emojiIcon.children[1].style.opacity = 1;
      emojiIcon.children[0].style.display = 'none';
      emojiPicker.classList.remove('picker-active'); 
      removeEmoji.style.display = 'flex';
    });
    
    removeEmoji.addEventListener('click', () => {
      emojiIcon.children[1].innerText = '';
      emojiIcon.children[1].style.opacity = 0;
      emojiIcon.children[0].style.display = 'block';
      removeEmoji.style.display = 'none';
      emojiPicker.classList.remove('picker-active');
    });
  }

  export function getEmoji() {
    const emoji = emojiIcon.children[1].innerText;
    return emoji;
  }