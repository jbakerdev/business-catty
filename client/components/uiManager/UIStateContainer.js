import { connect } from 'react-redux'
import { login, decodeWSMessage, initServer, connected, connectionError, setUser } from './Actions'
import UIManager from './UIManager.jsx'

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return {
        onParseInput: (userInput, scene) => {
            dispatch(parseInput(userInput, scene));
        },
        onLogin: (currentUser, sessionName, sessions, server) => {
            dispatch(setUser(currentUser))
            dispatch(login(currentUser, sessionName, sessions, server))
        },
        onWSMessage: (data) => {
            dispatch(decodeWSMessage(data))
        },
        onInitServer: (props) => {
            dispatch(initServer(props))
        },
        onConnected: () => {
            dispatch(connected())
        },
        onConnectionError: () => {
            dispatch(connectionError())
        }
    }
};


const UIStateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIManager);

export default UIStateContainer;