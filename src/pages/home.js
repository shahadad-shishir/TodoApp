import { clrPickerHtml } from "../color-picker/clr-picker-html.js";

export const homeHtml = 
`
  <div class="container">
  <header class="header">
    <div class="message">
      <h2><img src="assets/images/hand.png"> <span class="greeting"></span></h2>
      <p class="quote">Let's turn plans into accomplishments!</p>
    </div>
    <div class="user">
      <div><i class="fa-solid fa-user user-icon"></i></div>
      <span class="tooltip">User</span>
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
        <svg width="172.8" height="347.20000000000005" viewBox="0 0 261 434" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="130.837" cy="34.2327" r="26.7209" stroke="var(--secondary-color)" stroke-width="14"></circle><rect y="51.7676" width="261" height="381.721" rx="45" fill="var(--secondary-color)" fill-opacity="0.6"></rect><rect x="26.9767" y="80.0928" width="207.047" height="325.07" rx="35" fill="white" fill-opacity="0.9"></rect><rect x="64.7442" y="176.535" width="132.186" height="132.186" rx="66.093" fill="var(--secondary-color)"></rect><rect x="95.0707" y="268.856" width="87.6744" height="13.4884" rx="6.74419" transform="rotate(-45 95.0707 268.856)" fill="#f0f0f0"></rect><rect x="104.608" y="206.861" width="87.6744" height="13.4884" rx="6.74419" transform="rotate(45 104.608 206.861)" fill="#f0f0f0"></rect><rect x="77.5581" y="36.9307" width="106.558" height="56.6512" rx="18" fill="var(--secondary-color)"></rect></svg>
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
      <div>
        <i class="fa-regular fa-circle-dot"></i>
        <span>Select</span>
      </div>
      <div id="details">
        <i class="fa-solid fa-circle-info"></i>
        <span>Task details</span>
      </div>
      <div>
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
    <h3 class="header">Edit Task</h3>
    <div class="form">
      <div id="emoji-picker">
        <div class="emoji">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddReactionIcon"><path d="M18 9V7h-2V2.84C14.77 2.3 13.42 2 11.99 2 6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-1.05-.17-2.05-.47-3zm-2.5-1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m-7 0c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8m3.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5M22 3h2v2h-2v2h-2V5h-2V3h2V1h2z"></path></svg>

          <span></span>

          <div class="pen-icon">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path></svg>
          </div>
        </div>   
        
        <div class="picker">
          <emoji-picker class="dark"></emoji-picker>
        </div>

        <div class="remove-emoji">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveCircleOutlineIcon"><path d="M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path></svg>

          remove emoji
        </div>
      </div>

      <div class="input-area">
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
          <div id="ctgry-selector">
            <div class="selected">
              <ul>
                <!-- <li>
                  <span class="selected-emoji">🏢</span>
                  <span>Home</span>
                </li> -->
              </ul>
              <spna class="arrow-icon">
                <i class="fa-solid fa-angle-down"></i>
              </spna>
            </div>
        
            <div class="select">
              <h3>Select Categories (max 3)</h3>
              <p></p>
              <ul>
                <!-- <li>
                  <i class="fa-regular fa-circle-dot"></i>
                  <span class="select-emoji">📚️</span>
                  <span>Home</span>
                </li> -->
              </ul>
            </div>
          </div>         
        </div>

        ${clrPickerHtml()}        
      </div>
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

  <div class="delete-confirm">
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



  <div class="blur-bg"></div>
  <div id="editTask-bg"></div>
  <div id="s-menubar-bg"></div>
  <div id="l-menubar-bg"></div>  
`;