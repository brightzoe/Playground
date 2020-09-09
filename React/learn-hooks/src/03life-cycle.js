import React, { useState, useEffect } from 'react';
const Input = (props) => {
  //component will receive props
  //component should update
  useEffect(() => {
    console.log(`value changed ${props.value}`)
  }, [props.value])
  return <input/>
}
export default (props) => {

  const [value, setValue] = useState('')

	useEffect(() => {
    console.log('component did mount');
    return () => {
      console.log('component will unmount')//effect失效的时候执行
    }
  }, []);
  useEffect(() => {


  }, [props.value])
	console.log('render');
  return <div>
    <Input value={value} />
    <button onClick={()=>setValue(x=>Math.random())}>Click Me</button>
  </div>
};
