import React, { useState } from 'react';
import './App.css';

export default function App() {
	const [count, setCount] = useState(0); //描述初始状态
	const [obj, setObj] = useState({ name: 'haha' });
	return (
		<div>
			Your count:{count}
			<button onClick={setCount(count + 1)}>Add</button>
			<h2>{obj.name}</h2>
		</div>
	);
}
