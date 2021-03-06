/**
 * editor
 */

// import { h, init, classModule, propsModule, styleModule } from 'snabbdom'
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { h } from 'snabbdom/h' // helper function for creating vnodes

const patch = init([classModule, propsModule, styleModule])

function createVNode(data) {
  const { tag, style, props, children } = data
  return h(`${tag}.qeditor-block`, { style, props }, children)
}

export default function initEditor(ed) {
  const data = ed.$data || { tag: 'div', props: { id: 'block-id', contentEditable: 'true' }, style: { color: 'red' }, children: ['hello'] }
  const container = ed.$options.el
  const vnode = createVNode(data)
  patch(container, vnode)
}
