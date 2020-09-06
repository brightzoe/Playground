import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './app.scss';
import 'antd/dist/antd.css';
export default function App() {
	const [count, setCount] = useState(10); //数组，解构赋值
	useEffect(() => {
		//组件加载执行
		console.log('执行了useEffect');
		setCount(100)
	}, []);
	return (
		<div className="container">
			<h1>欢迎！</h1>
			<Link to="/login">点击跳转到登录页面</Link>
			<br />
			<Link to="/home">点击跳转到主页面</Link>
			<br />
			<p>当前count次数：{count}</p>
			<Button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				更新次数
			</Button>
		</div>
	);
}

// //有状态组件
// export default class App extends React.Component {
// 	state = { count: 10 }
// 	handleUpdate = ()=>{
// 		this.setState({
// 			count:this.state.count+1
// 		})
// 	}
//   handleJump = () => {
//     this.props.history.push('/login')
//   }
// 	render() {
// 		return (
// 			<div className="container">
// 				<h1>欢迎！</h1>
// 				<Link to="/login">点击跳转到登录页面</Link>
// 				<br />
// 				<Link to="/home">点击跳转到主页面</Link>
// 				<br />
// 				<Button onClick={this.handleJump}>点击跳转到登录</Button>
// 			</div>
// 		);
// 	}
// }
