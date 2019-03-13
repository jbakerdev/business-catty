import Constants from '../../Constants'

export const getInitialViewState = () => {
    return {
        scene: Constants.Bestiary.scenes[0],
        stats: {...Constants.Bestiary.stats}
    }
};