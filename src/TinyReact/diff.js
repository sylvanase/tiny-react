import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
export default function diff(virtualDOM, container, oldDOM) {
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
	console.log(oldVirtualDOM, 'oldVirtualDOM')
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
		}

		// 对比子元素
		virtualDOM.children.forEach((child, i) => {
			diff(child, oldDOM, oldDOM.childNodes[i])
		})
	}
}
