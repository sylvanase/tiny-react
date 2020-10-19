import mountElement from './mountElement'
import updateComponent from './updateComponent'
export default function diffComponent(
	virtualDOM,
	oldComponent,
	oldDOM,
	container
) {
	if (isSameComponent(virtualDOM, oldComponent)) {
		// 同一个组件，做更新操作
		updateComponent(virtualDOM, oldComponent, oldDOM, container)
	} else {
		// 不是同一个组件，覆盖
		mountElement(virtualDOM, container, oldDOM)
	}
}

// 判断是否为同一个组件
// virtualDOM.type 更新后的组件构造函数
// oldComponent.constructor 未更新前的组件构造函数
function isSameComponent(virtualDOM, oldComponent) {
	return oldComponent && virtualDOM.type === oldComponent.constructor
}
