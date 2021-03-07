import './assets/scss/index.scss'

if (process.env.NODE_ENV === 'development') {
  require('../public/index.html')
}

import Editor from './core'

const editor = new Editor({
  controls: ['h1']
})
editor.mount('#app')
