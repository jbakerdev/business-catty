import React from 'react';
import { onChoosePhrase, onMatchTick, onMatchLost, onMatchWon, onMatchStart, onCleanSession } from '../uiManager/Thunks.js'
import Constants from '../../../Constants'

export default class Match extends React.Component {

    state = {
        correct: null,
        isBoss: this.props.currentUser.id === this.props.activeSession.bossId
    }

    componentDidMount = () => {
        this.setState({interval: this.state.isBoss && setInterval(()=>this.checkTimer(), 1000)})
    }

    restart = () => {
        onMatchStart(this.props.activeSession.sessionName, this.props.currentUser, this.props.server)
        this.setState({interval: this.state.isBoss && setInterval(()=>this.checkTimer(), 1000)})
    }

    checkTimer = () => {
        if(this.props.activeSession.ticks >= this.props.activeSession.tickLimit){
            onMatchLost(this.props.activeSession, this.props.server)
            clearInterval(this.state.interval)
        }
        else if(this.props.activeSession.score >= this.props.activeSession.goal){
            onMatchWon(this.props.activeSession, this.props.server)
            clearInterval(this.state.interval)
        }
        else onMatchTick(this.props.activeSession, this.props.server)
    }

    choosePhrase = (choice) => {
        const correct = choice === this.props.activeSession.activePhrase
        if(correct) onChoosePhrase(choice, this.props.activeSession.sessionName, this.props.server)
        this.setState({correct})
    }

    getComponent = () => {
        switch(this.props.activeSession.status){
            case Constants.MatchStatus.WIN:
                return this.renderWin()
            case Constants.MatchStatus.LOST:
                return this.renderLost()
            default:
                return this.renderInProgress()
        }
    }

    renderWin = () => 
        <div>
            U R Winner {!this.state.isBoss && '(Waiting for boss to advance)'}
            {this.state.isBoss && <div onClick={this.restart}>Next Level</div>}
        </div>

    renderLost = () => 
        <div>
            U R LOSER
            <div onClick={onCleanSession}>Done</div>
        </div>

    renderInProgress = () => 
        <div>
            {this.props.currentUser.id === this.props.activeSession.bossId ? 
                this.renderBossView() : this.renderEmployeeView()
            }
            {this.state.correct === null ? '' : <div>{this.state.correct ? 'Correct!' : 'WRONG'}</div>}
            <div>Le score {this.props.activeSession.score} / {this.props.activeSession.goal}</div>
            <div>Le timer {this.props.activeSession.ticks} / {this.props.activeSession.tickLimit}</div>
            <div>Le level {this.props.activeSession.level}</div>
        </div>

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
                {this.getComponent()}
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