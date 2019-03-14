import React from 'react';
import './UIManager.css';
import Lobby from '../lobby/Lobby.jsx'
import Match from '../match/Match.jsx'
import Login from '../login/Login.jsx'

export default class UIManager extends React.Component {

    componentDidMount(){
        this.props.onInitServer(this.props)
    }

    getComponent = () => {
        if(!this.props.currentUser){
            return <Login {...this.props}/>
        }
        else {
            if(this.props.activeSession && !this.props.activeSession.isStarted){
                return <Lobby activeSession={this.props.activeSession} currentUser={this.props.currentUser}/>
            }
            if(this.props.activeSession && this.props.activeSession.isStarted){
                return <Match activeSession={this.props.activeSession} currentUser={this.props.currentUser}/>
            }
        }
    }

    render(){
        return (
            <div style={styles.frame}>
                {this.getComponent()}
                <div>Sessions: {this.props.activeSessions.length}</div>
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