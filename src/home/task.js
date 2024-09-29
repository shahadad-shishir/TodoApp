import { taskData, ctgryData } from "../data.js";
import { dateTime } from "../utils/dateTime.js";
import { menubar } from "./menubar.js";
import { navbar } from "../navbar.js";
import { ripple } from "../ripple-effect.js";

export let taskContainer;
let emptyTask, progress, searchBar, addBtnIcon, ctgryFilter, navAddBtn;

export function initTask() {
  taskContainer = document.querySelector('.tasks-container');
  emptyTask = document.querySelector('.empty-task');
  progress = document.querySelector('.main .progress');
  searchBar = document.querySelector('.main .search-bar');
  addBtnIcon = document.querySelector('.add-btn .icon');
  ctgryFilter = document.querySelector('.main .categories');

  renderTask();
}

export function renderTask() {
  taskContainer.innerHTML = '';

  if (taskData.items.length == 0) {
    mngEmptyTask(true);
    return;
  } else {
    mngEmptyTask(false);
  }

  taskData.items.forEach(task => {
    const {pinned} = task;
    const createdTask = createATask(task);
    
    if (pinned) {
      taskContainer.prepend(createdTask);
    } else {
      taskContainer.appendChild(createdTask);
    }
  });
}

function mngEmptyTask(condition) {
  if (condition) {
    emptyTask.style.display = 'block';
    progress.style.display = 'none';
    searchBar.style.display = 'none';
    ctgryFilter.style.display = 'none';
    addBtnIcon.style.animation = '1.2s ease 0s infinite normal none running addAnim';
    navbar.addAnim();
  } else {
    emptyTask.style.display = 'none';
    progress.style.display = 'flex';
    searchBar.style.display = 'flex';
    ctgryFilter.style.display = 'flex';
    addBtnIcon.style.removeProperty('animation');
    navbar.removeAnim();
  }
}



