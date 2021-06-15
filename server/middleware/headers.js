module.exports = function(req, res, next) {
    res.header('access-control-allow-origin', '*'); //we call res.header - so that server will respond with what kind
    // of headers are allowed in the request
    // we use access-control-allow-origin header to tell the server the specific  origin
    // locations that are allowed to communicate with the server
    // * is known as a wild card, it means that everything is allowed
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next(); //send the request along to its next destination. This could be the API endpoint or another
    // middleware function designed to do something else.
};

