var express = require('express'); // importation d'express
var bodyParser = require('body-parser'); // Middleware (for get params from form)
var session = require('express-session'); // Middleware  (for sessions)
// var mysql = require('mysql');


var postClassMessage = require('./models/Post'); // to get posts functions (create,find ...)

var app = express(); // instantiation express

// Connection mysql
/*
 var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'tinoudi',
 database : 'nodejs'
 });
 */

app.set('view engine', 'ejs'); // définir le moteur qu'on va utilisé

app.use(express.static('public')); // définir les chemins static (exemple : fichier semantic css.)

app.use(bodyParser.urlencoded({extended: false})); // parser

app.use(bodyParser.json()); // parser json

app.use(session({
    secret: 'YONNDJSKSLS37373', // clé secret pour chiffré le coockie.
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // secure for https. (false : https none)
}));

// for create a middleware

app.use(require('./middleware/flash'));

// routes
app.get('/', function (request, response) {

        // function to get all posts from post collection. (require : /models/Post.js)

        postClassMessage.getAllPosts(function (messages) {
        response.render('pages/index', {messages: messages});
    });
});

app.post('/', function (request, response) {

    if (request.body.message === '') {

        request.flash('ERROR', 'ERROR EXIST !! ');

    } else {

        //******** SQL ********/

        /*
         var post = {message : request.body.message , date : new Date()};

         connection.query('INSERT INTO messages SET ?', post, function(err, result) {
         if (err) {
         throw err;
         }
         console.log(result.sql);
         })

         */


        //******** MONGODB ********//

        /*
         var newPost = new post({
         message: request.body.message,
         date: new Date()
         });

         newPost.save(function (err) {
         if (err) {
         throw err;
         }
         });

         */

        // function to add a content in post collection (require : /models/Post.js)

        postClassMessage.create(request.body.message);

        request.flash('SUCCESS', 'ADDED ON DB');
    }

    response.redirect('/');

});

app.listen(8080);