var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

const CustomModal = module.exports = React.createClass({
  mixins: [OverlayMixin],

  getInitialState() {
    return {
      isModalOpen: true,
      text: this.props.text
    };
  },

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render(){

  }

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (
      <Modal bsStyle='primary' title='Modal heading' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
        {this.state.text}
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});