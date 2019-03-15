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
        this.setState({correct, choice})
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
            <h5>"Great job team, we met our innovation goal for this quarter. Let's see if we can do more with less next quarter!" {!this.state.isBoss && '(Waiting for PM to advance)'}</h5>
            {this.state.isBoss && <div style={{cursor:'pointer'}} onClick={this.restart}>Start Next Quarter -></div>}
        </div>

    renderLost = () => 
        <div>
            <h5>"Sorry team, but we didn't innovate enough this quarter, so we're going to have to make some hard choices. Starting now you all have unlimited unpaid leave."</h5>
            <div style={{cursor:'pointer'}}  onClick={onCleanSession}>Done -></div>
        </div>

    renderInProgress = () => 
        <div>
            {this.state.isBoss ? 
                this.renderBossView() : this.renderEmployeeView()
            }
            <div style={{marginTop:'0.5em', marginBottom:'0.5em'}}>
                <h6 style={{margin:0}}>Innovation</h6>
                <div style={{width: '100%', height:'0.5em', border: '1px solid'}}>
                    <div style={{width: ((this.props.activeSession.score / this.props.activeSession.goal)*100)+'%', background:'green', height:'100%', transition:'width 500ms'}}/>
                </div>
            </div>
            <div style={{marginTop:'0.5em', marginBottom:'0.5em'}}>
                <h6 style={{margin:0}}>Time</h6>
                <div style={{width: '100%', height:'0.5em', border: '1px solid'}}>
                    <div style={{width: (100-((this.props.activeSession.ticks / this.props.activeSession.tickLimit)*100))+'%', background:'orange', height:'100%', transition:'width 250ms'}}/>
                </div>
            </div>
            <div>Quarter {this.props.activeSession.level}</div>
        </div>

    renderBossView = () => 
        <div>
            <div>As the project manager, I think we should:</div>
            <h4 className='alternate-font'>"{this.props.activeSession.activePhrase}!"</h4>
            <div>Who on the team can do that?</div>
        </div>

    renderEmployeeView = () => {
        const player = this.props.activeSession.players.find((player) => player.id === this.props.currentUser.id)
        return <div style={{padding:'5px', paddingTop:'1em', overflowY:'auto', height:'48vh'}}>
                    {player.choices.map((choice) => 
                        <h6 style={styles.choiceBtn} className={'alternate-font '+(!this.state.correct && this.state.choice === choice ? 'shake-it' : '')} onClick={()=>this.choosePhrase(choice)}>{choice}</h6>)}
               </div>
    }

    render(){
        return (
            <div style={styles.frame}>
                <div style={{marginBottom:'1em'}}>{this.props.activeSession.sessionName}</div>
                <div>Brainstorming in Conference room 3F</div>
                {this.getComponent()}
            </div>
        )
    }
}

const styles = {
    frame: {
        padding:'1em',
        maxWidth:'600px'
    },
    choiceBtn: {
        margin: 0,
        cursor: 'pointer',
        border: '1px solid',
        padding: '0.5em',
        borderRadius: '5px',
        marginBottom:'1em'
    }
}