import React from 'react';
import ReactDOM from 'react-dom';
import State from './01state';
import Effect from './02effect';
import Life from './03life-cycle'
import Ref from "./04ref"
import Context from './05context'
import './index.css';
function App() {
	return (
		<div>
			<Context />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
