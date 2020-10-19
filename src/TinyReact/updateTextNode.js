export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
	if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
		// 内容被更改了
		oldDOM.textContent = virtualDOM.props.textContent
		// 同时更改 virtualDOM
		oldDOM._virtualDOM = virtualDOM
	}
}
