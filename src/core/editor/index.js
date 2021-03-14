/**
 * editor
 */

// import { h, init, classModule, propsModule, styleModule } from 'snabbdom'
import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { attributesModule } from 'snabbdom/modules/attributes'
import { datasetModule } from 'snabbdom/modules/dataset'
import { h } from 'snabbdom/h' // helper function for creating vnodes

const patch = init([classModule, propsModule, styleModule, attributesModule, datasetModule])

function createVNode(data) {
  const { tag, style, props, attrs, dataset, children } = data
  return h(`${tag}.qeditor-block`, { style, props, attrs, dataset }, children)
}

export default function initEditor(ed) {
  const data = ed.$options.data
  const container = ed.$options.el
  const temp = document.createElement('div')
  container.appendChild(temp)
  const vnode = createVNode(data)
  patch(temp, vnode)
}
