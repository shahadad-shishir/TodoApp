import { initTask } from "./task.js";
import { homeHeader} from "./homeHeader.js";
import { initProgress } from "./progress.js";
import { initCtgryFilter } from "./category-filter.js";
import { search } from "./search.js";
import { menubar } from "./menubar.js";
import { navigateTo } from "../route.js";
import { handleProfilePic, renderUserName } from "../profile/profile.js";

export function loadHome() {
  homeHeader.init();
  initTask();
  initProgress();
  search.init();
  initCtgryFilter();
  menubar.init();
  handleProfilePic();
  renderUserName();

  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    navigateTo('/add-task');
  });
}



