module.exports = {
  staticFileGlobs: [
    'index.html',
    'manifest.json',
    'src/components/no-internet/Offline.vue'
  ],
  runtimeCaching: [{
    urlPattern: /https:\/\/fonts\.googleapis\.com.*/,
    handler: 'cacheFirst'

    // networkOnly – only fetch from network
    // cacheOnly – only fetch from cache
    // fastest – fetch from both, and respond with whichever comes first
    // networkFirst – fetch from network, if that fails, fetch from cache
    // cacheFirst – fetch from cache, but also fetch from network and update cache

  }, {
    urlPattern: /\/components\/*\/.*.vue/,
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'webcomponentsjs-polyfills-cache',
      },
    },
  },
    {
      urlPattern: /\/views\/*\/.*.vue/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache',
        },
      },
    }
  ]
}
