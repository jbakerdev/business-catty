import React from 'react';

export default class Login extends React.Component {
    state = { name: '', sessionName: ''}

    render(){
        return (
            <div style={styles.frame}>
                <div>Handle:</div>
                <input type="text" placeholder="Thought Leader" value={this.state.name} onChange={(e)=>this.setState({name:e.currentTarget.value})}/>
                <div>Buisness Name:</div>
                <input type="text" placeholder="CorpTron" value={this.state.sessionName} onChange={(e)=>this.setState({sessionName:e.currentTarget.value})}/>
                <div onClick={()=>this.props.onLogin(getUser(this.state.name), this.state.sessionName, this.props.activeSessions, this.props.server)}>Go Do Buisness</div>
            </div>
        )
    }
}

const getUser = (name) => {
   return {name,id: Date.now() + ''+ Math.random()}
}

const styles = {
    frame: {
        background: 'black',
        color: 'green',
        height: '100%',
        padding:'1em'
    }
}