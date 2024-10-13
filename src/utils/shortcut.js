export const scroll = {
  enable: function () {
    document.body.classList.remove('no-scroll');
  },
  
  disable: function () {
    if (document.body.scrollHeight <= window.innerHeight || window.innerWidth < 501) return;
    document.body.classList.add('no-scroll');
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

export function makeEl(elName, classes, text) {
  const element = document.createElement(elName);
  if (classes) {
    classes.forEach(cls => {
      element.classList.add(cls);
    });
  }
  if (text) {
    element.innerText = text;
  }
  return element;
};