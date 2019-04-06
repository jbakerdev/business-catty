import React from 'react';
import { onMatchStart } from '../uiManager/Thunks.js'
import { Button, TopBar } from '../Shared'
import AppStyles from '../../AppStyles';

export default class Lobby extends React.Component {

    startMatch = () => {
        onMatchStart(
            this.props.activeSession.sessionName, 
            this.props.currentUser, 
            this.props.server)
    }

    getErrors = () => {
        if(this.props.activeSession.players.length < 2) return 'Waiting for more employees to join...'
    }

    render(){
        return (
            <div style={{...AppStyles.window, padding:'0.5em'}}>
                {TopBar('MacBusiness')}
                <h3>{this.props.activeSession.sessionId} Lobby</h3>
                <div style={{marginBottom:'1em', alignItems:'center', overflow:'auto', maxHeight:'66vh'}}>
                    {this.props.activeSession.players.map((player) => 
                        <div style={styles.nameTag}>
                            {player.name}
                        </div>
                    )}
                </div>
                <div>{this.getErrors()}</div>
                {this.getErrors() ? '' : 
                    <div style={AppStyles.buttonOuter} 
                         onClick={this.startMatch}>
                         <div style={{border:'1px solid', borderRadius: '3px', opacity: this.getErrors() ? 0.5 : 1}}>Start</div>
                    </div>}
            </div>
        )
    }
}

const styles = {
    nameTag: {
        background: 'red',
        borderRadius: '0.5em',
        color: 'white',
        pointerEvents:'none',
        width:'13em',
        marginRight:'1em'
    },
    loginInput: {
        boxShadow: 'none',
        border: 'none',
        padding: '0.5em',
        marginBottom:'1em',
        marginTop:'1em'
    }
}