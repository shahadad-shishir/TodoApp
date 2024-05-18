import { taskData, getCategoryData, deleteTask, markDone, getTaskData, markNotDone, makePinned, makeNotPinned, categoryData, updateTaskData, dublicateThistask } from "../data.js";
import { formateDateTime, getDay, getDaysDiff, getGreeting, getHoursDiff, getMinutesDiff, getRemainingHours, getWeekDay } from "../utils/dateTime.js";
import { handleEmoji, addEmoji, removeEmoji, getEmoji } from "./emoji-picker.js";
import { handleCategory, getCategoryId, renderCategories } from "./category-selector.js";
import { handleColor, cngAllElementsClr, updateClrdata } from "./color-picker.js";
import { generateRandomId } from "../utils/number.js";
import { handleHeader} from "./header.js";
import { handleProgress } from "./progress.js";
import { mngCategoryFilter } from "./category-filter.js";
import { combineStrings } from "../utils/string.js";
import { mngPopup } from "../utils/popup.js";

const container = document.querySelector('.container');
const emptyTask = document.querySelector('.empty-task');
const progress = document.querySelector('.main .progress');
const searchBar = document.querySelector('.main .search-bar');
const addBtnIcon = document.querySelector('.add-btn .icon');
const ctgryFilter = document.querySelector('.main .categories');
const navAddBtn = document.querySelector('.nav-bar .add');
const addBtns = document.querySelectorAll('.js-add-btn');
const addBtn = document.querySelector('.add-btn');
const taskContainer = document.querySelector('.tasks-container');
const taskOptions = document.querySelector('.task-options');
const editTask = document.querySelector('.edit-task');
const blurBg = document.querySelector('.blur-bg');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('.search-bar button');
const searchResult = document.querySelector('.search-result');
const srcRsltCount = document.querySelector('.search-result .count');
const srcRsltEmpty = document.querySelector('.search-result .empty');

handleHeader(getWeekDay(new Date()), getRemainingHours(), getGreeting());
handleProgress(taskData);
handleEmoji();
handleCategory();
handleColor();

addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = './pages/add-task.html';
  });
});

renderTask();

function renderTask() {
  taskContainer.innerHTML = '';

  if (taskData.length == 0) {
    mngZeroTask(true);
    return;
  } else {
    mngZeroTask(false);
  }

  taskData.forEach(task => {
    const {pinned} = task;
    const createdTask = createATask(task);
    
    if (pinned) {
      taskContainer.prepend(createdTask);
    } else {
      taskContainer.appendChild(createdTask);
    }
  });

  addOptionBtnListener();
}

