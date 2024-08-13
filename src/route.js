import { loadHome } from "./home/home.js"
import { loadAddTask } from "./add-task/add-task.js"
import { loadCategories } from "./categories/categories.js"
import { loadTask} from "./task/task.js"
import { loadTransfer} from "./transfer/transfer.js"
import { loadProfile} from "./profile/profile.js"
import { headerEl, header } from "./header.js";
import { navbar } from "./navbar.js";


export const routes = {
  '/': {
    html: './pages/home.html',
    css: './style/home/home.css',
    loadJs: loadHome,
    title: 'Todo App',
  },

  '/add-task': {
    html: './pages/add-task.html',
    css: './style/add-task/add-task.css',
    loadJs: loadAddTask,
    heading: 'Add New Task',
    title: 'Todo App  - Add Task'
  },

  '/categories': {
    html: './pages/categories.html',
    css: 'style/categories/categories.css',
    loadJs: loadCategories,
    heading: 'Categories',
    title: 'Todo App - Categories',
  },

  '/task': {
    html: './pages/task.html',
    css: 'style/task/task.css',
    loadJs: loadTask,
    data: {},
    heading: 'Task Details',
    title: 'Todo App - Task',
  },

  '/transfer': {
    html: './pages/transfer.html',
    css: 'style/transfer/transfer.css',
    loadJs: loadTransfer,
    heading: 'Transfer Tasks',
    title: 'Todo App - Transfer Tasks',
  },

  '/profile': {
    html: './pages/profile.html',
    css: 'style/profile/profile.css',
    loadJs: loadProfile,
    heading: 'User Profile',
    title: 'Todo App - User Profile',
  },

  lastPathname: undefined,
}

export function navigateTo(pathname) {
  routes.lastPathname = location.pathname;
  const route = routes[pathname] || routes['/'];
  history.pushState(null, null,  pathname);
  handleRouteCng(pathname, route.title, route.heading);
  loadContent(route);
}


const root = document.querySelector('#root');
async function loadContent(route) {
  const htmlUrl = route.html;
  const cssUrl = route.css;

  root.style.visibility = 'hidden';

  try {
    await loadCSS(cssUrl);
    await loadHTML(htmlUrl);
    root.style.visibility = 'visible';
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

async function loadHTML(url) {
  try {
    const response =  await fetch(url);
    const html = await response.text();
    const bodyContent = new DOMParser().parseFromString(html, 'text/html').body.innerHTML;
    root.innerHTML = bodyContent;
  } catch (error) {
    console.error('Failed to load HTML: ', error);
  }
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
}