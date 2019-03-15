import { dispatch } from '../../../index'
import Constants from '../../../Constants';

export const onLogin = (currentUser, sessionName, server) => {
    dispatch({ type: Constants.ReducerActions.SET_USER, currentUser })
    server.publishMessage({type: Constants.ReducerActions.MATCH_AVAILABLE, currentUser, sessionName})
}

export const onMatchStart = (sessionName, server) => {
    server.publishMessage({type: Constants.ReducerActions.MATCH_START, sessionName})
}