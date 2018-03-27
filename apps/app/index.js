import React from 'react';
import ReactDOM from 'react-dom';
import Hello from '../hello.js';
import styles from '../style/index.less';
//Index app
class Index extends	React.Component {
	render(){
		return <Hello className={styles.hello} welcom='hello world'></Hello>
	}
}
ReactDOM.render(<Index/>,document.getElementById('root'));
export default Index;


