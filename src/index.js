import TinyReact from './TinyReact'

const root = document.getElementById('root')

const virtualDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2>(编码必杀技)</h2>
		<div>
			嵌套1 <div>嵌套 1.1</div>
		</div>
		<h3>(观察: 这个将会被改变)</h3>
		{2 == 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 == 2 && <div>2</div>}
		<span>这是一段内容</span>
		<button onClick={() => alert('你好')}>点击我</button>
		<h3>这个将会被删除</h3>
		2, 3
	</div>
)

const modifyDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2 data-test="test123">(编码必杀技)</h2>
		<div>
			嵌套1 <div>嵌套 1.1</div>
		</div>
		<h3>(观察: 这个将会被改变)</h3>
		{2 == 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 == 2 && <div>2</div>}
		<span>这是一段被修改过的内容</span>
		<button onClick={() => alert('你好!!!!!')}>点击我</button>
		{/* <h6>这个将会被删除</h6> */}
		<input type="text" value="13" />
	</div>
)

// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
// 	console.log(111)
// 	TinyReact.render(modifyDOM, root)
// }, 2000)

// 转换virtualDOM
// TinyReact.render(virtualDOM, root)
// console.log(virtualDOM)

// 函数组件
// function Heart() {
// 	return <div>&hearts;</div>
// }

// 测试 Heart 中是函数组件的情况
function Demo() {
	return <div>Hello</div>
}

function Heart(props) {
	return (
		<div>
			{props.title}
			&hearts; <Demo />
		</div>
	)
}

// TinyReact.render(<Heart title="Hello props" />, root)

class Alert extends TinyReact.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Default Title',
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.setState({ title: 'Changed Title' })
	}
	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps')
	}
	componentWillUpdate() {
		console.log('componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('componentDidUpdate')
	}
	render() {
		console.log(this.state)
		return (
			<div>
				Class
				{this.props.name}
				{this.props.age}
				<div>
					{this.state.title}
					<button onClick={this.handleClick}>改变Title</button>
				</div>
			</div>
		)
	}
}

// TinyReact.render(<Alert name="name" age={20} />, root)

TinyReact.render(<Alert name="张三" age={20} />, root)

setTimeout(() => {
	TinyReact.render(<Alert name="李四" age={50} />, root)
	// TinyReact.render(<Heart title="我是Heart组件" />, root)
}, 2000)
