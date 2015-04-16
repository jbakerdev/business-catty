var _ = require('lodash');
var React = require('react');

var MatchActionCreators = require('../actions/MatchActionCreators');
var MatchPageStore = require('../stores/MatchPageStore');
var ControlTypes = require('../Constants').ControlTypes;
var AnswerStyles = require('../Constants').AnswerStyles;

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ListGroup = require('react-bootstrap').ListGroup;
var DropdownButton = require('react-bootstrap').DropdownButton;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var MenuItem = require('react-bootstrap').MenuItem;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var ProgressBar = require('react-bootstrap').ProgressBar;
var Panel = require('react-bootstrap').Panel;
var Alert = require('react-bootstrap').Alert;

module.exports = React.createClass({
  displayName: 'MatchPage',

  propTypes: {
    onMatchReady: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return MatchPageStore.get();
  },

  componentWillMount() {
    MatchPageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MatchPageStore.removeChangeListener(this._onChange);
    clearInterval(this.timerInterval);
  },

  render() {
    return this._getMatchBody()
  },

  _getMatchBody(){

    if(this.state.started && this.state.gameTimer === 100 && this.props.matchRunning.ownerId === this.state.currentPlayerId){
      var that = this;
      this.timerInterval = setInterval(function(){MatchActionCreators.timerUpdate(that.props.matchRunning.matchId)}, 1000);
    }

    return (
      <Panel className={ this.state.started ? "match-page-started-transition" : "match-page-hidden" }>
        <Alert bsStyle='warning'>{ this._getBannerMessage() }</Alert>
        <hr/>
        <div className={ this.state.startCountdown <= 0 ? "match-progress-visible" : "match-progress-hidden"}>
          <ProgressBar active now={ this.state.gameTimer } label="Time is running out!"/>
          <ProgressBar active now={ this.state.victoryPercent } label="Fill the Progress Bar"/>
        </div>
        <div>
          { this._getControlsOrBanner(this.state.nextPhrases) }
        </div>
      </Panel>
    )
  },

  _getNextPlayerControlSet(phrases){
    this.state.cachedControls = _.map(phrases, (phrase) => {
      return this._getRandomControlType(phrase);
    });
    return this.state.cachedControls;
  },

  _getCachedPlayerControlSet(){
    return this.state.cachedControls;
  },

  _getBannerMessage(){
    if(this.state.startCountdown > 0) return 'GET READY!!';
    else return 'TELL YOUR TEAM: "Somebody needs to: '+this.state.foreignCorrectPhrase + '"!';
  },

  _onPhraseClicked(e){
    MatchActionCreators.selectPhrase(e.target.innerHTML, this.state.correctPhrase, this.state.matchId);
  },

  _onPhraseTyped(){

  },

  _getControlsOrBanner(){
    if(this.state.startCountdown > 0){
      //Initialize first answer set here...not the best...
      if(!this.state.cachedControls && this.state.nextPhrases.length > 0){
        this._getNextPlayerControlSet(this.state.nextPhrases);
        MatchActionCreators.sendForeignCorrectAnswer(this.state.matchId, this.state.correctPhrase, this.state.currentPlayerId);
      }
      return (
        <ProgressBar active now={ this.state.startCountdown } label={ (this.state.startCountdown / 10)/2 } />
      )
    }
    else if(this.state.victoryPercent < 100 && this.state.gameTimer > 0){
      if(this.state.nextPhraseCountdown === 100){
        return this._getNextPlayerControlSet(this.state.nextPhrases);
      }
      else{
        return this._getCachedPlayerControlSet();
      }
    }
    else if(this.state.victoryPercent >= 100 && this.state.gameTimer > 0){
      return this._getVictoryBanner();
    }
    else if(this.state.victoryPercent < 100 && this.state.gameTimer <= 0){
      return this._getLossBanner();
    }
  },

  _getVictoryBanner(){
    return (
      <Panel header="OMG U ONE!" bsStyle='primary'>
        A WINNER IS YOU
      </Panel>
    )
  },

  _getLossBanner(){
    return (
      <Panel header="OMG U SUCK!" bsStyle='primary'>
        PANEL OF NOPE
      </Panel>
    )
  },

  _onChange() {
    this.setState(MatchPageStore.get());
  },

  _getButtonsWithPhraseIndex(index, phrase){
    return (
      <ButtonToolbar>
        { this._getButtonEls([0,1,2,3,4], index, phrase) }
      </ButtonToolbar>
    )
  },

  _getRandomStyle(){
    return AnswerStyles[Math.round(Math.random()*AnswerStyles.length-1)];
  },

  _getButtonEls(buttons, index, phrase){

    var currentPhrases = [];

    return _.map(buttons, (button) => {
      if(button === index){
        return (
          <Button block bsSize='large' onClick={ this._onPhraseClicked } bsStyle={ this._getRandomStyle() }>{ phrase }</Button>
        );
      }
      else{
        var possiblePhrase = MatchPageStore.getRandomPhrase();

        while(_.find(currentPhrases, function(phrase){
            return phrase === possiblePhrase;
          })){
          possiblePhrase = MatchPageStore.getRandomPhrase();
        }

        currentPhrases.push(possiblePhrase);

        return (
          <Button block bsSize='large' onClick={ this._onPhraseClicked } bsStyle={ this._getRandomStyle() }>{ possiblePhrase }</Button>
        );
      }
    });
  },

  _getRandomControlType(phrase){
    var type = 2;//Math.round(Math.random() * 5);
    switch(type){
      case ControlTypes.LIST:
        return (
          <ListGroup>
            <ListGroupItem onClick={ this._onPhraseClicked } >{ MatchPageStore.getRandomPhrase() }</ListGroupItem>
            <ListGroupItem onClick={ this._onPhraseClicked } >{ phrase }</ListGroupItem>
            <ListGroupItem onClick={ this._onPhraseClicked } >{ MatchPageStore.getRandomPhrase() }</ListGroupItem>
          </ListGroup>
        );
        break;
      case ControlTypes.BUTTON_STRIP:
        return (
          this._getButtonsWithPhraseIndex(Math.round(Math.random() * 4), phrase)
        );
        break;
      case ControlTypes.TEXT_FIELD:
        return (
          <Input
            type='text'
            value={ phrase }
            placeholder='Enter the phrase!!'
            onChange={ this._onPhraseTyped } />
        );
        break;
      case ControlTypes.DROP_DOWN:
        return (
          <DropdownButton title={ 'Pick the phrase!' }>
            <MenuItem onClick={ this._onPhraseClicked } eventKey='1'>{ MatchPageStore.getRandomPhrase() }</MenuItem>
            <MenuItem onClick={ this._onPhraseClicked } eventKey='2'>{ phrase }</MenuItem>
            <MenuItem onClick={ this._onPhraseClicked } eventKey='3'>{ MatchPageStore.getRandomPhrase() }</MenuItem>
            <MenuItem onClick={ this._onPhraseClicked } eventKey='4'>{ MatchPageStore.getRandomPhrase() }</MenuItem>
          </DropdownButton>
        );
        break;
    }
  }
});