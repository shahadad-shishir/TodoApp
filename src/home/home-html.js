import { emojiPickerHtml } from "../emoji-picker/emoji-picker-html.js";
import { clrPickerHtml } from "../color-picker/clr-picker-html.js";
import { ctgrySelectorHtml } from "../category-selector/ctgry-selector-html.js";

export const homeHtml = 
`
  <div class="container">
  <header class="header">
    <div class="message">
      <h2><img src="./assets/images/hand.png"> <span class="greeting"></span></h2>
      <p class="quote">Let's turn plans into accomplishments!</p>
    </div>
    <div class="user">
      <div class="js-profile-pic">
      </div>
      <span class="tooltip js-user-name">User</span>
    </div>
  </header>

  <main class="main">   
    <div class="progress">
      <div class="circle-container">
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="28" fill="none" stroke="#F2EBD3" stroke-width="8" class="draw-circle"/>
        </svg>
        <span class="number"><!--50%--></span>
      </div>
      <div class="details">
        <h3><!--You've completed 1 out of 2 tasks.--></h3>
        <p><!--You're halfway there! Keep it up!--></p>
      </div>
    </div>

    <div class="search-bar">
      <i class="fa-solid fa-search"></i>
      <input type="text" id="search-input" placeholder="Search for task..." autocomplete="off">
      <button>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="categories">
    <!--<div>
        <span class="category-emoji">🏠️</span>
        <span>Home (<span class="count">2</span>)</span>
        <span class="x-btn"><i class="fa-solid fa-circle-xmark"></i></span>
      </div>-->
    </div>

    <div class="search-result">
      <span class="count"></span>
      <div class="empty">
        <h3>No tasks found</h3>
        <p>Try searching with different keywords.</p>
        <svg width="172.8" height="347.20000000000005" viewBox="0 0 261 434" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="130.837" cy="34.2327" r="26.7209" stroke="var(--secondary)" stroke-width="14"></circle><rect y="51.7676" width="261" height="381.721" rx="45" fill="var(--secondary)" fill-opacity="0.6"></rect><rect x="26.9767" y="80.0928" width="207.047" height="325.07" rx="35" fill="white" fill-opacity="0.9"></rect><rect x="64.7442" y="176.535" width="132.186" height="132.186" rx="66.093" fill="var(--secondary)"></rect><rect x="95.0707" y="268.856" width="87.6744" height="13.4884" rx="6.74419" transform="rotate(-45 95.0707 268.856)" fill="#f0f0f0"></rect><rect x="104.608" y="206.861" width="87.6744" height="13.4884" rx="6.74419" transform="rotate(45 104.608 206.861)" fill="#f0f0f0"></rect><rect x="77.5581" y="36.9307" width="106.558" height="56.6512" rx="18" fill="var(--secondary)"></rect></svg>
      </div>
    </div>

    <div class="tasks-container">
    </div>
  </main>

  <div class="add-btn">
    <div class="icon">
      <i class="fa-solid fa-plus"></i>
    </div>
    <span class="tooltip">Add Task</span>
  </div> 

  <div class="menubar no-select">
    <div class="top">
      <hr>
      <span class="task-name"></span>
    </div>
    <div class="options">
      <div id="mark-done">
        <i class="fa-solid fa-check"></i>
        <span>Mark as done</span>
      </div>
      <div id="pin">
        <i class="fa-solid fa-thumbtack"></i>
        <span>Pin</span>
      </div>
      <div id="select">
        <i class="fa-regular fa-circle-dot"></i>
        <span>Select</span>
      </div>
      <div id="details">
        <i class="fa-solid fa-circle-info"></i>
        <span>Task details</span>
      </div>
      <div id="share">
        <i class="fa-regular fa-share-from-square"></i>
        <span>Share</span>
      </div>
      <span class="break"></span>
      <div id="edit">
        <i class="fa-solid fa-pen"></i>
        <span>Edit</span>
      </div>
      <div  id="dublicate">
        <i class="fa-regular fa-copy"></i>
        <span>Dublicate</span>
      </div>
      <span class="break"></span>
      <div id="delete">
        <i class="fa-solid fa-trash"></i>
        <span>Delete</span>
      </div>
    </div>
  </div>

  <div class="edit-task">
    <h3 class="edit-header">Edit Task</h3>
    <div class="form">
      ${emojiPickerHtml()}
      <div class="name">
        <label class="label1" for="">Name</label>
        <input type="text" id="name-input">
      </div>
      <span class="nm-count">2/50</span>

      <div class="description">
        <label class="label1" for="">Description</label>
        <textarea id="description" rows="4"></textarea>
      </div>
      <span class="des-count">3/250</span>

      <div class="date-time">
        <label class="label1" for="">Deadline</label>
        <input type="datetime-local" id="date-input">
      </div>
      
      <div class="category">
        <span>Category</span>
        ${ctgrySelectorHtml()}
      </div>

      ${clrPickerHtml()}        

    </div>
    <div class="fotter">
      <button id="cancel-btn">cancel</button>
      <button id="save-btn"><i class="fa-solid fa-floppy-disk"></i>save</button>
    </div>
  </div>
  </div>

  <div class="empty-task">
  <h3>You don't have tasks yet</h3>
  <p>Click on the <b>+</b> button to add one</p>
  </div>

  <div class="dlt-task">
    <h3>Are you sure you want to delete the task?</h3>
    <div class="info">
      <div class="nm">
        <!-- <b>Task Name: </b><span>Demo</span> -->
      </div>
      <div class="des">
        <!-- <b>Task Description: </b><span>This is a description</span> -->
      </div>
      <div class="ctgry">
        <!-- <b>Categories: </b><span>Home and Work</span> -->
      </div>
    </div>
    <div class="btns">
      <button id="cncl-btn">cancel</button>
      <button id="dlt-btn"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>
  </div>

  <div id="dltTask-bg" class="blur-bg"></div>
  <div id="editTask-bg" class="blur-bg"></div>
  <div id="s-menubar-bg"></div>
  <div id="l-menubar-bg"></div>  
`;