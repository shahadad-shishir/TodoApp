import { navigateTo } from "./route.js";
import { header } from "./header.js";
import { navbar } from "./navbar.js";
import { sidebar } from "./sidebar.js";

header.init();
navbar.init();
sidebar.init();

navigateTo(location.pathname);

window.addEventListener('popstate', () => {
  navigateTo(location.pathname);
});
