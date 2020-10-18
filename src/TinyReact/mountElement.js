import mountNativeElement from './mountNativeElement'
import ifFunction from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container) {
	// component or nativeElement
	// 根据type区分组件
	if (ifFunction(virtualDOM)) {
		// 挂载函数组件
		mountComponent(virtualDOM, container)
	} else {
		// 普通virtualDOM
		mountNativeElement(virtualDOM, container)
	}
}
