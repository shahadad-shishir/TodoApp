const cacheName = 'app-static-v2';
const assets = [
'/',
'/index.html',
'/style/index.css',
'/style/common/color-picker.css',
'/style/common/common.css',
'/style/common/ctgry-selector.css',
'/style/common/emoji-picker.css',
'/style/common/header.css',
'/style/common/logout.css',
'/style/common/navbar.css',
'/style/common/popup.css',
'/style/common/sidebar.css',
'/style/home/home.css',
'/style/home/edit-task.css',
'/style/home/recieved-task.css',
'/style/home/share-task.css',
'/style/add-task/add-task.css',
'/style/categories/categories.css',
'/style/categories/edit-category.css',
'/style/profile/profile.css',
'/style/profile/cngProfile.css',
'/style/transfer/transfer.css',
'/style/task/task.css',
'/assets/fontawesome-icons/css/all.min.css',
'/assets/fontawesome-icons/webfonts/fa-solid-900.woff2',
'/assets/fontawesome-icons/webfonts/fa-solid-900.ttf',
'/assets/fontawesome-icons/webfonts/fa-brands-400.woff2',
'/assets/fontawesome-icons/webfonts/fa-brands-400.ttf',
'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2',
'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2',
'https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2',
'/assets/icons/icon.svg',
'/assets/icons/icon192.png',
'/assets/images/hand.png',
'/screenshots/sspc1.png',
'/screenshots/ss.png',
'/manifest.json',
'/src/data.js',
'/src/app.js',
'/src/route.js',
'/src/header.js',
'/src/navbar.js',
'/src/sidebar.js',
'/src/ripple-effect.js',
'/src/logout.js',
'/src/utils/dateTime.js',
'/src/utils/number.js',
'/src/utils/popup.js',
'/src/utils/shortcut.js',
'/src/utils/string.js',
'/src/home/home.js',
'/src/home/category-filter.js',
'/src/home/delete-task.js',
'/src/home/edit-task.js',
'/src/home/homeHeader.js',
'/src/home/menubar.js',
'/src/home/progress.js',
'/src/home/recieved-task.js',
'/src/home/search.js',
'/src/home/share-task.js',
'/src/home/tasks.js',
'/src/home/template.js',
'/src/add-task/add-task.js',
'/src/add-task/template.js',
'/src/categories/categories.js',
'/src/categories/delete-ctgry.js',
'/src/categories/edit-ctgry.js',
'/src/categories/old-categories.js',
'/src/categories/template.js',
'/src/transfer/transfer.js',
'/src/transfer/export.js',
'/src/transfer/import.js',
'/src/transfer/template.js',
'/src/profile/profile.js',
'/src/profile/template.js',
'/src/profile/theme.js',
'/src/task/task.js',
'/src/task/template.js',
'/src/category-selector/category-selector.js',
'/src/category-selector/ctgry-selector-html.js',
'/src/color-picker/color-picker.js',
'/src/color-picker/clr-picker-html.js',
'/src/emoji-picker/emoji-picker.js',
'/src/emoji-picker/emoji-picker-html.js',
'/assets/libraries/qrious.min.js',
'https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js',
'https://cdn.jsdelivr.net/npm/emoji-picker-element@%5E1/picker.js',
'https://cdn.jsdelivr.net/npm/emoji-picker-element@%5E1/database.js',
];

//Install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

//Activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      )
    }).then(() => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({type: 'OFFLINE_READY'});
        });
      });
    })
  );
});

//Fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});