import * as React from 'react'
import AppStyles from '../AppStyles'

export const TopBar = (text) => 
    <div style={AppStyles.topBar}>
        <div style={{width:'33%', marginRight:'5px'}}><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/></div>
            {text}
        <div style={{width:'33%', marginLeft:'5px'}}><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/><hr style={AppStyles.hr}/></div>
    </div>


export const Button = (enabled, handler, text) => 
    <div style={{...AppStyles.buttonOuter, pointerEvents: enabled ? 'all' : 'none'}} 
        onClick={handler}>
        <div style={{...AppStyles.buttonInner, opacity: enabled ? 1 : 0.5}}>{text}</div>
    </div>

export const LightButton = (enabled, handler, text) => 
    <div onClick={handler} style={{...AppStyles.buttonInner, opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'all' : 'none'}}>{text}</div>