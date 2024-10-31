import { navigateTo } from "./route.js";
import { header } from "./header.js";
import { navbar } from "./navbar.js";
import { sidebar } from "./sidebar.js";
import { popup } from "./utils/popup.js";
import { theme } from "./profile/theme.js";
import { userData } from "./data.js";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service worker registered with scope', reg.scope))
    .catch(err => console.log('Service worker not register', err));
}

navigator.serviceWorker.addEventListener('message', evt => {
  if (evt.data.type === 'OFFLINE_READY') popup.success('Your app is ready to use offline!');
});

theme.cngAppTheme(userData.theme);
header.init();
navbar.init();
sidebar.init();
popup.init();

navigateTo(location.pathname);

window.addEventListener('popstate', () => {
  navigateTo(location.pathname);
});
