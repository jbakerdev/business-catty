import React from 'react';
import Lobby from '../Lobby.jsx'
import Match from '../Match.jsx'
import Login from '../Login.jsx'

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
                <div style={styles.statusDot}>
                    <h6 style={{margin:0, marginRight:'0.5em'}}>Servers are</h6>
                    <div style={{...styles.dot, backgroundColor: this.props.isConnected ? 'green': 'red'}}/>    
                </div>
            </div>
        )
    }
}

const styles = {
    frame: {
        height: '100vh',
        display:'flex', justifyContent:'center', alignItems:'center',
        backgroundImage: 'url('+require('../../assets/tiny.png')+')',
        backgroundRepeat: 'repeat'
    },
    dot: {
        height:'0.5em',
        width:'0.5em',
        borderRadius: '0.5em'
    },
    statusDot: {
        position:'absolute', bottom:'0.5em', right:'0.5em',
        display:'flex',
        color:'black',
        alignItems:'center'
    }
}