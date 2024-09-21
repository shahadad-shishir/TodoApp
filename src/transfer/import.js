import { ctgryData, taskData } from "../data.js";
import { navbar } from "../navbar.js";
import { sidebar } from "../sidebar.js";
import { popup } from "../utils/popup.js";
import { exportTask } from "./export.js";

export const importTask = {
  init() {
    const  el = document.querySelector('.import');
    this.el = el;
    this.dropZone = el.querySelector('.drop-file');
    this.selectFile = el.querySelector('.select-json-file');
    this.fileInput = el.querySelector('input[type="file"]');
    this.clipboardBtn = el.querySelector('.import-from-clipboard');

    //Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      this.dropZone.addEventListener(event, e => e.preventDefault());
    });

    //Highlight the drop zone when a file is dragged over it
    ['dragenter', 'dragover'].forEach(event => {
      this.dropZone.addEventListener(event, () => {
        this.dropZone.style.boxShadow = 'var(--secondary) 0px 0px 32px 0px';
      });
    });

    //Remove the highlight when dragging leaves the drop zone
    ['dragleave', 'drop'].forEach(event => {
      this.dropZone.addEventListener(event, () => {
        this.dropZone.style.removeProperty('box-shadow');
      });
    });

    //Handle the drop event
    this.dropZone.addEventListener('drop', e => {
      const file = e.dataTransfer.files[0];
      this.handleFile(file);
    })

    //Handle input file change event
    this.fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      this.handleFile(file);
    });

    //Handle import JSON from clipboard
    this.clipboardBtn.addEventListener('click', () => {
      this.getJsonFromClipboard();
    });

  },

  handleFile(file) {
    const fileNm = file.name;
    
    if (file && file.type === 'application/json') {
      const reader = new FileReader();

      reader.onload = e => {
        const jsonData = e.target.result;
        const data = JSON.parse(jsonData);
        const msg = `Tasks sucessfully imported from <b>${fileNm}</b>`;
        this.import(data, msg);
      };

      reader.readAsText(file);
    } else {
      popup.showError('Please drop a valid JSON file.');
    }
  },

  async getJsonFromClipboard() {
    //Read the clipboard contents
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      //Check if clipboard item contains JSON MIME type
      if (clipboardItem.types.includes('application/json')) {
        console.log(clipboardItem.types)
      } else if (clipboardItem.types.includes('text/plain')) {
        const blob = await clipboardItem.getType('text/plain');
        const text = await blob.text();
    
        try {
          const data = JSON.parse(text);

          if (!validateJsonStructure(data)) {
            const msg = 'JSON structure does not match the expected format.';
            popup.showError(msg);
            return;
          }

          const msg = 'Tasks successfully imported from clipboard.';
          this.import(data, msg);
        } catch {
          const msg = 'Clipboard text is not valid JSON.';
          popup.showError(msg);
        }
      }
    }

    function validateJsonStructure(data) {
      const expectedStructure = {
          id: 'string',
          done: 'boolean',
          pinned: 'boolean',
          name: 'string',
          emoji: 'string',
          color: 'string',
          description: 'string',
          createDate: 'string',
          deadline: 'string',
          category: 'object'
        };
      
      return data.every(item => {
        for (const key in expectedStructure) {
          if (!(key in item) 
            || typeof(item[key]) !== expectedStructure[key]) {
              return false;
          }
        }

        return true;
      });
    }
  },

  import(tasks, msg) {
    tasks.forEach(task => {
      const {emoji, name, description, deadline, category, color} = task;

      category.forEach((ctgry, index) => {
        const matchId = ctgryData.match(ctgry);
        if (matchId) {
          category[index] = matchId;
        } else {
          const {name, emoji, color} = ctgry;
          const id = ctgryData.create(name, emoji, color);
          category[index] = id;
        }
      });

      taskData.add(emoji, name, description, deadline, category, color);
    });

    exportTask.renderTasks();
    sidebar.showNotDoneTask();
    navbar.showNotDoneTask();
    navbar.removeAnim();
    popup.showSuccess(msg);
  },
};