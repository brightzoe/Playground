import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './app.scss';
import 'antd/dist/antd.css'
export default function App() {
	return (
		<div className="container">
			<h1>欢迎！</h1>
			<Link to="/login">点击跳转到登录页面</Link>
			<br></br>
			<Link to="/home">点击跳转到主页面</Link>
			<br></br>
		</div>
	);
}

// //有状态组件
// export default class App extends React.Component {
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