function mngZeroTask(condition) {
  if (condition) {
    emptyTask.style.display = 'block';
    progress.style.display = 'none';
    searchBar.style.display = 'none';
    ctgryFilter.style.display = 'none';
    addBtnIcon.style.animation = '1.2s ease 0s infinite normal none running addAnim';
    navAddBtn.style.animation = '1.2s ease 0s infinite normal none running addAnim';
  } else {
    emptyTask.style.display = 'none';
    progress.style.display = 'flex';
    searchBar.style.display = 'flex';
    ctgryFilter.style.display = 'flex';
    addBtnIcon.style.removeProperty('animation');
    navAddBtn.style.removeProperty('animation');;
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
      const dataObj = getCategoryData(id);
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
  optnBtn.dataset.id = id;
  const optnIcon = makeEl('i', ['fa-solid', 'fa-ellipsis-vertical']);
  optnBtn.append(optnIcon);
  divOptions.append(optnBtn);
  divTask.append(divOptions);

  return divTask;
}

function formatDeadline(deadline, done) {
  //'3/15/2024 • 11:04:00 AM • tomorrow'
  deadline = new Date(deadline);
  const date = formateDateTime(deadline).date;
  const time = formateDateTime(deadline).time;

  if (done) {
    return `${date} • ${time}`;
  }

  let day = getDay(deadline);
  if (!day) {
    const weekDay = getWeekDay(deadline);
    const daysDiffer = getDaysDiff(deadline);
    if (daysDiffer > 0) {
      day = `${weekDay} (in ${daysDiffer} days)`;
    } else if (daysDiffer < 0) {
      day = `Not completed on time (${Math.abs(daysDiffer)} days ago)`;
    }
  } else if (day === 'today') {
    const hourDiff = getHoursDiff(deadline);
    const hourDiffInt = parseInt(hourDiff);
    const minDiff = getMinutesDiff(deadline);
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
  const day = getDay(createDate);
  const {date, time} = formateDateTime(createDate);
  let formatedDate;

  if (day) {
    formatedDate = `${day} ${time}` 
  } else {
    formatedDate = date;
  }

  return formatedDate;
}

function addOptionBtnListener() {
  const taskBtn = document.querySelectorAll('.task .options button');
  taskBtn.forEach(btn => {
    const taskId = btn.dataset.id;
    btn.addEventListener('click', () => {
      if (taskOptions.classList.contains('active')) {
        hideTaskOptions(taskId);
      } else {
        taskOptions.dataset.taskId = taskId;
        showTaskOptions(taskId);
      }
    });
  });
}

function showTaskOptions(taskId) {
  const taskName = document.querySelector('.task-options .task-name');
  const markDoneText = document.querySelector('#mark-done span');
  const pinText = document.querySelector('#pin span');
  const allTask = document.querySelectorAll('.task');
  const screenWidth = window.innerWidth;

  allTask.forEach(task => {
    if (task.dataset.id !== taskId && screenWidth > 760) {
      task.classList.add('blur');
    } else if (task.dataset.id === taskId) {
      if (getTaskData(taskId).task.done) {
        markDoneText.innerText = 'Mark as not done';
      } else {
        markDoneText.innerText = 'Mark as done';
      }

      if (getTaskData(taskId).task.pinned) {
        pinText.innerText = 'Unpin';
      } else {
        pinText.innerText = 'Pin';
      }

      const name = getTaskData(taskId).task.name;
      taskName.innerHTML = name;
    }
  });

  taskOptions.classList.add('active');
  taskOptions.style.opacity = 1;
  disableScroll();

  mngTaskOptnSize();

  addBtn.style.display = 'none';
}

function hideTaskOptions(taskId) {
  addBtn.style.display = 'block';
  removeBlur(taskId);

  const screenWidth = window.innerWidth;
  if (screenWidth < 761) {
    rmvFullTaskOptn();
    return;
  } 

  taskOptions.style.opacity = 0;
  taskOptions.style.transform = 'scale(0.5)';
  enableScroll();
  const timeoutId = setTimeout(()=> {
    taskOptions.classList.remove('active');
    taskOptions.style.transform = 'scale(1)';
    clearTimeout(timeoutId);
  }, 200);
}

function removeBlur(taskId) {
  const allTask = document.querySelectorAll('.task');
  allTask.forEach(task => {
    if (task.dataset.id !== taskId) {
      task.classList.remove('blur');
    }
  });
}

function mngTaskOptnSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 761) {
    mngAnim(taskOptions, 'optionsAnim', 0.6);
    taskOptions.classList.add('full');
    taskOptions.style.removeProperty('transform');
    removeBlur();
  } else {
    taskOptions.classList.remove('full');
  }
}

//Task options full size
let isMouseDown = false;
let clickPosition;
let difference;

taskOptions.addEventListener('mousedown', e => {
  if (taskOptions.classList.contains('full')) {
    difference = 0;
    isMouseDown = true;
    clickPosition = e.pageY;
  }
});

taskOptions.addEventListener('mousemove', e => {
  if (isMouseDown) {
    difference = e.pageY - clickPosition + 10;
    if (difference > -1) {
      taskOptions.style.top = difference + 'px';
    }
  }
}); 

