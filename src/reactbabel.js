// import "@babel/polyfill";  // babel函数填充库

import React, { Component } from 'react'
import ReactDom from 'react-dom'

class Hello extends Component {
    render(h) {
        return <div>I Can do</div>
    }
}

ReactDom.render(<Hello />, document.getElementById('title'))