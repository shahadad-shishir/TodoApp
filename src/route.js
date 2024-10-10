import { homeHtml } from "./home/home-html.js"
import { addTaskHtml } from "./add-task/add-task-html.js"
import { categoriesHtml } from "./categories/categories-html.js"
import { taskHtml } from "./task/task-html.js"
import { transferHtml } from "./transfer/transfer-html.js"
import { profileHtml } from "./profile/profile-html.js"
import { loadHome } from "./home/home.js"
import { loadAddTask } from "./add-task/add-task.js"
import { loadCategories } from "./categories/categories.js"
import { loadTask} from "./task/task.js"
import { loadTransfer} from "./transfer/transfer.js"
import { loadProfile} from "./profile/profile.js"
import { header } from "./header.js";
import { homeHeader } from "./home/homeHeader.js"
import { navbar } from "./navbar.js";
import { scroll } from "./utils/shortcut.js"
import { popup } from "./utils/popup.js"

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

  lastPathname: '/',
}

export function navigateTo(pathname) {
  if (!routes[pathname]) pathname = '/';

  if (pathname !== location.pathname  && location.pathname !== '/share') {
    routes.lastPathname = location.pathname;
    history.pushState(null, null,  pathname);
  }

  const route = routes[pathname];

  handleRouteCng(pathname, route.title, route.heading);
  loadContent(route);
}

async function loadContent(route) {
  root.style.visibility = 'hidden';
  loading.style.display = 'flex';
  root.style.opacity = 0;

  try {
    await loadCSS(route.css);
    root.innerHTML = route.html;
    loading.style.display = 'none';
    root.style.visibility = 'visible';
    root.style.opacity = 1;
    route.loadJs();  
  } catch (error) {
    console.error('Error during initialization:', error);
    popup.showError('Error during loading content.');
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
    header.show();
    header.cngHeading(heading);
    navbar.showNotDoneTask();
    homeHeader.clearInterval();
  } else {
    titleEl.innerText = title;
    header.hide();
    navbar.hideNotDoneTask();
  }

  navbar.selectPage(pathname);
  scroll.enable();
}