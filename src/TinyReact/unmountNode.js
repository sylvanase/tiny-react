export default function unmountNode(node) {
	// 获取节点的 _virtualDOM 对象
	const virtualDOM = node._virtualDOM
	// 1. 文本节点可以直接删除
	if (virtualDOM.type === 'text') {
		// 删除直接
		node.remove()
		// 阻止程序向下执行
		return
	}
	// 2. 节点是由组件生成的，需要调用生命周期函数
	let component = virtualDOM.component
	// 如果 component 存在 就说明节点是由组件生成的
	if (component) {
		component.componentWillUnmount()
	}
	// 3. 节点是否有ref属性
	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(null)
	}
	// 4. 节点的属性中是否有事件属性
	Object.keys(virtualDOM.props).forEach(propName => {
		if (propName.slice(0, 2) === 'on') {
			const eventName = propName.toLowerCase().slice(0, 2)
			const eventHandler = virtualDOM.props[propName]
			// 移除事件
			node.removeEventListener(eventName, eventHandler)
		}
	})

	// 5. 递归删除子节点，因为子节点中也要进行以上情况的判断
	if (node.childNodes.length > 0) {
		for (let i = 0; i < node.childNodes.length; i++) {
			unmountNode(node.childNodes[i])
			i--
		}
	}
	// 删除节点
	node.remove()
}
