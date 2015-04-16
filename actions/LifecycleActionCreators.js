var RealtimeAPI = require('../apis/RealtimeAPI.js');

module.exports = {
    init() {
        return RealtimeAPI.launch();
    }
};