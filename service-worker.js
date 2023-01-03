import { cleanupOutdatedCaches, getCacheKeyForURL, precacheAndRoute } from 'workbox-precaching'

const staticCacheName = 'site-static-v1'
const assets = [
  './index.html',
  '/src/assets/styles/index.scss',
  './src/components/no-internet/Offline.vue',
  './public/favicon.png',
  'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
]

cleanupOutdatedCaches()
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// The precaching code provided by Workbox. You don't need to change this part.
self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings()
precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        if (response) {
          return response
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match(getCacheKeyForURL('/'))
        }
      })
    })
  )
})

self.addEventListener('install', event => event.waitUntil(onInstall(event)))
self.addEventListener('activate', event => event.waitUntil(onActivate(event)))

async function onInstall(event) {
  // console.info('Service worker: Install')
  caches.open(staticCacheName).then((cache) => {
    // console.log('caching shell assets')
    cache.addAll(assets)
  })
  // Here we are telling the service worker to activate right away when an update is pickedup.
  // In our main JavaScript this will trigger 'controllerchange', which we can use to trigger an page reload.
  self.skipWaiting()
}

async function onActivate(event) {
  console.info('Service worker: Activate')
  caches.keys().then(keys => {
    return Promise.all(keys
      .filter(key => key !== staticCacheName)
      .map(key => caches.delete(key))
    )
  })
  // after we've taken over, iterate over all the current clients (windows)
  const tabs = await self.clients.matchAll({ type: 'window' })
  tabs.forEach((tab) => {
    // ...and refresh each one of them
    tab.navigate(tab.url)
  })
  event.waitUntil(self.clients.claim())
}
