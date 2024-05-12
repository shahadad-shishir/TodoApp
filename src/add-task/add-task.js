  import { handleEmoji, getEmoji } from "./emoji-picker.js";
  import { handleCategory, getCategoryId } from "./category-selector.js";
  import { handleColor } from "./color-picker.js";
  import { generateRandomId } from "../utils/number.js";
  import { addTask, categoryData } from "../data.js";
  import { mngPopup } from "../utils/popup.js";

  const nameInput = document.querySelector('#name-input');
  const description = document.querySelector('#description');
  const dateInput = document.querySelector('#date-input');
  const colorInput = document.querySelector('#color-input');
  const nm = document.querySelector('.name');
  const des = document.querySelector('.description');
  const nmLabel = document.querySelector('.name label');
  const desLabel = document.querySelector('.description label');
  const nmCount = document.querySelector('span.nm-count');
  const desCount = document.querySelector('span.des-count');
  const popup = document.querySelector('.popup');

  handleEmoji();
  handleCategory(categoryData);
  handleColor();

  document.querySelector('.js-back-btn')
    .addEventListener('click', () => {
      window.location.href = '../index.html';
    });

  document.querySelector('#create-btn')
    .addEventListener('click', createTask);

  function createTask() {
    const name = nameInput.value;
    if (name === '') {
      mngPopup('noNm');
      return;
    }

    const descriptionVal = description.value;
    const deadline = dateInput.value;
    const color = colorInput.value;
    const categoriesId = getCategoryId();
    const emoji = getEmoji();
    const id = generateRandomId();
    addTask(emoji, name, descriptionVal, deadline, categoriesId, color, id);
    window.location.href = '../index.html';
  }

  nameInput.addEventListener('input', () => {
    const value = nameInput.value;
    if (value !== '') {
      nmCount.style.display = 'block';
      mngNmCount(value);
    } else {
      nmCount.style.display = 'none';
    }
  });

  description.addEventListener('input', () => {
    const value = description.value;
    if (value !== '') {
      desCount.style.display = 'block';
      mngDesCount(value);
    } else {
      desCount.style.display = 'none';
    }
  });


  function mngNmCount(value) {
    const length = value.length;
    if (length < 51) {
      nmCount.style.color = 'var(--text-color)';
      nm.style.borderColor = 'var(--secondary-color)';
      nmLabel.style.color = 'var(--secondary-color)';
      nmCount.innerHTML = `${length}/50`;
    } else {
      nameInput.value = value.slice(0, 50);
      nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
      nm.style.borderColor = 'rgb(255, 49, 49)';
      nmLabel.style.color = 'rgb(255, 49, 49)';
      nmCount.innerHTML = 'Name should be less than or equal to 50 characters';
    }
  }

  function mngDesCount(value) {
    const length = value.length;
    if (length < 251) {
      desCount.style.color = 'var(--text-color)';
      des.style.borderColor = 'var(--secondary-color)';
      desLabel.style.color = 'var(--secondary-color)';
      desCount.innerHTML = `${length}/250`;
    } else {
      description.value = value.slice(0, 250);
      desCount.style.color = 'rgba(255, 49, 49, 0.8)';
      des.style.borderColor = 'rgb(255, 49, 49)';
      desLabel.style.color = 'rgb(255, 49, 49)';
      desCount.innerHTML = 'Description should be less than or equal to 250 characters';
    }
  }
