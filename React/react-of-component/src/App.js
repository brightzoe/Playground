import React from 'react';
import logo from './logo.svg';
import './App.css';
import AntdTest from "./components/AntdTest"
import CommentList from './components/CommentList';

function App() {
  return (
    <div className="App">
      <AntdTest />
      {/* 展示组件和容器组件 */}
      <CommentList/>
    </div>
  );
}

export default App;
