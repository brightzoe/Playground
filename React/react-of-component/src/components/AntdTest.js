import React, { Component } from 'react'
// import Button from 'antd/lib/button'
import 'antd/dist/antd.css'
import {Button} from 'antd'//按需加载

export default class AntdTest extends Component {
  render() {
    return (
      <div>
        <Button type="primary">按钮</Button>
      </div>
    )
  }
}
