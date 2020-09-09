import { createVNode } from './vdom';

function createElement(type, props, ...children) {
	// console.log(arguments);
	props.children = children;
	delete props.__source;
	delete props.__self;
	//type:原生标签，div等
	//vtype:组件标签，App等
	let vtype;
	if (typeof type === 'string') {
		vtype = 1; //原生标签
	} else if (typeof type === 'function') {
		if (type.isClassComponent) {
			//在class组件添加了一个静态方法
			vtype = 2; //class组件
		} else {
			vtype = 3; //function组件
		}
	}

	return createVNode(vtype, type, props);
}
export default { createElement };
export class Component {
	//区分组件是class还是function
	static isClassComponent = true;
	constructor(props) {
		this.props = props;
		this.state = {};
	}
	setState() {}
}
