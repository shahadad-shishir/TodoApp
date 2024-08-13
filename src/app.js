import { navigateTo } from "./route.js";
import { header } from "./header.js";
import { navbar } from "./navbar.js";
import { sidebar } from "./sidebar.js";

header.getReady();
navbar.getReady();
sidebar.getReady();

navigateTo(location.pathname);

window.addEventListener('popstate', () => {
  navigateTo(location.pathname);
});
