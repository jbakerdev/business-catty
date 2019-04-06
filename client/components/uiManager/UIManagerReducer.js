import Constants from '../../../Constants'
import {server} from './Thunks'

const appReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case Constants.ReducerActions.INIT_SERVER:
            server.setProps(action.props)
            return { ...state }
        case Constants.ReducerActions.CONNECTED: 
            return { ...state, isConnected: true}
        case Constants.ReducerActions.CONNECTION_ERROR: 
            return { ...state, isConnected: false}
        case Constants.ReducerActions.MATCH_UPDATE: 
            return { ...state, activeSession: action.session }
        case Constants.ReducerActions.PLAYER_ENTERED:
            state.activeSession.players.push(action.currentUser)
            return { ...state, activeSession: {...state.activeSession}}
        case Constants.ReducerActions.PLAYER_LEFT:
            state.activeSession.players.filter((player) => player.id !== action.currentUser.id)
            return { ...state, activeSession: {...state.activeSession}}
        case Constants.ReducerActions.SET_USER: 
            return { ...state, currentUser: action.currentUser }
        case Constants.ReducerActions.MATCH_CLEANUP: 
            return { ...state, activeSession: null, currentUser:null}
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        currentUser: null,
        activeSession: null,
        isConnected: false
    }
}