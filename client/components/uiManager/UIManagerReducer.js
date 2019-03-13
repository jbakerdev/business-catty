
import { getInitialViewState } from './UIManagerReducerHelper.js'

const appReducer = (state = getInitialViewState(), action) => {
    switch (action.type) {
        case 'NEW_SESSION':
            return getInitialViewState();
        case 'SCENE_TRANSITION':
            return { ...state, scene: action.nextScene, inputError: false }
        case 'UNKNOWN_INPUT':
            return { ...state, inputError: true }
        default:
            return state
    }
};

export default appReducer;