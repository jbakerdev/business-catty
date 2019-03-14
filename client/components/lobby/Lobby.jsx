import React from 'react';

export default class Lobby extends React.Component {
    render(){
        return (
            <div style={styles.frame}>
                <div>Le Lobby</div>
                <div>
                    {this.props.activeSession.players.map((player) => 
                        <div>
                            <div>{player.name}</div>
                            <div>Ready: {player.isReady}</div>
                        </div>
                    )}
                    {this.props.activeSession.players.find((player)=>!player.isReady) ? '' : 
                        <div onClick={()=>this.props.onStartMatch(this.props.activeSession)}>Start Buisnessing</div>
                    }
                </div>
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