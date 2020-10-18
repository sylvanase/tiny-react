import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from './createDOMElement'

export default function diff(virtualDOM, container, oldDOM) {
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
	// oldDOM是否存在
	if (!oldDOM) {
		mountElement(virtualDOM, container)
	} else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		// 对比的两个节点类型相同
		if (virtualDOM.type === 'text') {
			// 文本节点的话，更新其内容
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
		} else {
			// 元素类型节点更新属性
			updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
		}

		// 对比子元素
		virtualDOM.children.forEach((child, i) => {
			diff(child, oldDOM, oldDOM.childNodes[i])
		})
	} else if (
		virtualDOM.type !== oldVirtualDOM.type &&
		typeof virtualDOM.type !== 'function'
	) {
		// 对比的两个节点类型不同，且不是组件类型
		// 无需对比，直接用新 virtualDOM 对象生成 DOM 对象
		const newElement = createDOMElement(virtualDOM)
		// 然后进行替换
		oldDOM.parentNode.replaceChild(newElement, oldDOM)
	}
}
