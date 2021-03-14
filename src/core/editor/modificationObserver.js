/**
 * 编辑监听
 */

const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true,
  characterDataOldValue: true
}

const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

function mutationHandler(mutationList, observer) {
  console.log(mutationList, observer)
}

function initObserver(el) {
  if (!el) return
  const observer = new MutationObserver(mutationHandler)
  observer.observe(el, observerOptions)
}

export {
  initObserver
}
