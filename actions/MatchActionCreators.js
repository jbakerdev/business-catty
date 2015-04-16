var ActionTypes = require('../Constants').ActionTypes;
var Dispatcher = require('utils/Dispatcher');

var RealtimeAPI = require('../apis/RealtimeAPI');

module.exports = {
  selectPhrase(phrase, correctPhrase, matchId) {
    if(phrase === correctPhrase) {
      RealtimeAPI.sendCorrectAnswer(matchId);
    }
    Dispatcher.handleViewAction({
      type: ActionTypes.GET_NEXT_PHRASES,
      matchId: matchId
    });
  },

  sendForeignCorrectAnswer(matchId, correctAnswer, ownerId){
    RealtimeAPI.sendForeignCorrectAnswer(matchId, correctAnswer, ownerId);
  },

  timerUpdate(matchId) {
    RealtimeAPI.timerUpdate(matchId);
  }
};