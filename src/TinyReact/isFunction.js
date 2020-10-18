export default function isFunciton(virtualDOM) {
	return virtualDOM && typeof virtualDOM.type === 'function'
}
