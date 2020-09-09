import React, { Component } from 'react';
import { func } from 'prop-types';

// 容器组件
export default class CommentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
		};
	}
	componentDidMount() {
		setInterval(() => {
			this.setState({
				comments: [
					{ body: 'react is very good', author: 'facebook' },
					{ body: 'vue is very good', author: 'miao' },
				],
			});
		}, 1000);
	}
	render() {
		return (
			<div>
				{this.state.comments.map((comment, idx) => (
					<Comment key={idx} {...comment} />
				))}
			</div>
		);
	}
}
// 展示组件
// memo高阶组件
const Comment = React.memo(function Comment(props) {
	return (
		<div>
			<p>{props.body}</p>
			<p> --- {props.author}</p>
		</div>
	);
});


//React.PureComponent 浅对比，一层比较
// class Comment extends React.PureComponent {
// 	// shouldComponentUpdate(nextProps, nextState, nextContext) {
// 	// 	if (
// 	// 		(nextProps.data.body === this.props.data.body &&
// 	// 			nextProps.data.author) === this.props.data.author
// 	// 	) {
// 	// 		//所有属性都相等
// 	// 		return false;
//   //   }
//   //   return true
// 	// }
// 	render() {
// 		console.log('render Comment');
// 		return (
// 			<div>
// 				<p>{this.props.body}</p>
// 				<p> --- {this.props.author}</p>
// 			</div>
// 		);
// 	}
// }


