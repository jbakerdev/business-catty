import React from 'react';
import { onMatchStart } from '../uiManager/Thunks.js'

export default class Lobby extends React.Component {

    startMatch = () => {
        onMatchStart(
            this.props.activeSession.sessionName, 
            this.props.currentUser, 
            this.props.server)
    }

    getErrors = () => {
        if(this.props.activeSession.players.length < 2) return 'Waiting for more players to join...'
    }

    render(){
        return (
            <div style={styles.frame}>
                <div>Le Lobby de {this.props.activeSession.sessionName}</div>
                <div>
                    {this.props.activeSession.players.map((player) => 
                        <div>
                            <div>{player.name}</div>
                        </div>
                    )}
                    <div>{this.getErrors()}</div>
                    {this.getErrors() ? '' : <div onClick={this.startMatch}>Start Buisnessing</div>}
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