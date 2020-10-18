export default function updateNodeElement(
	newElement,
	virtualDOM,
	// 更新时必传
	oldVirtualDOM = {}
) {
	// 获取节点对应的属性对象
	const newProps = virtualDOM.props
	const oldProps = oldVirtualDOM.props || {}
	Object.keys(newProps).forEach(propName => {
		const newPropsValue = newProps[propName]
		const oldPropsValue = oldProps[propName]
		if (newPropsValue !== oldPropsValue) {
			// 属性不相同，需要更新操作
			if (propName.slice(0, 2) === 'on') {
				// 处理事件
				// 以on开头，为事件属性  例子：onClick
				// 事件名称  onClick -> click
				const eventName = propName.toLowerCase().slice(2)
				// 为元素添加事件
				newElement.addEventListener(eventName, newPropsValue)
				// 删除原有的事件的事件处理函数
				if (oldPropsValue) {
					newElement.removeEventListener(eventName, oldPropsValue)
				}
			} else if (propName === 'value' || propName === 'checked') {
				// value 或 checked 不能用 setAttribute 设置，需要单独处理
				newElement[propName] = newPropsValue
			} else if (propName !== 'children') {
				// 排除 children 的情况，因为 children 不属于属性
				if (propName === 'className') {
					// className 转为 class
					newElement.setAttribute('class', newPropsValue)
				} else {
					newElement.setAttribute(propName, newPropsValue)
				}
			}
		}
	})

	// 判断属性删除
	// oldProps中存在的属性，在 newProps 中无法找到，即为删除
	Object.keys(oldProps).forEach(propName => {
		const newPropsValue = newProps[propName]
		const oldPropsValue = oldProps[propName]
		if (!newPropsValue) {
			// 属性被删除
			// 如果属性是事件属性，需要移除相关的事件
			if (propName.slice(0, 2) === 'on') {
				const eventName = propName.toLowerCase().slice(2)
				newElement.removeEventListener(eventName, oldPropsValue)
			} else if (propName !== 'children') {
				newElement.removeAttribute(propName)
			}
		}
	})
}
