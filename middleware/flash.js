/**
 * Created by mac on 28/10/2016.
 */

// middleware for errors & messages
module.exports = function (request, response, next) {

    if(request.session.flash) {
        response.locals.flash = request.session.flash;
        request.session.flash = undefined;
    }

    request.flash = function (type, content) {

        // if session.flash doesn't exist
        if(request.session.flash === undefined){
            request.session.flash = {};
        }

        request.session.flash[type] = content;
    }

    next();
};