import { renderTask } from "./task.js";
import { header} from "./header.js";
import { handleProgress } from "./progress.js";
import { mngCategoryFilter } from "./category-filter.js";
import { search } from "./search.js";
import { menubar } from "./menubar/menubar.js";
import { navigateTo } from "../route.js";

export function loadHome() {
  header.getReady();
  renderTask();
  handleProgress();
  search.getReady();
  mngCategoryFilter();
  menubar.getReady();

  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    navigateTo('/add-task');
  });
}



