import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import style from './style.css';

// todo: bootstrap is applied but classes does not work - need to configure it in webpack
export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1 className={style.header}>React with webpack!</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));