taskOptions.addEventListener('mouseup', () => {
  isMouseDown = false;

  const screenWidth = window.innerWidth;
  if (difference > 260 && screenWidth < 761) {
    rmvFullTaskOptn();
  } else if (difference < 260 && screenWidth < 761) {
    taskOptions.style.animation = 'optionsAnimUp .5s ease';
    const timeoutId = setTimeout(()=> {
      taskOptions.style.removeProperty('animation');
      taskOptions.style.removeProperty('top');
      clearTimeout(timeoutId);
    }, 500);
  }
}); 

function rmvFullTaskOptn() {
  taskOptions.style.animation = 'optionsAnimDown .4s ease';
  const timeoutId = setTimeout(()=> {
    taskOptions.style.removeProperty('top');
    taskOptions.style.removeProperty('animation');
    taskOptions.classList.remove('active');
    taskOptions.classList.remove('full');
    if (!blurBg.classList.contains('visible')) {
      enableScroll();
    }
    clearTimeout(timeoutId);
  }, 400);
}

//Task Options functionality
const deleteBtn = document.querySelector('#delete');
const dltConfirm = document.querySelector('.delete-confirm');
const nmEl = document.querySelector('.delete-confirm .nm');
const desEl = document.querySelector('.delete-confirm .des');
const ctgryEl = document.querySelector('.delete-confirm .ctgry');
const cnclBtn = document.querySelector('.delete-confirm #cncl-btn');
const dltBtn = document.querySelector('.delete-confirm #dlt-btn');
deleteBtn.addEventListener('click', () => {
  hideTaskOptions();
  mngDltConfirm(true);
});

function mngDltConfirm(condition) {
  if (condition) {
    const taskId = taskOptions.dataset.taskId;
    const {name, description, category} = getTaskData(taskId).task;

    nmEl.innerHTML = '';
    desEl.innerHTML = '';
    ctgryEl.innerHTML = '';

    if (name) {
      nmEl.innerHTML = `<b>Task Name: </b><span>${name}</span>`;
    }

    if (description !== '') {
      desEl.innerHTML = `<b>Task Description: </b><span>${description}</span>`;
    }

    if (category.length > 0) {
      const array = [];
      category.forEach(id => {
        array.push(getCategoryData(id).name);
      });
      const ctgry = combineStrings(array);
      ctgryEl.innerHTML = `<b>Categories: </b><span>${ctgry}</span>`;
    }

    dltConfirm.style.display = 'block';
    mngAnim(dltConfirm, 'opacityAnim', 0.3);
    blurBg.style.height = container.scrollHeight + 'px';
    blurBg.classList.add('visible');
    disableScroll();
  } else {
    dltConfirm.style.display = 'none';
    blurBg.classList.remove('visible');
    enableScroll();
  }
}

dltBtn.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;
  const name = getTaskData(taskId).task.name;
  deleteTask(taskId);
  showOptionChanges();
  mngDltConfirm(false);
  mngPopup('dlt', name);
});

cnclBtn.addEventListener('click', () => {
  mngDltConfirm(false);
});

const doneBtn = document.querySelector('#mark-done');
doneBtn.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;
  if (!getTaskData(taskId).task.done) {
    markDone(taskId);
  } else {
    markNotDone(taskId);
  }
  showOptionChanges();
});

const pinBtn = document.querySelector('#pin');
pinBtn.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;
  if (!getTaskData(taskId).task.pinned) {
    makePinned(taskId);
  } else {
    makeNotPinned(taskId);
  }
  showOptionChanges();
});

const detailsBtn = document.querySelector('#details');
detailsBtn.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;

  window.location.href = 'pages/task.html?id=' + taskId;
});

//Edit task start
const editBtn = document.querySelector('#edit');
const cancelBtn = document.querySelector('.edit-task #cancel-btn');
const saveBtn = document.querySelector('.edit-task #save-btn');
const nameInput = document.querySelector('#name-input');
const desInput = document.querySelector('#description');
const dateInput = document.querySelector('#date-input');
const colorInput = document.querySelector('#color-input');
const nm = document.querySelector('.edit-task .name');
const des = document.querySelector('.edit-task .description');
const nmLabel = document.querySelector('.name label');
const desLabel = document.querySelector('.description label');
const nmCount = document.querySelector('span.nm-count');
const desCount = document.querySelector('span.des-count');
const emojiPicker = document.querySelector('.emoji-picker');
const selectClr = document.querySelector('.select-color');
const ctgrySelectedTxt = document.querySelector('.select p');

