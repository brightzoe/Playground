import React from 'react';
import { Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './Demo1.scss';
const Search = Input.Search;
const Option = Select.Option;
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
	handleSearch = (val) => {
		let { list } = this.state;
		list.push(val);
		this.setState({ list });
	};
	render() {
		const { val, list } = this.state; //解析赋值
		const options = [];
		const LiItem = list.map((item, idx) => {
			options.push(<Option key={idx} style={{height:50}}>{item}</Option>)
			return <li key={idx}>{item}</li>
		});
		return (
			<div>
				<p>欢迎！</p>
				<h1>hello</h1>
				<Input
					type="text"
					value={val}
					style={{ width: 300 }}
					onChange={this.handleChange}
				/>
				<Button type="primary" onClick={this.handleAdd}>
					添加
				</Button>

				<ul>{LiItem}</ul>
				<div>
					<Search
						style={{ width: 363 }}
						onSearch={this.handleSearch}
						enterButton="添加"
					></Search>
					<br/>
					<Select style={{width:150}}>{options}</Select>
				</div>
			</div>
		);
	}
}

export default App;
