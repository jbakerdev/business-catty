var BusinessCatty = require('promise?global,businesscatty!./BusinessCatty');

module.exports = {
    matches(slug, context) {
        return slug === '/businesscatty';
    },

    initPage(navState, almEnvironment) {
        return BusinessCatty().then(businessCatty => new businessCatty(navState, almEnvironment).init());
    }
};