import Constants from '../../../Constants'
import WS from '../../WebsocketClient'

const appReducer = (state = getInitialState(), action) => {
    let session
    switch (action.type) {
        case Constants.ReducerActions.INIT_SERVER:
            return { ...state, server: new WS(action.props) }
        case Constants.ReducerActions.CONNECTED: 
            return { ...state, isConnected: true}
        case Constants.ReducerActions.CONNECTION_ERROR: 
            return { ...state, isConnected: false}
        case Constants.ReducerActions.MATCH_AVAILABLE: 
            state.activeSessions.push(action.activeSession)
            return { ...state, activeSessions: Array.from(state.activeSessions) }
        case Constants.ReducerActions.MATCH_AVAILABLE_AND_JOIN: 
            state.activeSessions.push(action.activeSession)
            return { ...state, activeSession:action.activeSession, activeSessions: Array.from(state.activeSessions) }
        case Constants.ReducerActions.PLAYER_ENTERED:
            session = state.activeSessions.find((session) => session.name === action.sessionName)
            session.players.push(action.player)
            return { ...state, activeSessions: Array.from(state.activeSessions)}
        case Constants.ReducerActions.PLAYER_JOIN:
            session = state.activeSessions.find((session) => session.name === action.sessionName)
            session.players.push(action.player)
            return { ...state, activeSessions: Array.from(state.activeSessions), activeSession: session}
        case Constants.ReducerActions.PLAYER_LEFT:
            state.activeSession.players.filter((player) => player.id !== action.currentUser.id)
            return { ...state, activeSession: {...state.activeSession}}
        case Constants.ReducerActions.SET_USER: 
            return { ...state, currentUser: action.currentUser }
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        currentUser: null,
        activeSession: null,
        activeSessions: [],
        isConnected: false
    }
}