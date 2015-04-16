var ActionTypes = require('../Constants').ActionTypes;
var Dispatcher = require('utils/Dispatcher');

var RealtimeAPI = require('../apis/RealtimeAPI');

module.exports = {

  createdMatch(matchId, ownerId, matchName) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CREATED_MATCH,
      matchId: matchId,
      ownerId: ownerId,
      matchName: matchName
    });
  },

  joinedMatch(match, playerId, playerName) {
    Dispatcher.handleViewAction({
      type: ActionTypes.JOINED_MATCH,
      match: match,
      playerId: playerId,
      playerName: playerName
    });
  },

  startMatch(match){
    Dispatcher.handleViewAction({
      type: ActionTypes.MATCH_START,
      match: match
    });
  },

  matchAvailable(matchId, ownerId, matchName, players){
    Dispatcher.handleViewAction({
      type: ActionTypes.MATCH_AVAILABLE,
      matchId: matchId,
      ownerId: ownerId,
      matchName: matchName,
      players: players
    });
  },

  correctAnswer(matchId){
    Dispatcher.handleViewAction({
      type: ActionTypes.CORRECT_ANSWER,
      matchId: matchId
    });
  },

  setForeignCorrectAnswer(matchId, correctAnswer, ownerId){
    Dispatcher.handleViewAction({
      type: ActionTypes.RECEIVED_FOREIGN_CORRECT_ANSWER,
      correctAnswer: correctAnswer,
      matchId: matchId,
      ownerId: ownerId
    });
  },

  timerUpdate(matchId){
    Dispatcher.handleViewAction({
      type: ActionTypes.TIMER_UPDATE,
      matchId: matchId
    });
  }
};