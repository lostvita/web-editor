/**
 * editor entry
 */

import initEditor from './editor'
import { initObserver } from './editor/modificationObserver'
import { reactive, useEffect } from './reactive'
 
class Editor {
  constructor(options) {
    this.__init(options)
  }

  __init(options) {
    this.$options = Object.assign({}, options)
    this.$options.data = { tag: 'div', props: { id: 'block-id', contentEditable: 'true' }, style: { color: 'red' }, children: ['hello'] }
    this.$data = reactive({ tag: 'div', props: { id: 'block-id', contentEditable: 'true' }, style: { color: 'red' }, children: ['hello'] })
    useEffect(() => {
      console.log('访问tag111: ', this.$data.tag)
    })
    useEffect(() => {
      console.log('访问tag2222: ', this.$data.tag)
    })
  }

  mount(ele) {
    const container = typeof ele === 'string' ? document.querySelector(ele) : ele
    this.$options.el = container
    const ed = this
    initEditor(ed)
    initObserver(container)
    setTimeout(() => {
      console.log(this.$data.tag)
      this.$data.tag = 'p'
    }, 1000)
  }

  clear() {}
}
export default Editor