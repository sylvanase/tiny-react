import mountNativeElement from './mountNativeElement'

export default function mountElement(virtualDOM, container) {
	// component or nativeElement
	// 普通virtualDOM
	mountNativeElement(virtualDOM, container)
}