editBtn.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;

  const width = taskContainer.offsetWidth;
  editTask.style.width = (width - 64) + 'px';

  hideTaskOptions();
  showEditTask();
  showEditableData(taskId);
});

saveBtn.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;
  saveEditedData(taskId);
});

cancelBtn.addEventListener('click', () => {
  hideEditTask();
});

function showEditTask() {
  editTask.classList.add('active');
  mngAnim(editTask, 'opacityAnim', 0.3);
  blurBg.style.height = container.scrollHeight + 'px';
  blurBg.classList.add('visible');
  disableScroll();
}

function hideEditTask() {
  ctgrySelectedTxt.innerHTML = '';
  selectClr.classList.remove('active');
  emojiPicker.classList.remove('picker-active');
  blurBg.classList.remove('visible');
  editTask.classList.remove('active');
  enableScroll();
}

function showEditableData(taskId) {
  const data = getTaskData(taskId).task;
  const {name, emoji, description, color, deadline, category} = data;
  
  nameInput.value = name;
  nmCount.style.display = 'block';
  nmCount.innerHTML = `${nameInput.value.length}/50`;
  desInput.value = description;
  if (description !== '') {
    desCount.style.display = 'block';
    desCount.innerHTML = `${desInput.value.length}/250`;
  } else {
    desCount.style.display = 'none';
  }
  dateInput.value = deadline;

  updateClrdata(color);
  cngAllElementsClr();
  
  renderCategories(categoryData, category);

  if (emoji) {
    addEmoji(emoji);
  } else {
    removeEmoji();
  }
}

function saveEditedData(id) {
  const emoji = getEmoji();
  const name = nameInput.value;
  const des = desInput.value;
  const deadline = dateInput.value;
  const category = getCategoryId();
  const color = colorInput.value;

  updateTaskData(id, emoji, name, des, deadline, category, color);
  hideEditTask();
  renderTask();
  mngCategoryFilter(taskData, getCategoryData);

  if (searchResult.style.display === 'flex') {
    searchInput.value = '';
    searchResult.style.display = 'none';
    searchBtn.style.display = 'none';
  }
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

desInput.addEventListener('input', () => {
  const value = desInput.value;
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
    nm.style.borderColor = '#ddd';
    nmLabel.style.color = 'rgba(0, 0, 0, 0.6)';
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
    des.style.borderColor = '#ddd';
    desLabel.style.color = 'rgba(0, 0, 0, 0.6)';
    desCount.innerHTML = `${length}/250`;
  } else {
    desInput.value = value.slice(0, 250);
    desCount.style.color = 'rgba(255, 49, 49, 0.8)';
    des.style.borderColor = 'rgb(255, 49, 49)';
    desLabel.style.color = 'rgb(255, 49, 49)';
    desCount.innerHTML = 'Description should be less than or equal to 250 characters';
  }
}
//Edit task end

const dublicate = document.querySelector('#dublicate');
dublicate.addEventListener('click', () => {
  const taskId = taskOptions.dataset.taskId;
  dublicateAtask(taskId);
});

function dublicateAtask(taskId) {
  const data = getTaskData(taskId).task;
  const id = generateRandomId();
  dublicateThistask(data, id);
  showOptionChanges();
}

function showOptionChanges() {
  renderTask();
  if (taskOptions.classList.contains('active')) {
    hideTaskOptions();
  }
  handleProgress(taskData);
  mngCategoryFilter(taskData, getCategoryData);

  if (searchResult.style.display === 'flex') {
    searchInput.value = '';
    searchResult.style.display = 'none';
    searchBtn.style.display = 'none';
  }
}

function enableScroll() {
  if (!editTask.classList.contains('active')) {
    document.body.style.paddingRight = '0px';
    document.body.style.overflowY = 'scroll';
  }
}

function disableScroll() {
  const isMobile = navigator.userAgentData.mobile;
  if (!isMobile) {
    document.body.style.paddingRight = '8px';
  }
  document.body.style.overflowY = 'hidden';
}

//Search functionality
searchInput.addEventListener('keyup', e => {
  const searchTxt = searchInput.value;
  searchBtn.style.display = 'flex';
  mngHighliting(searchTxt);
  mngCategoryFilter(taskData, getCategoryData);
});

searchBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchResult.style.display = 'none';
  searchBtn.style.display = 'none';
  renderTask();
  mngCategoryFilter(taskData, getCategoryData);
});

