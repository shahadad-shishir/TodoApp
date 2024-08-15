import { clrPickerHtml } from '../color-picker/clr-picker-html.js'

export const categoriesHtml = 
`
  <main class="main">
    <div class="old-categories"></div>

    <div class="new-ctgry">
      <h2>Add New Category</h2>

      <div id="emoji-picker" class="EP1">
        <div class="emoji">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 9V7h-2V2.84C14.77 2.3 13.42 2 11.99 2 6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-1.05-.17-2.05-.47-3zm-2.5-1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m-7 0c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8m3.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5M22 3h2v2h-2v2h-2V5h-2V3h2V1h2z"></path></svg>

          <span></span>

          <div class="pen-icon">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path></svg>
          </div>
        </div>   
        
        <div class="picker">
          <emoji-picker class="dark"></emoji-picker>
        </div>

        <div class="remove-emoji">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path></svg>

          remove emoji
        </div>
      </div>

      <div class="category-name">
        <label class="label1" for="">Category name*</label>
        <input type="text" id="name-input" placeholder="Enter category name">
      </div>
      <span class="nm-count"></span>

      ${clrPickerHtml('CP1')}

      <button class="enable" id="create-btn">Create Category</button>
    </div>  
  </main>

  <div class="edit-category">
    <h3 class="edit-header">Edit Category</h3>
    <div class="edit-form">
      <div id="emoji-picker" class="EP2">
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

      <div class="edit-name">
        <label class="edit-label1" for="">Enter category name</label>
        <input type="text" id="edit-name-input">
      </div>
      <span class="edit-nm-count">2/20</span>

      ${clrPickerHtml('CP2')}
    </div>
    <div class="fotter">
      <button id="edit-cancel-btn">cancel</button>
      <button id="edit-save-btn"><i class="fa-solid fa-floppy-disk"></i>save</button>
    </div>
  </div>
  <div id="editCtgry-bg"></div>

  <div class="delete-confirm">
    <h3>Confirm deletion of <b>Work</b></h3>
    <div class="info">
      This will remove the category from your list and associated tasks.
    </div>
    <div class="btns">
      <button id="cncl-btn">cancel</button>
      <button id="dlt-btn"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>
  </div>
  <div id="dlt-bg"></div>
`;