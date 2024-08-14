const backBtn = document.querySelector('.js-back-btn');

export const header = {
  init() {   
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }
}; 