function mngHighliting(searchTxt) {
  let foundTasks = 0;

  if (searchTxt === '') {
    searchResult.style.display = 'none';
    searchBtn.style.display = 'none';
    renderTask();
    return;
  }

  taskData.forEach(task => {
    const id = task.id;
    const name = task.name;
    const des = task.description;
    
    const highlightedNm = highlightText(name, searchTxt);
    const highlightedDes = highlightText(des, searchTxt);

    const taskEl = document.querySelector(`.task[data-id='${id}']`);
    const nameEl = document.querySelector(`.task[data-id='${id}'] .top-left h3`);
    const desEl = document.querySelector(`.task[data-id='${id}'] .bottom-area p`);

    if (!highlightedNm && !highlightedDes) {
      taskEl.style.display = 'none';
    } else {
      if (taskEl.style.display === 'none') {
        taskEl.style.display = 'flex';
        mngAnim(taskEl, 'opacityAnim', 1);
      }
    }

    if (highlightedNm) {
      nameEl.innerHTML = highlightedNm;
    } else {
      nameEl.innerHTML = name;
    }

    if (highlightedDes) {
      if (desEl) {
        desEl.innerHTML = highlightedDes;
      }
    } else {
      if (desEl) {
        desEl.innerHTML = des;
      }
    }

    if (highlightedNm || highlightedDes) {
      foundTasks += 1;
    }
  });

  if (foundTasks > 0) {
    searchResult.style.display = 'flex';
    srcRsltCount.style.display = 'flex';
    srcRsltEmpty.style.display = 'none';
    searchBtn.style.color = 'white';
  } else if (foundTasks == 0) {
    srcRsltCount.style.display = 'none';
    searchResult.style.display = 'flex';
    srcRsltEmpty.style.display = 'flex';
    mngAnim(srcRsltEmpty, 'opacityAnim', 1);
    searchBtn.style.color = 'red';
  }

  if (foundTasks == 1) {
    srcRsltCount.innerText = 'Found 1 task'
  } else {
    srcRsltCount.innerText = `Found ${foundTasks} tasks`;
  }
}

function highlightText(originalTxt, searchTxt) {
  const regex = new RegExp(searchTxt, 'gi');
  const highlightedTxt = originalTxt.replace(regex, match => {
    return `<span class ="highlighted-text">${match}</span>`;
  });

  if (highlightedTxt === originalTxt) {
    return false;
  }

  return highlightedTxt;
}

//Category filter functionality
mngCategoryFilter(taskData, getCategoryData);


function mngAnim(element, anim, sec) {
  element.style.animation = `${anim} ${sec}s ease`;

  const timeoutId = setTimeout(() => {
    element.style.removeProperty('animation');
    clearTimeout(timeoutId);
  }, 1000 * sec)
}


document.addEventListener('click', (e) => {
  const screenWidth = window.innerWidth;

  if (!taskOptions.contains(e.target) && e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'I' && taskOptions.classList.contains('active') && screenWidth > 760) {
    hideTaskOptions();
  }

  if (!editTask.contains(e.target) && !taskOptions.contains(e.target) &&  editTask.classList.contains('active')) {
    hideEditTask();
  }
});

window.addEventListener('resize', () => {
  const width = taskContainer.offsetWidth;
  editTask.style.width = (width - 64) + 'px';

  mngTaskOptnSize();
});

