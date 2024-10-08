import { initTask } from "./task.js";
import { homeHeader} from "./homeHeader.js";
import { initProgress } from "./progress.js";
import { initCtgryFilter } from "./category-filter.js";
import { search } from "./search.js";
import { menubar } from "./menubar.js";
import { navigateTo } from "../route.js";
import { recievedTask } from "./recieved-task.js";

export function loadHome() {
  homeHeader.init();
  initTask();
  initProgress();
  search.init();
  initCtgryFilter();
  menubar.init();

  if (location.pathname === '/share') {
    recievedTask.init();
    recievedTask.validateData();
  }

  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    navigateTo('/add-task');
  });
}



