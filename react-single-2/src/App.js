import React from 'react';
import './App.scss';
class App extends React.Component {
	state = {
		val: '',
		list: [],
	};
	handleAdd = () => {
		const { val, list } = this.state; //解析赋值
		list.push(val);
		this.setState({
			list,
		});
	};
	handleChange = (e) => {
		let val = e.target.value;
		this.setState({ val });
	};
	render() {
		const { val, list } = this.state; //解析赋值
		return (
			<div>
				<p>欢迎！</p>
				<h1>hello</h1>
				<input type="text" value={val} onChange={this.handleChange} />
				<button onClick={this.handleAdd}>添加</button>

				<ul>
					{list.map((item, idx) => {
						return <li key={idx}>{item}</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default App;
