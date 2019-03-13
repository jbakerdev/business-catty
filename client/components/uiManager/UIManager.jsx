import React from 'react';
import './UIManager.css';
import Lobby from '../lobby/Lobby'
import Match from '../match/Match'
import Login from '../login/Login'

export default class UIManager extends React.Component {
    render(){
        return (
            <div style={styles.frame}>
                {!this.props.currentUser && <Login onLogin={this.props.onLogin}/>}
                {this.props.currentUser && !this.props.activeSession && <Lobby currentUser={currentUser}/>}
                {this.props.currentUser && this.props.activeSession && <Match activeSession={this.props.activeSession} currentUser={this.props.currentUser}/>}
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
    }
}