function createATask(task) {
  const {id, name, description, deadline, emoji, color, category, done, pinned, createDate} = task;

  const makeEl = (el, classes, text) => {
    const element = document.createElement(el);
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

  const divTask = makeEl('div', ['task']);
  divTask.dataset.id = id;
  divTask.style.backgroundColor = color;
  divTask.style.boxShadow = `${color} 0px 0px 128px -20px`;

  if (!description && !deadline && category.length == 0) {
    divTask.style.alignItems = 'center';
  }

  if (done) {
    divTask.classList.add('done');
    const divCheckIcon = makeEl('div', ['check-icon']);
    const icon = makeEl('i', ['fa-solid', 'fa-check']);
    divCheckIcon.append(icon);
    divTask.append(divCheckIcon);
  } else if (emoji) {
    const divEmoji = makeEl('div', ['task-emoji']);
    const emojiSpan = makeEl('span', '', emoji);
    divEmoji.append(emojiSpan);
    divTask.append(divEmoji);
  }
  const divDetails = makeEl('div', ['task-details']);

  if (pinned) {
    const divPin = makeEl('div', ['pinned'], 'Pinned');
    const icon = makeEl('i', ['fa-solid', 'fa-thumbtack']);
    divPin.prepend(icon);
    divDetails.prepend(divPin);
  }

  const detailsTop = makeEl('div', ['top-area']); 
  const topLeft = makeEl('div', ['top-left']);
  const leftH3 = makeEl('h3', '' , name);
  topLeft.append(leftH3);
  const topRight = makeEl('div', ['top-right']);
  const rightSpan = makeEl('span', ['create-time'],
    formatCreateTime(new Date(createDate)));
  topRight.append(rightSpan);
  detailsTop.append(topLeft);
  detailsTop.append(topRight);
  divDetails.append(detailsTop);

  const detailsBtm = makeEl('div', ['bottom-area']);    
  if (description) {
    const P = makeEl('p', '', description);
    detailsBtm.append(P);
  }
  if (deadline) {
    const divDeadline = makeEl('div', ['deadline']);
    const svg = makeEl('span');
    svg.innerHTML = '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 5.72-4.6-3.86-1.29 1.53 4.6 3.86zM7.88 3.39 6.6 1.86 2 5.71l1.29 1.53zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9m0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7"></path></svg>';
    const text = makeEl('span', ['text'],
     formatDeadline(deadline, done));
    divDeadline.append(svg);
    divDeadline.append(text);
    detailsBtm.append(divDeadline);
  }
  const addCategory = category => {
    const divCategory = makeEl('div', ['task-categories']);
    category.forEach(id => {
      const dataObj = ctgryData.getCtgry(id);
      const {name, emoji, color} = dataObj;
      const divItem = makeEl('div', ['item'], name);
      divItem.dataset.id = id;
      divItem.style.backgroundColor = color;
      const spanEmoji = makeEl('span', ['category-emoji'], emoji);
      divItem.prepend(spanEmoji);
      divCategory.append(divItem);
    });
    return divCategory; 
  };

  if (category.length !== 0) {
    detailsBtm.append(addCategory(category));
  }
  divDetails.append(detailsBtm);

  divTask.append(divDetails);


  const divOptions = makeEl('div', ['options']);
  const optnBtn = makeEl('button');

  optnBtn.addEventListener('click', e => {
    ripple.add(optnBtn, e);
    menubar.showMenu(id);
  });

  const optnIcon = makeEl('i', ['fa-solid', 'fa-ellipsis-vertical']);
  optnBtn.append(optnIcon);
  divOptions.append(optnBtn);
  divTask.append(divOptions);

  return divTask;
}

function formatDeadline(deadline, done) {
  //'3/15/2024 • 11:04:00 AM • tomorrow'
  deadline = new Date(deadline);
  const date = dateTime.formateDateTime(deadline).date;
  const time = dateTime.formateDateTime(deadline).time;

  if (done) {
    return `${date} • ${time}`;
  }

  let day = dateTime.getDay(deadline);
  if (!day) {
    const weekDay = dateTime.getWeekDay(deadline);
    const daysDiffer = dateTime.getDaysDiff(deadline);
    if (daysDiffer > 0) {
      day = `${weekDay} (in ${daysDiffer} days)`;
    } else if (daysDiffer < 0) {
      day = `Not completed on time (${Math.abs(daysDiffer)} days ago)`;
    }
  } else if (day === 'today') {
    const hourDiff = dateTime.getHoursDiff(deadline);
    const hourDiffInt = parseInt(hourDiff);
    const minDiff = dateTime.getMinutesDiff(deadline);
    const minDiffInt = parseInt(minDiff);
    
    if (hourDiff >= 0) {
      if (hourDiff < 1) {
        day = `in ${minDiffInt} minutes`;
      } else if (hourDiff >= 1 && hourDiff < 2) {
        day = `in ${hourDiffInt} hour`;
      } else if (hourDiff >= 2 ) {
        day = `in ${hourDiffInt} hours`;
      }
    } else if (hourDiff < 0) {
      if (hourDiff > -1) {
        day = `Not completed on time (${Math.abs(minDiffInt)} minutes ago)`;
      } else if (hourDiff <= -1 && hourDiff > -2) {
        day = `Not completed on time (${Math.abs(hourDiffInt)} hour ago)`;
      } else if (hourDiff <= -2) {
        day = `Not completed on time (${Math.abs(hourDiffInt)} hours ago)`;
      }
    }
  }  else if (day === 'yesterday') {
    day = 'Not completed on time (yesterday)';
  } else if (day === 'tomorrow') {
    day = 'tomorrow';
  }

  const formatedDate = `${date} • ${time} • ${day}`
  return formatedDate;
};

function formatCreateTime(createDate) {
  //yesterday 11:35 AM
  createDate = new Date(createDate);
  const day = dateTime.getDay(createDate);
  const {date, time} = dateTime.formateDateTime(createDate);
  let formatedDate;

  if (day) {
    formatedDate = `${day} ${time}` 
  } else {
    formatedDate = date;
  }

  return formatedDate;
}