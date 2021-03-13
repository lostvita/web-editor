/**
 * 响应式
 */

function _isObject(obj) {
  if (typeof obj === 'object' || obj === null) return true
  return false
}

const toProxy = new WeakMap() // { obj: observed }
const toRaw = new WeakMap() // { observed: obj }

function reactive(obj) {
  if (!_isObject) return obj

  // 反复代理
  if (toProxy.has(obj)) return toProxy.get(obj)

  // 已经是代理对象
  if (toRaw.has(obj)) return obj

  const observed = new Proxy(obj, {
    // 访问
    get(target, key, receiver) {
      const val = Reflect.get(target, key, receiver)
      track(target, key)
      // console.log(`get ${key}: ${val}`)
      return _isObject(val) ? reactive(val) : val
    },
    // 修改
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      // console.log(`set ${key}: ${value}`)
      return res
    },
    // 删除
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      // console.log(`delete ${key}: ${val}`)
      return res
    }
  })
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)
  return observed
}

const effectStack = []
const depsMap = new WeakMap()

// 依赖收集
function track(target, key) {
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depMap = depsMap.get(target)
    if (!depMap) {
      depMap = new Map()
      depsMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if (!dep) {
      dep = new Set()
      depMap.set(key, dep)
    }
    if (!dep.has(effect)) {
      dep.add(effect)
    }
  }
}

// 触发依赖
function trigger(target, key) {
  const depMap = depsMap.get(target)
  if (!depMap) return
  const effects = depMap.get(key)
  if (!effects || effects.size === 0) return
  effects.forEach((fn) => fn())
}

function useEffect(fn) {
  const createEffect = () => {
    effectStack.push(fn)
    // 立即执行收集依赖
    fn()
    effectStack.pop()
  }
  createEffect()
}

export {
  reactive,
  useEffect
}