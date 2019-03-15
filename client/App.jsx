import React from 'react';
import UIStateContainer from './components/uiManager/UIStateContainer.js';
import './App.css';
import 'normalize.css'

class App extends React.Component {
    render(){
        return (
            <div>
                <UIStateContainer store={this.props.store} server={this.ws}/>
            </div>
        );
    }
};

export default App