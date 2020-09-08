import React, { useState } from 'react';
export default () => {
  const [count, setCount] = useState(0)
  // this.ListeningStateChangedEvent({})
  return <div>
    {count}
    <button onClick={()=>setCount(x+1)}></button>
  </div>
}