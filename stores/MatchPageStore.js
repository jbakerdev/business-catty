var _ = require('lodash');

var Dispatcher = require('utils/Dispatcher');
var StoreCreator = require('utils/StoreCreator');
var ActionTypes = require('../Constants').ActionTypes;
var Phrases = require('../Constants').Phrases;
var RealtimeAPI = require('../apis/RealtimeAPI');
var FileServerIP = require('../Constants').FileServerIP;

var currentPlayerId = Rally.environment.getContext().getUser().ObjectID;

var startCountdown = 100;
var started = false;
var nextPhraseCountdown = 100;
var nextPhrases = [];
var currentPhrases = [];
var correctPhrase = '';
var foreignCorrectPhrase = null;
var victoryPercent = 0;
var gameTimer = 100;
var matchId = '';

var buzz = require('../apis/buzz.min.js');

var matchSounds = {
    correctAnswer: new buzz.sound("http://"+FileServerIP+":7777/correctAnswer.mp3"),
    phraseChange: new buzz.sound("http://"+FileServerIP+":7777/phraseChange.mp3"),
    matchMusic: new buzz.sound("http://"+FileServerIP+":7777/matchMusic.mp3"),
    timerTick: new buzz.sound("http://"+FileServerIP+":7777/timerTick.mp3"),
    victoryMusic: new buzz.sound("http://"+FileServerIP+":7777/victoryMusic.mp3"),
    lossMusic: new buzz.sound("http://"+FileServerIP+":7777/lossMusic.mp3")
};

function getPhraseGroup(){
    var phrases = [];
    for(var i=0; i<1; i++){
        correctPhrase = MatchPageStore.getRandomPhrase();
        phrases.push(correctPhrase);
    }
    return phrases;
}

var MatchPageStore = StoreCreator.create({
    get: () => {
        return {
            startCountdown: startCountdown,
            nextPhraseCountdown: nextPhraseCountdown,
            started: started,
            nextPhrases: nextPhrases,
            victoryPercent: victoryPercent,
            currentPhrases: currentPhrases,
            correctPhrase: correctPhrase,
            gameTimer: gameTimer,
            currentPlayerId: currentPlayerId,
            matchId: matchId,
            foreignCorrectPhrase: foreignCorrectPhrase
        };
    }
});

MatchPageStore.dispatchToken = Dispatcher.register((payload) => {
    var action = payload.action;

    var changed = false;

    switch(action.type) {
        case ActionTypes.MATCH_START:
            if(!started){
                //Set up game timeline/timer with phrase area, 10 sec countdown and then show 1st phrase
                started = true;
                nextPhrases = getPhraseGroup();
                RealtimeAPI.sendForeignCorrectAnswer(matchId, correctPhrase, currentPlayerId);
                //Successful hitting of buttons adds to victory %
                //Store scores and clean up
                changed = true;
                matchId = action.match.matchId;
                matchSounds.matchMusic.setVolume(100).loop().play();
            }
            break;
        case ActionTypes.CORRECT_ANSWER:
            if(action.matchId === matchId){
                victoryPercent += 5;
                matchSounds.correctAnswer.play();
                changed = true;
            }
            break;
        case ActionTypes.RECEIVED_FOREIGN_CORRECT_ANSWER:
            if(action.matchId === matchId && currentPlayerId!==action.ownerId){
                foreignCorrectPhrase = action.correctAnswer;
                changed = true;
            }
            break;
        case ActionTypes.TIMER_UPDATE:
            if(action.matchId === matchId){
                if(startCountdown > 0) startCountdown -= 10;
                if(nextPhraseCountdown > 0){
                  nextPhraseCountdown -= 5;
                }
                else if(nextPhraseCountdown <= 0){
                  nextPhraseCountdown = 100;
                  nextPhrases = getPhraseGroup();
                  matchSounds.phraseChange.play();
                  RealtimeAPI.sendForeignCorrectAnswer(matchId, correctPhrase, currentPlayerId);
                }
                if(gameTimer > 0) gameTimer -= 0.5;
                if(gameTimer <= 0 && victoryPercent < 100){
                    matchSounds.matchMusic.stop();
                    matchSounds.lossMusic.setVolume(100).play();
                }
                if(victoryPercent >= 100){
                    matchSounds.matchMusic.stop();
                    matchSounds.victoryMusic.setVolume(100).play();
                }
                matchSounds.timerTick.play();
                changed = true;
            }
            break;
        case ActionTypes.GET_NEXT_PHRASES:
            if(action.matchId === matchId){
                nextPhraseCountdown = 100;
                nextPhrases = getPhraseGroup();
                RealtimeAPI.sendForeignCorrectAnswer(matchId, correctPhrase, currentPlayerId);
                changed = true;
            }
            break;

    }
    if(changed) MatchPageStore.emitChange();
});

MatchPageStore.getRandomPhrase = function(){
    return Phrases[Math.round(Math.random() * Phrases.length-1)];
};

module.exports = MatchPageStore;
