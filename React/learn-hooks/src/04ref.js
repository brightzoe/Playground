import React, {
	useState,
	useEffect,
	useRef,
	forwardRef,
	useImperativeHandle,
} from 'react';
const Input = (props, ref) => {
	const refInput = useRef();
	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				refInput.current.focus();
			},
		}),
		[]
	);

	useEffect(() => {
		refInput.current.value = props.initialValue; //初始值
	}, []);
	return (
		<input onChange={(e) => props.onChange(e.target.value)} ref={refInput} />
	); //子组件更新向上传值
};
const MInput = forwardRef(Input);

export default () => {
	const r1 = useRef();
	const r2 = useRef();
	return (
		<div>
			<MInput
				ref={r1}
				initialValue={100}
				onChange={(x) => console.log('1:' + x)}
			/>
			<MInput
				ref={r2}
				initialValue={'hello'}
				onChange={(x) => console.log('2:' + x)}
			/>
			<p>
				<button
					onClick={() => {
						r1.current.focus();
					}}
				>
					focus1
				</button>
				<button
					onClick={() => {
						r2.current.focus();
					}}
				>
					focus2
				</button>
			</p>
		</div>
	);
};
