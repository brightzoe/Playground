import React, { useContext } from 'react';
import HelloContext from './HelloContext';

//HelloContent.Provider
//HelloContent.Consumer
const { Provider } = HelloContext;

const Desendants = () => {
	const value = useContext(HelloContext);
	return <div>{value}</div>;
};
const Child = () => {
	return <Desendants />;
};

const Parent = () => {
	return (
		<Provider value="hello">
			<Child />
		</Provider>
	);
};
export default Parent;
