  import { taskData } from "../data.js";
  import { EmojiPicker } from "../emoji-picker/emoji-picker.js";
  import { CtgrySelectorWithTglScroll } from "../category-selector/category-selector.js";
  import { ColorPicker } from "../color-picker/color-picker.js";
  import { generateRandomId } from "../utils/number.js";
  import { popup } from "../utils/popup.js";
  import { navigateTo } from "../route.js";

  export function loadAddTask() {
    const nameInput = document.querySelector('#name-input');
    const description = document.querySelector('#description');
    const dateInput = document.querySelector('#date-input');
    const nm = document.querySelector('.name');
    const des = document.querySelector('.description');
    const nmLabel = document.querySelector('.name label');
    const desLabel = document.querySelector('.description label');
    const nmCount = document.querySelector('span.nm-count');
    const desCount = document.querySelector('span.des-count');
    const createBtn =  document.querySelector('#create-btn');
    const modifyCtgry = document.querySelector('.modify-category');
    const formEmojiIcon = document.querySelector('#emoji-picker .emoji');
  
    const emojiPicker = new EmojiPicker('#emoji-picker');
    const ctgrySelector = new CtgrySelectorWithTglScroll('#ctgry-selector');
    ctgrySelector.renderCategories();
    const colorPicker = new ColorPicker('#color-picker', (clr) => {
      formEmojiIcon.style.backgroundColor = clr;
    });
    colorPicker.selectThisClr('#b624ff'); 

    modifyCtgry.addEventListener('click', () => {
      navigateTo('/categories');
    });

    createBtn.addEventListener('click', () => {
      if (createBtn.classList.contains('enable')) {
        createTask();
      }
    });
  
    function createTask() {
      const name = nameInput.value;
      if (name === '') {
        const msg = 'Task name is required.';
        popup.showError(msg);
        return;
      }
  
      const descriptionVal = description.value;
      const deadline = dateInput.value;
      const color = colorPicker.getSelectedClr();
      const categoriesId = ctgrySelector.getAllSelected();
      const emoji = emojiPicker.getEmoji();
      const id = generateRandomId();
      taskData.add(emoji, name, descriptionVal, deadline, categoriesId, color, id);
      navigateTo('/');
    }
  
    nameInput.addEventListener('input', () => {
      const value = nameInput.value;     
      mngNmCount(value);
    });
  
    description.addEventListener('input', () => {
      const value = description.value;
      mngDesCount(value);
  
    }); 
  
    function mngNmCount(value) {
      if (value === '') {
        nmCount.style.display = 'none';
      } else {
        nmCount.style.display = 'block';
      }
  
      const length = value.length;
      if (length < 41) {
        nmCount.style.color = 'var(--text)';
        nm.style.borderColor = 'var(--secondary)';
        nmLabel.style.color = 'var(--secondary)';
        nmCount.innerHTML = `${length}/40`;
      } else {
        nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
        nm.style.borderColor = 'rgb(255, 49, 49)';
        nmLabel.style.color = 'rgb(255, 49, 49)';
        nmCount.innerHTML = 'Name is too long (maximum 40 characters)';
      }
  
      mngCreateBtn();
    }
  
    function mngDesCount(value) {
      if (value === '') {
        desCount.style.display = 'none';
      } else {
        desCount.style.display = 'block';
      }
  
      const length = value.length;
      if (length < 251) {
        desCount.style.color = 'var(--text)';
        des.style.borderColor = 'var(--secondary)';
        desLabel.style.color = 'var(--secondary)';
        desCount.innerHTML = `${length}/250`;
      } else {
        desCount.style.color = 'rgba(255, 49, 49, 0.8)';
        des.style.borderColor = 'rgb(255, 49, 49)';
        desLabel.style.color = 'rgb(255, 49, 49)';
        desCount.innerHTML = 'Description is too long (maximum 250 characters)';
      }
  
      mngCreateBtn();
    }
  
    function mngCreateBtn() {
      const des = description.value.length;
      const nm = nameInput.value.length;
  
      if (nm < 41 && des < 251) {
        createBtn.classList.add('enable');
      } else {
        createBtn.classList.remove('enable');
      }
    }
  }