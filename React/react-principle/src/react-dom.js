import {initVNode} from './vdom'
//vnode=>dom
//虚拟dom到真实dom树
function render(vnode, container) {
  const node = initVNode(vnode)
  container.appendChild(node)
  // container.innerHTML=`<pre>${JSON.stringify(vnode)}</pre>`
}
export default { render }
