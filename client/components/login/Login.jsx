import React from 'react';
import { onLogin } from '../uiManager/Thunks.js'
import { Button, TopBar } from '../Shared'
import AppStyles from '../../AppStyles';

export default class Login extends React.Component {
    state = { name: '', sessionName: ''}

    render(){
        return (
            <div>
                <div style={{...AppStyles.window}}>
                    {TopBar('MacBusiness')}
                    <div style={{padding:'0.5em'}}>
                        <h3 style={{margin:'0'}}>Name</h3>
                        <input style={{...styles.loginInput, marginBottom:'0.5em'}} type="text" value={this.state.name} onChange={(e)=>this.setState({name:e.currentTarget.value})}/>
                        <h3 style={{margin:'0'}}>Buisness Name</h3>
                        <input style={{...styles.loginInput, marginBottom:'1em'}} type="text" value={this.state.sessionId} onChange={(e)=>this.setState({sessionId:e.currentTarget.value})}/>
                        {Button(this.state.name && this.state.sessionId, ()=>onLogin(getUser(this.state.name), this.state.sessionId), 'Ok')}
                    </div>
                </div>
            </div>
        )
    }
}

const getUser = (name) => {
   return {name,id: Date.now() + ''+ Math.random()}
}

const styles = {
    loginInput: {
        border: '1px solid',
        boxShadow: 'none',
        padding:'3px'
    },
    nameTag: {
        background: 'red',
        borderRadius: '0.5em',
        color: 'white',
    },
    login: {color:'black', cursor:'pointer', textAlign:'right', paddingTop:'1em'}
}