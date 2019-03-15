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
            if(this.props.activeSession && !this.props.activeSession.status){
                return <Lobby {...this.props}/>
            }
            if(this.props.activeSession && this.props.activeSession.status){
                return <Match {...this.props}/>
            }
        }
    }

    render(){
        return (
            <div style={styles.frame}>
                {this.getComponent()}
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