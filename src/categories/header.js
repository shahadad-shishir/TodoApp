const backBtn = document.querySelector('.js-back-btn');

export const header = {
  getReady() {   
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  },
}; 

