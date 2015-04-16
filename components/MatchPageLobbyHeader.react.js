var _ = require('lodash');
var React = require('react');

var MatchLobbyActionCreators = require('../actions/MatchLobbyActionCreators');
var MatchLobbyStore = require('../stores/MatchLobbyStore');

var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Panel = require('react-bootstrap').Panel;
var Popover = require('react-bootstrap').Popover;
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;

module.exports = React.createClass({
  displayName: 'MatchLobby',

  propTypes: {
    onMatchReady: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return MatchLobbyStore.get();
  },

  componentWillMount() {
    MatchLobbyStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MatchLobbyStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      <Panel className={ this.state.started ? "match-lobby-started-transition" : "" }>
      { this._getPanelsOrBanner() }
        <ButtonGroup>
          <Button disabled={ !this.state.selectedMatch || this.state.disableJoinButton } onClick={ this.onReadyClicked }>Join</Button>
          <Button disabled={ this.state.started } onClick={ !this.state.selectedMatch ? this.onCreateClicked : this.onStartClicked  }>{ !this.state.selectedMatch ? "Create" : "Start" }</Button>
          {this.state.matches.length === 0 ? this._getModal() : ""}
        </ButtonGroup>
      </Panel>

    );
  },

  _getPanelsOrBanner(){
    if(!this.state.started && this.state.matches.length > 0){
      return (
      <div>
        { this._getCarousel() }
        <Panel>
          <ButtonGroup className="match-lobby-matches">
                { this._getMatchEls(this.state.matches) }
          </ButtonGroup>
        </Panel>
        <Panel>
          <ButtonGroup className="match-lobby-players">
                    { this._getPlayerEls(this.state.selectedMatch ? this.state.selectedMatch.players : []) }
          </ButtonGroup>
        </Panel>
      </div>
      );
    } else if(this.state.started){
        return (
          <div>
            <Panel>
              <ButtonGroup className="match-lobby-matches">
                { this._getMatchEls(this.state.matches) }
              </ButtonGroup>
            </Panel>
            <Panel>
              <ButtonGroup className="match-lobby-players">
                    { this._getPlayerEls(this.state.selectedMatch ? this.state.selectedMatch.players : []) }
              </ButtonGroup>
            </Panel>
          </div>
        );
    }
    else{
      return this._getCarousel();
    }
  },

  _getModal(){
    return (
      <Popover placement='right' positionLeft={150} positionTop={-50} title='Business Time'>
        Create a match to start synergizing!
      </Popover>);
  },

  _onMatchSelected(e) {
    MatchLobbyActionCreators.selectMatch(e.target.getAttribute('id'));
  },

  onReadyClicked() {
    MatchLobbyActionCreators.joinMatch(this.state.selectedMatch, this.state.currentPlayerId, this.state.currentPlayerName);
  },

  onCreateClicked() {
    MatchLobbyActionCreators.createMatch(this.state.currentPlayerId, this.state.currentPlayerName);
  },

  onStartClicked() {
    this.props.onMatchReady(this.state.selectedMatch);
    MatchLobbyActionCreators.startMatch(this.state.selectedMatch);
  },

  _getMatchEls(matches){
    return _.map(matches, (match) => {
      return (
        <Button onClick={ this._onMatchSelected } id={ match.matchId } className="match-list-entry">
          { match.matchName }
        </Button>
      );
    });
  },

  _getPlayerEls(players){
    return _.map(players, (player) => {
      return (
        <Button className="player-list-entry">
          <img height="100px" src={ this.state.catUrls[players.indexOf(player)] }/>
          <div className="player-list-name">{ player.playerName } </div>
        </Button>
      );
    });
  },

  _getCarousel(){
    return (
      <Carousel>
        <CarouselItem>
          <img alt='900x500' src='http://breadedcat.com/wp-content/uploads/2012/02/cat-breading-tutorial-004.jpg'/>
          <div className='carousel-caption'>
            <h3>Optimize Paradigms!</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img alt='900x500' src='http://i1.kym-cdn.com/entries/icons/original/000/000/774/lime-cat.jpg'/>
          <div className='carousel-caption'>
            <h3>Grow the wallet share!</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img alt='900x500' src='http://www.blogcdn.com/www.tuaw.com/media/2013/03/rubycaturdayctattineo.jpg'/>
          <div className='carousel-caption'>
            <h3>Gain traction in the marketplace!</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img alt='900x500' src='http://curiousanimals.net/wp-content/uploads/2008/04/cat-programmer.jpg'/>
          <div className='carousel-caption'>
            <h3>Monetize our assets!</h3>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img alt='900x500' src='http://www.linusakesson.net/programming/kernighans-lever/cat.png'/>
          <div className='carousel-caption'>
            <h3>Punch a puppy!</h3>
          </div>
        </CarouselItem>
      </Carousel>
    );
  },

  _onChange() {
    this.setState(MatchLobbyStore.get());
  }
});