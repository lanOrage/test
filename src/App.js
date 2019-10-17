import React, {Component} from 'react'
import {message} from 'antd'
import { BrowserRouter, Switch, Route} from "react-router-dom"

import Index from './pages/index/index'
import Admin from './pages/admin/admin.jsx'
class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <BrowserRouter>
        <Switch> 
          <Route path="/index" component={Index} />
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App


