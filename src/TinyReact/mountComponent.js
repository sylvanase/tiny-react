import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'

export default function mountComponent(virtualDOM, container, oldDOM) {
	let nextVirtualDOM = null
	let component = null
	// 判断是类组件还是函数组件，原型上有render方法，为类组件
	if (isFunctionComponent(virtualDOM)) {
		// 函数组件
		nextVirtualDOM = buildFunctionComponent(virtualDOM)
	} else {
		// 类组件
		nextVirtualDOM = buildClassComponent(virtualDOM)
		component = nextVirtualDOM.component
	}

	// mountNativeElement 只能渲染普通的virtualDOM，
	// 所以我们要排除 nextVirtualDOM 为函数组件的情况
	if (isFunction(nextVirtualDOM)) {
		mountComponent(nextVirtualDOM, container, oldDOM)
	} else {
		mountNativeElement(nextVirtualDOM, container, oldDOM)
	}

	// 如果组件实例对象存在的话
	if (component) {
		component.componentDidMount()
		// 判断组件实例对象身上是否有 props 属性 props 属性中是否有 ref 属性
		if (component.props && component.props.ref) {
			// 调用 ref 方法并传递组件实例对象
			component.props.ref(component)
		}
	}
}

// 处理函数组件
function buildFunctionComponent(virtualDOM) {
	// virtualDOM.type 中存储的就是函数组件本身
	// 调用时将 virtualDOM.props 传递进去，
	return virtualDOM.type(virtualDOM.props || {})
}

// 处理类组件
function buildClassComponent(virtualDOM) {
	// virtualDOM.type 中存储了组件的构造函数
	const component = new virtualDOM.type(virtualDOM.props || {})
	const nextVirtualDOM = component.render()
	nextVirtualDOM.component = component
	return nextVirtualDOM
}
