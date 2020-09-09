import React, { useState, useEffect } from 'react';
//所有的生命周期都在useEffect里面
export default () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		const I = setTimeout(() => {
			setCount((x) => x + 1);
		}, 1000);
    return () => {
      console.log('clear')
			clearTimeout(I);
		}; //回收
	}, [Math.min(count, 5)]); //deps
	console.log('render');
	return (
		<div>
			<p>{count}</p>
		</div>
	);
};
