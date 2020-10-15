export default function updateNodeElement(
	newElement,
	virtualDOM,
	oldVirtualDOM = {}
) {
	// 获取节点对应的属性对象
	const newProps = virtualDOM.props
	const oldProps = oldVirtualDOM.props || {}
	Object.keys(newProps).forEach(propName => {
		const newPropsValue = newProps[propName]
		const oldPropsValue = oldProps[propName]
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
	})
}
