import React from 'react';

export default class Lobby extends React.Component {

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
                    {this.getErrors() ? '' : <div onClick={()=>this.props.onStartMatch(this.props.activeSession)}>Start Buisnessing</div>}
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