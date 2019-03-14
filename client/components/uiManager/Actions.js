import Constants from "../../../Constants";

export const login = (currentUser, sessionName, sessions, server) => {
    let existing = sessions.find((session) => session.sessionName === sessionName)
    let payload
    if(!existing){
        payload = {
            type: Constants.ReducerActions.MATCH_AVAILABLE,
            activeSession: {
                players: [currentUser],
                sessionName,
                isStarted:false
            }
        }
        server.broadcastMessage(payload, 5000)
        payload.type = Constants.ReducerActions.MATCH_AVAILABLE_AND_JOIN
    }
    else {
        payload = {
            type: Constants.ReducerActions.PLAYER_ENTERED,
            currentUser,
            sessionName
        }
        server.publishMessage(payload)
        payload.type = Constants.ReducerActions.PLAYER_JOIN
    }

    return payload
};

export const setUser = (currentUser) => {
    return {
        type: Constants.ReducerActions.SET_USER,
        currentUser
    }
}

export const initServer = (props) => {
    return {
        type: Constants.ReducerActions.INIT_SERVER,
        props
    }
}

export const connected = () => {
    return {
        type: Constants.ReducerActions.CONNECTED
    }
}

export const connectionError = () => {
    return {
        type: Constants.ReducerActions.CONNECTION_ERROR
    }
}

export const decodeWSMessage = (data) => {
    if (!data ) {
      return {
          type:'noop'
      }
    }
    var payload = JSON.parse(data.data.utf8Data);
    return {...payload}
}

