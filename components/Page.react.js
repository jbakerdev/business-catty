var _ = require('lodash');
var React = require('react');
var MatchPage = require ('./MatchPage.react');
var MatchPageLobbyHeader = require('./MatchPageLobbyHeader.react');

module.exports = React.createClass({

    propTypes: {
        almContext: React.PropTypes.object
    },

    getInitialState() {
        return {
            matchRunning: false
        };
    },

    render() {
        return (
            <div className="portlet container-fluid business-catty-container">
                <MatchPageLobbyHeader onMatchReady={ this._matchReady }/>
                <MatchPage matchRunning={this.state.matchRunning }/>
            </div>
        );
    },

    _matchReady(match) {
        this.setState({
            matchRunning: match
        });
    }
});
