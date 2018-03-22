import React from 'react';
import ReactDOM from 'react-dom';
import Hello from '../hello.js';
import styles from '../style/index.less'
//Index app
class Index2 extends	React.Component {
	render(){
		return <Hello className={styles.hello} welcom='hello world Two'></Hello>
	}
}
ReactDOM.render(<Index/>,document.getElementById('root'));
export default Index2;

//render main component

