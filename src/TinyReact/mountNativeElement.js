import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container) {
	let newElement = createDOMElement(virtualDOM)

	// 将转换之后的DOM对象放置到页面中
	container.appendChild(newElement)

	// 获取类组件实例对象
	let component = virtualDOM.component
	// 类组件实例对象存在
	if (component) {
		// 将DOM对象存储在类组件实例对象中
		component.setDOM(newElement)
	}
}
