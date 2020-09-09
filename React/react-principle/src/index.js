// import React from 'react';
// import ReactDOM from 'react-dom';
import React, { Component } from './react';
import ReactDOM from './react-dom';
function Comp(props) {
	return <h2>hi {props.name}</h2>;
}
class Comp2 extends Component {
	render() {
		return (
			<div>
				<h2>hi{this.props.name}</h2>
			</div>
		);
	}
}
const users = [
	{ name: 'hello', age: 18 },
	{ name: 'tom', age: 40 },
];
const jsx = (
	<div id="demo" style={{ color: 'red' }} onClick={() => console.log('click')}>
		<span>h1</span>
		<Comp name="function组件" />
		<Comp2 name="class组件" />
		<ul>
			{/* vdom组成的数组 */}
			{users.map((user) => (
				<li key={user.name}>{user.name}</li>
			))}
		</ul>
	</div>
);
console.log(jsx);
ReactDOM.render(jsx, document.querySelector('#root'));
