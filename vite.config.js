import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

const getCache = ({ name, pattern }) => ({
  urlPattern: pattern,
  handler: "CacheFirst",
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2 // 2 years
    },
    cacheableResponse: {
      statuses: [200]
    }
  }
})

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  return defineConfig({
    server: {
      port: process.env.LISTEN_PORT,
    },
    define: {
      'process.env': process.env,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    css: {
      // show position, line, file of class css when inspect browser
      devSourcemap: true,
    },
    plugins: [
      vue(),
      Components({
        resolvers: []
      }),
      AutoImport({
        resolvers: [],
        imports: [
          'vue',
          'pinia',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/tableCommon': ['tableCommon'],
            '@/utils/request': ['request'],
            '@/utils/requestNoAuth': ['requestNoAuth']
          }],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: true,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        srcDir: 'src/pwa',
        filename: 'service-worker.js',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            getCache({
              pattern: /^https:\/\/s3.amazonaws.com\/my-library-cover-uploads/,
              name: "local-images1"
            }),
            getCache({
              pattern: /^https:\/\/my-library-cover-uploads.s3.amazonaws.com/,
              name: "local-images2"
            })
          ],
          cleanupOutdatedCaches: true,
          sourcemap: true
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg']
      })],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      dedupe: ['vue'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    pwa: {
      name: 'base',
      workboxOptions: {
        swSrc: resolve(__dirname, 'src/pwa/service-worker.js')
      }
    },
  })
}
