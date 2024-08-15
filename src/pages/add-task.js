import {clrPickerHtml} from '../color-picker/clr-picker-html.js'

export const addTaskHtml = 
`
  <main class="main">
    <div class="form" id="form">
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
          <label class="label1" for="">Task name*</label>
          <input type="text" id="name-input" placeholder="Enter task name"> 
        </div>
        <span class="nm-count"></span>

        <div class="description">
          <label class="label1" for="">Text Description (optional)</label>
          <textarea id="description" rows="4" placeholder="Enter task description" res></textarea>
        </div>
        <span class="des-count"></span>

        <div class="date-time">
          <label class="label1" for="">Task deadline(optional)</label>
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

          <div class="modify-category">
            <i class="fa-solid fa-pen"></i>
            Modify categories
          </div>           
        </div>

        ${clrPickerHtml()}
        
        <button class="enable" id="create-btn">Create Task</button>
      </div>
    </div>
  </main>
`;