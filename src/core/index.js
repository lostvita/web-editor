/**
 * editor entry
 */

import initEditor from './editor'
 
class Editor {
  constructor(options) {
    this.__init(options)
  }

  __init(options) {
    this.$options = Object.assign({}, options)
  }

  mount(ele) {
    const container = typeof ele === 'string' ? document.querySelector(ele) : ele
    this.$options.el = container
    const ed = this
    initEditor(ed)
  }

  clear() {}
}
export default Editor