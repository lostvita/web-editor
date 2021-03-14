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
    this.$options.data = {
      tag: 'p',
      props: {
        id: 'block-id',
        contentEditable: 'true',
        title: 'test'
      },
      attrs: {
        placeholder: '输入文本2'
      },
      // style: {
      //   color: 'red' 
      // },
      // dataset: {
      //   placeholder: '输入文本3',
      //   text: 'reset'
      // }
    }
    // this.$data = reactive({ tag: 'div', props: { id: 'block-id', contentEditable: 'true' }, style: { color: 'red' }, children: ['hello'] })
    // useEffect(() => {
    //   console.log('访问tag111: ', this.$data.tag)
    // })
    // useEffect(() => {
    //   console.log('访问tag2222: ', this.$data.tag)
    // })
  }

  mount(ele) {
    const container = typeof ele === 'string' ? document.querySelector(ele) : ele
    this.$options.el = container
    const ed = this
    initEditor(ed)
    initObserver(container)
  }

  clear() {}
}
export default Editor