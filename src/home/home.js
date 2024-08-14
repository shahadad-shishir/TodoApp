import { renderTask } from "./task.js";
import { homeHeader} from "./header.js";
import { handleProgress } from "./progress.js";
import { mngCategoryFilter } from "./category-filter.js";
import { search } from "./search.js";
import { menubar } from "./menubar/menubar.js";
import { navigateTo } from "../route.js";

export function loadHome() {
  homeHeader.init();
  renderTask();
  handleProgress();
  search.init();
  mngCategoryFilter();
  menubar.init();

  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    navigateTo('/add-task');
  });
}


