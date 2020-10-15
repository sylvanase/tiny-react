/**
 *
 * @param {string} type 类型
 * @param {object | null} props 属性
 * @param {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
export default function createElement(type, props, ...children) {
	// 判断是否为文本节点，是文本节点需要转换
	// const childrenElements = [].concat(...children).map(child => {
	// 	// child是否是对象类型
	// 	if (child instanceof Object) {
	// 		// 是对象，直接返回
	// 		return child
	// 	} else {
	// 		// 非对象即文本，手动动用createElement 将其转换为Virtual DOM
	// 		return createElement('text', { textContent: child })
	// 	}
	// })
	// 由于 map 方法无法从数据中刨除元素, 所以此处将 map 方法更改为 reduce 方法
	const childElements = [].concat(...children).reduce((result, child) => {
		// 判断子元素类型 刨除 null true false
		if (child != null && child != false && child != true) {
			if (child instanceof Object) {
				result.push(child)
			} else {
				result.push(createElement('text', { textContent: child }))
			}
		}
		// 将需要保留的 Virtual DOM 放入 result 数组
		return result
	}, [])
	return {
		type,
		// React中可以通过props.children获取子元素，所以需要将子元素存储在props对象中
		props: Object.assign({ children: childElements }, props),
		children: childElements,
	}
}
