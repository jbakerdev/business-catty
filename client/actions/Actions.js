import Constants from "../Constants";

export const newSession = () => {
    return {
        type: 'NEW_SESSION'
    }
};

export const parseInput = (userInput, scene) => {
    const nextScene = scene.choices.find((choice) => choice.scene && choice.value===userInput)
    if(nextScene)
        return {
            type: 'SCENE_TRANSITION',
            nextScene: Constants.Bestiary.scenes[nextScene.scene]
        }
    else 
        return {
            type: 'UNKNOWN_INPUT'
        }
};