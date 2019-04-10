import React from 'react';
import { onMatchStart } from './uiManager/Thunks.js'
import { TopBar } from './Shared'
import AppStyles from '../AppStyles';

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
            <div style={{...AppStyles.window}}>
                {TopBar('MacBusiness')}
                <div style={{padding:'0.5em'}}>
                    <h3>Joining conference at</h3>
                    <h3>{this.props.activeSession.sessionName} Corp</h3>
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
            </div>
        )
    }
}

const styles = {
    nameTag: {
        background: 'white',
        border: '1px solid',
        padding: '0.25em',
        marginBottom: '5px',
    }
}