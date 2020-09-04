import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Greeting(props) {
	const [name, setName] = useState('Mary');
	const [surname, setSurname] = useState('hello');
	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handleSurnameChange(e) {
		setSurname(e.target.value);
	}
	return (
		<section>
      <input value={name} onChange={handleNameChange} />
      <br/>
			<input value={surname} onChange={handleSurnameChange} />
		</section>
	);
}

ReactDOM.render(<Greeting />, document.getElementById('root'));

