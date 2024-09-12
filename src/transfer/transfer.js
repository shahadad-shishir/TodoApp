import { ctgryData, taskData } from "../data.js";

export function loadTransfer() {

  const exportTask = {
    init() {
      const  el = document.querySelector('.export');
      this.el = el;
      this.ul = el.querySelector('ul.tasks');
      this.exportSelectedBtn = el.querySelector('.export-selected');
      this.taskCount = el.querySelector('.export-selected .count');
      this.exportAllBtn = el.querySelector('.export-all');

      this.renderTasks();

      this.exportSelectedBtn.addEventListener('click', () => {
        if (!this.exportSelectedBtn.classList.contains('disable')) {
          this.exportSelectedTasks();
        }
      });

      this.exportAllBtn.addEventListener('click', () => {
        this.exportAllTasks();
      });
    },

    renderTasks() { 
      taskData.items.forEach(task => {
        const {id, name, emoji} = task;

        const li = document.createElement('li');
        li.dataset.id = id;
        li.innerHTML = 
        `
          <label>
            <input type="checkbox">
            <span class="custom-checkbox"></span>
          </label>
          ${getEmojiSpan(emoji)}
          <span class="task-nm">${name}</span>
        `
        li.addEventListener('click', () => {
          const checkbox = li.querySelector('input');
          if (!checkbox.checked) {
            this.selectTask(li, checkbox);
          } else {
            this.unselectTask(li, checkbox);
          }
        });
        
        this.ul.appendChild(li);    
      });

      function getEmojiSpan(emoji) {
        if (emoji !== '') {
          return `<span class="task-emoji">${emoji}</span>`
        } else {
          return '';
        }
      }
    },

    selectTask(li, checkbox) {
      li.style.boxShadow = 'rgb(182, 36, 255) 0px 0px 8px 1px';
      checkbox.checked = true;

      const totalSelected = Number(this.taskCount.dataset.total) + 1;
      this.taskCount.dataset.total = totalSelected;
      this.exportSelectedBtn.classList.remove('disable');
      this.taskCount.innerHTML = `[${totalSelected}]`;
      this.taskCount.style.display = 'block';
    },

    unselectTask(li, checkbox) {
      li.style.removeProperty('box-shadow');
      checkbox.checked = false;

      const totalSelected = Number(this.taskCount.dataset.total) - 1;

      if (totalSelected > 0) {
        this.taskCount.dataset.total = totalSelected;
        this.exportSelectedBtn.classList.remove('disable');
        this.taskCount.innerHTML = `[${totalSelected}]`;
        this.taskCount.style.display = 'block';
      } else {
        this.taskCount.dataset.total = 0;
        this.exportSelectedBtn.classList.add('disable');
        this.taskCount.style.display = 'none';
      }
    },

    exportSelectedTasks() {
      const taskIds = [];
      this.ul.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('input');

        if (checkbox.checked) {
          const taskId = li.dataset.id;
          taskIds.push(taskId);
        }
      });

      this.downloadJSON(taskIds);
    },

    exportAllTasks() {
      const taskIds = [];

      taskData.items.forEach(task => {
        const id = task.id;
        taskIds.push(id);
      });

      this.downloadJSON(taskIds);
    },

    downloadJSON(taskIds) {
      const allTasks = [];

      taskIds.forEach(id => {
        const task = {};
        const {done, pinned, name, emoji, color, description, createDate, deadline, category} = taskData.getTask(id);

        task.id = id;
        task.done = done;
        task.pinned = pinned;
        task.name = name;
        task.emoji = emoji;
        task.color = color;
        task.description = description;
        task.createDate = createDate;
        task.deadline = deadline;

        const categories = [];
        category.forEach(id => {
          categories.push(ctgryData.getCtgry(id));
        });
        task.category = categories;

        allTasks.push(task);
      });

      const jsonData = JSON.stringify(allTasks, null, 2);
      const blob = new Blob([jsonData], {type: 'application/json'});
      const link = document.createElement('a');

      const url = URL.createObjectURL(blob);
      link.href = url;

      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      const fileName = `Tasks_${date}__${time}.json`.replace(/[\/ :]/g, '_');
      link.download = fileName;

      link.click();

      URL.revokeObjectURL(url);
    }
  };

  exportTask.init();
}