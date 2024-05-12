const popup = document.querySelector('.popup');

export function mngPopup(reason, value) {
  console.log(reason, value)
  const msgArea = document.createElement('div');
  msgArea.classList.add('msg-area');

  if (reason === 'dlt') {
    msgArea.classList.add('dlt');
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-circle-check');
    const msg = document.createElement('span');
    msg.classList.add('msg');
    msg.innerHTML = `Deleted Task - ${value}`;
    msgArea.appendChild(i);
    msgArea.appendChild(msg);
  } else if (reason === 'noNm') {
    msgArea.classList.add('noNm');
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-circle-xmark');
    const msg = document.createElement('span');
    msg.classList.add('msg');
    msg.innerHTML = 'Task name is required.';
    msgArea.appendChild(i);
    msgArea.appendChild(msg);
  }

  popup.appendChild(msgArea);
  
  popup.style.display = 'flex';
  msgArea.style.animation = 'popupAddAnim 0.3s ease';
  const timeoutId1 = setTimeout(() => {
    msgArea.style.removeProperty('animation');
    clearTimeout(timeoutId1);
  }, 300)

  const rmvPopup = () => {
    msgArea.style.animation = 'popupRmvAnim 0.23s ease';
    const timeoutId = setTimeout(() => {
      msgArea.remove();
      clearTimeout(timeoutId);
    }, 200)
  }

  const timeoutId2 = setTimeout(() => {
    rmvPopup();
    clearTimeout(timeoutId2);
  }, 4000)
}