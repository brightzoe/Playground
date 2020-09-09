// import React from 'react';
// import ReactDOM from 'react-dom';
import React,{Component} from './react';
import ReactDOM from './react-dom'
function Comp(props) {
	return <h2>hi {props.name}</h2>;
}
class Comp2 extends Component{
  render() {
    return (
			<div>
				<h2>hi{this.props.name}</h2>
			</div>
		);
  }
}

const jsx = (
  <div id="demo" style={{ color: "red" }}>

		<span>h1</span>
		<Comp name="function组件" />
		<Comp2 name="class组件" />
	</div>
);
console.log(jsx);
ReactDOM.render(jsx, document.querySelector('#root'));
