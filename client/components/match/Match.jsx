import React from 'react';
import { onChoosePhrase, onMatchTick } from '../uiManager/Thunks.js'

export default class Match extends React.Component {

    state = {
        correct: null, 
        interval: this.props.currentUser.id === this.props.activeSession.bossId && setInterval(()=>onMatchTick(this.props.activeSession, this.props.server), 1000)
    }

    choosePhrase = (choice) => {
        const correct = choice === this.props.activeSession.activePhrase
        if(correct) onChoosePhrase(choice, this.props.activeSession.sessionName, this.props.server)
        this.setState({correct})
    }

    renderBossView = () => 
        <div>
            <div>Le Phrase on doit dit</div>
            <div>{this.props.activeSession.activePhrase}</div>
        </div>

    renderEmployeeView = () => {
        const player = this.props.activeSession.players.find((player) => player.id === this.props.currentUser.id)
        return <div>
                    {player.choices.map((choice) => 
                        <div onClick={()=>this.choosePhrase(choice)}>{choice}</div>)}
               </div>
    }

    render(){
        return (
            <div style={styles.frame}>
                <div>Le Match avec</div>
                {this.props.activeSession.players.map((player) => 
                    <div>{player.name} {player.id === this.props.activeSession.bossId && '*'}</div>
                )}
                {this.props.currentUser.id === this.props.activeSession.bossId ? 
                    this.renderBossView() : this.renderEmployeeView()
                }
                {this.state.correct === null ? '' : <div>{this.state.correct ? 'Correct!' : 'WRONG'}</div>}
                <div>Le score {this.props.activeSession.score}</div>
                <div>Le timer {this.props.activeSession.ticks}</div>
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