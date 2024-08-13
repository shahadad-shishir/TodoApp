import { homeHtml } from "./pages/home.js"
import { addTaskHtml } from "./pages/add-task.js"
import { categoriesHtml } from "./pages/categories.js"
import { taskHtml } from "./pages/task.js"
import { transferHtml } from "./pages/transfer.js"
import { profileHtml } from "./pages/profile.js"
import { loadHome } from "./home/home.js"
import { loadAddTask } from "./add-task/add-task.js"
import { loadCategories } from "./categories/categories.js"
import { loadTask} from "./task/task.js"
import { loadTransfer} from "./transfer/transfer.js"
import { loadProfile} from "./profile/profile.js"
import { headerEl, header } from "./header.js";
import { navbar } from "./navbar.js";
import { homeHeader } from "./home/header.js"

const loading = document.querySelector('.loading');
const root = document.querySelector('#root');


export const routes = {
  '/': {
    html: homeHtml,
    css: './style/home/home.css',
    loadJs: loadHome,
    title: 'Todo App',
  },

  '/add-task': {
    html: addTaskHtml,
    css: './style/add-task/add-task.css',
    loadJs: loadAddTask,
    heading: 'Add New Task',
    title: 'Todo App  - Add Task'
  },

  '/categories': {
    html: categoriesHtml,
    css: 'style/categories/categories.css',
    loadJs: loadCategories,
    heading: 'Categories',
    title: 'Todo App - Categories',
  },

  '/task': {
    html: taskHtml,
    css: 'style/task/task.css',
    loadJs: loadTask,
    data: {},
    heading: 'Task Details',
    title: 'Todo App - Task',
  },

  '/transfer': {
    html: transferHtml,
    css: 'style/transfer/transfer.css',
    loadJs: loadTransfer,
    heading: 'Transfer Tasks',
    title: 'Todo App - Transfer Tasks',
  },

  '/profile': {
    html: profileHtml,
    css: 'style/profile/profile.css',
    loadJs: loadProfile,
    heading: 'User Profile',
    title: 'Todo App - User Profile',
  },

  lastPathname: undefined,
}

export function navigateTo(pathname) {
  root.style.visibility = 'hidden';
  loading.style.display = 'flex';
  root.style.opacity = 0;
  routes.lastPathname = location.pathname;
  const route = routes[pathname] || routes['/'];
  history.pushState(null, null,  pathname);
  handleRouteCng(pathname, route.title, route.heading);
  loadContent(route);
}

async function loadContent(route) {
  try {
    await loadCSS(route.css);
    root.innerHTML = route.html;
    loading.style.display = 'none';
    root.style.visibility = 'visible';
    root.style.opacity = 1;
    route.loadJs();  
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

function loadCSS(url) {
  return new Promise((resolve, reject) => {
      const oldLink = document.querySelector('head link#style');
      if (oldLink) {
        oldLink.parentNode.removeChild(oldLink);
      }
      const link = document.createElement('link');
      link.id = 'style';
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
      document.head.appendChild(link);
  });
}

function handleRouteCng(pathname, title, heading) {
  const titleEl = document.querySelector('title');

  if (pathname !== '/' && pathname !== '/index.html') {
    titleEl.innerText = title;
    headerEl.style.display = 'flex';
    header.cngHeading(heading);
    navbar.showNotDoneTask();
  } else {
    titleEl.innerText = title;
    headerEl.style.display = 'none';
    navbar.hideNotDoneTask();
  }

  navbar.selectPage(pathname);
  homeHeader.clearHeaderInterval();
}