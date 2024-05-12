  const colorData = {
    allColors: ['#7E30E1','#B624FF', '#FF69B4', '#FB34FF', '#FF22B4', '#C6A7FF', '#7ACCFA', '#4A9DFF', '#5061FF', '#50B5CB', '#3DFF7F', '#3AE836', '#B7FF42', '#FFEA28', '#FF9518', '#FFC3A0', '#FF5018', '#FF2F2F'],
    selectedColor: '#7E30E1'
  }

  const selectColor = document.querySelector('.select-color');
  const colorOptions = document.querySelector('.color-selector .color-options');
  const colorCode = document.querySelector('.color-selector .color-code');
  const selectedClrEl = document.querySelector('.selected-color .color');
  const colorPicker = document.querySelector('.color-picker');
  const colorPickerSpan = document.querySelector('.color-picker span');
  const colorInput = document.querySelector('.color-picker input');
  const randomClrBtn = document.querySelector('.color-picker #random-color');
  const formEmojiIcon = document.querySelector('.form .emoji .icon');

  export function handleColor() {
    renderColors(colorData);
    addListeners();
  }


  function renderColors(colorData) {
    colorData.allColors.forEach(color => {
      const btn = document.createElement('button');
      btn.style.backgroundColor = color;

      colorOptions.appendChild(btn);

      addShadow(btn, color);

      btn.addEventListener('click', () => {
        cngSelectedClr(btn, color);
      });

      
      if (color === colorData.selectedColor) {
        addCheckIcon(btn);
      }
    });

    cngAllElementsClr();
  }


  function cngSelectedClr(btn, color) {
    removeCheckIcon();
    addCheckIcon(btn);

    updateClrdata(color);
    cngAllElementsClr();
  }

  function addCheckIcon(btn) {
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-solid', 'fa-check');
    btn.appendChild(checkIcon);
  }

  function removeCheckIcon() {
    const allcolorBtns = document.querySelectorAll('.color-options button');
    for (let btn of allcolorBtns) {
      if (btn.children[0]) {
        btn.children[0].remove();
      }
    }
  }

  export function cngAllElementsClr() {
    const color = colorData.selectedColor;
    colorCode.style.backgroundColor = color;
    colorCode.innerText = color;
    selectedClrEl.style.background = color;
    colorPickerSpan.style.backgroundColor = color;
    addShadow(colorPickerSpan, color);
    colorPickerSpan.style.backgroundColor = color;
    addShadow(colorPickerSpan, color);
    formEmojiIcon.style.backgroundColor = color;

    colorInput.value = color;
  }

  function addShadow(el, clr) {
    el.addEventListener('mouseover', () => {
      el.style.boxShadow = `${clr} 0px 0px 12px`;
    });
    el.addEventListener('mouseout', () => {
      el.style.boxShadow = '';
    });
  }

  function addListeners() {
    colorInput.addEventListener('input', () => {
      const pickedClr = colorInput.value;
      updateClrdata(pickedClr);
      cngAllElementsClr(pickedClr);
      removeCheckIcon();
    });
    
    randomClrBtn.addEventListener('click', () => {
      const randomClr = getRandomClr();
    
      updateClrdata(randomClr);
      cngAllElementsClr(randomClr);
      removeCheckIcon();
    });
  }

  function getRandomClr() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  document.querySelector('.selected-color')
    .addEventListener('click', () => {
      const angleIcon = document.querySelector('.selected-color .right i');
      angleIcon.classList.toggle('rotate');

      selectColor.classList.toggle('active');

      if (selectColor.classList.contains('active')) {
        selectedClrEl.style.display = 'none';
        
        colorCode.style.display = 'initial';
        colorOptions.style.display = 'flex';
        colorPicker.style.display = 'flex';
      } else {
        selectedClrEl.style.display = 'initial';

        const timeoutId = setTimeout(() => {
          colorCode.style.display = 'none';
          colorOptions.style.display = 'none';
          colorPicker.style.display = 'none';
          clearTimeout(timeoutId);
        }, 300)
      }
  });

  export function updateClrdata(color) {
    colorData.selectedColor = color;
  }