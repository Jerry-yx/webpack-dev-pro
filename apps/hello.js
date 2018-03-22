import React from 'react'

class Hello extends React.Component {

	render(){
		return <div  className={this.props.className}>{this.props.welcom}</div>
	}
}
export default Hello;