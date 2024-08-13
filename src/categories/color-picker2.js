import { editCtgry } from "./old-categories/edit/edit.js";

const clrData = {
  allColors: ['#ff69b4', '#fb34ff', '#ff22b4', '#c6a7ff', '#7accfa', '#4a9dff', '#5061ff', '#50b5cb', '#3ae836', '#b7ff42', '#ffea28', '#ff9518', '#ffc3a0', '#ff5018', '#3dff7f', '#ff2f2f', '#b624ff', '#7e30e1']
}

let selectedClr, angleIcon, selectClr, clrOptions, clrCode, selectedClrEl, clrPicker, clrInput, randomClrBtn, formEmojiIcon;

export const colorPicker2 = {
  getReady() {
    selectedClr = document.querySelector('.CP2 .selected-clr');
    angleIcon = document.querySelector('.CP2 .selected-clr .right i');
    selectClr = document.querySelector('.CP2 .select-clr');
    clrOptions = document.querySelector('.CP2 .clr-options');
    clrCode = document.querySelector('.CP2 .clr-code');
    selectedClrEl = document.querySelector('.CP2 .selected-clr .color');
    clrPicker = document.querySelector('.CP2 .picker span');
    clrInput = document.querySelector('.CP2 .picker input');
    randomClrBtn = document.querySelector('.CP2 #random-clr');
    formEmojiIcon = document.querySelector('.EP2 .emoji');


    this.renderColors();

    clrInput.addEventListener('input', () => {
      const pickedClr = clrInput.value;
      this.cngAllElementsClr(pickedClr);
      this.removeCheckIcon();
      editCtgry.mngSaveBtn();
    });

    randomClrBtn.addEventListener('click', () => {
      const randomClr = this.getRandomClr();   
      this.cngAllElementsClr(randomClr);
      this.removeCheckIcon();
      editCtgry.mngSaveBtn();
    });

    selectedClr.addEventListener('click', () => {
      if (selectClr.classList.contains('active')) {
        this.close();
      } else {
        this.open();
      }
    });
  },

  renderColors() {
    clrData.allColors.forEach(color => {
      const btn = document.createElement('button');
      btn.dataset.id = color;
      btn.classList.add('clr-btn');
      btn.style.backgroundColor = color;
      clrOptions.prepend(btn);
      this.addShadowOnHover(btn, color);

      btn.addEventListener('click', () => {
        this.selectThisClr(color);
        editCtgry.mngSaveBtn();
      });
    });
  },

  addShadowOnHover(el, clr) {
    el.addEventListener('mouseover', () => {
      el.style.boxShadow = `${clr} 0px 0px 12px`;
    });
    el.addEventListener('mouseout', () => {
      el.style.boxShadow = '';
    });
  },

  selectThisClr(color) {
    this.removeCheckIcon();
    const clrBtn = document.querySelector(`.CP2 .clr-btn[data-id='${color}']`);
    clrData.allColors.forEach(clr => {
      if (clr === color) {
        this.addCheckIcon(clrBtn);
        return;
      }
    });
    this.cngAllElementsClr(color);
  },

  removeCheckIcon() {
    const allcolorBtns = document.querySelectorAll('.clr-options .clr-btn');
    for (let btn of allcolorBtns) {
      if (btn.children[0]) {
        btn.children[0].remove();
      }
    }
  },

  addCheckIcon(btn) {
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-solid', 'fa-check');
    btn.appendChild(checkIcon);
  },

  cngAllElementsClr(color) {
    clrCode.style.backgroundColor = color;
    clrCode.innerText = color.toUpperCase();
    selectedClrEl.style.background = color;
    clrPicker.style.backgroundColor = color;
    this.addShadowOnHover(clrPicker, color);
    formEmojiIcon.style.backgroundColor = color;
    clrInput.value = color;
  },

  getRandomClr() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  open() {    
    angleIcon.classList.add('rotate');  
    selectClr.classList.add('active');
    selectClr.style.height = clrOptions.clientHeight + clrCode.clientHeight + 82 + 'px';
    selectedClrEl.style.display = 'none';
  },

  close() {
    angleIcon.classList.remove('rotate');  
    selectClr.classList.remove('active');
    selectClr.style.height = '0px';
    selectedClrEl.style.display = 'initial';
  },

  getSelectedClr() {
    return clrInput.value;
  }
};