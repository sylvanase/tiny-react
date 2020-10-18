import diff from './diff'
export default class Component {
	constructor(props) {
		this.props = props
	}
	setState(state) {
		// this 指向的是子类的实例对象
		// 将传递的state 与原有的state合并
		this.state = Object.assign({}, this.state, state)
		// 获取最新的需要渲染的 virtualDOM 对象
		let virtualDOM = this.render()
		// 获取旧的 virtualDOM 对象 进行比对
		let oldDOM = this.getDOM()
		// 获取容器
		let container = oldDOM.parentNode
		// 实现对象
		diff(virtualDOM, container, oldDOM)
	}
	// 保存旧dom
	setDOM(dom) {
		this._dom = dom
	}

	getDOM() {
		return this._dom
	}

	render() {
		return <div>class Component </div>
	}
}
