import React from 'react';
import './UIManager.css';
import Lobby from '../lobby/Lobby.jsx'
import Match from '../match/Match.jsx'
import Login from '../login/Login.jsx'

export default class UIManager extends React.Component {

    componentDidMount(){
        this.props.onInitServer(this.props)
    }

    render(){
        return (
            <div style={styles.frame}>
                {!this.props.currentUser && <Login {...this.props}/>}
                {this.props.currentUser && !this.props.activeSession.isStarted && <Lobby currentUser={currentUser}/>}
                {this.props.currentUser && this.props.activeSession && <Match activeSession={this.props.activeSession} currentUser={this.props.currentUser}/>}
                <div style={{...styles.dot, backgroundColor: this.props.isConnected ? 'green': 'red'}}/>
            </div>
        )
    }
}

const styles = {
    frame: {
        background: 'black',
        color: 'green',
        height: '100%',
        padding:'1em'
    },
    dot: {
        height:'1em',
        width:'1em',
        borderRadius: '0.5em'
    }
}