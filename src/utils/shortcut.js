export const scroll = {
  userIcon: document.querySelector('.user'),
  navBar: document.querySelector('#navbar'),

  enable: function () {
    document.body.style.paddingRight = '0px';
    this.userIcon.style.paddingRight = '0px';
    this.navBar.style.marginRight = '0px';
    document.body.style.overflowY = 'scroll';
  },
  
  disable: function () {
    if (window.innerWidth > 500) {
      document.body.style.paddingRight = '8px';

      if (window.innerWidth < 1026) {
        this.userIcon.style.paddingRight = '8px';
      } else {
        this.userIcon.style.paddingRight = '7px';
      }
      
      this.navBar.style.marginRight = '8px';
    }
    document.body.style.overflowY = 'hidden';
  }
};

export function mngAnim(element, anim, sec) {
  element.style.animation = `${anim} ${sec}s ease`;

  const timeoutId = setTimeout(() => {
    element.style.removeProperty('animation');
    clearTimeout(timeoutId);
  }, 1000 * sec)
}

export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        break;
      } else {
        if (j == (arr2.length - 1)) {
          return false;
        }
        continue;
      }
    }
  }

  return true;
}