import defaultSettings from '@/settings'

const title = defaultSettings.title || 'BASE VUE3 VITE'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
