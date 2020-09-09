//vdom=>dom
//diff算法

//vtype:1原生标签；2function组件；3class组件
export function createVNode(vtype, type, props) {
	const vnode = { vtype, type, props };
	return vnode;
}

//vdom转换为dom
//vnode是一棵树
export function initVNode(vnode) {
	const { vtype } = vnode;
	if (!vtype) {
		//不存在vtype一定是文本节点，里面文本为h1，span也会被判断为vnode
		return document.createTextNode(vnode);
	}
	if (vtype === 1) {
		return createElement(vnode);
	} else if (vtype === 2) {
		//class组件
		return createClassComp(vnode);
	} else {
		return createFuncComp(vnode);
	}
}
//创建原生标签，加上属性

//最底层其实都是createElement和createTextNode
function createElement(vnode) {
	//type:div,h1,span
	//props上的属性,原生属性和非原生属性
	const { type, props } = vnode;
	const node = document.createElement(type);
	//处理属性
	const { key, children, ...rest } = props;
	Object.keys(rest).forEach((attr) => {
		//处理特别的属性：className,htmlfor

		if (attr === 'className') {
			node.setAttribute('class', rest.className);
		} else if (attr === 'htmlfor') {
			node.setAttribute('for', rest.htmlfor);
		} else if (attr === 'style' && typeof rest.style === 'object') {
			// style={{color:"red",fontSize: "16px"}}
			//style="color:red;fontSize: 16px"
			const style = Object.keys(rest.style)
				.map((k) => k + ':' + rest.style[k])
				.join(';');
			node.setAttribute('style', style);
		} else {
			node.setAttribute(attr, rest[attr]);
		}
	});
	//递归子元素在children里,塞到node里面
	children.forEach((child) => {
		node.appendChild(initVNode(child));
	});
	return node;
}
//创建class组件
function createClassComp(vnode) {
	const { type, props } = vnode;
	const component = new type(props);
	//new Component(props)
	const vdom = component.render();
	return initVNode(vdom);
}
function createFuncComp(vnode) {
	const { type, props } = vnode;
	const vdom = type(props); //type:function
	return initVNode(vdom);
}
