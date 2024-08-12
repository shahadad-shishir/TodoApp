import { renderTask } from "./task.js";
import { header} from "./header.js";
import { handleProgress } from "./progress.js";
import { mngCategoryFilter } from "./category-filter.js";
import { menubar } from "./menubar/menubar.js";
import { navbar } from "./navbar.js";

const addBtn = document.querySelector('.add-btn');

header.getReady();
renderTask();
handleProgress();
mngCategoryFilter();

menubar.getReady();
navbar.getReady();

addBtn.addEventListener('click', () => {
  window.location.href = './pages/add-task.html';
});