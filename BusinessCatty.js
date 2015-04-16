var _ = require('lodash');
var React = require('react');

var Page = React.createFactory(require('./components/Page.react'));
var LifecycleActionCreators = require('./actions/LifecycleActionCreators');
var Ext = require('utils/ExtAdapter').Ext;

require('./overrides.scss');

Ext.require('Rally.ui.notify.Notifier');

class BusinessCatty {

    constructor(navState, almEnvironment) {
        this.navState = navState;
        this.almEnvironment = almEnvironment.environment;
        this.displayName = 'BusinessCatty';
        this._el = null;
    }

    init() {
        return new Promise((resolve, reject) => {
            LifecycleActionCreators.init().then(() => {
                resolve(this);
            }, () => {
                resolve();
                Rally.ui.notify.Notifier.showError({ message: 'Error communicating with notifications service.'});
            });
        });
    }

    render(el) {
        this._el = el;
        React.render(this._createPageComponent(), this._el);
    }

    destroy() {
        React.unmountComponentAtNode(this._el);
    }

    rerender(newNavState) {
        this.init().then(() => {
            this.destroy();
            this.navState = newNavState;
            this.render(this._el);
        });
    }

    _createPageComponent() {
        return Page({ almContext: this.almEnvironment.getContext() });
    }
}

module.exports = BusinessCatty;