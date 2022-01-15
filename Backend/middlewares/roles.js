const AccessControl = require('accesscontrol')

const ac = new AccessControl();

const roles = (function () {
    ac.grant('user')
        .readAny('user', ['userID'])
        .updateOwn('user')
        .createOwn('post')
        .deleteOwn('post')
        .updateOwn('post')
        .readAny('post')
        .createOwn('comment')
        .readAny('comment')
        .deleteOwn('comment')
        .updateOwn('comment')


    ac.grant('admin')
        .extend('user')
        .createAny('user')
        .deleteAny('user')
        .updateAny('user')
        .readAny('user', ['!password'])
        .deleteAny('post')
        .deleteAny('comment')
        .readAny('tag');

    return ac;
})();

module.exports = roles