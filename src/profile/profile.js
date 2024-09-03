import { theme } from "./theme.js";
import { scroll } from "../utils/shortcut.js";
import { userData } from "../data.js";
import { dateTime } from "../utils/dateTime.js";
import { logout } from "../logout.js";
import { popup } from "../utils/popup.js";

export function loadProfile() {
  const cart = document.querySelector('.cart');
  const profileEl = cart.querySelector('.profile');
  const register = cart.querySelector('.register span');
  const logoutBtn = cart.querySelector('.logout');

  theme.init();

  //render register date and time
  const createDate = new Date(userData.createdAt);
  const date = dateTime.formateDateTime(createDate).date;

  register.innerHTML = `Registered on ${date}`;

  //Profile picture change 
  const cngProfilePic = {
    oldLink: null,

    init(callback) {
      this.el = document.querySelector('.cng-profile');
      this.bg = document.querySelector('#cngProfile-bg');
      const cnclBtn = this.el.querySelector('#cancel-btn');
      this.saveBtn = this.el.querySelector('#save-btn');
      this.input = this.el.querySelector('input');
      this.deleteBtn = this.el.querySelector('.delete');

      this.handleProfilePicCng = callback;
      this.handleProfilePicCng();

      this.bg.addEventListener('click', () => {
        this.hide();
      });

      cnclBtn.addEventListener('click', () => {
        this.hide();
      });

      this.input.addEventListener('input', () => {
        this.updateSaveBtnState();
      });

      this.saveBtn.addEventListener('click', () => {
        if (this.saveBtn.classList.contains('enable')) {
          this.cngProfile();
          this.hide();
          popup.showSuccess('Changed profile picture');
        } else {
          return;
        }
      });

      this.deleteBtn.addEventListener('click', () => {
        userData.deleteProfile();
        this.input.value = '';
        this.hide();
        this.handleProfilePicCng();
        popup.showSuccess('Deleted profile picture');
      });
    },

    show() {
      this.oldLink = userData.profilePic;
      this.updateSaveBtnState();

      this.el.classList.add('visible');

      scroll.disable();
      this.bg.style.bottom = 0;
      this.bg.style.opacity = 1;

      //display previous link
      if (this.oldLink !== null) {
        this.input.value = this.oldLink;
        this.deleteBtn.style.display = 'block';
      } else {
        this.deleteBtn.style.display = 'none';
      }
    },

    hide() {
      this.el.classList.remove('visible');

      this.bg.style.removeProperty('bottom');
      this.bg.style.removeProperty('opacity');
      scroll.enable();
    },

    updateSaveBtnState() {
      const newLink = this.input.value;

      if (newLink !== this.oldLink && newLink !== '') {
        this.saveBtn.classList.add('enable');
      } else {
        this.saveBtn.classList.remove('enable');
      }
    },

    cngProfile() {
      const newLink = this.input.value;
      userData.cngProfile(newLink);
      this.handleProfilePicCng();
    }
  }

  cngProfilePic.init(() => {
    handleProfilePic();
  });

  profileEl.addEventListener('click', () => {
    cngProfilePic.show();
  });

  //User name change
  const cngUserNm = {
    init(handleUserNmCng) {
      this.nmInput = document.querySelector('.cart .nm-input input');
      this.saveBtn = document.querySelector('.cart .save-btn');
      this.nmCount = document.querySelector('.nm-count');
      this.renderUserName = renderUserName;

      this.renderUserName();

      this.saveBtn.addEventListener('click', () => {
        if (this.saveBtn.classList.contains('enable')) {
          let name = this.nmInput.value;
          this.nmInput.value = '';
          userData.setUserName(name);      
          this.renderUserName();
          this.mngNmCount();
          handleUserNmCng();
          const msg = `Changed user name to <b>${name}</b>`;
          popup.showSuccess(msg);
        }
      });

      this.nmInput.addEventListener('input', () => {
        this.mngNmCount();
      });
    },

    mngNmCount() {
      const value = this.nmInput.value;
 
      if (value !== '') {
        this.nmCount.style.display = 'block';
      } else {
        this.nmCount.style.display = 'none';
        this.saveBtn.classList.remove('enable');
        this.nmInput.style.removeProperty('border-color');
        return;
      }
  
      const length = value.length;
      if (length < 15) {
        this.nmCount.style.color = 'var(--text)';
        this.nmInput.style.borderColor = 'var(--secondary)';
        this.nmCount.innerHTML = `${length}/14`;
        this.saveBtn.classList.add('enable');
      } else {
        this.nmCount.style.color = 'rgba(255, 49, 49, 0.8)';
        this.nmInput.style.borderColor = 'rgb(255, 49, 49)';
        this.nmCount.innerHTML = 'Name is too long (maximum 14 characters)';
        this.saveBtn.classList.remove('enable');
      }
    }
  }

  cngUserNm.init(() => {
    handleProfilePic();
  });

  //logout
  logoutBtn.addEventListener('click', () => {
    logout.open();
  });
}

export function handleProfilePic() {
  const profileContent = document.querySelectorAll('.js-profile-pic');
  const img = userData.profilePic;
  const letter = userData.name.charAt(0);

  if (img !== null) {
    profileContent.forEach(el => {
      el.innerHTML = `<img src="${img}">`;
    });
  } else {
    if (userData.name !== '') {
      profileContent.forEach(el => {
        el.innerHTML = 
        `<span class="letter">${letter.toUpperCase()}</span>`;
      });
    } else {
      profileContent.forEach(el => {
        el.innerHTML = 
        `<i class="js-user-icon fa-solid fa-user"></i>`;
      });
    }
  }
}

export function renderUserName() {
  document.querySelectorAll('.js-user-name')
  .forEach(el => {
    let name = userData.name;
    if (name === '') name = 'User';

    if (el.innerHTML !== name) {
      el.innerHTML = name;
    }
  });
}